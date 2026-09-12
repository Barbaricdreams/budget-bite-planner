import type { NextConfig } from "next";

/** Set GITHUB_PAGES=true in the Pages workflow so local `next dev` stays at /. */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/budget-bite-planner" : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
};

export default nextConfig;
