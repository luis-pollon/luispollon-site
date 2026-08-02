/**
 * I. The Argument — the one place in the whole site that gets a drop cap.
 *
 * The portrait is deliberately small and floated. It is the same photograph
 * used on every profile: an entity that shows a different face on each surface
 * reads as several people.
 */
export default function Argument() {
  return (
    <section id="argument">
      <h2>
        <span className="n mono">I.</span>The Argument
      </h2>

      <figure className="portrait">
        {/* Plain <img>, intrinsic size declared, no lazy attribute: it is above
            the fold and 108px wide. next/image would ship an image runtime and
            a srcset for a picture that is already smaller than the CSS. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/luis.jpg"
          width={300}
          height={400}
          alt="Luis Pollon, photographed in a room hung with framed drawings."
          decoding="async"
        />
      </figure>

      <p className="lede">
        Most teams split the work in two: someone makes the content, someone
        else buys the media — and the handoff is where the money leaks. I do
        both, and I build the tooling that connects them: the dashboards, the
        automations, the attribution reports that tell you what actually
        happened.
      </p>
      <p>
        I studied economics, spent three years on a fixed-income desk in New
        York building automations nobody asked for, then chose my own company
        over the job. This site is the ledger of what that decision produced.
      </p>
    </section>
  );
}
