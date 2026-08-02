import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Unsunk Studio",
  description:
    "The production system Luis Pollon runs his company on: Next.js, Supabase, S3, a TipTap editor and a browser extension, with live Google, Meta and Slack integrations, a CRM, client dashboards and narrative reports.",
  alternates: { canonical: "/works/unsunk-studio" },
};

export default function Page() {
  return (
    <main id="main" data-page="works" className="case">
      <Link className="backlink mono" href="/works">
        ← Works
      </Link>

      <h1>Unsunk Studio</h1>
      <p className="promise">
        The production system I run my company on.
      </p>

      <div className="facts mono">
        <span>2025– · in production</span>
        <span>next.js · supabase · s3</span>
        <span>google · meta · slack — live oauth</span>
      </div>

      <section>
        <h2>
          <span className="n mono">I.</span>What it is
        </h2>
        <dl className="spec">
          <div>
            <dt className="mono">stack</dt>
            <dd>
              Next.js and Supabase, files on AWS S3, a TipTap editor for
              everything written inside the app, and a browser extension for
              the parts of the work that happen on somebody else&rsquo;s page.
            </dd>
          </div>
          <div>
            <dt className="mono">integrations</dt>
            <dd>
              Google, Meta and Slack — three OAuth providers, live, pulling
              spend and results in and pushing alerts back out.
            </dd>
          </div>
          <div>
            <dt className="mono">crm</dt>
            <dd>
              My own. Lead pipeline, deal stages, loss reasons, and the three
              attribution fields every lead gets tagged with on arrival:
              discovery platform, acquisition channel, communication method.
            </dd>
          </div>
          <div>
            <dt className="mono">content</dt>
            <dd>
              The production pipeline — briefs, scripts, the numbered-creative
              convention, approvals, and the calendar the social manager pulls
              from without asking anyone anything.
            </dd>
          </div>
          <div>
            <dt className="mono">reporting</dt>
            <dd>
              Per-client dashboards, and narrative reports written with Claude
              from the numbers already in the system — prose a business owner
              reads, not a screenshot of a chart.
            </dd>
          </div>
        </dl>
      </section>

      <section>
        <h2>
          <span className="n mono">II.</span>Why I built it
        </h2>
        <p>
          I stopped selling content on its own, or paid media on its own, or the
          CRM on its own. I sell the whole thing together — and the moment you
          sell the whole thing, you have to be able to answer the only question
          the owner actually cares about: what did the money do. Without
          attribution you cannot close the loop, and without a closed loop the
          ROI question stays unanswerable forever.
        </p>
        <p>
          The alternative was five subscriptions that do not talk to each other:
          the ads manager that knows the spend, the CRM that knows the sale, the
          spreadsheet that knows neither, and two humans reconciling them by
          hand on the last Friday of the month. Every handoff between those
          tools is a place where a lead loses its origin — and a lead without an
          origin is a lead that quietly credits the wrong channel forever.
        </p>
        <p className="claim">
          When you have the data it stops being a game of tricks. You know what
          is working. Done.
        </p>
        <p>
          So the system is built around one rule: nothing enters without a
          source, and nothing leaves without a number. The extension exists
          because the origin of a lead is usually visible for about four
          seconds, in a tab that belongs to a platform I do not control. The
          narrative report exists because a dashboard nobody opens is not
          reporting, it is furniture.
        </p>
      </section>

      <section>
        <h2>
          <span className="n mono">III.</span>What it changed
        </h2>
        <p>
          It is the thing that makes the rest of this site possible. The
          attribution report is a report about a client&rsquo;s money, but it
          only exists because there was somewhere to put 27 reservations and
          eight sources and have them stay put. Same for the four channels
          behind zero to forty clients: they are only channels because something
          was counting them.
        </p>
        <p>
          I use it every working day. That is the whole endorsement — there is
          no user count to quote, because the honest number is one company, and
          the company is mine.
        </p>
      </section>

      <p className="note">
        Private tool — demo on request. It runs on live client data, so there is
        no public URL and there will not be one until there is a demonstration
        workspace with invented names in it. I will walk anyone through the real
        thing on a call: <a href="mailto:hi@luispollon.com">hi@luispollon.com</a>
      </p>
    </main>
  );
}
