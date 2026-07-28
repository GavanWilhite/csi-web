import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site";

/**
 * Everything here is public and meant to be found — by search engines and by
 * assistants alike. A wildcard Allow already permits every crawler, but the
 * named groups are documentation: they record a deliberate decision to let AI
 * crawlers index this site, so nobody later reads the silence as an oversight
 * and "fixes" it. Removing a name here is how you would opt out of that one.
 *
 * The old Wix site published its own robots.txt; without this the domain
 * would serve none at all after the cutover.
 *
 * Nothing is disallowed. There is no admin area, no search-result pages, and
 * no user content — the usual reasons to exclude paths do not apply.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI, training
  "OAI-SearchBot", // OpenAI, ChatGPT search
  "ChatGPT-User", // OpenAI, user-initiated fetch
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended",
  "meta-externalagent",
  "Bytespider",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  const base = resolveSiteUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: new URL("/sitemap.xml", base).toString(),
    host: base,
  };
}
