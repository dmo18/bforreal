import { APP_VERSION } from "@/data/version";
import { BASE_PATH, SITE_URL } from "@/lib/site-paths";

export interface NavigationItem {
  label: string;
  href: `#${string}`;
}

export interface Foundation {
  eyebrow: string;
  title: string;
  description: string;
}

export interface Level {
  number: string;
  title: string;
  description: string;
  practice: string;
}

export interface ResourceAction {
  label: string;
  href: string;
  icon: "podcast" | "globe" | "message" | "phone" | "story" | "compass";
  external?: boolean;
  sponsored?: boolean;
}

export interface FeaturedResource {
  id: string;
  title: string;
  kicker: string;
  accent: "gold" | "mint";
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  paragraphs: string[];
  facts: Array<{ title: string; description: string }>;
  actions: ResourceAction[];
  book?: {
    title: string;
    description: string;
    href: string;
    image: string;
  };
}

export interface InspirationGraphic {
  id: string;
  title: string;
  description: string;
  file: string;
  width: number;
  height: number;
}

export const siteConfig = {
  title: "Bitachon For Real",
  description:
    "Practical resources for learning, listening, growing, and living with Bitachon.",
  siteUrl: SITE_URL,
  basePath: BASE_PATH,
  futureDomain: "bitachonforreal.com",
  repository: "https://github.com/dmo18/bforreal",
  version: APP_VERSION,
};

export const navigation: NavigationItem[] = [
  { label: "Resources", href: "#resources" },
  { label: "Understand", href: "#understand" },
  { label: "Seven Levels", href: "#levels" },
  { label: "Inspiration", href: "#inspiration" },
];

export const foundations: Foundation[] = [
  {
    eyebrow: "01 · Calm",
    title: "Inner calm",
    description:
      "Bitachon means inner calm because I rely on Hashem, not on chance, people, money, or my own control.",
  },
  {
    eyebrow: "02 · Action",
    title: "Trust and effort",
    description:
      "I make normal hishtadlut while knowing the result comes only from Hashem.",
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

const book = {
  title: "Shaar HaBitachon of Chovos Halevavos",
  description: "Jaffa Family Edition, with English translation and commentary.",
  href: "https://www.amazon.com/Shaar-HaBitachon-Chovos-Halevavos-Family/dp/B09WTZPCR2",
  image: "/shaar-habitachon-jaffa.svg",
};

export const featuredResources: FeaturedResource[] = [
  {
    id: "podcast",
    title: "Bitachon For Real",
    kicker: "The podcast that inspired this site",
    accent: "gold",
    image: {
      src: "/podcast-cover.svg",
      alt: "Original Bitachon For Real podcast cover artwork",
      width: 1000,
      height: 1000,
    },
    paragraphs: [
      "Reb Yirmi Ginsberg leads chaburos at Congregation Aish Kodesh and teaches Bitachon as something to practice, not only study.",
      "The weekly series follows Shaar HaBitachon in the Jaffa Family Edition, bringing classical sources and Chasidic insight into the choices, emotions, and uncertainties of everyday life.",
    ],
    facts: [
      {
        title: "A weekly rhythm",
        description: "Focused shiurim designed for steady learning and review.",
      },
      {
        title: "Practical depth",
        description:
          "Hishtadlut, tefillah, relationships, pressure, and releasing control.",
      },
      {
        title: "A growing archive",
        description: "A substantial collection of episodes built since 2021.",
      },
    ],
    actions: [
      {
        label: "Apple Podcasts",
        href: "https://podcasts.apple.com/us/podcast/bitachon-for-real/id1602319903",
        icon: "podcast",
        external: true,
      },
      {
        label: "Spotify",
        href: "https://open.spotify.com/show/1O3Uv5QeRHpFZZVSF5IPhg",
        icon: "podcast",
        external: true,
      },
      {
        label: "Gate of Trust",
        href: "https://www.gateoftrust.org/yirmiginsberg",
        icon: "globe",
        external: true,
      },
    ],
    book,
  },
  {
    id: "daily-bitachon",
    title: "Daily Bitachon",
    kicker: "A daily voice note for real life",
    accent: "mint",
    image: {
      src: "/michael-safdie-madison.svg",
      alt: "Mr. Michael Safdie outside Madison Time",
      width: 640,
      height: 426,
      position: "left center",
    },
    paragraphs: [
      "Mr. Michael Safdie is a New York businessman and the president of Madison Time, a specialist in important collectible watches.",
      "He approaches Bitachon as a serious learner and working businessman. His short Daily Bitachon recordings turn Shaar HaBitachon into direct, energetic, practical encouragement for decisions, pressure, uncertainty, and ordinary life.",
    ],
    facts: [
      {
        title: "Delivered on WhatsApp",
        description:
          "A short daily recording that arrives where people already listen.",
      },
      {
        title: "About 15 minutes",
        description:
          "Focused enough for the day and substantial enough to shift its direction.",
      },
      {
        title: "Listen by phone",
        description:
          "The official site also offers a United States call-in line.",
      },
    ],
    actions: [
      {
        label: "WhatsApp",
        href: "https://dailybitachon.com/whatsapp/",
        icon: "message",
        external: true,
      },
      {
        label: "Website",
        href: "https://dailybitachon.com/",
        icon: "globe",
        external: true,
      },
      {
        label: "Call",
        href: "tel:+17189571805",
        icon: "phone",
      },
    ],
    book,
  },
  {
    id: "living-yosh",
    title: "LivingYosh",
    kicker: "Faith · Resilience · Hope",
    accent: "gold",
    image: {
      src: "/living-yosh.svg",
      alt: "Yosh Markell with his daughter",
      width: 240,
      height: 189,
      position: "left center",
    },
    paragraphs: [
      "Yosh Markell founded LivingYosh after a journey through false accusation, jail, house arrest, financial pressure, and rebuilding through faith, family, and perseverance.",
      "LivingYosh shares conversations about Torah, faith, personal growth, resilience, current events, and overcoming life's challenges. Its mission is to help people find strength in their own journeys.",
    ],
    facts: [
      {
        title: "Real stories",
        description:
          "Interviews and personal journeys shaped by challenge and growth.",
      },
      {
        title: "Torah and faith",
        description:
          "Practical encouragement grounded in emunah, hope, and purpose.",
      },
      {
        title: "Community",
        description:
          "A place to listen, learn, share a story, and strengthen others.",
      },
    ],
    actions: [
      {
        label: "Website",
        href: "https://livingyosh.com/",
        icon: "globe",
        external: true,
      },
      {
        label: "Yosh's Story",
        href: "https://livingyosh.com/MyJourney",
        icon: "story",
        external: true,
      },
      {
        label: "Explore",
        href: "https://livingyosh.com/Browse",
        icon: "compass",
        external: true,
      },
    ],
  },
];

export const inspirationGraphics: InspirationGraphic[] = [
  {
    id: "bitachon-operating-system",
    title: "Bitachon Operating System",
    description:
      "A practical system for meeting uncertainty with trust and responsible effort.",
    file: "bitachon-operating-system.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-dashboard",
    title: "Bitachon Dashboard",
    description:
      "A visual check-in for calm, effort, perspective, and daily practice.",
    file: "bitachon-dashboard.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "train-bitachon",
    title: "Train Bitachon",
    description:
      "A reminder that trust grows through repetition, not instant certainty.",
    file: "train-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-route",
    title: "The Bitachon Route",
    description:
      "A route from pressure and control toward effort, release, and calm.",
    file: "bitachon-route.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "architecture-of-bitachon",
    title: "The Architecture of Bitachon",
    description: "A structured view of the ideas that support a life of trust.",
    file: "architecture-of-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-compass",
    title: "Bitachon Compass",
    description: "A visual compass for choosing the next grounded response.",
    file: "bitachon-compass.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "bitachon-field-guide",
    title: "Bitachon Field Guide",
    description:
      "A compact field guide for applying Bitachon in ordinary moments.",
    file: "bitachon-field-guide.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "build-bitachon",
    title: "Build Bitachon",
    description: "A construction plan for patient, repeatable growth in trust.",
    file: "build-bitachon.svg",
    width: 1122,
    height: 1402,
  },
  {
    id: "hierarchy-of-bitachon",
    title: "Hierarchy of Bitachon",
    description:
      "A visual hierarchy connecting belief, effort, release, and calm.",
    file: "hierarchy-of-bitachon.svg",
    width: 1122,
    height: 1402,
  },
];
