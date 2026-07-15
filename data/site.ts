export type ResourceCategory = "website" | "whatsapp" | "podcast" | "book";

export type ResourceIcon = "globe" | "message-circle" | "podcast" | "book-open";

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  platform: string;
  href: string;
  icon: ResourceIcon;
  affiliate?: boolean;
}

export interface Level {
  number: string;
  title: string;
  description: string;
  practice: string;
}

export interface InspirationGraphic {
  id: string;
  title: string;
  file: string;
  width: number;
  height: number;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dmo18.github.io/bforreal/";

export const siteConfig = {
  title: "Bitachon For Real",
  description:
    "Practical resources for learning, listening, growing, and living with Bitachon.",
  siteUrl,
  basePath,
  futureDomain: "bitachonforreal.com",
  repository: "https://github.com/dmo18/bforreal",
  whatsapp: "https://chat.whatsapp.com/CkrFDf12DwdHEoRhFxoyB7",
  version: "1.0.1",
};

export const foundations = [
  {
    eyebrow: "01 · Calm",
    title: "Inner calm",
    description:
      "Bitachon means inner calm because I rely on Hashem—not on chance, people, money, or my own control.",
  },
  {
    eyebrow: "02 · Action",
    title: "Trust and effort",
    description:
      "I make normal hishtadlut, while knowing the result comes only from Hashem.",
  },
  {
    eyebrow: "03 · Practice",
    title: "A daily practice",
    description:
      "Bitachon grows through repetition and practice. Every challenge is another chance to practice trust.",
  },
];

export const levels: Level[] = [
  {
    number: "01",
    title: "What Is Bitachon?",
    description:
      "Bitachon means inner calm because I rely on Hashem, not on chance, people, money, or my own control.",
    practice: "Hashem is carrying this with me.",
  },
  {
    number: "02",
    title: "Why Hashem Is Trustworthy",
    description:
      "Real trust belongs only to One who knows me, loves me, has power, provides constantly, and wants my true good.",
    practice: "No one is more reliable than Hashem.",
  },
  {
    number: "03",
    title: "Trust Plus Effort",
    description:
      "I make normal hishtadlut, but I know the result comes only from Hashem.",
    practice: "I do my part, and Hashem decides the outcome.",
  },
  {
    number: "04",
    title: "Trust in Every Area",
    description:
      "Bitachon applies to health, livelihood, relationships, danger, mitzvot, reward, and the World to Come.",
    practice: "There is no area outside Hashem's care.",
  },
  {
    number: "05",
    title: "The Life of a Baal Bitachon",
    description:
      "Bitachon naturally produces calm, gratitude, patience, and presence.",
    practice: "What is meant for me cannot be taken from me.",
  },
  {
    number: "06",
    title: "No Collateral Needed",
    description: "I do not need guarantees before trusting Hashem.",
    practice: "Today's needs are in Hashem's hands today.",
  },
  {
    number: "07",
    title: "Growing in Bitachon",
    description: "Bitachon grows through repetition and practice.",
    practice: "Every challenge is another chance to practice trust.",
  },
];

export const resources: Resource[] = [
  {
    id: "gate-of-trust",
    title: "Bitachon For Real",
    description:
      "A Bitachon For Real overview with recent episodes and podcast-platform links.",
    category: "website",
    platform: "Gate of Trust",
    href: "https://www.gateoftrust.org/yirmiginsberg",
    icon: "globe",
  },
  {
    id: "daily-bitachon-whatsapp",
    title: "Daily Bitachon",
    description: "Open the public WhatsApp group invitation.",
    category: "whatsapp",
    platform: "WhatsApp",
    href: "https://chat.whatsapp.com/CkrFDf12DwdHEoRhFxoyB7",
    icon: "message-circle",
  },
  {
    id: "apple-podcasts",
    title: "Bitachon For Real",
    description:
      "A weekly Judaism podcast by Reb Yirmi about learning and practicing trust in Hashem.",
    category: "podcast",
    platform: "Apple Podcasts",
    href: "https://podcasts.apple.com/us/podcast/bitachon-for-real/id1602319903",
    icon: "podcast",
  },
  {
    id: "spotify",
    title: "Bitachon For Real",
    description: "Listen to Bitachon For Real on Spotify.",
    category: "podcast",
    platform: "Spotify",
    href: "https://open.spotify.com/show/1O3Uv5eRHpFZZVSF5IPhg",
    icon: "podcast",
  },
  {
    id: "shaar-habitachon-book",
    title: "Shaar HaBitachon of Chovos Halevavos",
    description: "View the Jaffa Family Edition on Amazon.",
    category: "book",
    platform: "Amazon",
    href: "https://www.amazon.com/Shaar-HaBitachon-Chovos-Halevavos-Family/dp/B09WTZPCR2",
    icon: "book-open",
    affiliate: true,
  },
];

export const inspirationGraphics: InspirationGraphic[] = [
  {
    id: "7-levels-mountain",
    title: "7 Levels of Bitachon",
    file: "7-levels-mountain.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-operating-system",
    title: "Bitachon Operating System",
    file: "bitachon-operating-system.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-dashboard",
    title: "Bitachon Dashboard",
    file: "bitachon-dashboard.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "train-bitachon",
    title: "Train Bitachon",
    file: "train-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-route",
    title: "The Bitachon Route",
    file: "bitachon-route.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "architecture-of-bitachon",
    title: "The Architecture of Bitachon",
    file: "architecture-of-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-compass",
    title: "Bitachon Compass",
    file: "bitachon-compass.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-field-guide",
    title: "Bitachon Field Guide",
    file: "bitachon-field-guide.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "build-bitachon",
    title: "Build Bitachon",
    file: "build-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "hierarchy-of-bitachon",
    title: "Hierarchy of Bitachon",
    file: "hierarchy-of-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "7-levels-2026",
    title: "7 Levels of Bitachon 2026",
    file: "7-levels-2026.svg",
    width: 1024,
    height: 1536,
  },
  {
    id: "bitachon-map",
    title: "Bitachon Map",
    file: "bitachon-map.svg",
    width: 1122,
    height: 1402,
  },
];
