import type { MetadataRoute } from "next";
import { resolveSiteUrl } from "@/lib/site";

/**
 * Everything is public and meant to be indexed, so the only job here is
 * pointing crawlers at the sitemap. The old Wix site published its own
 * robots.txt; without this, the domain would serve none after the cutover.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", resolveSiteUrl()).toString(),
  };
}
