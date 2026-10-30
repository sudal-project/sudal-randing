"use client";

import { useState, useTransition } from "react";
import { joinWaitlist } from "@/app/actions";
import { policy, signupForm } from "@/lib/content";
import shared from "@/components/shared.module.css";
import DoneCard from "./DoneCard";
import styles from "./forms.module.css";

// 서버(lib/validation.ts)와 같은 규칙: 끝부분은 두 글자 이상
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type Done = "ok" | "duplicate";

type Props = {
  /** 첫 화면에서 먼저 받은 이메일 */
  defaultEmail?: string;
  onDone?: (done: Done, email: string) => void;
};

/** 신청 모달 안의 전체 폼 (이메일, OS, 테스트 참여, 동의) */
export default function SignupForm({ defaultEmail = "", onDone }: Props) {
  const [email, setEmail] = useState(defaultEmail);
  const [os, setOs] = useState("");
  const [beta, setBeta] = useState(false);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [consentInvalid, setConsentInvalid] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [message, setMessage] = useState("");
  const [done, setDone] = useState<Done | null>(null);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");
    const form = e.currentTarget;
    const trimmed = email.trim();
    const emailOk = EMAIL_RE.test(trimmed);
    setEmailInvalid(!emailOk);
    if (!emailOk) {
      form.querySelector<HTMLInputElement>("input[name=email]")?.focus();
      return;
    }
    setConsentInvalid(!consent);
    if (!consent) {
      form.querySelector<HTMLInputElement>("input[name=consent]")?.focus();
      return;
    }

    const data = new FormData();
    data.set("email", trimmed);
    data.set("source", "hero");
    data.set("agree", "on");
    if (os) data.set("os", os);
    if (beta) data.set("beta", "on");
    if (website) data.set("website", website);

    startTransition(async () => {
      const result = await joinWaitlist(null, data).catch(() => ({ status: "error" as const }));
      if (result.status === "error") {
        setMessage(signupForm.error);
        return;
      }
      const next = result.status === "duplicate" ? "duplicate" : "ok";
      setDone(next);
      onDone?.(next, trimmed);
      try {
        localStorage.setItem("sudal_signed", "1");
      } catch {}
    });
  }

  if (done === "ok") return <DoneCard title={signupForm.doneTitle} text={signupForm.doneText(email.trim())} />;
  if (done === "duplicate") return <DoneCard title={signupForm.duplicateTitle} text={signupForm.duplicateText} />;

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={`${styles.field} ${emailInvalid ? styles.invalid : ""}`}>
        <label htmlFor="signupEmail">{signupForm.emailLabel}</label>
        <input
          type="email"
          id="signupEmail"
          name="email"
          placeholder={signupForm.launchPlaceholder}
          autoComplete="email"
          required
          value={email}
          aria-invalid={emailInvalid || undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailInvalid(false);
          }}
        />
        <div className={styles.err}>{signupForm.invalidEmail}</div>
      </div>

      <div className={styles.field}>
        <span className={styles.lbl} id="signupOsLbl">
          {signupForm.osLabel}
        </span>
        <div className={styles.opts} role="group" aria-labelledby="signupOsLbl">
          {signupForm.osOptions.map((opt) => (
            <label className={styles.opt} key={opt.value}>
              <input
                type="checkbox"
                name="os"
                value={opt.value}
                checked={os === opt.value}
                // 하나만 고른다. 고른 걸 다시 누르면 선택을 지운다
                onChange={(e) => setOs(e.target.checked ? opt.value : "")}
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

      <div className={`${styles.field} ${consentInvalid ? styles.invalid : ""}`}>
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

      <button className={`${shared.btnGo} ${styles.submit}`} type="submit" disabled={pending}>
        {pending ? signupForm.pendingCta : signupForm.launchCta}
      </button>
      <div className={styles.msg} role="alert">
        {message}
      </div>
    </form>
  );
}
