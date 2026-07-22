export type DeviceKind = "android" | "apple-mobile" | "desktop" | "mobile";

export interface DeviceProfile {
  kind: DeviceKind;
  isDesktop: boolean;
  supportsNativeShare: boolean;
}

export function getDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return { kind: "desktop", isDesktop: true, supportsNativeShare: false };
  }

  const platform = navigator.platform ?? "";
  const userAgent = navigator.userAgent ?? "";
  const touchPoints = navigator.maxTouchPoints ?? 0;
  const coarsePointer =
    window.matchMedia?.("(pointer: coarse)").matches ?? false;
  const compactViewport =
    window.matchMedia?.("(max-width: 820px)").matches ?? false;
  const isTouchMac = /Mac/i.test(platform) && touchPoints > 1;
  const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent) || isTouchMac;
  const isAndroid = /Android/i.test(userAgent);
  const isLikelyMobile = coarsePointer || compactViewport || touchPoints > 0;

  if (isAppleMobile) {
    return {
      kind: "apple-mobile",
      isDesktop: false,
      supportsNativeShare: typeof navigator.share === "function",
    };
  }

  if (isAndroid) {
    return {
      kind: "android",
      isDesktop: false,
      supportsNativeShare: typeof navigator.share === "function",
    };
  }

  if (isLikelyMobile) {
    return {
      kind: "mobile",
      isDesktop: false,
      supportsNativeShare: typeof navigator.share === "function",
    };
  }

  return {
    kind: "desktop",
    isDesktop: true,
    supportsNativeShare: typeof navigator.share === "function",
  };
}

export function canShareFile(file: File) {
  return Boolean(
    typeof navigator !== "undefined" &&
      typeof navigator.share === "function" &&
      typeof navigator.canShare === "function" &&
      navigator.canShare({ files: [file] }),
  );
}

export function isShareCancellation(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
