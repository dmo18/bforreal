"use client";

import { useEffect } from "react";

export function FeatureLayoutPolish() {
  useEffect(() => {
    const style = document.createElement("style");
    style.dataset.featureLayoutPolish = "true";
    style.textContent = `
      .podcast-feature,
      .daily-bitachon-feature {
        display: grid !important;
        grid-template-columns: minmax(15rem, .72fr) minmax(0, 1.28fr) !important;
      }

      .pod