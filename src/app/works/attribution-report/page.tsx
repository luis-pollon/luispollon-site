import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The attribution report",
  description:
    "27 reservations at a boutique hotel, crossed one by one against eight independent sources over 49 days: R$9,171 of paid media against R$75,929 of attributed revenue — an 8.28× blended floor, and the proof that the dashboard undercounts.",
  alternates: { canonical: "/works/attribution-report" },
};

/**
 * Anonymised case. The client is a description, never a name; no guest names,
 * no lead IDs, no CRM or PMS product names, no link to the studio's own case
 * page. The numbers are the canonical ones and they are all in this HTML.
 */
export default function Page() {
  return (
    <main id="main" data-page="works" className="case">
      <Link className="backlink mono" href="/works">
        ← Works
      </Link>

      <h1>The attribution report</h1>
      <p className="promise">
        Twenty-seven reservations, eight sources, one at a time — until the
        dashboard&rsquo;s version of the story fell apart.
      </p>

      <div className="facts mono">
        <span>49 days · 2026</span>
        <span>R$9,171 spend → R$75,929 attributed</span>
        <span>8.28× blended · documented floor</span>
      </div>

      <section>
        <h2>
          <span className="n mono">I.</span>The brief
        </h2>
        <p>
          A boutique hotel, running paid media on Google and Meta, wanted the
          question every owner eventually asks and almost never gets answered:
          what did the money do. Not impressions. Not reach. Reservations, in
          the bank, with a name attached to a channel.
        </p>
        <p>
          The platforms each had an answer, and the answers did not agree with
          each other or with the CRM. So I stopped asking the platforms and
          started asking the reservations.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">II.</span>The method
        </h2>
        <p>
          Forty-nine days. Twenty-seven reservations closed in the CRM inside
          that window. Each one crossed, individually, against eight independent
          sources:
        </p>
        <dl className="spec">
          <div>
            <dt className="mono">01</dt>
            <dd>The Meta ads manager — 36 campaigns, cost per campaign, ad set and ad.</dd>
          </div>
          <div>
            <dt className="mono">02</dt>
            <dd>Google Ads — 16 campaigns, 131k impressions, 8,740 clicks.</dd>
          </div>
          <div>
            <dt className="mono">03</dt>
            <dd>GA4 — sessions, audiences, identified purchasers.</dd>
          </div>
          <div>
            <dt className="mono">04</dt>
            <dd>
              The property management system — the hotel&rsquo;s own booking
              engine, used as corroboration, never as the authority on origin.
            </dd>
          </div>
          <div>
            <dt className="mono">05</dt>
            <dd>
              99 lead-form entries, matched phone number by phone number against
              the 27 closed reservations.
            </dd>
          </div>
          <div>
            <dt className="mono">06</dt>
            <dd>
              Thirty-odd WhatsApp conversations, exported and read from the
              first message down.
            </dd>
          </div>
          <div>
            <dt className="mono">07</dt>
            <dd>
              The trigger-phrase map: every channel sends the guest into
              WhatsApp with a different pre-filled opening line, so the first
              sentence a guest types names the campaign that produced them.
            </dd>
          </div>
          <div>
            <dt className="mono">08</dt>
            <dd>The OTA — the reservations that arrived already booked.</dd>
          </div>
        </dl>
        <p>
          Nothing here is modelled and nothing is inferred from a platform&rsquo;s
          own conversion window. Every real attributed to paid media has a
          document behind it.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">III.</span>The ledger
        </h2>
        <div className="ledger-wrap">
          <table className="ledger">
            <thead>
              <tr>
                <th scope="col">Channel</th>
                <th scope="col">Spend</th>
                <th scope="col">Revenue</th>
                <th scope="col">ROAS</th>
                <th scope="col">Reservations</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Google Ads — PMax + Search</td>
                <td className="mono">R$2,250</td>
                <td className="mono">R$48,574</td>
                <td className="mono">21.6×</td>
                <td className="mono">6</td>
              </tr>
              <tr>
                <td>Meta — profile-visit campaigns</td>
                <td className="mono">R$1,854</td>
                <td className="mono">R$23,937</td>
                <td className="mono">12.9×</td>
                <td className="mono">4</td>
              </tr>
              <tr>
                <td>Meta — lead form</td>
                <td className="mono">R$1,157</td>
                <td className="mono">R$3,418</td>
                <td className="mono">2.95×</td>
                <td className="mono">1</td>
              </tr>
              <tr>
                <td>Meta — remaining campaigns</td>
                <td className="mono">R$3,910</td>
                <td className="mono">indirect</td>
                <td className="mono">—</td>
                <td className="mono">—</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td>Total paid media</td>
                <td className="mono">R$9,171</td>
                <td className="mono">R$75,929</td>
                <td className="mono">8.28×</td>
                <td className="mono">11</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="soft mono">
          average cost per confirmed reservation · R$834
        </p>
        <p>
          Two channels carry the operation: Google Ads at 21.6× and the Meta
          profile-visit campaigns at 12.9× produce R$72,511 between them — 95.5%
          of everything paid media can be shown to have generated. The blended
          figure is 8.28×.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">IV.</span>The reservation that broke
          last-click
        </h2>
        <p>
          One booking made the whole exercise worth the days it took. Reading it
          in order:
        </p>
        <ol className="seq">
          <li>
            <span className="when mono">day 0 · 13:20</span>
            The guest fills in a Meta lead form, served on Instagram, from a
            qualification campaign. Cost to Meta of producing that lead: about
            R$10.
          </li>
          <li>
            <span className="when mono">day +4</span>
            The same guest books the hotel through an OTA. The OTA notification
            arrives at the property carrying no link whatsoever to the form
            entry from four days earlier.
          </li>
          <li>
            <span className="when mono">day +4 · 09:15</span>
            The reservations desk opens WhatsApp and greets them as an OTA
            booking, because that is genuinely all anyone can see.
          </li>
          <li>
            <span className="when mono">day +6</span>
            Reservation confirmed, R$3,418. Origin recorded in the CRM: the OTA.
          </li>
        </ol>
        <p>
          Under last-click, the lead-form campaign converted zero reservations
          and was a candidate for being switched off. It had in fact produced a
          confirmed booking at a cost of roughly ten reais, and handed the
          credit to a channel that charges commission for receiving it.
        </p>
        <p>
          That is one case I could prove because the phone number appeared in
          two systems on two different days. The same pattern is statistically
          certain to sit inside the six reservations the OTA was credited with,
          and inside the R$46,274 of revenue in the window where nobody filled
          in the origin field at all — an average ticket of R$6,610, which is
          the profile of high-intent paid traffic, not of walk-ins.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">V.</span>The sale nobody had a line item for
        </h2>
        <p>
          One reservation in the window, R$2,721, came from an AI assistant. The
          guest&rsquo;s partner asked ChatGPT for pet-friendly hotels near a
          major city, the property came back inside the answer, and they booked
          direct. No campaign, no spend, no optimisation, no schema markup —
          the property was simply legible enough to be repeated.
        </p>
        <p>
          I put it in the report as a documented channel rather than an
          anecdote, because it is the first time I have been able to point at a
          line in a CRM and say: this is what being cited instead of ranked
          looks like, and it is worth R$2,721 a go.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">VI.</span>The conclusion
        </h2>
        <p className="claim">
          8.28× is not the result. It is the floor — the number that survives
          after you throw away everything you cannot document.
        </p>
        <p>
          The dashboard undercounts, and it undercounts in one direction. Every
          missing origin field, every cross-channel journey, every sale closed
          over WhatsApp by bank transfer instead of through the website is
          revenue that paid media produced and that last-click gives to somebody
          else. Nothing in this report inflates the number; the entire method is
          designed to be able to defend the smallest honest version of it.
        </p>
        <p>
          Which is also the argument for building the tooling in the first
          place. The fix here was never more budget — it was a mandatory origin
          field, a second WhatsApp line connected to the CRM, server-side
          conversions going back to the platforms, and UTMs on the
          autoresponders. Measurement problems look like media problems right up
          until someone counts by hand.
        </p>
      </section>

      <p className="note">
        Anonymised on purpose. The client is a boutique hotel and stays that way
        — no property name, no guest names, no lead identifiers, no CRM or PMS
        product names. The currency is Brazilian reais and the window is 49
        consecutive days in 2026. Every figure above comes from the original
        report, which was written for the client and is not published.
      </p>
    </main>
  );
}
