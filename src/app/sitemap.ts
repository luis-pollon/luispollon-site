import type { MetadataRoute } from "next";
import { POSTS } from "@/app/log/posts";
import { films } from "@/data/films";
import { SITE_URL } from "@/lib/schema";

/**
 * The sitemap is small on purpose: the five routes in the index rail, plus one
 * URL per unit of proof. A strong page that is not in the sitemap does not get
 * cited — which is the failure mode this file exists to prevent — but the
 * inverse is also true: padding it with routes that hold nothing dilutes
 * every entry in it. Every case below carries facts that exist nowhere else on
 * the site, which is the test for earning a line here.
 *
 * `lastModified` is the build time. On a static site the deploy IS the edit,
 * so build time is the honest answer and it updates itself. Hand-written
 * dates rot; a hand-written date in the past on a page that changed is worse
 * than no date at all.
 */
const routes = [
  { path: "", priority: 1.0, changeFrequency: "monthly" },
  { path: "/works", priority: 0.9, changeFrequency: "monthly" },
  { path: "/log", priority: 0.8, changeFrequency: "weekly" },
  { path: "/films", priority: 0.7, changeFrequency: "yearly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },

  // One URL per unit of proof. Ordered as they appear in /works.
  { path: "/works/unsunk-studio", priority: 0.8, changeFrequency: "monthly" },
  {
    path: "/works/attribution-report",
    priority: 0.8,
    changeFrequency: "yearly",
  },
  { path: "/works/client-sites", priority: 0.7, changeFrequency: "monthly" },
  { path: "/works/knossos-codex", priority: 0.6, changeFrequency: "monthly" },
  {
    path: "/works/unsunk-productions",
    priority: 0.7,
    changeFrequency: "yearly",
  },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),

    // One URL per Log entry, read from the register so a new post is in the
    // sitemap the moment it exists rather than whenever someone remembers.
    //
    // These are the one exception to the build-time rule above, and for the
    // same reason the rule exists: a dated post that has not been touched
    // since publication did not change today, and telling a crawler otherwise
    // is exactly the kind of unearned freshness signal that stops meaning
    // anything once everyone sends it.
    ...POSTS.map((post) => ({
      url: `${SITE_URL}/log/${post.slug}`,
      lastModified: new Date(post.dateISO),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),

    // One URL per film in the archive, read from the register for the same
    // reason. A finished film is finished: it gets its year, not today's date,
    // and `yearly` because the only thing that will ever change on one of
    // these pages is a typo.
    ...films.map((film) => ({
      url: `${SITE_URL}/films/${film.slug}`,
      lastModified: new Date(`${film.year}-12-31`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
