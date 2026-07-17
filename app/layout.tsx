import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/data/site";
import { absoluteAssetUrl, assetPath } from "@/lib/site-paths";

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070b12",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  alternates: { canonical: siteConfig.siteUrl },
  icons: { icon: assetPath("/favicon.svg") },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteAssetUrl("/og.jpg"),
        width: 1200,
        height: 630,
        alt: "Bitachon For Real over a quiet mountain path at sunrise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteAssetUrl("/og.jpg")],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
