"use client";

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
  return (
    <>
      <OnboardingTour />
      <RadioPlayer />
    </>
  );
}
