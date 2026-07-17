export function buildGraphicUrls({ basePath, siteUrl, file }) {
  const cleanBasePath = basePath.replace(/\/+$/, "");
  const cleanFile = file.replace(/^\/+/, "");
  const assetPath = `${cleanBasePath}/inspiration/${cleanFile}`;
  const canonicalUrl = new URL(assetPath, new URL(siteUrl).origin).toString();
  return { assetPath, canonicalUrl };
}

export function mimeTypeForFile(file, fallback = "") {
  if (fallback) return fallback;
  const extension = file.split(".").pop()?.toLowerCase();
  if (extension === "svg") return "image/svg+xml";
  if (extension === "webp") return "image/webp";
  if (extension === "png") return "image/png";
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  return "application/octet-stream";
}

export function isAbortError(error) {
  return error instanceof DOMException && error.name === "AbortError";
}
