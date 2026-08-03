import ConsentLink from "@/components/ConsentLink";

/**
 * The colophon: where a book says who set it and in what.
 *
 * The ex-libris mark closes the page the way the rail opens it. One address,
 * no form — a form implies a queue, and the promise here is the opposite.
 *
 * How the page is measured belongs in the same note as what it is set in: both
 * are facts about the making, and one of them is the reader's to change.
 */
export default function Colophon() {
  return (
    <footer id="colophon">
      <div className="fin">· LP ·</div>
      <p>
        Based in Brazil, working with US and European teams on Americas hours. I
        reply to every email:{" "}
        <a href="mailto:hi@luispollon.com">hi@luispollon.com</a>
      </p>
      <p className="mono colophon-note">
        Set in EB Garamond &amp; IBM Plex Mono · hand-built, no CSS framework ·
        light default, dark by choice · <ConsentLink /> by consent
      </p>
    </footer>
  );
}
