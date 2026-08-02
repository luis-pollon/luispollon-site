import Link from "next/link";
import { getPost } from "./posts";
import styles from "./log.module.css";

/**
 * The chrome every Log entry shares: the way back, the title, the dateline,
 * and the colophon footer. Server component — a post is text, and text does
 * not need a runtime.
 *
 * `data-page="log"` is what lights entry III in the rail, so a post page reads
 * as a page of the Log rather than as an orphan (see the `:has()` rule in
 * globals.css). The rail never needs to know the pathname.
 *
 * The title and dateline are read from the register in posts.ts rather than
 * written into each post, so the index and the post itself cannot drift apart.
 */
export default function PostShell({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const post = getPost(slug);

  return (
    <main id="main" data-page="log">
      <article className={styles.post}>
        <p className={`${styles.crumb} mono`}>
          <Link href="/log">← III. Log</Link>
        </p>

        <h1 className={styles.postTitle}>{post.title}</h1>

        <span className={`${styles.postMeta} mono`}>
          <time dateTime={post.dateISO}>{post.date}</time>
          {" · "}
          {post.readingTime}
          {post.note ? ` · ${post.note}` : null}
        </span>

        {children}
      </article>

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
