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
  title