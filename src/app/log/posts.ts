/**
 * The Log register.
 *
 * One row per piece. The prose lives in each post's own `page.tsx` — this file
 * carries only what more than one surface needs to agree on: the index list,
 * the dateline under each title, the `<Metadata>` export, and (from the infra
 * pass) the `Article` schema. A title that exists in two places is a title
 * that will eventually disagree with itself.
 *
 * `readingTime` is measured against the finished draft at ~230 wpm, rounded
 * up, floor of two minutes. It is not a guess and it is not decoration: every
 * number on this site has to survive someone checking it, and read time is
 * the easiest one of them to check. Measured word counts, in order:
 * 654 · 1,079 · 331.
 *
 * Ordered newest first. The home page renders the same three in the same
 * order, from this array.
 */

export type Post = {
  slug: string;
  title: string;
  /** Machine date — <time dateTime>, `datePublished`, sitemap. */
  dateISO: string;
  /** Human dateline, set in mono. */
  date: string;
  readingTime: string;
  /** A marginal fact for the dateline. Mono, like every fact here. */
  note?: string;
  /** One line of value on the index — the argument compressed, never a tease. */
  standfirst: string;
  /** <meta name="description"> and the OG description. */
  description: string;
};

export const POSTS: Post[] = [
  {
    slug: "the-attribution-report",
    title: "The attribution report that proved the dashboard wrong",
    dateISO: "2026-06-19",
    date: "19 june 2026",
    readingTime: "3 min",
    standfirst:
      "Twenty-seven reservations crossed by hand against eight independent sources, because last-click attribution measures who was nearest the door, not what created the sale.",
    description:
      "Last-click attribution does not measure what created a sale — it measures who was standing closest to the door when the sale closed. R$9,171 of paid media, 27 reservations crossed against eight independent sources, and why 8.28× blended ROAS is a floor rather than a result.",
  },
  {
    slug: "zero-to-forty",
    title: "Zero to forty clients in six months — the actual system",
    dateISO: "2025-05-22",
    date: "22 may 2025",
    readingTime: "5 min",
    standfirst:
      "Four acquisition channels running at once, a Notion database honest enough to record where things came from, and a sales process that never opens with price.",
    description:
      "How Luis Pollon went from zero to forty clients in six months: the four acquisition channels and what each one actually returned, the Notion CRM that tagged every lead three ways, and the Discovery → Alignment → Offer → Negotiation process that never leads with price.",
  },
  {
    slug: "cloned-my-brain",
    title: "I cloned my brain to finish a master's at 2× speed",
    dateISO: "2024-02-06",
    date: "6 february 2024",
    readingTime: "2 min",
    note: "video · 21,273 views",
    standfirst:
      "The best-performing thing I have ever published is a video about building a system — made two years before I had language for why that mattered.",
    description:
      "The most-watched video on Luis Pollon's channel documents the system he built to get through a master's while working full time in finance — the first public record of a thesis he could not yet name.",
  },
];

export function getPost(slug: string): Post {
  const post = POSTS.find((p) => p.slug === slug);
  // Slugs are hard-coded at every call site, so a miss is a build-time typo,
  // not a runtime condition. Fail loudly rather than render a blank dateline.
  if (!post) throw new Error(`No Log entry registered for slug "${slug}"`);
  return post;
}
