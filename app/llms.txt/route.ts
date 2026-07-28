import { llmsIndex } from "@/lib/llms";
import { resolveSiteUrl } from "@/lib/site";

/**
 * /llms.txt — the index, per llmstxt.org.
 *
 * force-static keeps this prerendered at build time like every other route;
 * without it Next treats a Route Handler as dynamic and the site stops being
 * fully static.
 */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsIndex(resolveSiteUrl()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
