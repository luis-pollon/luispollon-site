import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsunk Productions",
  description:
    "The creative studio where all of this started: founded in 2019 as a non-profit in college, relaunched in 2024 as a real company in Brazil. 0 → 40 clients in 6 months; 67 paying clients to date.",
  alternates: { canonical: "/works/unsunk-productions" },
};

export default function Page() {
  return (
    <main id="main" data-page="works" className="case">
      <Link className="backlink mono" href="/works">
        ← Works
      </Link>

      <h1>Unsunk Productions</h1>
      <p className="promise">
        The creative studio where all of this started.
      </p>

      <div className="facts mono">
        <span>2019– · founded in college</span>
        <span>0 → 40 clients · 6 months · 2024</span>
        <span>67 paying clients</span>
      </div>

      <section>
        <h2>
          <span className="n mono">I.</span>The sequence
        </h2>
        <p>
          I founded Unsunk in 2019, as a non-profit, while I was still at
          university in Florida. Then it waited. From 2021 to 2024 I was in New
          York doing finance and a master&rsquo;s, and the company sat there
          being a name I owned rather than a business I ran.
        </p>
        <p>
          In 2024 I chose it over the job. I moved back to Brazil and rebuilt it
          as a real company — weekends first, then all of it. We went from zero
          to forty clients in six months. That number is only defensible because
          the method behind it is written down: four acquisition channels, a CRM
          I maintained by hand before I built one, and a sales process that does
          not pitch on the first call.
        </p>
        <p>
          The pause is not a gap. It is what makes 2024 a decision instead of a
          drift, and what makes the forty a consequence of that decision rather
          than an accident.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">II.</span>What it sells
        </h2>
        <p>
          Not a video team, not a media-buying team, not a business
          consultancy — the whole thing. Content and paid media are the method;
          growing the business is the product. I stopped selling the pieces
          separately because a client who buys them separately ends up owning
          three vendors and no answer to the only question that matters, which
          is what the money did.
        </p>
        <p className="claim">
          The lighthouse doesn&rsquo;t create the sea — it guides the boats.
        </p>
        <p>
          That is the logo and it is also the position. We do not manufacture
          demand out of nothing and I will not sell anyone a campaign that
          claims to. What a studio can do is make what already exists legible,
          reachable and measurable — and then tell you, honestly, which part of
          the ocean the boats came from.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">III.</span>The name
        </h2>
        <p className="etym mono">un·sunk — that which does not go under</p>
        <p>
          Archaic English: a thing not made to be diminished or sunk. It became
          the last line of the manifesto I wrote for onboarding, which the team
          reads before it reads anything about process:{" "}
          <span className="sc">we were not made to sink</span>.
        </p>
      </section>

      <p className="note">
        Unsunk Productions is a company, not a person, and it has its own
        address:{" "}
        <a href="https://unsunkproductions.com" rel="noopener">
          unsunkproductions.com
        </a>
        . Client work, case by case, lives there — this page is only the part of
        the story that belongs to me. 67 paying clients to date; the canonical
        number remains the documented one, 0 → 40 in six months.
      </p>
    </main>
  );
}
