import type { Metadata } from 'next'
import { HomePageClient } from "@/app/_components/home-page"

export const metadata: Metadata = {
  title: "Todas as Ferramentas para Desenvolvedores | DevThru",
  description: "Acesse nossa coleção completa de ferramentas para desenvolvedores: geradores de CPF/CNPJ, formatadores JSON, conversores e muito mais. Gratuito e rápido.",
}

export default function HomePage() {
  return <HomePageClient />
}
