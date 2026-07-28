/**
 * Base for absolute URLs. OG images must be absolute — Slack, LinkedIn and
 * iMessage fetch them from their own servers — and sitemap.xml requires
 * fully-qualified locations. This is baked in at build time, so getting it
 * wrong means the 19 speaker pages that carry a portrait ship previews with
 * no image, and search engines get a sitemap full of localhost.
 *
 * Resolution order:
 *   1. SITE_URL — explicit override, e.g. a custom domain.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — injected by Vercel, documented for
 *      precisely this purpose. It is the shortest production custom domain
 *      (falling back to the .vercel.app one) and is set even on preview
 *      deployments, so previews still point their OG images at production
 *      rather than at a URL that dies with the deployment. Bare hostname,
 *      hence the https:// prefix.
 *   3. localhost — local builds only, keeps Next from warning.
 *
 * Deliberately NOT VERCEL_URL: that is per-deployment, so every preview would
 * bake a different, short-lived host into its metadata, and Vercel documents
 * it as incompatible with Standard Deployment Protection.
 *
 * Requires "Enable access to System Environment Variables" in the Vercel
 * project settings; without it, step 2 is skipped and SITE_URL is needed.
 */
export function resolveSiteUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
}
