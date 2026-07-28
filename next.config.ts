import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    // Without this, Turbopack walks up and picks a stray lockfile in the home
    // directory as the workspace root.
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
