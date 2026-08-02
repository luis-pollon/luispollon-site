import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Client sites",
  description:
    "Two sites built on the same stack for opposite briefs: chad-bradford.com, an expressive English-language licensing catalogue, and vanessacustodio.com.br, a regulated Portuguese B2B funnel. 11 sites shipped since 2024.",
  alternates: { canonical: "/works/client-sites" },
};

/**
 * Client names are allowed on this page and only on this page: both sites are
 * public, both are signed by the client, and there is not a single financial
 * figure attached to either of them.
 */
export default function Page() {
  return (
    <main id="main" data-page="works" className="case">
      <Link className="backlink mono" href="/works">
        ← Works
      </Link>

      <h1>Client sites</h1>
      <p className="promise">
        Same method, opposite briefs — which is the only way to tell a method
        from a template.
      </p>

      <div className="facts mono">
        <span>2024– · 11 sites shipped</span>
        <span>next.js · vercel · sanity</span>
        <span>most handed over in the client&rsquo;s name</span>
      </div>

      <section>
        <h2>
          <span className="n mono">I.</span>The pair
        </h2>
        <p>
          One site is in English, for an American theatre-maker, and its job is
          to be expressive: a catalogue you browse. The other is in Portuguese,
          for a regulated professional-services practice in Brazil, and its job
          is to be a funnel: a path you walk. They are the same stack. They look
          and behave nothing alike, and that is the argument.
        </p>

        <ul className="work">
          <li>
            <div className="thumb">cb</div>
            <div className="work-body">
              <div className="work-head">
                <a
                  className="work-title"
                  href="https://chad-bradford.com"
                  rel="noopener"
                >
                  chad-bradford.com
                </a>
                <span className="work-year mono">2026</span>
              </div>
              <div className="work-desc">
                A playwright, director and composer with a body of work and no
                way to license it. Positioning first — &ldquo;plays and music to
                license, talks to book&rdquo; — then the copy, then the code.
                Every licensable title carries its own pre-filled inquiry email,
                so an enquiry names itself the moment it lands. Press recovered
                from the Internet Archive and rehosted, because a citation whose
                source has died is still a citation if you keep it.
              </div>
              <span className="work-fact mono">
                en · one expressive page · licensing catalogue · recovered press
              </span>
            </div>
          </li>
          <li>
            <div className="thumb">vc</div>
            <div className="work-body">
              <div className="work-head">
                <a
                  className="work-title"
                  href="https://vanessacustodio.com.br"
                  rel="noopener"
                >
                  vanessacustodio.com.br
                </a>
                <span className="work-year mono">2026</span>
              </div>
              <div className="work-desc">
                Nine URLs in Portuguese for a B2B practice in a regulated
                field, where what you may claim is constrained by law. A
                Sanity-backed blog with draft mode and author pages, LGPD
                consent gating that actually gates, a JSON-LD graph with linked
                identifiers across every page, a WhatsApp qualifier ahead of the
                conversation, and server-side conversions deduplicated against
                the pixel.
              </div>
              <span className="work-fact mono">
                pt-br · 9 urls · sanity cms · lgpd consent · json-ld graph
              </span>
            </div>
          </li>
        </ul>
      </section>

      <section>
        <h2>
          <span className="n mono">II.</span>What is identical underneath
        </h2>
        <dl className="spec">
          <div>
            <dt className="mono">framework</dt>
            <dd>Next.js App Router, TypeScript, static where it can be static.</dd>
          </div>
          <div>
            <dt className="mono">type</dt>
            <dd>
              next/font, self-hosted, subset — no runtime request to a font CDN
              and no layout shift on first paint.
            </dd>
          </div>
          <div>
            <dt className="mono">styling</dt>
            <dd>
              Design tokens declared in CSS, not in a JavaScript config. Colour,
              scale and spacing swap per client; the structure does not.
            </dd>
          </div>
          <div>
            <dt className="mono">hosting</dt>
            <dd>Vercel, continuous deploy from a GitHub repo the client owns.</dd>
          </div>
          <div>
            <dt className="mono">instrumentation</dt>
            <dd>
              Analytics and pixels created on day one, before there is any
              campaign to measure — because the one thing you cannot do
              retroactively is start counting.
            </dd>
          </div>
          <div>
            <dt className="mono">handover</dt>
            <dd>
              Domain, repository and every account in the client&rsquo;s name.
              I stay as a member, not as the owner.
            </dd>
          </div>
        </dl>
        <p className="claim">
          The stack is the constant. Everything visible is a consequence of what
          the business actually needs — which is what makes it a method and not
          a theme.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">III.</span>The curve, admitted
        </h2>
        <p>
          The English site shipped first and shipped without structured data.
          The Portuguese one, a couple of months later, has a full entity graph
          with linked identifiers on every page — because in between I read
          enough about how machines resolve entities to be annoyed at myself.
          The second site is better than the first in exactly the way you would
          expect, and pretending otherwise would cost more credibility than
          admitting it does.
        </p>
        <p>
          The setup sequence that produced both is written down as a playbook:
          domains, mail, repo, CMS, form backend, analytics, pixels, server-side
          conversions, handover. Anyone on my side can run it. That is the part
          that makes it a system rather than a good week.
        </p>
      </section>

      <p className="note">
        11 sites shipped since 2024, most handed over in the client&rsquo;s name
        — domain, repository and accounts. Two are linked above; the rest belong
        to their owners, and a few I would not put my name next to, which seems
        like the honest reason to leave them out rather than a reason to inflate
        the count.
      </p>
    </main>
  );
}
