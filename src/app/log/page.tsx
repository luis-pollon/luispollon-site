import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "./posts";
import styles from "./log.module.css";

/**
 * /log — the register.
 *
 * Named Log because it is both a ship's log and a changelog, which is exactly
 * the double reading the whole site is built on. Three entries is not a thin
 * blog; it is a register in which every line is something that happened and
 * can be checked. The alternative — a page of essays with no denominators —
 * is what the rest of the internet already has.
 *
 * Every entry ships its standfirst in the initial HTML. The crawlers deciding
 * whether this person exists do not run JavaScript, and a list of bare titles
 * tells them nothing.
 */

export const metadata: Metadata = {
  // The layout template appends the brand: "Log · Luis Pollon".
  title: "Log",
  description:
    "Systems Luis Pollon built, what they cost, and what they actually returned — attribution done by hand, an acquisition system that produced forty clients in six months, and the video that turned out to be the thesis.",
  alternates: { canonical: "/log" },
  openGraph: {
    type: "website",
    url: "/log",
    title: "Log",
    description:
      "Systems I build, what they cost, and what they actually returned.",
  },
};

export default function Page() {
  return (
    <main id="main" data-page="log">
      <h1>
        <span className="n mono">III.</span>Log
      </h1>

      <p className="soft">
        Systems I build, what they cost, and what they actually returned. Every
        number here has a denominator, a period and a method, or it is not
        here.
      </p>

      <ul className={styles.register}>
        {POSTS.map((post) => (
          <li key={post.slug}>
            <Link className={styles.entryTitle} href={`/log/${post.slug}`}>
              {post.title}
            </Link>
            <div className={styles.entryStandfirst}>{post.standfirst}</div>
            <span className={`${styles.entryMeta} mono`}>
              <time dateTime={post.dateISO}>{post.date}</time>
              {" · "}
              {post.readingTime}
              {post.note ? ` · ${post.note}` : null}
            </span>
          </li>
        ))}
      </ul>

      <footer>
        <div className="fin">· LP ·</div>
        <p>
          I reply to every email:{" "}
          <a href="mailto:hi@luispollon.com">hi@luispollon.com</a>
        </p>
      </footer>
    </main>
  );
}
