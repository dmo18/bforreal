"use client";

import { useEffect, useRef, type RefObject } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useModalDialog(
  dialogRef: RefObject<HTMLDialogElement | null>,
  onClose: () => void,
  onMove?: (direction: -1 | 1) => void,
  inactive = false,
  enabled = true,
) {
  const inactiveRef = useRef(inactive);
  useEffect(() => {
    inactiveRef.current = inactive;
  }, [inactive]);

  useEffect(() => {
    if (!enabled) return;
    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (!dialog.open) dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget = dialog.querySelector<HTMLElement>("[data-autofocus]");
    const focusFrame = window.requestAnimationFrame(() => focusTarget?.focus());

    const handleCancel = (event: Event) => {
      event.preventDefault();
      if (!inactiveRef.current) onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (inactiveRef.current) return;
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && onMove) {
        event.preventDefault();
        onMove(-1);
        return;
      }
      if (event.key === "ArrowRight" && onMove) {
        event.preventDefault();
        onMove(1);
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute("disabled"));
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("keydown", handleKeyDown);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) {
        window.requestAnimationFrame(() => previousFocus.focus());
      }
    };
  }, [dialogRef, onClose, onMove, enabled]);
}
