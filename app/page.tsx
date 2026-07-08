import type { Metadata } from 'next'
import { HomePageClient } from "@/app/_components/home-page"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "DevThru: Ferramentas Online para Devs",
  description: "Acesse nossa coleção completa de ferramentas para desenvolvedores: geradores de CPF/CNPJ, formatadores JSON, conversores e muito mais. Gratuito e rápido.",
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function HomePage() {
  return <HomePageClient />
}
