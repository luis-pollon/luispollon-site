"use client";

import Script from "next/script";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { useConsent } from "@/lib/consent";

/**
 * Every measurement on the site, in one file, so that "what does this page
 * load?" has one answer and one place to check it.
 *
 *   NEXT_PUBLIC_GA_ID       Google Analytics 4 — G-XXXXXXXXXX
 *   NEXT_PUBLIC_CLARITY_ID  Microsoft Clarity — heatmaps, session replay
 *
 * Neither is required. An unset variable is not a misconfiguration, it is a
 * decision: the guard below simply renders nothing, no console noise, no
 * half-initialised tag. A fork of this repo with an empty .env is a site that
 * ships zero third-party script — which is the correct default.
 *
 * Vercel Analytics needs no ID (the platform injects it) and no consent: it
 * sets nothing on the device. It is the only thing here that runs on the first
 * paint.
 *
 * Ordering matters more than it looks. `useConsent` reports `ready: false`
 * through the server render, so the gated tags are absent from the HTML that
 * ships — they are appended after hydration, and only if the answer was yes.
 * The proof surface of this site is its initial HTML; nothing measured is
 * allowed to appear in it.
 */
export function Analytics() {
  const { consent, ready } = useConsent();

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  const granted = ready && consent?.analytics === true;

  // One root, always a fragment, with VercelAnalytics always first. Returning
  // it bare on the ungranted path would change the root element type when the
  // answer arrives, and React would unmount and remount it — a second script
  // load and a duplicate page view for every reader who says yes.
  return (
    <>
      {/* Cookieless, unconditional, deliberately outside the gate. */}
      <VercelAnalytics />

      {granted && gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          {/*
            Consent Mode v2 defaults are declared before `config` runs, so the
            first hit is already labelled. Analytics storage is granted because
            this script only exists once the reader granted it; the ad signals
            are denied permanently — this site runs no advertising and there is
            nothing for them to be granted for.
          */}
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}</Script>
        </>
      )}

      {granted && clarityId && (
        <Script id="clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `}</Script>
      )}
    </>
  );
}

export default Analytics;
