import type { Metadata } from "next";
import { callListWaitlist, type WaitlistFilter } from "@/lib/listWaitlist";
import { sendLaunchMail, sendTestMail } from "./actions";
import styles from "./page.module.css";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function buildHref(filter: WaitlistFilter, page: number) {
  const params = new URLSearchParams();
  if (filter !== "all") params.set("filter", filter);
  if (page !== 1) params.set("page", String(page));
  const qs = params.toString();
  return qs ? `/admin?${qs}` : "/admin";
}

export const metadata: Metadata = {
  title: "수달공방 - 관리자",
  robots: { index: false, follow: false },
};

// 매 요청마다 목록을 새로 호출해야 해서 정적 프리렌더링 대상에서 제외한다.
export const instant = false;

type SearchParams = { result?: string; message?: string; filter?: string; page?: string };

const FILTERS: { value: WaitlistFilter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "sent", label: "발송완료" },
  { value: "unsent", label: "미발송" },
];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { result, message, filter: rawFilter, page: rawPage } = await searchParams;
  const filter: WaitlistFilter =
    rawFilter === "sent" || rawFilter === "unsent" ? rawFilter : "all";
  const page = Math.max(1, Math.trunc(Number(rawPage) || 1));

  const list = await callListWaitlist({ filter, page });
  const rows = list.ok ? list.data.rows ?? [] : null;
  const counts = list.ok ? list.data.counts ?? { all: 0, sent: 0, unsent: 0 } : null;
  const total = list.ok ? list.data.total ?? 0 : 0;
  const pageSize = list.ok ? list.data.pageSize ?? 50 : 50;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const targets = counts?.unsent ?? null;

  return (
    <div className={styles.wrap}>
      <h1>출시 메일 관리</h1>

      {result && (
        <p className={result === "error" ? styles.err : styles.ok} role="status">
          {message}
        </p>
      )}

      <section className={styles.card}>
        <h2>발송 대상</h2>
        <p className={styles.count}>
          {targets === null ? "대상 수를 확인할 수 없어요." : `${targets}명`}
        </p>
      </section>

      <section className={styles.card}>
        <h2>신청자 목록</h2>
        {counts && (
          <div className={styles.tabs}>
            {FILTERS.map((f) => (
              <a
                key={f.value}
                href={buildHref(f.value, 1)}
                className={filter === f.value ? styles.tabActive : styles.tab}
              >
                {f.label} {counts[f.value]}
              </a>
            ))}
          </div>
        )}
        {rows === null ? (
          <p className={styles.desc}>목록을 불러오지 못했어요.</p>
        ) : rows.length === 0 ? (
          <p className={styles.desc}>
            {(counts?.all ?? 0) === 0 ? "아직 신청자가 없어요." : "조건에 맞는 신청자가 없어요."}
          </p>
        ) : (
          <>
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>이메일</th>
                    <th>OS</th>
                    <th>테스트 희망</th>
                    <th>신청일</th>
                    <th>발송 여부</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>{row.email}</td>
                      <td>{row.os ?? "-"}</td>
                      <td>{row.beta ? "O" : "-"}</td>
                      <td>{formatDate(row.created_at)}</td>
                      <td>{row.sent_at ? formatDate(row.sent_at) : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pager}>
              {page > 1 ? (
                <a href={buildHref(filter, page - 1)}>이전</a>
              ) : (
                <span className={styles.pagerDisabled}>이전</span>
              )}
              <span className={styles.desc}>
                {page} / {totalPages} 페이지
              </span>
              {page < totalPages ? (
                <a href={buildHref(filter, page + 1)}>다음</a>
              ) : (
                <span className={styles.pagerDisabled}>다음</span>
              )}
            </div>
          </>
        )}
      </section>

      <section className={styles.card}>
        <h2>테스트 발송</h2>
        <p className={styles.desc}>받는 사람의 waitlist 수신 거부 상태는 바꾸지 않아요.</p>
        <form action={sendTestMail} className={styles.form}>
          <input type="email" name="to" placeholder="name@example.com" required />
          <button type="submit">테스트 발송</button>
        </form>
      </section>

      <section className={styles.card}>
        <h2>실제 발송</h2>
        <p className={styles.desc}>
          대상 {targets ?? "?"}명에게 한 번만 보내져요. 확정이면 아래 칸에{" "}
          <strong>SEND</strong>를 그대로 입력하세요.
        </p>
        <form action={sendLaunchMail} className={styles.form}>
          <input type="text" name="confirm" placeholder="SEND" required />
          <button type="submit">발송</button>
        </form>
      </section>
    </div>
  );
}
