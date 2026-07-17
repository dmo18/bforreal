const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal";
const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmo18.github.io/bforreal/";

export const BASE_PATH = configuredBasePath.replace(/\/+$/, "");
export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "") + "/";

export function assetPath(path: string): string {
  const normalizedPath = path.replace(/^\/+/, "");
  return `${BASE_PATH}/${normalizedPath}`;
}

export function absoluteAssetUrl(path: string): string {
  const origin = new URL(SITE_URL).origin;
  return new URL(assetPath(path), origin).toString();
}
