import type { Metadata } from "next";
import Image from "next/image";
import styles from "./about.module.css";

/**
 * /about — the timeline, the credentials, the canonical bio, and Now.
 *
 * Two rules shaped this page more than any other:
 *
 * 1. The move from finance to creative to builder is the story, not the gap.
 *    Told as a sequence of decisions, there is nothing left to explain. The
 *    one sentence doing all the work is "In 2024 I chose the company over the
 *    job" — without it, 2024 reads as a layoff.
 *
 * 2. Location is stated in the present, New York strictly in the past with
 *    dates. Nothing on this page can be read as a claim about anything other
 *    than where he lives and what hours he keeps.
 *
 * /now is not a separate route. A "now" page that disagrees with the about
 * page is a second version of the same person, and three simultaneous public
 * versions is the problem this whole site was built to end. It lives here,
 * dated, as the last section.
 */

const NOW_UPDATED = "2 august 2026";

export const metadata: Metadata = {
  // The layout template appends the brand: "About · Luis Pollon".
  title: "About",
  description:
    "Luis Pollon founded Unsunk Productions in 2019, spent 2021–2024 in New York in finance and a master's at Baruch, then chose the company over the job. Timeline, credentials, and what he is working on now.",
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: "About",
    description:
      "The timeline, the credentials, and what Luis Pollon is building now.",
  },
};

export default function Page() {
  return (
    <main id="main" data-page="about">
      <h1>
        <span className="n mono">V.</span>About
      </h1>

      {/* The portrait is 300×400 in /public — the same 3:4 the home page
          reserves for it. The intrinsic size is declared so the box is
          reserved before the bytes arrive; CSS scales it down to 124px. */}
      <figure className={styles.portrait}>
        <Image
          src="/luis.jpg"
          alt="Luis Pollon"
          width={300}
          height={400}
          sizes="124px"
          priority
        />
      </figure>

      <p>
        I founded Unsunk Productions in 2019, in college, as a non-profit. I was
        studying economics at Florida Atlantic University and wanted to build
        the thing the degree was never going to teach me.
      </p>
      <p>
        Then it waited. From 2021 to 2024 I lived in New York — a master&rsquo;s
        in business analytics at Baruch, and three years at Baird on the
        analytics side of fixed income. I spent them building automations nobody
        asked for, worth about US$75,000 a year in work the desk stopped having
        to do by hand. Unsunk sat in second place that whole time, and I&rsquo;m
        not going to pretend otherwise.
      </p>
      <p>
        In 2024 I chose the company over the job. I moved back to Brazil and
        rebuilt Unsunk as a real company — for-profit, weekends first, then
        everything. We went from zero to forty clients in six months. The
        decision was the hard part; the work after it was just work.
      </p>
      <p>
        From February to June 2025 I was fractional Head of Growth at Zenith
        Media Creator, through Unsunk. A contract, not a job — it ran alongside
        the studio, which is what fractional means.
      </p>
      <p>
        I still run Unsunk. I&rsquo;m also starting Knossos Codex, where I build
        software; the first project is Proft Car.
      </p>

      <p className={styles.standing}>
        I&rsquo;m based in Brazil, working with US and European teams on
        Americas hours.
      </p>

      <section id="credentials">
        <h2>
          <span className="n mono">i.</span>Credentials
        </h2>
        <ul className={styles.creds}>
          <li>
            MS, Business Analytics — Baruch College, New York
            <span className={`${styles.credFact} mono`}>2023</span>
          </li>
          <li>
            BA, Economics — Florida Atlantic University
            <span className={`${styles.credFact} mono`}>2021</span>
          </li>
          <li>
            Baird — fixed income analytics, New York
            <span className={`${styles.credFact} mono`}>
              2021–2024 · ~US$75,000/year saved in automations
            </span>
          </li>
          <li>
            Unsunk Productions — founder
            <span className={`${styles.credFact} mono`}>
              2019– · 67 paying clients
            </span>
          </li>
          <li>
            YouTube — @LuisPollon
            <span className={`${styles.credFact} mono`}>
              12.9k subscribers · 353 videos · since 2023
            </span>
          </li>
        </ul>
      </section>

      <section id="bio">
        <h2>
          <span className="n mono">ii.</span>Bio
        </h2>
        <blockquote className={styles.bio}>
          <span className={`${styles.bioLabel} mono`}>
            canonical — copy it as it is
          </span>
          <p>
            Luis Pollon is a Creative Strategist. He makes the creative and the
            machine that serves it — content, paid media, and the tooling in
            between. He founded Unsunk Productions, a creative studio, in 2019,
            and Knossos Codex, where he builds software, in 2026. He is based in
            Brazil and works with teams in the US and Europe.
          </p>
        </blockquote>
        <p className={styles.bioNote}>
          If you need a bio of me, that is the one. I have already been three
          different people in three different places on the internet, and it
          cost me more than it saved.
        </p>
      </section>

      <section id="now">
        <h2>
          <span className="n mono">iii.</span>Now
        </h2>
        <span className={`${styles.dateline} mono`}>
          updated {NOW_UPDATED} · there is no separate /now page
        </span>
        <ul className={styles.now}>
          <li>
            <div className={styles.nowTitle}>Building Knossos Codex.</div>
            <div className={styles.nowDesc}>
              The software company. First project: Proft Car. It is early — a
              repository and a set of decisions before it is a product.
            </div>
            <span className="etym mono">
              knossos, cretan labyrinth · codex, the bound book
            </span>
          </li>
          <li>
            <div className={styles.nowTitle}>Running Unsunk Productions.</div>
            <div className={styles.nowDesc}>
              Content, paid media and attribution for clients in Brazil and the
              US. I do not report on likes. I report on revenue, bookings and
              what each new customer cost.
            </div>
            <span className="etym mono">
              un·sunk — that which does not go under
            </span>
          </li>
          <li>
            <div className={styles.nowTitle}>Writing the Log.</div>
            <div className={styles.nowDesc}>
              Starting with the attribution work: 27 reservations at a boutique
              hotel, crossed by hand against eight independent sources, because
              the dashboard was wrong and I wanted to know by how much.
            </div>
            <span className="etym mono">
              8.28× blended · documented floor
            </span>
          </li>
        </ul>
      </section>

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
