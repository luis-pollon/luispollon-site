import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The share card. Type on paper, and nothing else.
 *
 * It is generated at build time — no request-time API is touched — so this
 * costs one PNG in the output and zero runtime. The design is the site's own
 * first screen reduced to its two irreducible lines: the name, and the
 * canonical job title. No portrait (the card is most often seen at thumbnail
 * size, where a face becomes a smudge), no logo, no gradient, no ornament.
 *
 * Light only, deliberately: a share card has no viewer-theme signal to read,
 * and light is this site's default. Committing to one look beats guessing.
 *
 * The font is EB Garamond instanced at wght=400 and subset to the glyphs on
 * this card — 21 KB, read once per build. Satori cannot parse WOFF2, which is
 * why `assets/` holds a TTF instead of reusing the web fonts in src/app/fonts.
 */

export const alt = "Luis Pollon — Creative Strategist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Straight from globals.css `:root`. Kept literal because Satori resolves no
// CSS variables and no stylesheet — it only ever sees these inline styles.
const PAPER = "#f7f3ea";
const INK = "#1a1714";
const INK_SOFT = "#5b5348";
const RULE = "#dcd4c4";
const ACCENT = "#8a6a1f";

export default async function Image() {
  const garamond = await readFile(
    join(process.cwd(), "assets", "EBGaramond-OG.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: PAPER,
          color: INK,
          fontFamily: "EB Garamond",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 110px",
        }}
      >
        <div
          style={{
            fontSize: 132,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
          }}
        >
          Luis Pollon
        </div>

        {/* The rule does the work an ornament would otherwise be asked to do. */}
        <div
          style={{
            display: "flex",
            width: 160,
            height: 1,
            background: ACCENT,
            margin: "38px 0",
          }}
        />

        <div
          style={{
            fontSize: 52,
            color: INK_SOFT,
            letterSpacing: "0.02em",
          }}
        >
          Creative Strategist
        </div>

        <div
          style={{
            position: "absolute",
            left: 110,
            bottom: 74,
            fontSize: 30,
            color: INK_SOFT,
            borderTop: `1px solid ${RULE}`,
            paddingTop: 26,
            width: 980,
          }}
        >
          luispollon.com
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "EB Garamond",
          data: garamond,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
