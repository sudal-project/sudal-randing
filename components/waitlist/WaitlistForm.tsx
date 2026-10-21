"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { joinWaitlist } from "@/app/actions";
import { waitlistForm } from "@/lib/content";
import ConsentDetails from "./ConsentDetails";
import styles from "./WaitlistForm.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Props = {
  variant: "hero" | "footer";
};

export default function WaitlistForm({ variant }: Props) {
  const [result, formAction, pending] = useActionState(joinWaitlist, null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (result?.status === "ok") {
      formRef.current?.reset();
    }
  }, [result]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const email = emailRef.current?.value.trim() ?? "";
    if (!EMAIL_RE.test(email)) {
      e.preventDefault();
      setEmailInvalid(true);
      setClientError(waitlistForm.invalidEmail);
      emailRef.current?.focus();
      return;
    }
    setEmailInvalid(false);
    if (!agreeRef.current?.checked) {
      e.preventDefault();
      setClientError(waitlistForm.needAgree);
      agreeRef.current?.focus();
      return;
    }
    setClientError(null);
  }

  const serverMessage =
    result && result.status !== "ignored" ? waitlistForm.messages[result.status] : null;
  const message = clientError ?? serverMessage;
  const isError = Boolean(clientError) || result?.status === "error";
  const cta = variant === "hero" ? waitlistForm.heroCta : waitlistForm.footerCta;

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit}
      onChange={() => {
        setClientError(null);
        setEmailInvalid(false);
      }}
      className={variant === "hero" ? styles.hero : styles.card}
      noValidate
    >
      <input type="hidden" name="source" value={variant} />

      <div className={styles.field}>
        <label htmlFor={`${variant}Email`}>{waitlistForm.emailLabel}</label>
        <div className={variant === "hero" ? styles.row : undefined}>
          <input
            ref={emailRef}
            className={styles.emailInput}
            type="email"
            id={`${variant}Email`}
            name="email"
            placeholder={waitlistForm.emailPlaceholder}
            autoComplete="email"
            aria-invalid={emailInvalid ? "true" : undefined}
            required
          />
          {variant === "hero" && (
            <button className={styles.btn} type="submit" disabled={pending}>
              {pending ? waitlistForm.pendingCta : cta}
            </button>
          )}
        </div>
      </div>

      {variant === "footer" && (
        <>
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>{waitlistForm.osLegend}</legend>
            <div className={styles.seg}>
              {waitlistForm.osOptions.map((os) => (
                <label key={os.value}>
                  <input type="radio" name="os" value={os.value} />
                  {os.label}
                </label>
              ))}
            </div>
          </fieldset>

          <label className={styles.consent}>
            <input type="checkbox" name="beta" />
            <span>
              {waitlistForm.betaLabel} <span className={styles.fine}>{waitlistForm.betaFine}</span>
            </span>
          </label>
        </>
      )}

      <div className={styles.hp} aria-hidden="true">
        <label htmlFor={`${variant}Web`}>웹사이트</label>
        <input id={`${variant}Web`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className={styles.consent}>
        <input ref={agreeRef} type="checkbox" name="agree" required />
        <span>{waitlistForm.agreeLabel}</span>
      </label>

      <ConsentDetails />

      {variant === "footer" && (
        <button className={styles.btn} type="submit" disabled={pending}>
          {pending ? waitlistForm.pendingCta : cta}
        </button>
      )}

      <p
        className={`${styles.msg} ${isError ? styles.err : message ? styles.ok : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </form>
  );
}
