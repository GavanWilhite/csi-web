import type { Metadata } from "next";
import { TextPage } from "@/components/TextPage";
import { disclaimer } from "@/lib/legal";

/**
 * Replaces the old site's /disclaimer, at the same path so links already
 * shared keep resolving. Text is verbatim — see lib/legal.ts.
 */
export const metadata: Metadata = {
  title: "Disclaimer — Cognitive Security Institute",
  description: "Views expressed on this site are those of their authors.",
};

export default function DisclaimerPage() {
  return (
    /* Body is the disclaimer alone. The 501(c)(3) registration line sat in
       the source page's footer, not its body, and ours already carries it —
       printing it twice on one screen is not fidelity. */
    <TextPage title={disclaimer.title}>
      <p>{disclaimer.body}</p>
    </TextPage>
  );
}
