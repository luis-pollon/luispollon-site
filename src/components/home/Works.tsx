import WorkList from "@/components/WorkList";

/**
 * II. Works — things that exist and can be verified.
 *
 * The list itself is the register in `src/data/works.ts`, rendered by the
 * shared `WorkList` so this section and the /works index can never disagree.
 * This file owns only the section heading — the part that is home-specific.
 */
export default function Works() {
  return (
    <section id="works">
      <h2>
        <span className="n mono">II.</span>Works{" "}
        <span className="aside">— things that exist and can be verified</span>
      </h2>

      <WorkList />
    </section>
  );
}
