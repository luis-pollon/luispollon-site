import type { Metadata } from "next";
import { garamond, plexMono } from "./fonts";
import Rail from "@/components/Rail";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import { DESCRIPTION, SITE_URL, graph, serializeJsonLd } from "@/lib/schema";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Luis Pollon — Creative Strategist",
    // The brand is never repeated inside a page's own title.
    template: "%s · Luis Pollon",
  },
  // Shared with the Person node in the graph — the same sentence, character
  // for character. See src/lib/schema.ts.
  description: DESCRIPTION,
  applicationName: "Luis Pollon",
  authors: [{ name: "Luis Pollon", url: SITE_URL }],
  creator: "Luis Pollon",
  publisher: "Luis Pollon",
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Luis",
    lastName: "Pollon",
    siteName: "Luis Pollon",
    locale: "en_US",
    url: "/",
    title: "Luis Pollon — Creative Strategist",
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Pollon — Creative Strategist",
    description: DESCRIPTION,
  },
  // Explicit rather than assumed. `max-image-preview: large` is what lets the
  // portrait appear at full size in a result or an AI overview; the snippet
  // and video limits are lifted for the same reason — nothing on this site is
  // withheld from an engine that wants to quote it.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

/**
 * Set the theme before the first paint. Light is the default, so the only
 * thing this has to do is re-apply an explicit "dark" choice. Runs inline in
 * <head>, ahead of any stylesheet paint — no flash of the wrong theme.
 */
const THEME_SCRIPT = `try{if(localStorage.getItem("theme")==="dark"){document.documentElement.dataset.theme="dark"}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${garamond.variable} ${plexMono.variable}`}
      // The script above mutates data-theme before React hydrates.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {/*
          The entity graph, rendered server-side into the initial HTML. It is
          in the root layout — not in page.tsx — so that every route carries
          the same Person/Organization identity and no page can drift from it.
          Crawlers that never run JavaScript still get the whole graph.
        */}
        <script
          type="application/ld+json"
          // Serialized by `serializeJsonLd`, which escapes `<`. See schema.ts.
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="shell">
          <Rail />
          {children}
        </div>
        {/*
          Both of these render nothing on the server: the banner waits for
          localStorage to be read, and the gated tags wait for the answer in
          it. What ships in the HTML is the page — the measurement is appended
          afterwards, by the reader's browser, with the reader's permission.
        */}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
