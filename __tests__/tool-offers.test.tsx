import { describe, it, expect, vi } from "vitest"
import React from "react"
import { renderToString } from "react-dom/server"
import { NfeGeneratorPage } from "@/app/tools/business/nfe-generator/client"
import { LicensePlatePage } from "@/app/tools/automotive/license-plate/client"
import { CreditCardGeneratorPage } from "@/app/tools/finance/credit-card-generator/client"
import { generateCreditCard, CARD_BRANDS } from "@/lib/utils/generators/credit-card"

vi.mock("@/lib/hooks/use-user", () => ({
    useUser: () => ({ user: null, profile: null, isPro: false, isInTrial: false, limit: 5 }),
}))

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
}))

vi.mock("@/components/layout/navbar", () => ({ Navbar: () => null }))
vi.mock("@/components/share-buttons", () => ({ ShareButtons: () => null }))
vi.mock("@/components/tools/tool-faq-section", () => ({ ToolFaqSection: () => null }))
vi.mock("@/components/tools/related-tools", () => ({ RelatedTools: () => null }))

describe("Oferta das páginas mais visitadas", () => {
    it.each([
        ["NF-e", NfeGeneratorPage, "Precisa de muitas chaves de NF-e para homologar?"],
        ["placa", LicensePlatePage, "Precisa de uma massa de placas para testar?"],
        ["cartão", CreditCardGeneratorPage, "Precisa testar seu checkout com muitos cartões?"],
    ])("a página de %s oferece a geração em massa que o bloco promete", (_name, Page, heading) => {
        const html = renderToString(<Page />)

        expect(html).toContain("Geração em Massa")
        expect(html).toContain("Limite do seu plano: 5 itens.")
        expect(html).toContain(heading)
    })

    it("a oferta de cartões cita somente bandeiras que o gerador suporta", () => {
        const html = renderToString(<CreditCardGeneratorPage />)

        expect(html).not.toContain("Master, Elo")
        expect(CARD_BRANDS.map((brand) => brand.id)).toEqual(["visa", "mastercard", "amex", "discover"])
        expect(generateCreditCard("visa")).toMatch(/^\d+$/)
    })
})
