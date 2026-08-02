import Link from "next/link";
import { works } from "@/data/works";

/**
 * The five works, rendered identically on the home page and on /works.
 *
 * Server component, no state. Both callers used to hand-write this markup;
 * sharing it means the two pages cannot drift in wording *or* in structure —
 * a fix to one is a fix to both.
 *
 * `data-shot` carries the slug for the screenshot swap contract described in
 * `src/data/works.ts`. The thumb is `aria-hidden` because the initials in it
 * are a placeholder for a picture, not a second copy of the title.
 */
export default function WorkList() {
  return (
    <ul className="work">
      {works.map((w) => (
        <li key={w.slug}>
          <div className="thumb" data-shot={w.slug} aria-hidden="true">
            {w.mark}
          </div>
          <div className="work-body">
            <div className="work-head">
              <Link className="work-title" href={`/works/${w.slug}`}>
                {w.title}
                {w.building && <span className="badge">BUILDING</span>}
              </Link>
              <span className="work-year mono">{w.year}</span>
            </div>
            <div className="work-desc">{w.desc}</div>
            {w.fact && <span className="work-fact mono">{w.fact}</span>}
            {w.etym && <span className="etym mono">{w.etym}</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
