import type { NextConfig } from "next";

const basePath = (process.env.PAGES_BASE_PATH ?? "/bforreal").replace(
  /\/+$/,
  "",
);
const siteUrl =
  (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmo18.github.io/bforreal/"
  ).replace(/\/+$/, "") + "/";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  poweredByHeader: false,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
