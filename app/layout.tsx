import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import "./footer-overrides.css";
import { DailyBitachonFeature } from "./daily-bitachon-feature";
import { DailyBitachonPolish } from "./daily-bitachon-polish";
import { FeatureButtonPolish } from "./feature-button-polish";
import { GalleryEnhancements } from "./gallery-enhancements";
import { HideLegacyResourceGrid } from "./hide-legacy-resource-grid";
import { LivingYoshFeature } from "./living-yosh-feature";
import { LivingYoshImageSource } from "./living-yosh-image-source";

import { PodcastFeature } from "./podcast-feature";
import { ResourceFeatureStabilizer } from "./resource-feature-stabilizer";
import { VersionSync } from "./version-sync";
import { siteConfig } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.title,
  icons: {
    icon: [
      { url: `${siteConfig.basePath}/favicon.ico` },
      {
        url: `${siteConfig.basePath}/icon.png`,
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: `${siteConfig.basePath}/apple-icon.png`,
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.siteUrl}og.jpg`,
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
    images: [`${siteConfig.siteUrl}og.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${cormorant.variable}`}>
        {children}
        <PodcastFeature />
        <DailyBitachonFeature />
        <LivingYoshFeature />
        <LivingYoshImageSource />
        <DailyBitachonPolish />
        <FeatureButtonPolish />
        <ResourceFeatureStabilizer />
        <HideLegacyResourceGrid />

        <GalleryEnhancements />
        <VersionSync />
      </body>
    </html>
  );
}
