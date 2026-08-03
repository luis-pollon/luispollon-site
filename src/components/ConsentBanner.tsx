"use client";

import { useEffect, useRef, useState } from "react";
import { onOpenConsent, useConsent, writeConsent } from "@/lib/consent";

/**
 * The question, asked once, in one line.
 *
 * It is a marginal note at the foot of the page, not a modal: nothing is
 * dimmed, nothing is trapped, the page stays readable and scrollable behind
 * it. A reader who ignores it loses nothing — the unanswered state and the
 * declined state load exactly the same scripts, which is none.
 *
 * There are two buttons because there is one question (see lib/consent.ts).
 * "Decline" is a real button of the same weight as "allow", not a link in the
 * corner — an easier yes than no is the dark pattern this system exists to
 * avoid.
 *
 * Renders null until `ready`, so it is absent from the server HTML.
 */
export default function ConsentBanner() {
  const { consent, ready } = useConsent();
  const [reopened, setReopened] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  useEffect(() => onOpenConsent(() => setReopened(true)), []);

  // Reopened from the colophon: the reader asked for this, so send focus to
  // it. On the first visit focus is left alone — stealing it from someone who
  // came to read would be worse than the banner itself.
  useEffect(() => {
    if (reopened) acceptRef.current?.focus();
  }, [reopened]);

  if (!ready) return null;
  if (consent && !reopened) return null;

  const answer = (analytics: boolean) => {
    writeConsent(analytics);
    setReopened(false);
  };

  return (
    <aside className="consent" aria-live="polite" aria-label="Analytics">
      <p className="mono consent-note">
        {consent
          ? `Analytics are currently ${consent.analytics ? "on" : "off"}. Visit counts are anonymous either way.`
          : "Optional analytics keep a small file on this device. Visit counts are anonymous either way."}
      </p>
      <div className="consent-acts">
        <button
          ref={acceptRef}
          type="button"
          className="consentbtn"
          onClick={() => answer(true)}
        >
          allow
        </button>
        <button
          type="button"
          className="consentbtn"
          onClick={() => answer(false)}
        >
          decline
        </button>
      </div>
    </aside>
  );
}
