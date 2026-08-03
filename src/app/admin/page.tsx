import type { Metadata } from "next";
import styles from "./admin.module.css";
import { DESCRIPTION } from "@/lib/schema";

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * /admin — the operator hub
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This site has no CMS, no database and no session — it is 22 static routes
 * (21 public, plus this one) and a theme toggle. So there is nothing here to
 * log into and nothing here
 * to protect. What there IS, and what was previously scattered across four
 * browser profiles and a bookmark folder, is the answer to "where do I go to
 * look at the data": four dashboards owned by three vendors, plus the repo.
 *
 * That is what this page is. A rendered bookmark bar with a sentence per
 * destination saying what you are supposed to look at when you get there,
 * plus the canonical numbers to check a draft against, plus which analytics
 * keys the current build actually has.
 *
 * Three rules govern it, and breaking any of them turns a convenience into a
 * liability:
 *
 * 1. NOTHING SENSITIVE, EVER. This page is served as static HTML to anyone
 *    who guesses the path. Every fact on it is either already public
 *    elsewhere on the site, or is the *name* of a vendor console that asks
 *    for its own login. No tokens, no IDs, no property numbers, no values —
 *    see the Status section, which reports SET/EMPTY and never the string.
 *    `noindex` is hygiene here, not a security control. Do not start treating
 *    it as one by putting something here that would matter if it leaked.
 *
 * 2. UNLISTED, NOT HIDDEN. Not in `src/app/sitemap.ts` (that file is an
 *    explicit list, so this route stays out by simply never being added), not
 *    in `public/llms.txt`, not in the Rail. `robots.txt` deliberately does
 *    NOT disallow it: a `Disallow` would stop a crawler fetching the page and
 *    therefore stop it ever reading the `noindex` below — the classic way a
 *    page ends up indexed as a bare URL. Let it be fetched; let the meta tag
 *    do its job.
 *
 * 3. THE FACTS ARE QUOTED, NOT RE-STATED. The canonical bio is imported from
 *    `src/lib/schema.ts`, the same string the graph and the meta description
 *    use, so this page cannot become a fourth version of it. The figures are
 *    typed out because they live in prose across several files rather than in
 *    one register; if that ever changes, import them too.
 */

export const metadata: Metadata = {
  // The layout template appends the brand: "Admin · Luis Pollon".
  title: "Admin",
  description: "Operator hub. Unlisted.",

  // The root layout sets `canonical: "/"` as the site-wide default. Inheriting
  // it here would declare this page a duplicate of the home page — a claim
  // that contradicts the `noindex` sitting next to it. `null` removes the tag
  // rather than replacing it with a second wrong answer.
  alternates: { canonical: null },

  // The only page on the site that overrides the layout's index/follow. Both
  // are off: nothing here should be indexed, and nothing here should pass
  // authority to a vendor console.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

/**
 * The instruments. One line each, and the line answers "what am I looking at
 * this for" — not "what is this tool". A hub whose entries read "web
 * analytics platform" is a hub you stop opening.
 */
const TOOLS: {
  who: string;
  name: string;
  href: string;
  /** Shown verbatim under the name, so the destination is readable and copyable. */
  shown: string;
  what: string;
}[] = [
  {
    who: "vercel",
    name: "Analytics",
    href: "https://vercel.com/luis-pollons-projects/luispollon-site/analytics",
    shown: "vercel.com/luis-pollons-projects/luispollon-site/analytics",
    what: "The only measurement that runs unconditionally — cookieless, no ID, no consent gate, so it is the one number that is never undercounted. Look at the referrer table first: this site’s thesis is that it gets cited, and a citation arrives as a referrer, not as a search.",
  },
  {
    who: "vercel",
    name: "Deployments",
    href: "https://vercel.com/luis-pollons-projects/luispollon-site/deployments",
    shown: "vercel.com/luis-pollons-projects/luispollon-site/deployments",
    what: "Every push to main builds and ships. Check the newest build is Ready and that its commit is the one you expect — a failed build leaves the previous deployment live, which is the failure mode you do not notice.",
  },
  {
    who: "google",
    name: "Analytics 4",
    href: "https://analytics.google.com",
    shown: "analytics.google.com",
    what: "Sessions, landing pages, and how much traffic lands on a /works or /log page rather than the home. Two conditions before it holds anything: NEXT_PUBLIC_GA_ID set at build (see Status), and the reader accepting. It will always read lower than Vercel — that gap is consent, not a bug.",
  },
  {
    who: "microsoft",
    name: "Clarity",
    href: "https://clarity.microsoft.com",
    shown: "clarity.microsoft.com",
    what: "Session recordings and scroll depth. The one question it answers that the others cannot: do readers reach the numbers, or leave inside the first screen? Needs NEXT_PUBLIC_CLARITY_ID, and consent — same gate as GA4.",
  },
  {
    who: "google",
    name: "Search Console",
    href: "https://search.google.com/search-console",
    shown: "search.google.com/search-console",
    what: "Coverage and queries. Two things to watch: that all 21 public URLs are indexed, and that the queries returning this page are the name — the disambiguation from the São Paulo physician is the job.",
  },
  {
    who: "github",
    name: "luis-pollon/luispollon-site",
    href: "https://github.com/luis-pollon/luispollon-site",
    shown: "github.com/luis-pollon/luispollon-site",
    what: "The source. HANDOFF.md is the current state of the build, its budget and its pending list; the registers under src/data are where a fact gets edited once and updates every page that states it.",
  },
];

/**
 * The canonical figures. These appear in this exact form wherever they appear
 * — on the home masthead, in the work register, on /about. Copy them, do not
 * re-derive them, and do not round them for effect.
 */
const FACTS: { label: string; value: string; note: string }[] = [
  {
    label: "growth",
    value: "0 → 40 clients · 6 months · 2024",
    note: "Unsunk, relaunched for-profit. The window is six months and the year is 2024.",
  },
  {
    label: "roas",
    value: "8.28× blended · documented floor",
    note: "A floor, not a result: the number survived being crossed by hand against eight sources. google 21.6× · meta 12.9×.",
  },
  {
    label: "clients",
    value: "67 paying clients",
    note: "Cumulative, Unsunk, 2019 to date. Not the same number as the 40 above and never merged with it.",
  },
  {
    label: "sites",
    value: "11 sites shipped",
    note: "Two named on /works (chad-bradford.com, vanessacustodio.com.br) plus nine.",
  },
];

/**
 * The canonical bio, assembled from the canonical description rather than
 * retyped around it. The first half is the exact string the graph and the
 * meta description use; the second half is the two sentences that only the
 * long form carries. Same text as /about, by construction rather than by
 * anybody remembering to keep them in step.
 */
const BIO = `${DESCRIPTION} He founded Unsunk Productions, a creative studio, in 2019, and Knossos Codex, where he builds software, in 2026. He is based in Brazil and works with teams in the US and Europe.`;

/**
 * Which analytics keys this build was given.
 *
 * The first two rows are the site's own variables: they are the whole of
 * `.env.example`, and they are exactly the two keys
 * `src/components/Analytics.tsx` reads. Do not add a row for a variable
 * nothing consumes — a status panel reporting on a key with no reader is
 * worse than no panel, because it reads as EMPTY forever and sends you
 * looking for the wrong fault.
 *
 * The last two are not ours and are not in `.env.example`: they are Vercel
 * system variables, and they are here as provenance rather than
 * configuration — they answer "is this HTML from a real deployment, and
 * which commit". They only reach the bundle if the project has "Automatically
 * expose System Environment Variables" switched on, so EMPTY on a production
 * build means that box is unticked, NOT that the deploy is broken. That is
 * the one row here that can mislead you; it is worth the provenance.
 *
 * `process.env.NEXT_PUBLIC_*` is inlined by the bundler at build time, so
 * each expression below has to be written out literally — a dynamic lookup
 * (`process.env[key]`) is not substituted and would read as empty forever.
 *
 * The value is reduced to a boolean HERE, at the point of access, so no
 * secret-shaped string ever reaches the rendered HTML. That holds even for
 * the two Vercel-provided keys, which are not sensitive: one rule with no
 * exceptions is easier to keep than a rule with two.
 */
const isSet = (value: string | undefined): boolean =>
  typeof value === "string" && value.trim() !== "";

const ENV: { key: string; set: boolean; what: string }[] = [
  {
    key: "NEXT_PUBLIC_GA_ID",
    set: isSet(process.env.NEXT_PUBLIC_GA_ID),
    what: "GA4 measurement ID. Empty means the GA4 console has no data to show, however healthy it looks.",
  },
  {
    key: "NEXT_PUBLIC_CLARITY_ID",
    set: isSet(process.env.NEXT_PUBLIC_CLARITY_ID),
    what: "Clarity project ID. Same contract: no key, no recordings.",
  },
  {
    key: "NEXT_PUBLIC_VERCEL_ENV",
    set: isSet(process.env.NEXT_PUBLIC_VERCEL_ENV),
    what: "Vercel system variable, not one of ours. SET means this HTML came out of a real deployment; EMPTY means a local build — or that the project has system variables left unexposed.",
  },
  {
    key: "NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA",
    set: isSet(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA),
    what: "Also Vercel's, same condition. Which commit this build came from — the fastest way to tell a stale deployment from a fresh one.",
  },
];

export default function Page() {
  return (
    // `data-page="admin"` matches no entry in the rail's :has() list in
    // globals.css, so no index entry lights up — which is correct, because
    // this page is not in the index.
    <main id="main" data-page="admin" className="case">
      <h1>Admin</h1>
      <p className="promise">Where the data lives.</p>

      <p className={styles.warn}>
        <span className={`${styles.warnLead} mono`}>
          unlisted · noindex, nofollow
        </span>
        Not in the sitemap, not in llms.txt, not in the index rail — and not
        secret either. This site is static: no CMS, no database, no session, so
        there is nothing here to protect and nothing here worth guessing the
        path for. Every destination below asks for its own login. Keep it that
        way: no keys, no IDs, no values on this page.
      </p>

      <section id="instruments">
        <h2>
          <span className="n mono">i.</span>Instruments
          <span className="aside"> — and what to look at in each</span>
        </h2>
        <ul className={styles.tools}>
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <span className={`${styles.toolWho} mono`}>{tool.who}</span>
              <a
                className={styles.toolName}
                href={tool.href}
                target="_blank"
                rel="noreferrer"
              >
                {tool.name}
              </a>
              <span className={`${styles.toolHref} mono`}>{tool.shown}</span>
              <span className={styles.toolWhat}>{tool.what}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="canonical-facts">
        <h2>
          <span className="n mono">ii.</span>Canonical facts
          <span className="aside"> — source of truth, copy verbatim</span>
        </h2>

        <dl className="spec">
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="mono">{fact.label}</dt>
              <dd>
                <span className={styles.figure}>{fact.value}</span>
                <span className="etym mono">{fact.note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="soft">
          A number goes on the site only if it survives being checked, and it
          goes on in the form above — not rounded, not re-derived, not merged
          with a neighbouring figure. A client name and a financial figure never
          appear in the same sentence: the attribution client is &ldquo;a
          boutique hotel&rdquo;, in full, everywhere.
        </p>

        <blockquote className={styles.bio}>
          <span className={`${styles.bioLabel} mono`}>
            canonical bio — copy it as it is
          </span>
          {/*
            The opening sentences are `DESCRIPTION`, imported rather than
            retyped — the same characters that are the site's meta description
            and the `Person.description` in the entity graph. Rendering the
            import is the only version of this block that cannot silently
            become a fourth variant of the bio.
          */}
          <p>{BIO}</p>
        </blockquote>

        <p className="soft">
          Everything up to &ldquo;the tooling in between&rdquo; is the string in{" "}
          <span className="mono">src/lib/schema.ts</span>, rendered from the
          import — the meta description, the{" "}
          <span className="mono">Person.description</span> in the entity graph,
          the opener on /about and the LinkedIn About are all those same
          characters. Edit it there and it changes in five places at once, which
          is the only way it stays one bio.
        </p>
      </section>

      <section id="status">
        <h2>
          <span className="n mono">iii.</span>Status
          <span className="aside"> — analytics keys in this build</span>
        </h2>
        <ul className={styles.env}>
          {ENV.map((entry) => (
            <li key={entry.key}>
              <span className={`${styles.envKey} mono`}>
                {entry.key}
                <span className={`${styles.envWhat} mono`}>{entry.what}</span>
              </span>
              <span
                className={`${styles.state} mono`}
                data-state={entry.set ? "set" : "empty"}
              >
                {entry.set ? "SET" : "EMPTY"}
              </span>
            </li>
          ))}
        </ul>
        <p className="soft">
          Vercel Analytics is deliberately absent from that list: it has no
          variable. The platform injects the endpoint at deploy time and the
          script is cookieless, so it is switched on and off in the project
          dashboard rather than here. The other two are consent-gated on top of
          being key-gated — <span className="mono">SET</span> means the tag can
          load, not that it did.
        </p>

        <p className="note">
          Read at build time, reported as presence only — the values are never
          rendered, and reducing them to a boolean at the point of access is
          what guarantees it rather than a promise not to print them. A key
          added in the Vercel dashboard does not appear here until the next
          deploy, because this page is HTML that was written once and has no way
          to ask again. The register of what exists is{" "}
          <span className="mono">.env.example</span>; this panel only reports
          what this build received.
        </p>
      </section>

      <footer>
        <div className="fin">· LP ·</div>
        <p className="mono">
          Static site · 21 public routes · this page is not one of them
        </p>
      </footer>
    </main>
  );
}
