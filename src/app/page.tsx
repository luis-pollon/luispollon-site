import Argument from "@/components/home/Argument";
import Colophon from "@/components/home/Colophon";
import Films from "@/components/home/Films";
import Hero from "@/components/home/Hero";
import Log from "@/components/home/Log";
import Works from "@/components/home/Works";

/**
 * Entity home. Every proof on this page is in the initial HTML — nothing that
 * matters lives behind JavaScript, because the crawlers that decide whether
 * this person exists do not run it. The whole tree below is server-rendered;
 * the only client component on the site is the theme toggle in the rail.
 *
 * Layout note: `<main data-page="index">` is what lights the matching entry in
 * the rail (pure CSS, see globals.css).
 */
export default function Home() {
  return (
    <main id="main" data-page="index">
      <Hero />
      <Argument />
      <Works />
      <Log />
      <Films />
      <Colophon />
    </main>
  );
}
