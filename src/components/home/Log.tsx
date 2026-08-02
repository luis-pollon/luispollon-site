import Link from "next/link";
import { POSTS } from "@/app/log/posts";

/**
 * III. Log — three entries only. The home page is an index, not an archive;
 * the rest lives at /log.
 *
 * Titles, hrefs and datelines come from the register in `app/log/posts.ts`, so
 * the home page cannot end up advertising a title, a date or a read time that
 * the post itself disagrees with. Only the one-line summary is written here:
 * the home page gets the shorter, blunter version of each line.
 *
 * Every entry carries its cost or its size in mono, because a claim with a
 * denominator is a different kind of claim.
 */

/** The home-page summary line, keyed by slug. Kept literal — this is the copy
 *  from the approved mockup, and it is tighter than the register standfirst. */
const SUMMARY: Record<string, string> = {
  "the-attribution-report":
    "Eight sources, 27 reservations, and the lead Meta generated that the OTA took credit for.",
  "zero-to-forty":
    "Four channels, a Notion CRM, and a sales process that never pitches on the first call.",
  "cloned-my-brain":
    "The system video that built the channel — before I had a name for the thesis.",
};

export default function Log() {
  return (
    <section id="log">
      <h2>
        <span className="n mono">III.</span>Log{" "}
        <span className="aside">
          — systems I build, what they cost, what they returned
        </span>
      </h2>

      <ul className="log">
        {POSTS.map((post) => (
          <li key={post.slug}>
            <Link href={`/log/${post.slug}`}>{post.title}</Link>
            <div className="sub">
              {SUMMARY[post.slug]}{" "}
              <span className="mono">
                {post.dateISO.slice(0, 4)}
                {post.note ? ` · ${post.note}` : ` · ${post.readingTime}`}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
