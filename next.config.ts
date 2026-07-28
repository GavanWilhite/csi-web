import path from "node:path";
import type { NextConfig } from "next";
import { redirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Without this, Turbopack walks up and picks a stray lockfile in the home
    // directory as the workspace root.
    root: path.resolve(__dirname),
  },
  // Old Wix URLs, kept alive across the cutover. See lib/redirects.ts.
  redirects: async () => redirects,
};

export default nextConfig;
