/**
 * II. Works — the register of things that exist and can be verified.
 *
 * This list is rendered in two places: section II of the home page and the
 * /works index. It lived twice, hand-written, until integration — two copies
 * of the same five facts drift the first time somebody edits one of them, and
 * the whole point of this section is that its numbers survive being checked.
 * One register, one renderer (`src/components/WorkList.tsx`), no drift.
 *
 * ANONYMITY: the attribution entry names no client and never will. A client
 * name and a financial figure do not appear in the same breath here or on any
 * page that reads from this file. "a boutique hotel" is the client, in full.
 *
 * NUMBERS are canonical only. `8.28× · 21.6× · 12.9×`, `R$9.1k → R$75.9k`,
 * `+9 shipped` (eleven sites total). Nothing here is rounded up for effect.
 *
 * ORDER is deliberate and is not chronological: the working system first, the
 * report that proves the method second, then the shipped sites, then the
 * company being built, then the studio it all came out of. It reads as an
 * argument, which is what section I promises it will be.
 *
 * THUMBNAILS: every entry's `mark` is the placeholder that stands in until a
 * screenshot lands. The renderer puts the slug on `data-shot`, so swapping in
 * `/public/shots/<slug>.jpg` (3:2, the frame's aspect) is a two-line change
 * and nothing else on either page moves.
 */

export type Work = {
  /** Also the route segment: every slug here has a page at /works/<slug>. */
  slug: string;
  /** Initials or figure shown until the screenshot lands. */
  mark: string;
  title: string;
  year: string;
  desc: string;
  /** Mono line under the description — evidence, not adjectives. */
  fact?: string;
  /** Mono line, but an etymology rather than a fact. */
  etym?: string;
  /** Renders the BUILDING badge. Only for things with no public artefact. */
  building?: boolean;
};

export const works: Work[] = [
  {
    slug: "unsunk-studio",
    mark: "us",
    title: "Unsunk Studio",
    year: "2025–",
    desc: "The production system I run my company on — CRM, content pipeline, client dashboards, narrative reports.",
    fact: "next.js · supabase · s3 · browser extension · google / meta / slack",
  },
  {
    slug: "attribution-report",
    mark: "8.28×",
    title: "The attribution report",
    year: "2026",
    desc: "27 reservations at a boutique hotel, crossed against eight independent sources, one by one — proving the dashboard undercounts.",
    fact: "R$9.1k spend → R$75.9k floor · google 21.6× · meta 12.9×",
  },
  {
    slug: "client-sites",
    mark: "cb·vc",
    title: "Client sites",
    year: "2024–",
    desc: "Same method, opposite briefs: an American playwright’s licensing catalogue; a regulated B2B funnel in Portuguese.",
    fact: "chad-bradford.com · vanessacustodio.com.br · +9 shipped",
  },
  {
    slug: "knossos-codex",
    mark: "kc",
    title: "Knossos Codex",
    year: "2026–",
    desc: "A software company for the tools I keep building anyway. First project: Proft Car.",
    etym: "knossos, cretan labyrinth · codex, the bound book",
    building: true,
  },
  {
    slug: "unsunk-productions",
    mark: "up",
    title: "Unsunk Productions",
    year: "2019–",
    desc: "The creative studio where all of this started — founded in college, rebuilt in 2024. The lighthouse doesn’t create the sea; it guides the boats.",
    etym: "un·sunk — that which does not go under",
  },
];

export const workBySlug = (slug: string) => works.find((w) => w.slug === slug);
