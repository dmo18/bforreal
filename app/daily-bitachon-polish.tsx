"use client";

import { useEffect } from "react";

const BUILD_VERSION = "1.0.16";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "/bforreal").replace(/\/$/, "");

export function DailyBitachonPolish() {
  useEffect(() => {
    const apply = () => {
      const feature = document.querySelector<HTMLElement>(".daily-bitachon-feature");
