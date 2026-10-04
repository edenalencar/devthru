"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const OnboardingTour = dynamic(
  () => import("@/components/onboarding-tour").then((mod) => mod.OnboardingTour),
  { ssr: false }
);

const RadioPlayer = dynamic(
  () => import("@/components/radio-player").then((mod) => mod.RadioPlayer),
  { ssr: false }
);

export function LazyProviders() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      const handle = (window as any).requestIdleCallback(
        () => setShouldLoad(true),
        { timeout: 3000 }
      );
      return () => (window as any).cancelIdleCallback(handle);
    } else {
      const timer = setTimeout(() => setShouldLoad(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!shouldLoad) return null;

  return (
    <>
      <OnboardingTour />
      <RadioPlayer />
    </>
  );
}

