export interface GraphicUrlOptions {
  basePath: string;
  siteUrl: string;
  file: string;
}

export function buildGraphicUrls(options: GraphicUrlOptions): {
  assetPath: string;
  canonicalUrl: string;
};
export function mimeTypeForFile(file: string, fallback?: string): string;
export function isAbortError(error: unknown): boolean;
