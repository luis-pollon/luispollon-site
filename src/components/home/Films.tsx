import Link from "next/link";
import { filmBySlug } from "@/data/films";

/**
 * IV. Films — a strip of three, then the door to the library.
 *
 * Titles and years come from the archive register in `data/films.ts`, so the
 * home cannot advertise a film the library does not have. Only the three slugs
 * are chosen here.
 *
 * The tiles are 16:9 CSS placeholders carrying `data-still`, the slug of the
 * frame that will replace each one — the posters exist (`posterUrl()`), but
 * they live on Unsunk's bucket, and the home does not spend a third-party
 * connection and three JPEGs on decoration. They are not links either: the only
 * destination this section promises is /films, and it is real.
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
        {selected.map((f) => (
          <div className="f mono" key={f.slug} data-still={f.slug}>
            {f.title}
          </div>
        ))}
      </div>

      <Link href="/films">Browse the full library →</Link>
    </section>
  );
}
