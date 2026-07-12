import type { NextConfig } from "next";

const isNodeDeployment = process.env.DEPLOY_TARGET === "node";
const basePath = isNodeDeployment
  ? ""
  : (process.env.PAGES_BASE_PATH ?? "/bforreal");
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (isNodeDeployment
    ? "https://www.bitachonforreal.com/"
    : "https://dmo18.github.io/bforreal/");

const nextConfig: NextConfig = {
  output: isNodeDeployment ? undefined : "export",
  trailingSlash: !isNodeDeployment,
  basePath: basePath || undefined,
  images: {
    unoptimized: !isNodeDeployment,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
};

export default nextConfig;
