import type { Metadata } from "next";
import WorkList from "@/components/WorkList";

export const metadata: Metadata = {
  title: "Works",
  description:
    "Five things that exist and can be verified: the production system Luis Pollon runs his company on, an attribution report with a documented 8.28× floor, client sites, Knossos Codex, and Unsunk Productions.",
  alternates: { canonical: "/works" },
};

/**
 * The works index. The list is the shared register (`src/data/works.ts`),
 * rendered by the same component the home page uses, so the two cannot drift.
 * Every fact on this page — the numbers, the stack lines, the etymologies —
 * is in the initial HTML.
 */
export default function Page() {
  return (
    <main id="main" data-page="works">
      <h1>
        <span className="n mono">II.</span>Works
      </h1>
      <p className="promise">
        Things that exist and can be verified.
      </p>
      <p className="soft">
        Two of these open in another tab right now. One runs my company and is
        not public. One is a report I wrote about somebody else&rsquo;s money,
        anonymised. One is a name, a first project, and not much else yet — and
        it says so.
      </p>

      <WorkList />

      <p className="note">
        Client names and financial numbers never appear in the same sentence
        here. Where a case carries the money, the client is a description; where
        a case carries the client, the work is the artefact. Questions about any
        of it:{" "}
        <a href="mailto:hi@luispollon.com">hi@luispollon.com</a>
      </p>
    </main>
  );
}
