import localFont from "next/font/local";

/**
 * Typefaces — self-hosted and subset in-repo. Zero network requests at
 * runtime, zero CLS, and the files ship with the deploy.
 *
 * ── EB Garamond (Georg Duffner / Octavio Pardo, OFL) ──────────────────────
 * Cut from the upstream VARIABLE TTFs, then instanced at wght=400 and
 * subset. The weight axis is deliberately gone: this design builds hierarchy
 * out of size, small caps, colour and space, and never out of bold — so the
 * `gvar` deltas were 60% of the file for a weight nothing would ever ask for.
 * If a heavier weight is ever genuinely needed, re-instance from
 * upstream (github.com/octaviopardo/EB-Garamond) rather than letting the
 * browser synthesize a fake bold.
 *
 * SMALL CAPS ARE REAL. Both the roman and the italic retain a drawn `smcp`
 * (and `c2sc`) table, verified after subsetting — so `font-variant-caps:
 * small-caps` renders true small capitals, NOT browser-synthesized squashed
 * ones. Never substitute `text-transform: uppercase`.
 *
 * ── IBM Plex Mono 400 (IBM, OFL) ──────────────────────────────────────────
 * The marginalia face: roman numerals, dates, stack lines, etymologies.
 *
 * Subset coverage (all three files): Basic Latin, Latin-1 Supplement (covers
 * Portuguese), Œ/Š/Ž/Ÿ, combining accents, General Punctuation, €, →, math
 * signs, and the f-ligatures. Retained layout features: liga rlig kern mark
 * mkmk calt locl ccmp onum lnum pnum tnum smcp c2sc — the fraction, superior
 * and stylistic-set tables were dropped because the design never calls them.
 * Total for all three: ~84 KB.
 */

export const garamond = localFont({
  src: [
    { path: "./EBGaramond-Roman.woff2", weight: "400", style: "normal" },
    { path: "./EBGaramond-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  fallback: [
    "Iowan Old Style",
    "Palatino Linotype",
    "Palatino",
    "Hoefler Text",
    "Georgia",
    "serif",
  ],
  // Descriptor-level default. globals.css restates it on `body` because the
  // @font-face descriptor is not honored in every engine.
  // NOTE: single quotes around the tags on purpose — next/font serializes
  // these options through a JSON query string and embedded double quotes
  // break the Turbopack loader. Single-quoted OpenType tags are valid CSS.
  declarations: [
    { prop: "font-feature-settings", value: "'liga' 1, 'onum' 1, 'kern' 1" },
  ],
});

export const plexMono = localFont({
  src: [{ path: "./IBMPlexMono-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-mono",
  display: "swap",
  preload: true,
  fallback: ["ui-monospace", "SFMono-Regular", "SF Mono", "Menlo", "monospace"],
});
