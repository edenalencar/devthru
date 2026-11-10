import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { siteConfig } from "@/config/site";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/analytics/google-tag-manager";
import { CookieConsent } from "@/components/analytics/cookie-consent";
import { UserProvider } from "@/components/providers/user-provider";
import { LazyProviders } from "@/components/layout/lazy-providers";

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
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ferramentas online",
    "utilitários profissionais",
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
  },

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Sem cookies()/getUser aqui: ler cookies no layout raiz deixava TODAS as páginas
  // dinâmicas (sem cache na CDN), o que atrasava o primeiro byte no celular.
  // O UserProvider descobre a sessão no navegador.
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
          <UserProvider>
            {children}
            <Toaster />
            <LazyProviders />
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
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  "url": siteConfig.url,
                  "name": siteConfig.name,
                  "description": siteConfig.description,
                  "publisher": {
                    "@id": `${siteConfig.url}/#organization`
                  }
                },
                {
                  "@type": "Organization",
                  "@id": `${siteConfig.url}/#organization`,
                  "name": siteConfig.name,
                  "url": siteConfig.url,
                  "logo": `${siteConfig.url}/icon.svg`,
                  "sameAs": [
                    siteConfig.links.youtube,
                    siteConfig.links.tiktok,
                    siteConfig.links.instagram,
                    siteConfig.links.github
                  ]
                }
              ]
            })
          }}
        />
      </body>
    </html>
  );
}
