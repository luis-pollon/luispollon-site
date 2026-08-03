/**
 * IV. Films — the dated archive.
 *
 * Eight films pulled out of the Unsunk Productions library. This is a curated
 * archive, not a reel: one film per case, never more, and every entry points
 * back at the full case — credits, stills, client — on unsunkproductions.com.
 * Luis directed all eight; the crew is named in the backstage note where the
 * case names them, because the person who cut a film should be findable.
 *
 * ASSETS live in Unsunk's public R2 bucket and are hot-linked rather than
 * copied. There is exactly one source of truth for a film, and it is the case
 * page it belongs to — a second copy in /public would start drifting the day
 * a cut is re-graded. `width`/`height` are the real track dimensions read out
 * of each file's `tkhd` box, so the frames reserve their space before a byte
 * of media is fetched and nothing on the page shifts.
 *
 * WHAT IS NOT HERE, on purpose: the attribution client (a boutique hotel that
 * is never named next to a number, and never named at all), and the wedding
 * vertical. This page is about direction, not about the whole catalogue.
 *
 * ORDER is chronological, forwards. An archive reads front to back, which is
 * also what lets the plate numerals count up instead of down.
 */

const BUCKET = "https://pub-45682d0ed62e4dc5818bed8ac4d0e33c.r2.dev/cases";

export type Film = {
  /** Route segment — deliberately identical to the Unsunk case slug. */
  slug: string;
  title: string;
  year: string;
  /** The strand it was made for, in Unsunk's own taxonomy. */
  strand: string;
  /** One line, for the archive grid. */
  line: string;
  /** The backstage note: how it was made, in production vocabulary. */
  note: string;
  /** Runtime, m:ss — measured, not estimated. */
  runtime: string;
  /** Real track dimensions, from the container header. */
  width: number;
  height: number;
  /** Alt text for the poster frame. */
  alt: string;
  /**
   * Optional replacement for the ARCHIVE GRID only — never for the player.
   *
   * Two of these films open on a burned-in Portuguese title card, which is
   * correct on the film and wrong at thumbnail size: cropped to 16:9 it reads
   * as a rendering artefact rather than as a language. The player keeps the
   * real first frame, because that is what the film actually starts on; the
   * plate borrows a still from the same case instead. Dimensions are the
   * still's own, so the frame still reserves the right box.
   */
  plate?: { path: string; width: number; height: number; alt: string };
};

/**
 * Absolute URL for anything in Unsunk's public case library.
 *
 * The bucket constant exists once on this site and this is the only way to
 * reach it — `src/data/works.ts` fronts its entries with frames out of the
 * same library, and two hand-written copies of a bucket host is exactly the
 * kind of thing that survives until the day the host changes.
 */
export const caseAsset = (path: string) => `${BUCKET}/${path}`;

/** One video per film. Never two. */
export const videoUrl = (f: Film) => caseAsset(`${f.slug}/hero.mp4`);
/** Frame grab, same aspect ratio as the file it fronts. */
export const posterUrl = (f: Film) => caseAsset(`${f.slug}/poster.jpg`);
/** What the archive grid shows: the plate if there is one, else the poster. */
export const plateImage = (f: Film) =>
  f.plate
    ? { src: caseAsset(f.plate.path), ...f.plate }
    : { src: posterUrl(f), width: f.width, height: f.height, alt: f.alt };
/** The full case, with credits, on Unsunk. */
export const caseUrl = (f: Film) =>
  `https://unsunkproductions.com/work/${f.slug}`;

export const isPortrait = (f: Film) => f.height > f.width;

export const films: Film[] = [
  {
    slug: "cardboard",
    title: "Cardboard",
    year: "2024",
    strand: "Short film",
    line: "New York. The nine-to-five by day, the artist after dark.",
    note: "Not a client job. It came out of a conversation with Zachary Blair, its director, in New York in 2024 — a portrait of someone who serves out the nine-to-five and comes alive at night. The skateboard shot turned into a project of its own: rigging a camera to the deck so it would survive actual pavement took several builds before one held. On the day, the actress braced against two crew members to keep the rig steady while we shot her feet in motion. Six months end to end. Photography mine; cut by Zachary Blair and Emil Woerner; music by Sidd Jambekar; Alexanna Brier on screen.",
    runtime: "4:55",
    width: 1920,
    height: 1080,
    alt: "Frame from Cardboard: a stencilled figure on a graffitied door in a dark New York street.",
  },
  {
    slug: "exa-capital",
    title: "Exa Capital",
    year: "2024",
    strand: "Institutional",
    line: "Two cuts out of one production, for a firm in finance.",
    note: "The client wanted short pieces that read as competent without reading as cold. We shot once and delivered twice: a main institutional film and a shorter promo built for ads and pitch decks — same footage, two different jobs, which is the only reason the budget worked. Sober grade, no trading-floor clichés. Six weeks on the project. Edited with Davi Moraes and Caio Aragon.",
    runtime: "0:58",
    width: 1920,
    height: 1080,
    alt: "Frame from the Exa Capital film: a hand opening a navy branded folder on a desk.",
  },
  {
    slug: "alua",
    title: "Alua",
    year: "2025",
    strand: "Hospitality",
    line: "Shot on a ten-day expedition, on a beach with no sun at all.",
    note: "The brief was a video that looks like a film and not like an ad — rhythm, transitions and a score that pull toward the first rather than the second. It was one stop on a ten-day expedition that covered several hotels and restaurants in a single run, which is the only way the arithmetic works on a shoot that far from base. The hard constraint was weather: we got the beach with no sun at all and found the mood anyway, because the schedule does not move when the sky does. Four weeks from start to delivery. Gio Mendes on screen.",
    runtime: "0:41",
    width: 1080,
    height: 1920,
    alt: "Frame from the Alua film: a guest standing in the garden in white linen.",
    plate: {
      path: "alua/stills/3.png",
      width: 3840,
      height: 2160,
      alt: "Still from the Alua shoot: a couple resting on a porch swing, facing the forest.",
    },
  },
  {
    slug: "kalango",
    title: "Kalango Hotel Boutique",
    year: "2025",
    strand: "Hospitality",
    line: "Full creative control, spent on sound, light and silence.",
    note: "A boutique hotel with an aesthetic of its own and a narrow audience, which is the rare case where the operation hands over creative control entirely. That is why the piece is not an institutional video: the direction went sensory — sound, light, silence, the pace of somebody who is already staying there rather than somebody being sold a room. Three weeks from start to delivery. Gio Mendes on screen.",
    runtime: "0:23",
    width: 1920,
    height: 1080,
    alt: "Frame from the Kalango film: the hotel seen from the air, set into Atlantic forest.",
  },
  {
    slug: "el-pirata",
    title: "El Pirata",
    year: "2025",
    strand: "Gastronomy",
    line: "A restaurant read as a place, rather than documented as one.",
    note: "Total creative freedom, so the film ended up co-authored rather than covered — an aesthetic reading of the room instead of a walkthrough of it. It sits in the archive marked “Ours” for exactly that reason: the authorship is claimed, not implied. Thirty-four seconds, delivered vertical.",
    runtime: "0:34",
    width: 1080,
    height: 1920,
    alt: "Frame from the El Pirata film: the mouth of a wood-fired oven, flame behind blackened steel.",
  },
  {
    slug: "gioi",
    title: "Giói",
    year: "2025",
    strand: "Brand",
    line: "Specialty coffee and two beach tennis world champions, on sand.",
    note: "Giói is a specialty coffee brand built around sport and high performance, so the commercial put that on the court instead of describing it: the brand brought in Rafaella Miiller and Patrícia Diaz, both beach tennis world champions, and we shot them playing. Three weeks between the shoot and delivery. Sixty seconds, vertical, cut to run in feed and behind paid. Photography with Zenith Media Creator; edit by Davi Moraes.",
    runtime: "1:00",
    width: 1080,
    height: 1920,
    alt: "Frame from the Giói film: the ball mid-air over the sand, a player's hands reaching.",
    plate: {
      path: "gioi/stills/3.jpeg",
      width: 1786,
      height: 1008,
      alt: "Still from the Giói shoot: an athlete setting up to strike the ball on the sand court.",
    },
  },
  {
    slug: "munay",
    title: "Munay",
    year: "2025",
    strand: "Hospitality",
    line: "A holistic guesthouse at its own pace, finished vertical in 4K.",
    note: "A holistic guesthouse, so the direction slowed down to match it: less room tour, more atmosphere. The main piece was finished vertical in 4K — native to feed and stories, no crop and no adaptation after the fact, which is the difference between a format decision and a salvage job. A second cut ships beside it in POV: same direction, different vantage, so the client has two edits from one shoot instead of one edit and a re-shoot.",
    runtime: "0:21",
    width: 1080,
    height: 1920,
    alt: "Frame from the Munay film: a guest laughing, head back against a clouded sky.",
  },
  {
    slug: "rota-55",
    title: "Rota 55",
    year: "2025",
    strand: "Tourism",
    line: "A road film for the coastal stretch named after Route 66.",
    note: "Rota 55 is the name given to the run where the SP-55 meets the BR-101 on the north coast of São Paulo — a deliberate nod to the American Route 66, and the reference already tells you what kind of film the project was asking for. So it was built as a road film rather than a spot: just over three minutes, long documentary pace, landscape left to sit between one point and the next instead of being cut into postcards. The length is the argument.",
    runtime: "3:05",
    width: 1920,
    height: 1080,
    alt: "Frame from the Rota 55 film: two travellers on the shoulder of the coastal highway, forested hills behind.",
  },
];

export const filmBySlug = (slug: string) => films.find((f) => f.slug === slug);
