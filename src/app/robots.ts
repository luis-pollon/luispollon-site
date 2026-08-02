import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";

/**
 * Everything is allowed, and the AI crawlers are named explicitly.
 *
 * `User-agent: *` already permits all of them — the named blocks below are
 * redundant to a correct parser and that is the point. This site's whole
 * strategy is to be the resolvable source for one name, and a portfolio
 * template's default AI blocklist is the most common way that strategy gets
 * quietly killed. Writing the allow out in full makes the intent unmistakable
 * to the next person who edits this file, and survives a careless merge that
 * a wildcard would not.
 *
 * The named agents, and why each one is here:
 *   GPTBot            — ChatGPT's index crawler (OpenAI)
 *   OAI-SearchBot     — ChatGPT Search's crawler (separate from GPTBot)
 *   ChatGPT-User      — live fetch when a user asks ChatGPT to open a link
 *   ClaudeBot         — Anthropic's index crawler
 *   Claude-User       — live fetch on behalf of a Claude user
 *   Claude-SearchBot  — Anthropic's search crawler
 *   PerplexityBot     — Perplexity's index crawler
 *   Perplexity-User   — live fetch on behalf of a Perplexity user
 *   Google-Extended   — Gemini / AI Overviews training and grounding control
 *   Applebot-Extended — Apple Intelligence control
 *   Bingbot           — Bing, which also feeds Copilot
 *   Amazonbot, Bytespider, cohere-ai, Meta-ExternalAgent, DuckAssistBot,
 *   Diffbot, Timpibot, YouBot — the remaining AI/answer crawlers with
 *   published, stable user-agent tokens.
 *
 * NOTE: `Google-Extended` and `Applebot-Extended` are permission tokens, not
 * crawlers. They are never seen in a log; they only ever grant or deny AI use
 * of content that the ordinary crawler already fetched. Listing them with
 * `allow` is the grant.
 */
const AI_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "Bytespider",
  "cohere-ai",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "Diffbot",
  "Timpibot",
  "YouBot",
];

const SEARCH_AGENTS = ["Googlebot", "Bingbot", "DuckDuckBot", "Applebot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: SEARCH_AGENTS, allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
