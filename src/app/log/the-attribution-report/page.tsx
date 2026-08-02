import type { Metadata } from "next";
import Link from "next/link";
import PostShell from "../PostShell";
import { getPost } from "../posts";
import styles from "../log.module.css";

/**
 * The narrative short version of the case. The full sanitized report lives at
 * /works/attribution-report; this page exists to make the argument readable in
 * three minutes and quotable in one line.
 *
 * Anonymity rules, non-negotiable and applied here:
 *   · the client is "a boutique hotel" and is never named
 *   · no guest names, no lead IDs, no reservation numbers
 *   · no link out to the agency's own case page for the same client
 *   · a client name and a financial figure never appear together anywhere
 *
 * Which costs the piece nothing. The argument was never "look who hired me";
 * it was "here is the method, and here is the number it produced."
 */

const post = getPost("the-attribution-report");

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  alternates: { canonical: `/log/${post.slug}` },
  openGraph: {
    type: "article",
    url: `/log/${post.slug}`,
    title: post.title,
    description: post.description,
    publishedTime: post.dateISO,
  },
};

export default function Page() {
  return (
    <PostShell slug={post.slug}>
      <p className={styles.claim}>
        Last-click attribution does not measure what created a sale. It measures
        who was standing closest to the door when the sale closed.
      </p>

      <p>
        For forty-nine days I ran R$9,171 of paid media for a boutique hotel.
        Then, instead of screenshotting a dashboard, I took twenty-seven
        reservations and crossed each one by hand against eight independent
        sources — the ad platforms, the booking system, the CRM, the WhatsApp
        threads, the front desk. R$75,929 in revenue traced back to a channel I
        ran. That is <span className="mono">8.28×</span> blended. Google Ads
        came in at <span className="mono">21.6×</span>, the link in the Meta bio
        at <span className="mono">12.9×</span>.
      </p>

      <p>And 8.28× is a floor, not a result.</p>

      <p>
        Twenty-seven is small enough to do by hand and large enough to mean
        something, which is the only window in which this method is available at
        all. Each reservation was asked the same three questions the CRM asks of
        every lead: where did this person discover the hotel, which channel
        actually delivered them, and how did they talk to us. Where two sources
        disagreed, the more conservative one won. Where nothing corroborated a
        channel, the revenue went to the unattributed pile rather than to me.
      </p>

      <p>
        That pile is why the number is a floor. Another R$46,000 booked in the
        same window has no recorded origin at all — not attributed elsewhere,
        unrecorded. Every one of those is a coin I refused to call in my own
        favour. A number you round toward yourself is not a number; it is a
        pitch.
      </p>

      <h2>The lead that became someone else&rsquo;s reservation</h2>

      <p>
        One guest arrived through a Meta ad, talked to the hotel on WhatsApp,
        and then booked through the OTA — because that is where his loyalty
        points live. The booking platform records the reservation as its own.
        The dashboard agrees. Nobody is lying; the last click genuinely did
        happen there. But the ad paid to create that guest and the OTA charged
        commission to receive him, and if you optimize on the dashboard&rsquo;s
        version of that story you will switch off the campaign that produced him
        and then spend a quiet season wondering why.
      </p>

      <p>
        That case also settles an argument I have with clients constantly.
        Organic and paid do different jobs and should never be measured as
        though they did the same one. Paid sells: it is segmented, it is urgent,
        and it disappears. Organic is what someone checks{" "}
        <em>after</em> they have already seen you on the OTA, to decide whether
        you are real. Judge the profile by the sale it did not appear to make
        and you will cut the exact asset that closed it.
      </p>

      <h2>The sale that came from a chat window</h2>

      <p>
        One reservation, R$2,721, came from a guest who found the hotel through
        ChatGPT. We know because she told us. There is no UTM for that. There is
        no dashboard row for it and there will not be one soon. The surfaces
        that increasingly decide whether a business exists are the ones that
        send no referrer at all — which is both an argument for asking people
        where they found you, and an argument for being the kind of business a
        model can find in the first place.
      </p>

      <p>
        The report took days that a screenshot would have taken minutes. That is
        the trade, and I would make it again, because when you have the data it
        stops being a game of tricks. You know what is working, and the
        conversation ends.
      </p>

      <p className={styles.pull}>
        I do not report likes. I report what came in, what it cost to bring in,
        and what I could not prove.
      </p>

      <p>The third column is what makes the first two worth anything.</p>

      <p className={styles.onward}>
        The full report — method, the eight sources, the per-channel breakdown,
        client anonymized —{" "}
        <Link href="/works/attribution-report">is in Works</Link>. The system
        that produced the habit is older:{" "}
        <Link href="/log/zero-to-forty">
          zero to forty clients in six months
        </Link>
        .
      </p>
    </PostShell>
  );
}
