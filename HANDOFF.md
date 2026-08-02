# luispollon.com — handoff

Next.js 16.2.12, App Router, TypeScript, Turbopack. No Tailwind, no CSS framework,
no UI library. 27 routes, all prerendered static. One client component in the
whole site (the theme toggle).

`npm run dev` · `npm run build` · `npm run lint` · `npm run start`

---

## What exists

**Routes** — 21 public pages, all in the sitemap:

| | |
|---|---|
| `/` | the argument, sections I–V |
| `/works` + 5 cases | `unsunk-studio`, `attribution-report`, `client-sites`, `knossos-codex`, `unsunk-productions` |
| `/log` + 3 posts | `zero-to-forty`, `the-attribution-report`, `cloned-my-brain` |
| `/films` + 8 films | `cardboard`, `exa-capital`, `alua`, `kalango`, `el-pirata`, `gioi`, `munay`, `rota-55` |
| `/about` | timeline, credentials, canonical bio, now |

Plus `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/icon.svg`, `/opengraph-image`,
and a 404. `/films/<anything-else>` 404s on purpose (`dynamicParams = false`).

**Registers** — the data lives in one place per section and is rendered from there:

- `src/data/works.ts` → home section II *and* `/works` (one renderer,
  `src/components/WorkList.tsx`)
- `src/data/films.ts` → home section IV, `/films`, every film page, the sitemap
- `src/app/log/posts.ts` → home section III, `/log`, every post dateline, the sitemap
- `src/lib/schema.ts` → the JSON-LD entity graph *and* the meta description, so
  the copy and the structured data cannot disagree

Editing a fact in a register updates every page that states it. That is the point.

**Type** — EB Garamond (roman + italic) and IBM Plex Mono, self-hosted and
subset in `src/app/fonts/`. Small caps are **real** (`smcp`/`c2sc` verified
present after subsetting); `text-transform` appears nowhere in the CSS. The
weight axis is deliberately dropped — the design builds hierarchy without bold,
and `h1–h6/strong/b { font-weight: 400 }` enforces it globally.

**Codex devices, rationed:** exactly one drop cap on the site (home, section I),
real small caps, roman numerals in mono. No paper texture, no blackletter, no
Latin as copy, no ornament.

**Theme** — light by default, dark via toggle, persisted to `localStorage`,
applied by an inline script in `<head>` so there is no flash. The toggle renders
no text: the `☾ dark` / `☀ light` label is painted by CSS off `[data-theme]`, so
there is nothing to hydrate and no wrong-label flash.

**Active rail entry uses zero JavaScript.** Each page renders
`<main data-page="…">` and `globals.css` matches it with
`.shell:has(main[data-page="works"]) .idx a[data-page="works"]`. The rail stays a
server component and the state is correct in the initial HTML. Trade-off: no
`aria-current`, which would require making it a client component.

---

## Decisions worth knowing

**Anonymity.** The attribution client is a real hotel and is never named
anywhere on this site, in any form. It is "a boutique hotel", full stop — no
name, no link to the Unsunk case, no guest names, no lead IDs. Its film is
excluded from `/films` entirely (the slug 404s). `/films` is the only place a
hotel is named at all, and `/films` carries **no financial figures whatsoever** —
that is what keeps a named hotel and a revenue number from ever meeting. The
home film strip is `alua · rota-55 · cardboard`, chosen to avoid identification
by adjacency; the reasoning is written into `src/components/home/Films.tsx` so
nobody restores the original pick from the mockup. Verified against the built
HTML, not just the source: no page pairs a client name with a money figure in
the same sentence.

**Numbers are canonical only.** `0 → 40 clients · 6 months · 2024`,
`8.28× blended ROAS · documented floor`, `11 sites shipped`, `67 paying
clients`, `R$9.1k → R$75.9k`, `google 21.6× · meta 12.9×`. Swept the built
output of all 24 crawlable routes: no `98 clients`, `220k`, `9x`,
`100% quality`, `97%`, `20+ clients`.

**Three source documents were wrong and the site does not repeat them:**

1. The YouTube video is **6 February 2024**, not 2023 — that is YouTube's own
   `uploadDate`. 2023 is when the *channel* was created.
2. Read times in the mockup ("9 min", "8 min") were placeholders. Measured at
   ~230 wpm: 5 / 3 / 2 min.
3. The source attribution report contradicts itself on lead count (99 in the
   sources list, 134 in the body). Neither number is published; the campaign is
   described as "scored zero reservations under last-click" instead.

**GitHub is deliberately absent from `sameAs`** — see the comment in
`src/lib/schema.ts`. Two independent reasons: the real account
(`github.com/LuisPollon`) is empty, which the strategy addendum locks out until
a repo is public and pinned; and the handle that had been listed
(`github.com/luis-pollon`) is a different string that resolves to nothing. A
`sameAs` pointing at a 404 is worse than no `sameAs`. Restore it, with the
correct handle, the day the first repository is public.

**Knossos Codex has no `url` in the graph** for the same reason —
knossoscodex.com does not exist yet, and asserting a 404 is worse than
asserting nothing. Its case page says outright that there is nothing to open.

**Film assets are hot-linked from Unsunk's R2 bucket**, not copied into
`/public`. One source of truth per film; a local copy drifts the first time a
cut is re-graded. Nothing but the poster loads until the reader presses play
(`preload="none"`, no autoplay) — two of the files are over 100 MB.

**No sales furniture.** No "I help X do Y", no contact form, no CTA. Contact is
`hi@luispollon.com` with "I reply to every email".

---

## Budget

Home is **293.1 KB** over the wire against a 300 KB budget: 7.5 KB HTML
(gzipped) + 3.3 KB CSS + ~190 KB Next/React JS + 83.8 KB fonts + 15.6 KB photo.

The JS is the uncomfortable number — it is the framework runtime for a page
whose only interactivity is a theme toggle. Nothing in the app code is
responsible for it, and cutting it means changing the framework posture (static
export, or a smaller runtime), not deleting a component. Worth a decision before
the next feature lands, because it only grows from here.

---

## Pending — none of this blocks a deploy, all of it blocks "done"

**Launch blockers proper**

- **Domain.** `SITE_URL` is hard-coded `https://luispollon.com` in
  `src/lib/schema.ts` and feeds `metadataBase`, every canonical, the sitemap and
  the graph. Nothing works right until the domain points here.
- **No 301 map from the old Framer URLs.** Every existing inbound link and every
  indexed old path currently lands on a 404. This is the single highest-value
  remaining task — it is where the existing authority is.

**Placeholders with a defined swap contract**

- Work thumbnails are CSS placeholders carrying `data-shot="<slug>"`. Drop
  `/public/shots/<slug>.jpg` at 3:2 and swap the initials for an `<img>`;
  nothing else moves.
- Home film tiles are text, carrying `data-still="<slug>"`. Same idea. They were
  left as text on purpose: three third-party JPEGs would blow the home budget
  and add an origin to the critical path.

**Known smaller things**

- `public/luis.jpg` (300×400) is both the `/about` portrait and the
  `ImageObject` in the graph — two owners, one file. The `/about` frame is
  pinned to `aspect-ratio: 3/4; object-fit: cover` so a re-crop cannot change
  the page's shape, but a replacement should stay 3:4.
- `assets/EBGaramond-OG.ttf` is a second copy of the typeface, in TTF, purely
  because **Satori cannot parse WOFF2** and the OG image is generated at build.
  It is not dead weight and it is not shipped to browsers.
- `next dev`'s image optimizer can serve a stale derivative of a replaced
  `/public` image even after clearing `.next/cache/images`. Production is
  correct. If a portrait looks squashed in dev, that is why.
- No JSON-LD `Article` on the log posts yet — `src/app/log/posts.ts` already
  carries `dateISO`, `title` and `description`, so it is a small addition.
- The `/films` grid depends on the R2 bucket staying public. If that bucket
  moves, eight pages lose their posters and their video.

---

## Ground rules for whoever edits next

1. A number goes on this site only if it survives being checked. If a source
   contradicts itself, publish neither figure and describe the shape instead.
2. A client name and a financial figure never appear in the same sentence.
3. Every link has a real destination, or the section does not exist. There is no
   `href="#"` in this codebase and there should never be one.
4. Facts live in the registers, not in JSX. If you find yourself typing the same
   fact into a second file, promote it instead.
5. All proof content ships in the initial HTML. Nothing that matters goes behind
   JavaScript.
