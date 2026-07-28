import { llmsFull } from "@/lib/llms";
import { resolveSiteUrl } from "@/lib/site";

/** /llms-full.txt — the whole site inline. See lib/llms.ts. */
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFull(resolveSiteUrl()), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
