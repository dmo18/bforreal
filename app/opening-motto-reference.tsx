"use client";

import { useEffect } from "react";

export function OpeningMottoReference() {
  useEffect(() => {
    const card = document.querySelector<HTMLElement>(".motto-card");
    if (!card) return;

    card.setAttribute(
      "aria-label",
      "Sing It. Laugh It. Cry It. All Day! Every day! Ein Od Milvado. There is nothing but Him, G-D.",
    );

    const firstLine = card.querySelector