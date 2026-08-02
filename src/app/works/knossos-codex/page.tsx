import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Knossos Codex",
  description:
    "Currently building: Knossos Codex, a software company for the tools Luis Pollon keeps building anyway. First project: Proft Car.",
  alternates: { canonical: "/works/knossos-codex" },
};

export default function Page() {
  return (
    <main id="main" data-page="works" className="case">
      <Link className="backlink mono" href="/works">
        ← Works
      </Link>

      <h1>
        Knossos Codex<span className="badge">BUILDING</span>
      </h1>
      <p className="promise">
        A software company for the tools I keep building anyway.
      </p>

      <div className="facts mono">
        <span>2026– · currently building</span>
        <span>first project · proft car</span>
        <span>knossos, cretan labyrinth · codex, the bound book</span>
      </div>

      <section>
        <h2>
          <span className="n mono">I.</span>Where it stands
        </h2>
        <p>
          Knossos Codex is a company I am starting, not a product I am
          announcing. Right now it is a name, a first project called Proft Car,
          and the decision to stop building internal tools under a production
          company&rsquo;s letterhead.
        </p>
        <p>
          There is nothing to open yet. When there is — a repository, a page, a
          thing that runs — the link will appear on this page, and it will
          appear because the thing exists, not because the section needed
          filling.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">II.</span>Why it exists
        </h2>
        <p>
          Every client engagement I have run in the last two years has produced
          a piece of software as a side effect: a dashboard, an integration, a
          report generator, a browser extension for a step nobody had automated.
          Unsunk Studio is what happens when you keep the good ones. Knossos
          Codex is what happens when you admit that is a second business and
          give it its own name, its own books and its own standard.
        </p>
        <p>
          The name is the whole brief. A labyrinth is a structure you can get
          lost inside; a codex is the technology that made knowledge
          navigable — pages, an index, a place to put your thumb. Software that
          is worth charging for sits on the second side of that.
        </p>
      </section>

      <p className="note">
        No promises on this page on purpose. A founder who announces a company
        and cannot link to anything is describing an intention, and I would
        rather be early and accurate than early and impressive. Progress
        arrives here first:{" "}
        <a href="mailto:hi@luispollon.com">hi@luispollon.com</a>
      </p>
    </main>
  );
}
