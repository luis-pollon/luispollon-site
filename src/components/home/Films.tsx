import Image from "next/image";
import Link from "next/link";
import { filmBySlug, plateImage } from "@/data/films";

/**
 * IV. Films — a strip of three, then the door to the library.
 *
 * Titles and frames come from the archive register in `data/films.ts`, so the
 * home cannot advertise a film the library does not have, and cannot show a
 * different frame for it than /films does. Only the three slugs are chosen here.
 *
 * THE FRAMES are the archive's own plates (`plateImage()`), hot-linked from
 * Unsunk's public bucket like every other frame on this site — one source of
 * truth per film, no second copy in /public to re-grade. They are 16:9 with the
 * file's real dimensions declared, so the strip holds its height from first
 * paint, and all three are lazy: section IV is a long way below the fold.
 * `data-still` keeps the slug on the tile for anything that needs to find it.
 *
 * They are not links: the only destination this section promises is /films, and
 * it is real.
 */

/**
 * The three are chosen for range — a short film, a hospitality piece, a road
 * film — and one of them is chosen by exclusion.
 *
 * DO NOT put "Kalango Hotel Boutique" back on this page. The mockup had it
 * here, but section II of this same page reads "27 reservations at a boutique
 * hotel" beside R$9.1k → R$75.9k. Naming the only boutique hotel on the site a
 * few hundred pixels under an anonymised hotel's revenue hands the reader the
 * identification whether or not it is the right one — and a wrong guess is
 * worse than a right one. Client name and financial figure never share a page.
 * Kalango is fine on /films, which carries no numbers.
 */
const SELECTED = ["alua", "rota-55", "cardboard"] as const;

const selected = SELECTED.map((slug) => {
  const film = filmBySlug(slug);
  if (!film) throw new Error(`home: no film in the register for "${slug}"`);
  return film;
});

export default function Films() {
  return (
    <section id="films">
      <h2>
        <span className="n mono">IV.</span>Films{" "}
        <span className="aside">(2016–2025)</span>
      </h2>

      <p className="soft">
        Selected film work, curated from the Unsunk library — every case, with
        credits, lives on unsunkproductions.com.
      </p>

      <div className="films">
        {selected.map((f) => {
          const plate = plateImage(f);
          return (
            <figure className="f" key={f.slug} data-still={f.slug}>
              <span className="fframe">
                <Image
                  src={plate.src}
                  alt={plate.alt}
                  width={plate.width}
                  height={plate.height}
                  sizes="(max-width: 720px) 46vw, 180px"
                  loading="lazy"
                />
              </span>
              <figcaption className="mono">{f.title}</figcaption>
            </figure>
          );
        })}
      </div>

      <Link href="/films">Browse the full library →</Link>
    </section>
  );
}
