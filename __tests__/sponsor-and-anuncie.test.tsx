import { describe, it, expect } from "vitest"
import React from "react"
import { renderToString } from "react-dom/server"
import { SponsorBanner } from "@/components/marketing/sponsor-banner"
import { navLinks } from "@/config/site"
import sitemap from "@/app/sitemap"

describe("Mídia Kit & Patrocínio Nativo (/anuncie)", () => {
    describe("1. Componente SponsorBanner", () => {
        it("deve renderizar o espaço reservado para patrocinador por padrão", () => {
            const html = renderToString(
                <SponsorBanner toolContext="Gerador de Telefone" />
            )

            // Valida textos de prospecção e contexto
            expect(html).toContain("Espaço para Patrocinador")
            expect(html).toContain("Gerador de Telefone")
            expect(html).toContain("Sua marca conectada a milhares de desenvolvedores no Brasil")

            // Valida link para /anuncie
            expect(html).toContain('href="/anuncie"')
            expect(html).toContain("Anuncie no DevThru")
        })

        it("deve renderizar os dados do patrocinador ativo com link rel='sponsored'", () => {
            const mockSponsor = {
                name: "CloudHost Brasil",
                description: "Hospedagem de aplicações Next.js de alta performance.",
                ctaText: "Comece Grátis",
                targetUrl: "https://cloudhost.com.br/devthru",
                tag: "Cloud & DevOps",
            }

            const html = renderToString(
                <SponsorBanner sponsor={mockSponsor} />
            )

            // Valida informações do patrocinador
            expect(html).toContain("Patrocinado por")
            expect(html).toContain("CloudHost Brasil")
            expect(html).toContain("Cloud &amp; DevOps")
            expect(html).toContain("Hospedagem de aplicações Next.js de alta performance.")

            // Valida link e atributos de segurança e SEO
            expect(html).toContain('href="https://cloudhost.com.br/devthru"')
            expect(html).toContain('rel="sponsored noopener noreferrer"')
            expect(html).toContain("Comece Grátis")
        })
    })

    describe("2. Configuração de Rotas e Sitemap", () => {
        it("deve conter a rota /anuncie nos links de navegação", () => {
            const anuncieLink = navLinks.find((link) => link.href === "/anuncie")
            expect(anuncieLink).toBeDefined()
            expect(anuncieLink?.title).toBe("Anuncie")
        })

        it("deve conter a rota /anuncie no sitemap do site", () => {
            const siteMapEntries = sitemap()
            const anuncieEntry = siteMapEntries.find((entry) => entry.url.endsWith("/anuncie"))
            expect(anuncieEntry).toBeDefined()
            expect(anuncieEntry?.priority).toBe(0.8)
        })
    })
})
