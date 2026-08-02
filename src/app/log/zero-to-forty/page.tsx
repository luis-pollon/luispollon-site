import type { Metadata } from "next";
import Link from "next/link";
import PostShell from "../PostShell";
import { getPost } from "../posts";
import styles from "../log.module.css";

/**
 * The rewrite of the original 2025 post, in English, on the canonical domain.
 *
 * Two rules govern the copy:
 *
 * 1. The first paragraph is the whole answer. A model summarizing this page,
 *    or a person who reads one line and leaves, has to come away with the
 *    finding rather than a hook. Everything after it is evidence.
 *
 * 2. No client is named anywhere. The compounding chain at the end is told
 *    entirely in roles, because a name plus a number is a thing a client did
 *    not agree to publish.
 */

const post = getPost("zero-to-forty");

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
        I went from zero to forty clients in six months by running four
        acquisition channels at the same time, logging every lead in a Notion
        database, and never saying a price before the strategy was agreed.
      </p>

      <p>
        That is the whole answer. What follows is the part that actually
        transfers: which channel did what, what the numbers looked like while
        they were still ugly, and the one place the system quietly lies to you.
      </p>

      <h2>The four channels</h2>

      <p>
        There are four ways a client reaches you — content, outreach, ads, and
        your network — and every one of them eventually worked. None of them
        worked on the schedule I wanted.
      </p>

      <p>
        Outreach is the one nobody wants to hear about, because the arithmetic
        is public and brutal: roughly fifty cold messages produced about five
        replies, and five replies produced one client. There is no version of
        that ratio that feels good on a Tuesday afternoon. But it is the only
        channel available on day one, before anyone has heard your name, and it
        is the reason there was a month two.
      </p>

      <p>
        Ads are outreach on steroids. Instead of one person at a time, many at
        once — and you pay for the privilege of not having to be liked first.
        My first serious test was about US$200 across three weeks and produced
        around eighty leads. A separate experiment cost roughly US$20, pulled
        about a hundred handles out of an already-engaged audience, and turned
        into a few clients. Neither of those is a case study. Both are the kind
        of number I want on the table before someone tells me a channel does
        not work.
      </p>

      <p>
        Content is the slowest and the only one that compounds. Month-one
        content is still producing in month six. I have watched a client leave,
        hire a different agency, and watch the new agency open by running the
        videos we made.
      </p>

      <p>
        Network and referrals close fastest and are the worst thing to depend
        on. Ten one month, one the next. A channel you cannot turn up is not a
        channel; it is weather.
      </p>

      <h2>The CRM was a Notion database, and that was enough</h2>

      <p>
        Every lead got three tags the moment it arrived: where they discovered
        me, which channel actually delivered them, and how we were talking —
        DM, WhatsApp, email. Then one more field, the one most people skip: why
        we lost. Price, timing, went to a competitor, unqualified, ghosted.
      </p>

      <p>
        No integrations. No attribution vendor. If you are not ready to build
        even that, ask one question when someone shows up:{" "}
        <em>where did you find me?</em> That single question solves eighty per
        cent of attribution at the start, and you can start asking it this
        afternoon.
      </p>

      <div className={styles.ledger}>
        <table className="mono">
          <caption className="mono">one month of outreach, as logged</caption>
          <tbody>
            <tr>
              <th scope="row">leads identified</th>
              <td>540</td>
            </tr>
            <tr>
              <th scope="row">contacted</th>
              <td>322</td>
            </tr>
            <tr>
              <th scope="row">responded</th>
              <td>70</td>
            </tr>
            <tr>
              <th scope="row">meetings booked</th>
              <td>14</td>
            </tr>
            <tr>
              <th scope="row">showed</th>
              <td>13</td>
            </tr>
            <tr>
              <th scope="row">offers made</th>
              <td>8</td>
            </tr>
            <tr>
              <th scope="row">closed</th>
              <td>5</td>
            </tr>
            <tr>
              <th scope="row">lost</th>
              <td>24</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        I keep that table where I can see it, because it is the only honest
        answer to <em>is outreach working</em>, and because its shape tells you
        where to push. Eight offers to five closed is not a closing problem.
        Three hundred and twenty-two contacted to seventy responded is where
        the work is.
      </p>

      <h2>The sale is a process, not a call</h2>

      <p>
        <span className={styles.term}>Discovery</span> →{" "}
        <span className={styles.term}>Alignment</span> →{" "}
        <span className={styles.term}>Offer</span> →{" "}
        <span className={styles.term}>Negotiation</span>.
      </p>

      <p>
        <span className={styles.term}>Discovery.</span> Ask the most questions
        and say the least. The opener I still use is{" "}
        <em>
          what have you done with marketing that hasn&rsquo;t worked? Tell me
          the story.
        </em>{" "}
        Underneath it I am answering exactly one question for myself: can I
        actually help this person.
      </p>

      <p>
        <span className={styles.term}>Alignment.</span> Present the strategy and
        ask how it sounds. No price on the screen and none in the room. If they
        agree the strategy is right, the only thing left to settle is price —
        and price now arrives as the last obstacle instead of the first filter.
      </p>

      <p>
        <span className={styles.term}>Offer.</span> Three packages. It anchors
        the value higher, it gives a smaller budget a door instead of a wall,
        and it says without saying it that other people pay more than this.
      </p>

      <p>
        <span className={styles.term}>Negotiation.</span> Negotiate bonuses
        before you negotiate price.
      </p>

      <p className={styles.pull}>
        Never lead with price. Lead with price and you have agreed to compete on
        price, and there is no winning that race — someone will always be worse
        and cheaper.
      </p>

      <p>
        And you are not going to close a client on one call. If you do, it is
        the exception, and exceptions are a terrible thing to build a process
        on.
      </p>

      <p>
        Two small mechanics carry more weight than they should. Confirm a
        meeting by stating it — <em>I&rsquo;m ready for our call at 4:30</em>,
        never <em>are we still on for 4:30?</em> The default is that the call is
        happening. And never end a call without booking the next one.
      </p>

      <h2>Where the system lies to you</h2>

      <p>
        One sale in that stretch is logged as a referral. Here is what it
        actually was. A batch of cold messages to hotels. One reply out of the
        batch, from an owner who also ran a travel app. An invitation to film on
        an expedition. An introduction to her business partners, who ran a
        hotel consultancy. A consultancy that started passing us names. One of
        those names, an owner who wanted to trade content instead of paying. A
        shoot we did for free. Months of nothing. An invitation back. A bad
        experience with the agency she had hired in the meantime. And then, at
        the end of a long conversation, a question:{" "}
        <em>do you know anyone who could teach me this?</em>
      </p>

      <p>
        Thirteen steps. In the CRM it is a referral. It started as a cold
        message that everyone ignored except one person.
      </p>

      <p>
        That is the failure mode worth naming, because it is structural rather
        than careless: surface-level channel metrics systematically undercount
        outbound, since outbound rarely closes the transaction it started. Which
        means the channel with the ugliest arithmetic is also the first one you
        will be tempted to kill.
      </p>

      <p>
        Forty in six months was not a growth hack. It was four channels running
        at once, a database honest enough to record where things came from, and
        a refusal to name a number before the strategy was agreed. The database
        is the part I would build first if I had to start again — three years
        later I was still paying to learn the same lesson, only with a much
        bigger denominator.
      </p>

      <p className={styles.onward}>
        The bigger denominator:{" "}
        <Link href="/log/the-attribution-report">
          the attribution report that proved the dashboard wrong
        </Link>
        .
      </p>
    </PostShell>
  );
}
