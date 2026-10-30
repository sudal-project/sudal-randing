import board from "@/components/waitlist/board.module.css";
import { downloadSection, launch } from "@/lib/content";
import { getDownloadUrl, isReleased } from "@/lib/release";
import Lines from "./Lines";
import shared from "./shared.module.css";
import styles from "./Launch.module.css";

/** 출시 후 다운로드 상자. 출시 전 신청은 첫 화면의 "다음" 모달에서 받는다. */
export default function Launch() {
  if (!isReleased()) return null;

  return (
    <section className={styles.launch} id="launch">
      <div className="wrap">
        <div className={board.box}>
          <img className={board.peek} src={launch.peek} alt="" />
          <div className={board.sign}>{downloadSection.sign}</div>
          <h2 className={`${shared.h2} ${board.h2}`}>
            <Lines lines={downloadSection.heading} />
          </h2>
          <p className={`${shared.lead} ${board.lead}`}>{downloadSection.lead}</p>
          <a className={`${shared.btnGo} ${board.download}`} href={getDownloadUrl()}>
            {downloadSection.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
