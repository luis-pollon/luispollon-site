import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  caseUrl,
  filmBySlug,
  films,
  isPortrait,
  posterUrl,
  videoUrl,
} from "@/data/films";

type Params = { slug: string };

/** Eight pages, all known at build time. Nothing here is dynamic. */
export async function generateStaticParams(): Promise<Params[]> {
  return films.map((f) => ({ slug: f.slug }));
}

/** A slug outside the eight is a 404, not a rendered empty page. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) return {};

  const description = `${film.line} ${film.strand}, ${film.year}. Directed by Luis Pollon for Unsunk Productions.`;

  return {
    title: `${film.title} (${film.year})`,
    description,
    alternates: { canonical: `/films/${film.slug}` },
    openGraph: {
      type: "video.other",
      url: `/films/${film.slug}`,
      title: `${film.title} (${film.year})`,
      description,
      images: [
        {
          url: posterUrl(film),
          width: film.width,
          height: film.height,
          alt: film.alt,
        },
      ],
    },
  };
}

/**
 * One film. Built out of the same parts as a /works case — `.case` on the
 * main, the backlink, the mono fact bar, numbered sections — because a film
 * page is a case page about a film and inventing a second layout for it would
 * be inventing a second design.
 *
 * THE PLAYER is a bare `<video controls>`: no library, no wrapper, no custom
 * chrome. `preload="none"` means the file — several of these run past 100 MB —
 * is not touched until a reader presses play, and the poster is the only thing
 * that costs anything on load. There is no autoplay, and no muted autoplay
 * either: a film that starts talking before it was asked to is an ad.
 *
 * ONE VIDEO PER PAGE. Several of these cases carry a second cut. It stays on
 * the case, where the credits are.
 */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const film = filmBySlug(slug);
  if (!film) notFound();

  const index = films.findIndex((f) => f.slug === film.slug);
  const previous = films[index - 1];
  const next = films[index + 1];
  const portrait = isPortrait(film);

  return (
    <main id="main" data-page="films" className="case">
      <Link className="backlink mono" href="/films">
        ← Films
      </Link>

      <h1>{film.title}</h1>
      <p className="promise">{film.line}</p>

      <div className="facts mono">
        <span>
          {film.year} · {film.strand.toLowerCase()}
        </span>
        <span>
          {film.runtime} · {film.width}×{film.height}
        </span>
        <span>directed by luis pollon</span>
      </div>

      <section>
        <h2>
          <span className="n mono">I.</span>How it was made
        </h2>
        <p>{film.note}</p>
      </section>

      <section>
        <h2>
          <span className="n mono">II.</span>The film
        </h2>

        {/* The format lives in a data attribute, not a class: `.portrait` is
            already taken by the author photograph on the home page, and a
            second meaning for the same class name is a collision waiting to
            happen — it already happened once. */}
        <figure
          className="filmplayer"
          data-format={portrait ? "portrait" : "landscape"}
        >
          <video
            controls
            preload="none"
            playsInline
            poster={posterUrl(film)}
            width={film.width}
            height={film.height}
          >
            <source src={videoUrl(film)} type="video/mp4" />
            {/* No caption track exists for these cuts; the fallback is a link
                straight at the file rather than a dead element. */}
            This browser will not play the file.{" "}
            <a href={videoUrl(film)}>Open it directly.</a>
          </video>
          <figcaption className="mono">
            {film.title} · {film.runtime} · sound on
          </figcaption>
        </figure>

        <p>
          <a href={caseUrl(film)} rel="noopener">
            full case →
          </a>
        </p>
      </section>

      <nav className="filmnav" aria-label="Archive">
        {previous ? (
          <Link href={`/films/${previous.slug}`}>← {previous.title}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/films/${next.slug}`}>{next.title} →</Link>
        ) : (
          <span />
        )}
      </nav>

      <p className="note">
        Directed by Luis Pollon for Unsunk Productions. The full case — brief,
        stills and the complete credit list — is on unsunkproductions.com, and
        the file above is served out of that same library: there is one copy of
        this film, not two.
      </p>
    </main>
  );
}
