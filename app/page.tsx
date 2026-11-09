import type { Metadata } from 'next'
import { HomePageClient } from "@/app/_components/home-page"

import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "DevThru: Ferramentas Online Grátis para Gerar e Validar Dados",
  description: "Geradores e validadores grátis de CPF, CNPJ, link do WhatsApp, placa Pix, conversores e muito mais. Direto no navegador, rápido e sem cadastro.",
  alternates: {
    canonical: siteConfig.url,
  },
}

export default function HomePage() {
  return <HomePageClient />
}
