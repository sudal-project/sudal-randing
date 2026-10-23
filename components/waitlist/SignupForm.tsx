"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "@/app/actions";
import { policy, signupForm } from "@/lib/content";
import shared from "@/components/shared.module.css";
import DoneCard from "./DoneCard";
import styles from "./forms.module.css";

// 서버(lib/validation.ts)와 같은 규칙: 끝부분은 두 글자 이상
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = {
  /** hero: 첫 화면 한 줄 폼, launch: 아래 신청 상자의 전체 폼 */
  variant: "hero" | "launch";
};

type Done = "ok" | "duplicate" | null;

export default function SignupForm({ variant }: Props) {
  const full = variant === "launch";
  const [email, setEmail] = useState("");
  const [os, setOs] = useState<string[]>([]);
  const [beta, setBeta] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [consentInvalid, setConsentInvalid] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState<Done>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    const form = e.currentTarget;
    const trimmed = email.trim();
    const emailOk = EMAIL_RE.test(trimmed);
    setEmailInvalid(!emailOk);
    setConsentInvalid(!consent);
    if (!emailOk) {
      form.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }
    if (!consent) {
      form.querySelector<HTMLInputElement>("input[name=consent]")?.focus();
      return;
    }

    // 저장 형식은 기존 joinWaitlist 그대로: OS는 하나만 고른 경우에만 보낸다
    const data = new FormData();
    data.set("email", trimmed);
    data.set("source", full ? "footer" : "hero");
    data.set("agree", "on");
    if (os.length === 1) data.set("os", os[0]);
    if (beta) data.set("beta", "on");
    if (website) data.set("website", website);

    startTransition(async () => {
      const result = await joinWaitlist(null, data).catch(() => ({ status: "error" as const }));
      if (result.status === "error") {
        setMessage(signupForm.error);
        return;
      }
      setDone(result.status === "duplicate" ? "duplicate" : "ok");
      try {
        localStorage.setItem("sudal_signed", "1");
      } catch {}
    });
  }

  if (done === "ok") return <DoneCard title={signupForm.doneTitle} text={signupForm.doneText(email.trim())} />;
  if (done === "duplicate") return <DoneCard title={signupForm.duplicateTitle} text={signupForm.duplicateText} />;

  const emailId = `${variant}Email`;
  const cta = full ? signupForm.launchCta : signupForm.heroCta;
  const submit = (
    <button className={`${shared.btnGo} ${full ? styles.submit : ""}`} type="submit" disabled={pending}>
      {pending ? signupForm.pendingCta : cta}
    </button>
  );

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={`${styles.field} ${emailInvalid ? styles.invalid : ""}`}>
        <label className={full ? undefined : styles.sr} htmlFor={emailId}>
          {signupForm.emailLabel}
        </label>
        <div className={full ? undefined : styles.inline}>
          <input
            type="email"
            id={emailId}
            name="email"
            placeholder={full ? signupForm.launchPlaceholder : signupForm.heroPlaceholder}
            autoComplete="email"
            required
            value={email}
            aria-invalid={emailInvalid || undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailInvalid(false);
            }}
          />
          {!full && submit}
        </div>
        <div className={styles.err}>{signupForm.invalidEmail}</div>
      </div>

      {full && (
        <>
          <div className={styles.field}>
            <span className={styles.lbl} id="osLbl">
              {signupForm.osLabel}
            </span>
            <div className={styles.opts} role="group" aria-labelledby="osLbl">
              {signupForm.osOptions.map((opt) => (
                <label className={styles.opt} key={opt.value}>
                  <input
                    type="checkbox"
                    name="os"
                    value={opt.value}
                    checked={os.includes(opt.value)}
                    onChange={(e) =>
                      setOs((cur) => (e.target.checked ? [...cur, opt.value] : cur.filter((v) => v !== opt.value)))
                    }
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.check}>
              <input type="checkbox" name="beta" checked={beta} onChange={(e) => setBeta(e.target.checked)} />{" "}
              {signupForm.betaLabel} <span className={styles.fine}>{signupForm.betaFine}</span>
            </label>
          </div>
        </>
      )}

      <div className={`${styles.field} ${full ? "" : styles.last} ${consentInvalid ? styles.invalid : ""}`}>
        <label className={styles.consent}>
          <input
            type="checkbox"
            name="consent"
            required
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              setConsentInvalid(false);
            }}
          />
          <span>
            {signupForm.consentLabel}
            <button
              type="button"
              className={styles.more}
              aria-expanded={showPolicy}
              onClick={(e) => {
                e.preventDefault();
                setShowPolicy((v) => !v);
              }}
            >
              {showPolicy ? signupForm.less : signupForm.more}
            </button>
          </span>
        </label>
        <div className={styles.err}>{signupForm.needConsent}</div>
        {showPolicy && (
          <div className={styles.policy}>
            <dl>
              {policy.rows.map((row) => (
                <div key={row.term} className={styles.policyRow}>
                  <dt>{row.term}</dt>
                  <dd>{row.desc}</dd>
                </div>
              ))}
            </dl>
            <p>{policy.note}</p>
          </div>
        )}
      </div>

      <div className={styles.hp} aria-hidden="true">
        <label>
          웹사이트
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>
      </div>

      {full && submit}
      <div className={styles.msg} role="alert">
        {message}
      </div>
    </form>
  );
}
