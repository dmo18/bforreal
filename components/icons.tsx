import type { SVGProps } from "react";

export type IconName = "arrow-down" | "book" | "close" | "compass" | "download" | "external" | "globe" | "left" | "message" | "phone" | "podcast" | "right" | "share" | "story" | "zoom";
interface IconProps extends SVGProps<SVGSVGElement> { name: IconName; size?: number; }
export function Icon({ name, size = 18, ...props }: IconProps) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, focusable: false, ...props };
  switch (name) {
    case "arrow-down": return <svg {...common}><path d="M12 5v14M6.5 13.5 12 19l5.5-5.5" /></svg>;
    case "book": return <svg {...common}><path d="M4.5 5.4c2.8-.8 5.3-.4 7.5 1.2v12c-2.2-1.6-4.7-2-7.5-1.2Zm15 0c-2.8-.8-5.3-.4-7.5 1.2v12c2.2-1.6 4.7-2 7.5-1.2Z" /></svg>;
    case "close": return <svg {...common}><path d="m6 6 12 12M18 6 6 18" /></svg>;
    case "compass": return <svg {...common}><circle cx="12" cy="12" r="8.5" /><path d="m14.8 9.2-1.7 3.9-3.9 1.7 1.7-3.9Z" /></svg>;
    case "download": return <svg {...common}><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" /></svg>;
    case "external": return <svg {...common}><path d="M14 5h5v5M19 5l-8 8" /><path d="M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" /></svg>;
    case "globe": return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M3.5 12h17M12 3c2.5 2.4 3.8 5.4 3.8 9S14.5 18.6 12 21c-2.5-2.4-3.8-5.4-3.8-9S9.5 5.4 12 3Z" /></svg>;
    case "left": return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>;
    case "message": return <svg {...common}><path d="M20 11.7a8 8 0 0 1-11.8 7L4 19.8l1.1-4A8 8 0 1 1 20 11.7Z" /><path d="M8.4 7.9c.3-.3.7-.2.9.2l.8 1.7c.1.3.1.5-.1.7l-.6.7c.8 1.5 1.9 2.6 3.5 3.3l.7-.7c.2-.2.5-.2.7-.1l1.7.8c.4.2.5.6.2.9-.6.8-1.5 1.2-2.4 1-3.8-.8-6.3-3.2-7.1-7-.2-.9.2-1.8 1-2.5Z" /></svg>;
    case "phone": return <svg {...common}><path d="M7.2 3.8 9.6 8l-1.8 1.7c1.2 2.8 3.3 4.9 6.1 6.1l1.7-1.8 4.2 2.4c.5.3.7.9.5 1.4-.6 1.4-1.8 2.4-3.4 2.4C10 20.2 3.8 14 3.8 7.1c0-1.6 1-2.8 2.4-3.4.4-.2.8-.1 1 .1Z" /></svg>;
    case "podcast": return <svg {...common}><circle cx="12" cy="9" r="2.2" fill="currentColor" stroke="none" /><path d="M9.4 19.4 10.2 13a1.8 1.8 0 0 1 3.6 0l.8 6.4a2.6 2.6 0 0 1-5.2 0Z" fill="currentColor" stroke="none" /><path d="M7.1 14.8a7 7 0 1 1 9.8 0M5 17.1a10 10 0 1 1 14 0" /></svg>;
    case "right": return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
    case "share": return <svg {...common}><circle cx="18" cy="5" r="2.3" /><circle cx="6" cy="12" r="2.3" /><circle cx="18" cy="19" r="2.3" /><path d="m8 10.8 7.9-4.6M8 13.2l7.9 4.6" /></svg>;
    case "story": return <svg {...common}><path d="M5 4.5h10.8A3.2 3.2 0 0 1 19 7.7v11.8H8.2A3.2 3.2 0 0 1 5 16.3Z" /><path d="M8 8h7.5M8 11.5h7.5M8 15h4.8" /></svg>;
    case "zoom": return <svg {...common}><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 4.5 4.5M10.5 8v5M8 10.5h5" /></svg>;
  }
}
