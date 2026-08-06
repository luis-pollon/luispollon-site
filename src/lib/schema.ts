/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ENTITY GRAPH
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * This file is the machine-readable half of the site. The human half argues
 * that Luis Pollon is a Creative Strategist; this half states it in a form a
 * crawler, a knowledge graph, and an answer engine can all resolve without
 * guessing.
 *
 * Three rules govern everything below. Breaking any of them costs more than
 * writing the file cost in the first place.
 *
 * 1. `@id`s ARE PERMANENT. They are the primary keys of the entity. Once a
 *    crawler has associated `https://luispollon.com/#person` with a set of
 *    facts, renaming that fragment throws the association away and starts the
 *    consolidation over from zero. Add nodes, never rename them.
 *
 * 2. ONE ENTITY PER NODE. Luis Pollon (Person) ≠ Unsunk Productions
 *    (Organization) ≠ Knossos Codex (Organization). They share an author but
 *    not a name, not a `sameAs` list, and not a contact address. Cloning the
 *    Person into a same-named Organization is the classic self-inflicted
 *    ambiguity — it teaches the graph that the human and the company are one
 *    blurred thing, which is precisely the confusion this site exists to undo.
 *
 * 3. NOTHING HERE IS UNSUPPORTED BY THE PAGE. Every claim in the graph is
 *    stated in visible HTML somewhere on the site. Structured data that
 *    contradicts, or merely exceeds, the rendered page is the fastest way to
 *    get the whole graph discounted.
 *
 * A note on shape: this is a single `@graph`, not a pile of sibling scripts.
 * One script, one graph, nodes cross-referencing by `@id` — so the WebSite
 * knows its publisher, the ProfilePage knows its subject, and the Person knows
 * its two companies, without any of them repeating each other's data.
 */

/** Canonical origin. No trailing slash; every URL below is built from it. */
export const SITE_URL = "https://luispollon.com";

/**
 * Stable node identifiers. Treat this object as append-only.
 * @see rule 1 above.
 */
export const ID = {
  person: `${SITE_URL}/#person`,
  website: `${SITE_URL}/#website`,
  profilePage: `${SITE_URL}/#profilepage`,
  unsunk: "https://unsunkproductions.com/#organization",
  knossos: `${SITE_URL}/#knossos-codex`,
  fau: `${SITE_URL}/#fau`,
  baruch: `${SITE_URL}/#baruch`,
} as const;

/** The canonical job title. One string, everywhere, unchanged. */
export const JOB_TITLE = "Creative Strategist";

/**
 * The canonical description. This exact sentence is the `Person.description`,
 * the site `<meta name="description">`, and the LinkedIn About opener. Answer
 * engines repeat the string they see repeated; variation dissolves it.
 */
export const DESCRIPTION =
  "Luis Pollon is a Creative Strategist. He makes the creative and the machine that serves it — content, paid media, and the tooling in between.";

/**
 * `sameAs` — the corroboration set.
 *
 * Rules of admission, in order of how often they get broken:
 *   • Every profile here must carry the same name, the same photo, the same
 *     job title, and a link back to this domain.
 *   • An abandoned profile with a stale bio is a NEGATIVE signal — it
 *     confirms a *different* identity. Either update it or leave it out.
 *   • Never add a profile that is empty.
 *
 * GITHUB IS DELIBERATELY ABSENT, on two independent grounds:
 *
 *   1. The account is empty. `github.com/LuisPollon` has existed since ~2016
 *      with zero repositories — it is precisely the "never add a profile that
 *      is empty" case above, and the strategy addendum locks it out until a
 *      real public repo exists and is pinned (Proft Car, under Knossos Codex).
 *   2. The handle previously listed here, `github.com/luis-pollon`, is not
 *      that account and resolves to nothing. A `sameAs` pointing at a 404 is
 *      strictly worse than no `sameAs` — it is an assertion the graph cannot
 *      back, which is the same reason the Knossos Codex node carries no `url`.
 *
 * Restore it — with the correct handle — the day the first repository is
 * public and pinned. Same gate, same reasoning, for anything added later.
 */
export const SAME_AS = [
  "https://www.linkedin.com/in/luispollon",
  "https://www.youtube.com/@LuisPollon",
  // Both officially linked to the entity as Search Console platform
  // properties (Aug 2026) — the strongest corroboration a social handle gets.
  "https://www.instagram.com/luispollon/",
  "https://www.tiktok.com/@luispollon_",
] as const;

/**
 * `knowsAbout` — three competences, not a keyword dump. Each one is a thing
 * the site actually demonstrates with an artifact: the creative work, the
 * paid-media numbers, the tooling.
 */
export const KNOWS_ABOUT = [
  "Creative strategy",
  "Paid media and creative testing",
  "Marketing automation and internal tools",
] as const;

/**
 * Minimal JSON-LD value type. Deliberately structural rather than a full
 * schema.org typing dependency — the graph is authored by hand, once, and a
 * 40 KB type package to describe seven literal objects is not a trade worth
 * making on a static site.
 */
type JsonLdValue =
  | string
  | number
  | boolean
  | null
  | JsonLdValue[]
  | { [key: string]: JsonLdValue };

export type JsonLdNode = { [key: string]: JsonLdValue };

/** A bare `@id` pointer. Used everywhere a node references another node. */
const ref = (id: string): JsonLdNode => ({ "@id": id });

/**
 * ── Person ────────────────────────────────────────────────────────────────
 * The subject. `url` points at this domain — which is the whole point: the
 * same Person also appears on the Unsunk site, and that copy defers here by
 * setting its own `url` to https://luispollon.com. Two pages, one entity,
 * one of them ceding authority.
 */
const person: JsonLdNode = {
  "@type": "Person",
  "@id": ID.person,
  name: "Luis Pollon",
  givenName: "Luis",
  familyName: "Pollon",
  jobTitle: JOB_TITLE,
  description: DESCRIPTION,
  url: SITE_URL,
  mainEntityOfPage: ref(ID.profilePage),
  email: "mailto:hi@luispollon.com",
  image: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#portrait`,
    url: `${SITE_URL}/luis.jpg`,
    caption: "Luis Pollon",
  },
  sameAs: [...SAME_AS],
  knowsAbout: [...KNOWS_ABOUT],
  worksFor: [ref(ID.unsunk), ref(ID.knossos)],
  founder: [ref(ID.unsunk), ref(ID.knossos)],
  alumniOf: [ref(ID.fau), ref(ID.baruch)],
  knowsLanguage: ["en", "pt"],
};

/**
 * ── Unsunk Productions ────────────────────────────────────────────────────
 * Founded 2019, in college, as a non-profit; relaunched for-profit in 2024.
 * `foundingDate` is 2019 and stays 2019 — one year, forever, matching the
 * registration. The `@id` lives on the Unsunk domain on purpose: that site is
 * the company's entity home, the way this one is the person's.
 */
const unsunk: JsonLdNode = {
  "@type": "Organization",
  "@id": ID.unsunk,
  name: "Unsunk Productions",
  url: "https://unsunkproductions.com",
  foundingDate: "2019",
  founder: ref(ID.person),
};

/**
 * ── Knossos Codex ─────────────────────────────────────────────────────────
 * The software company. No `url` yet — an `@id` on this domain holds the
 * node's place until knossoscodex.com exists. Asserting a URL that 404s is
 * worse than asserting none.
 */
const knossos: JsonLdNode = {
  "@type": "Organization",
  "@id": ID.knossos,
  name: "Knossos Codex",
  description: "Software studio. Luis Pollon builds the products.",
  founder: ref(ID.person),
};

/**
 * ── Schools ───────────────────────────────────────────────────────────────
 * The institutional anchors. These do more disambiguation work than any
 * keyword on the site: they separate this Luis Pollon from the São Paulo
 * orthopedist who owns the Portuguese-language corpus of the name.
 */
const fau: JsonLdNode = {
  "@type": "CollegeOrUniversity",
  "@id": ID.fau,
  name: "Florida Atlantic University",
  sameAs: "https://www.fau.edu",
};

const baruch: JsonLdNode = {
  "@type": "CollegeOrUniversity",
  "@id": ID.baruch,
  name: "Baruch College",
  sameAs: "https://www.baruch.cuny.edu",
};

/**
 * ── WebSite ───────────────────────────────────────────────────────────────
 * No `SearchAction`: there is no site search, and declaring a sitelinks
 * searchbox that resolves to nothing is a claim the site cannot honour.
 */
const website: JsonLdNode = {
  "@type": "WebSite",
  "@id": ID.website,
  url: SITE_URL,
  name: "Luis Pollon",
  description: DESCRIPTION,
  inLanguage: "en",
  publisher: ref(ID.person),
  copyrightHolder: ref(ID.person),
};

/**
 * ── ProfilePage ───────────────────────────────────────────────────────────
 * The home page is not a generic WebPage — it is the profile page *of* a
 * person, and `mainEntity` is what says so. This is the node that makes the
 * home page and the Person mutually resolvable.
 *
 * This node ships on every route, because the whole graph does. That is why
 * `url` is set explicitly: it pins the ProfilePage to https://luispollon.com
 * no matter which document a crawler happened to find the graph in, so
 * /films/alua never gets mistaken for a profile page. If the site ever grows
 * per-page WebPage nodes, split this one out of the layout and emit it only
 * from `/` — until then the explicit `url` is what carries the distinction.
 */
const profilePage: JsonLdNode = {
  "@type": "ProfilePage",
  "@id": ID.profilePage,
  url: SITE_URL,
  name: "Luis Pollon — Creative Strategist",
  description: DESCRIPTION,
  inLanguage: "en",
  isPartOf: ref(ID.website),
  about: ref(ID.person),
  mainEntity: ref(ID.person),
};

/**
 * The graph, assembled. Order is for human readers only — consumers resolve
 * by `@id`, not by position.
 */
export const graph: JsonLdNode = {
  "@context": "https://schema.org",
  "@graph": [person, unsunk, knossos, fau, baruch, website, profilePage],
};

/**
 * Serialize for a `<script type="application/ld+json">` body.
 *
 * `<` is escaped to `<` so that no string in the graph can ever close the
 * script element early. JSON-LD treats the escape as the same character, so
 * the payload is unchanged for consumers — this is purely a parser guard, and
 * it is the reason this helper exists instead of a bare JSON.stringify at each
 * call site.
 */
export function serializeJsonLd(node: JsonLdNode): string {
  return JSON.stringify(node).replace(/</g, "\\u003c");
}
