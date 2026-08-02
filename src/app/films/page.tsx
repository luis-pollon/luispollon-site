import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { films, plateImage } from "@/data/films";

export const metadata: Metadata = {
  title: "Films",
  description:
    "A dated archive of film work directed by Luis Pollon, 2016–2025 — curated from the Unsunk Productions library. One film per case; the full case, with credits, lives on unsunkproductions.com.",
  alternates: { canonical: "/films" },
  openGraph: {
    type: "website",
    url: "/films",
    title: "Films (2016–2025)",
    description:
      "A dated archive of film work directed by Luis Pollon, curated from the Unsunk Productions library.",
  },
};

/** Plate numbers. Eight films; the table stops where the archive does. */
const PLATE = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

/**
 * IV. Films — the archive itself.
 *
 * A grid of 16:9 frames, ordered forwards in time, the way an archive is read.
 * Nothing here is behind JavaScript: the frames are posters served as plain
 * `<img>` by next/image, and the films themselves only ever load when a reader
 * asks for one, one page deeper. Nothing autoplays anywhere on this site.
 *
 * The verticals are cropped to 16:9 in the grid rather than given a frame of
 * their own — the format is stated in the caption, so the crop is honest and
 * the table of plates stays a table.
 */
export default function Page() {
  return (
    <main id="main" data-page="films">
      <h1>
        <span className="n mono">IV.</span>Films{" "}
        <span className="aside">(2016–2025)</span>
      </h1>

      <p className="soft">
        Selected film work, curated from the Unsunk Productions library. One
        film per case, never more — every case, with its credits and its stills,
        lives on unsunkproductions.com and is linked from the page it belongs
        to.
      </p>

      <ul className="filmgrid">
        {films.map((f, i) => {
          const plate = plateImage(f);
          return (
            <li key={f.slug}>
              <Link className="filmcell" href={`/films/${f.slug}`}>
                <span className="filmframe">
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    width={plate.width}
                    height={plate.height}
                    sizes="(max-width: 720px) 46vw, 260px"
                    // The first two frames are above the fold on every screen the
                    // rail leaves room for; the rest wait to be scrolled to.
                    loading={i < 2 ? "eager" : "lazy"}
                  />
                </span>
                <span className="filmcap">
                  <span className="filmplate mono" aria-hidden="true">
                    {PLATE[i]}.
                  </span>
                  <span className="filmtitle">{f.title}</span>
                  <span className="filmline">{f.line}</span>
                  <span className="filmmeta mono">
                    {f.year} · {f.runtime} ·{" "}
                    {f.height > f.width ? "9:16" : "16:9"}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="note">
        Directed by Luis Pollon for Unsunk Productions. Photography, direction
        and edit credits sit on each case; where a film was shot or cut by
        somebody else, they are named on its page here too. Work under client
        NDA, and the hospitality client behind the attribution report, are not
        in this archive.
      </p>
    </main>
  );
}
