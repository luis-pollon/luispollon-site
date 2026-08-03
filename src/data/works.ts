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
 * THUMBNAILS are photographs, not initials. Every entry carries a `thumb`,
 * and the renderer crops all five to the same 3:2 frame — the register is the
 * only place a picture is chosen, so the home and /works show the same one by
 * construction rather than by anyone remembering to update both.
 *
 * WHERE THE FRAMES COME FROM: Unsunk's public case library, the same bucket
 * the film archive hot-links (`caseAsset`, in `src/data/films.ts`). None of
 * these five works is a film, so none of them has a frame of its own yet: the
 * pictures here are chosen for what they are of, they are the studio's own
 * footage rather than stock, and each one is replaced the day a real
 * screenshot of the work exists — that is a one-line edit in this file.
 *
 * TWO RULES CONSTRAIN THE CHOICE, and both come from the anonymity note above:
 *   · No hospitality frame appears in this list at all. Alua, Munay and
 *     Kalango are named hotels in the film archive; a hotel photograph a few
 *     rows from "27 reservations at a boutique hotel" hands the reader an
 *     identification, and a wrong guess is worse than a right one. This is the
 *     same rule that keeps Kalango off the home page (see components/home/
 *     Films.tsx) — enforced here on the picture rather than the caption.
 *   · Nothing with a client's logo in it goes next to the attribution numbers.
 *     The frame over that entry is a wall of figures on a screen with no mark
 *     on it, which is what the entry is about: a dashboard, undercounting.
 */

import { caseAsset } from "@/data/films";

export type Work = {
  /** Also the route segment: every slug here has a page at /works/<slug>. */
  slug: string;
  /**
   * The frame that fronts the entry, cropped to 3:2 by the renderer.
   *
   * `width`/`height` are the file's real pixel dimensions, so next/image
   * reserves the box before a byte of the picture is fetched and neither page
   * shifts while it loads.
   */
  thumb: { src: string; width: number; height: number; alt: string };
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
    thumb: {
      src: caseAsset("exa-capital/stills/2.jpeg"),
      width: 3778,
      height: 2110,
      alt: "Three people leaning over one screen at a meeting table, reading the same thing.",
    },
    title: "Unsunk Studio",
    year: "2025–",
    desc: "The production system I run my company on — CRM, content pipeline, client dashboards, narrative reports.",
    fact: "next.js · supabase · s3 · browser extension · google / meta / slack",
  },
  {
    slug: "attribution-report",
    thumb: {
      src: caseAsset("exa-capital/stills/1.jpeg"),
      width: 3778,
      height: 2110,
      alt: "Over a shoulder: a monitor filled with columns of live figures, a second screen beside it.",
    },
    title: "The attribution report",
    year: "2026",
    desc: "27 reservations at a boutique hotel, crossed against eight independent sources, one by one — proving the dashboard undercounts.",
    fact: "R$9.1k spend → R$75.9k floor · google 21.6× · meta 12.9×",
  },
  {
    slug: "client-sites",
    thumb: {
      src: caseAsset("gioi/stills/3.jpeg"),
      width: 1786,
      height: 1008,
      alt: "A sand court seen from above, a player set under the ball as it comes down.",
    },
    title: "Client sites",
    year: "2024–",
    desc: "Same method, opposite briefs: an American playwright’s licensing catalogue; a regulated B2B funnel in Portuguese.",
    fact: "chad-bradford.com · vanessacustodio.com.br · +9 shipped",
  },
  {
    slug: "knossos-codex",
    thumb: {
      src: caseAsset("el-pirata/poster.jpg"),
      width: 1600,
      height: 2844,
      alt: "Firelight behind blackened steel, in the mouth of a wood-fired oven.",
    },
    title: "Knossos Codex",
    year: "2026–",
    desc: "A software company for the tools I keep building anyway. First project: Proft Car.",
    etym: "knossos, cretan labyrinth · codex, the bound book",
    building: true,
  },
  {
    slug: "unsunk-productions",
    thumb: {
      src: caseAsset("cardboard/stills/2.png"),
      width: 2854,
      height: 1596,
      alt: "A night scene lit warm and low: a face in profile, city light out of focus behind it.",
    },
    title: "Unsunk Productions",
    year: "2019–",
    desc: "The creative studio where all of this started — founded in college, rebuilt in 2024. The lighthouse doesn’t create the sea; it guides the boats.",
    etym: "un·sunk — that which does not go under",
  },
];

export const workBySlug = (slug: string) => works.find((w) => w.slug === slug);
