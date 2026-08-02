import type { Metadata } from "next";
import Image from "next/image";
import PostShell from "../PostShell";
import { getPost } from "../posts";
import styles from "../log.module.css";
import thumb from "./thumb.jpg";

/**
 * A note, not an essay — the point of the piece is the artefact, and the
 * artefact is the video.
 *
 * The embed is deliberately not an embed. A YouTube iframe costs the reader
 * roughly half a megabyte of third-party JavaScript and sets cookies on
 * someone who never pressed play, to advertise a video most visitors will not
 * watch. A thumbnail and a link do the same job, and the thumbnail is served
 * from this origin so the page makes no third-party request at all until the
 * reader chooses to leave.
 *
 * DATE: the video was published 6 February 2024, verified against YouTube's
 * own `uploadDate` (2024-02-06T07:00:56-08:00). The strategy documents refer
 * to it as "2023" — that is the year the channel was created, not the year
 * this video went up. View count 21,273 and duration 10:12, same source.
 */

const post = getPost("cloned-my-brain");

const VIDEO_URL = "https://www.youtube.com/watch?v=xmvO6nDeES8";

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/log/${post.slug}` },
  openGraph: {
    type: "article",
    url: `/log/${post.slug}`,
    title: post.title,
    description: post.description,
    publishedTime: post.dateISO,
  },
};

export default function Page() {
  return (
    <PostShell slug={post.slug}>
      <p className={styles.claim}>
        The best-performing thing I have ever published is a video about
        building a system — made two years before I had any language for why
        that mattered.
      </p>

      <p>
        It went up in February 2024 and it walks through the system I built to
        get through a master&rsquo;s in New York while working full time in
        finance: how the notes were captured, how they were organized, how the
        reading actually got done, and where the whole thing was allowed to be
        sloppy so that the rest could be exact.
      </p>

      {/* No `noreferrer`: this is a link to his own channel, and a post about
          attribution has no business stripping the referrer off its own
          outbound traffic. */}
      <a className={styles.videocard} href={VIDEO_URL}>
        <Image
          src={thumb}
          alt="Title card of the video “I Cloned My Brain: How I Built Systems to Finish a Master’s Degree in 2x Speed”"
          sizes="(max-width: 720px) 100vw, 34rem"
          placeholder="blur"
        />
        <span className={styles.play} aria-hidden="true">
          ▶
        </span>
      </a>
      <span className={`${styles.videometa} mono`}>
        watch on youtube · 10:12 · 21,273 views
      </span>

      <p>
        I thought I ran a filmmaking channel. The data disagreed, politely, for
        two years. The carefully lit filmmaking videos sit in the low hundreds.
        The three videos that actually built the channel are all about systems.
      </p>

      <p>
        The title is the only part I would change. <em>I cloned my brain</em>{" "}
        was a hook, and a hook does not sell — a hook niches. It told one very
        specific person that the next ten minutes were for them and let everyone
        else scroll past, which is exactly what a hook is for. But it also filed
        the video under productivity, next to the mnemonics and the note-taking
        apps, when the thing being demonstrated was closer to engineering.
      </p>

      <p>
        Because nothing in that video is about marketing. It is a student with
        an organization problem. But the move in it is the one I have made every
        year since: notice the work that repeats, write down the way you already
        do it, then build the thing that does it without you. Later the same
        move produced a CRM, a content pipeline, and an attribution report done
        by hand. It started as a way to read faster.
      </p>

      <p>
        I have not re-recorded it and I am not going to. Some proof is better
        for being old.
      </p>
    </PostShell>
  );
}
