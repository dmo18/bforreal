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
import { OpeningDensityPolish } from "./opening-density-polish";
import { OpeningMottoReference } from "./opening-motto-reference";
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
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  openGraph: {
    type: "website",