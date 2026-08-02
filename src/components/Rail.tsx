import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

/**
 * The Index rail — the site's table of contents, in the codex sense.
 * Server component: the whole thing is in the initial HTML, no JS required.
 *
 * The active entry is resolved in CSS (see `.shell:has(main[data-page=…])` in
 * globals.css) so the rail never needs to know the pathname and never needs
 * to become a client component.
 *
 * Under 720px it collapses into a horizontal bar: the role line, the spacer
 * and the roman numerals drop out, the list goes inline.
 */

type Entry = {
  numeral: string;
  label: string;
  href: "/" | "/works" | "/log" | "/films" | "/about";
  page: string;
};

const INDEX: Entry[] = [
  { numeral: "I.", label: "The Argument", href: "/", page: "index" },
  { numeral: "II.", label: "Works", href: "/works", page: "works" },
  { numeral: "III.", label: "Log", href: "/log", page: "log" },
  { numeral: "IV.", label: "Films", href: "/films", page: "films" },
  { numeral: "V.", label: "About", href: "/about", page: "about" },
];

export default function Rail() {
  return (
    <aside className="rail">
      <Link className="exlibris" href="/">
        Luis Pollon
      </Link>
      <div className="railrole">a creative who builds</div>

      <nav aria-label="Index">
        <ul className="idx">
          {INDEX.map((entry) => (
            <li key={entry.href}>
              <span className="n mono" aria-hidden="true">
                {entry.numeral}
              </span>
              <Link href={entry.href} data-page={entry.page}>
                {entry.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="spacer" />
      <ThemeToggle />
    </aside>
  );
}
