import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { siteConfig } from "@/config/site";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { OnboardingTour } from "@/components/onboarding-tour";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/analytics/google-tag-manager";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { createClient } from "@/lib/supabase/server";
import { UserProvider } from "@/components/providers/user-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name} - Ferramentas para Desenvolvedores`,
  },
  description: "Ferramentas essenciais para devs: Gerador de CPF, CNPJ, Formatador JSON, Validador de Cartão de Crédito e mais. Gratuito, rápido e sem login.",
  keywords: [
    "ferramentas para desenvolvedores",
    "gerador de cpf",
    "gerador de cnpj",
    "gerador de nota fiscal",
    "gerador de nfe",
    "formatador json",
    "testes de software",
    "QA tools",
    "mock data generator",
    "validador online",
    "dev skills",
    "produtividade",
  ],
  authors: [
    {
      name: siteConfig.creator.name,
      url: siteConfig.creator.url,
    },
  ],
  creator: siteConfig.creator.name,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@devtoolshub",
  },

};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <GoogleTagManager />
        <GoogleTagManagerNoscript />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider initialUser={user}>
            {children}
            <OnboardingTour />
            <Toaster />
          </UserProvider>
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
        <CookieConsent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": siteConfig.name,
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "BRL"
              },
              "description": siteConfig.description,
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "1250"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
