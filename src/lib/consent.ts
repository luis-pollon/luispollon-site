"use client";

/**
 * Consent, in one bit.
 *
 * The site measures two things and asks about one of them.
 *
 *   · Vercel Analytics is cookieless and stores nothing on the device — it is
 *     a page counter, not a profile. It runs unconditionally, which is what
 *     ePrivacy/LGPD actually allow: consent is owed for storage and reading on
 *     the reader's device, and there is none here.
 *   · GA4 and Microsoft Clarity both write to the device. They run only after
 *     the reader says yes, and never before.
 *
 * So there is exactly one question, and therefore exactly one boolean. No
 * category matrix, no toggles, no vendor table — a taxonomy the reader has to
 * study is a dark pattern with better manners.
 *
 * State lives in localStorage, not a cookie: nothing needs to reach the
 * server, and a cookie would be the very thing being asked about.
 */

import { useSyncExternalStore } from "react";

/**
 * The two globals the third-party tags install. Both are optional: on a build
 * with no IDs configured, neither tag ever loads and both stay undefined —
 * which is why every call site below goes through `?.()`.
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export type Consent = {
  /** GA4 + Clarity. Vercel Analytics is not gated and is not recorded here. */
  analytics: boolean;
  /** When the answer was given — provenance, for the reader and for us. */
  at: number;
  version: number;
};

const STORAGE_KEY = "lp_consent";
/** Bump only when the question itself changes; an older answer then lapses
 *  back to "unasked" rather than being silently reinterpreted. */
const VERSION = 1;

const CHANGE_EVENT = "lp:consent-change";
const OPEN_EVENT = "lp:consent-open";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed.version !== VERSION) return null;
    if (typeof parsed.analytics !== "boolean") return null;
    return { analytics: parsed.analytics, at: parsed.at ?? 0, version: VERSION };
  } catch {
    // Private mode, storage disabled, or a hand-edited value. Treated as
    // "never asked", which fails closed: nothing that stores anything loads.
    return null;
  }
}

export function writeConsent(analytics: boolean) {
  const consent: Consent = { analytics, at: Date.now(), version: VERSION };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  } catch {
    /* The answer still applies to this page view; it just will not survive a
       reload. Better than refusing to honour a click. */
  }
  // Seeded before the event, so the in-memory answer is authoritative even
  // when the write above failed and localStorage would still read as unasked.
  setSnapshot(consent);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: consent }));
  applyConsentSignals(consent);
}

/**
 * Tell whatever is already running about a changed answer.
 *
 * Withdrawal has to be honoured by a tag that has already loaded — unmounting
 * the <Script> does not unload it. GA4 hears Consent Mode v2; Clarity has its
 * own one-word API. Both calls are no-ops when the tag was never there.
 */
export function applyConsentSignals(consent: Consent) {
  if (typeof window === "undefined") return;

  window.gtag?.("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    // Nothing on this site advertises. The ad signals are denied always and
    // unconditionally — they are not the reader's to grant here.
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.clarity?.("consent", consent.analytics);
}

/* -------------------------------------------------------------------------
   The store

   localStorage is an external store, so it is read through
   useSyncExternalStore rather than copied into state by an effect. React then
   owns the tearing problem, the subscription and the hydration boundary, and
   there is no render-then-correct flicker to reason about.

   The snapshot is memoised at module scope because getSnapshot has to return
   a referentially stable value — parsing JSON on every call would hand React
   a new object each time and spin.
   ------------------------------------------------------------------------- */

let snapshot: Consent | null = null;
let snapshotRead = false;

function setSnapshot(next: Consent | null) {
  snapshot = next;
  snapshotRead = true;
}

function getSnapshot(): Consent | null {
  if (!snapshotRead) setSnapshot(readConsent());
  return snapshot;
}

/** The server has no device to have stored anything on. Always unanswered. */
function getServerSnapshot(): Consent | null {
  return null;
}

function subscribe(onStoreChange: () => void) {
  const handler = (event: Event) => {
    setSnapshot((event as CustomEvent<Consent>).detail);
    onStoreChange();
  };
  window.addEventListener(CHANGE_EVENT, handler);
  return () => window.removeEventListener(CHANGE_EVENT, handler);
}

/** `ready` never changes after mount, so it needs no subscription. */
const NEVER_CHANGES = () => () => {};

/**
 * The answer, plus whether it has been read yet.
 *
 * `ready` is false through the server render and through hydration, so every
 * consumer renders nothing on the way in. That is what keeps the banner out of
 * the initial HTML: the document a crawler or a reader-mode parser receives is
 * the page, with no dialog in it.
 */
export function useConsent(): { consent: Consent | null; ready: boolean } {
  const consent = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const ready = useSyncExternalStore(
    NEVER_CHANGES,
    () => true,
    () => false,
  );

  return { consent, ready };
}

/** Reopen the question — the colophon link. */
export function openConsent() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Subscribe to reopen requests. Returns its own unsubscribe, for useEffect. */
export function onOpenConsent(callback: () => void) {
  window.addEventListener(OPEN_EVENT, callback);
  return () => window.removeEventListener(OPEN_EVENT, callback);
}
