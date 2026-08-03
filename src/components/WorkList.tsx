import Image from "next/image";
import Link from "next/link";
import { works } from "@/data/works";

/**
 * The five works, rendered identically on the home page and on /works.
 *
 * Server component, no state. Both callers used to hand-write this markup;
 * sharing it means the two pages cannot drift in wording, in structure *or* in
 * picture — a fix to one is a fix to both.
 *
 * THE FRAME is the register's own (`thumb`, in `src/data/works.ts`), cropped to
 * the same 3:2 box for all five so the list reads as a column of plates rather
 * than five differently-shaped photographs. `width`/`height` are the file's real
 * dimensions and the box is a fixed 122px with a declared ratio, so the space is
 * reserved before a byte of the picture is fetched: neither page moves while the
 * list loads. Every frame is lazy — the home meets this section after the fold,
 * and /works is a five-item list nobody sees the foot of on first paint.
 *
 * `data-shot` carries the slug for the screenshot swap described in the
 * register: the day a real screenshot of a work exists, it replaces the frame in
 * `works.ts` and both pages change at once.
 */
export default function WorkList() {
  return (
    <ul className="work">
      {works.map((w) => (
        <li key={w.slug}>
          <div className="thumb" data-shot={w.slug}>
            <Image
              src={w.thumb.src}
              alt={w.thumb.alt}
              width={w.thumb.width}
              height={w.thumb.height}
              sizes="122px"
              loading="lazy"
            />
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
