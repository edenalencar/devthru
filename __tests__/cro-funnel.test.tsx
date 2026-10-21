import { describe, it, expect, vi } from "vitest"
import React from "react"
import { renderToString } from "react-dom/server"
import { ToolProCta } from "@/components/tools/tool-pro-cta"
import { isUserInTrial, getPlanPermissions } from "@/lib/permissions"
import { STRIPE_PLANS } from "@/lib/stripe/plans"

// Mock do hook useUser
const mockUseUser = vi.fn()
vi.mock("@/lib/hooks/use-user", () => ({
    useUser: () => mockUseUser(),
}))

describe("CRO & Funil de Conversão - Testes Automatizados", () => {
    describe("1. Componente ToolProCta (Banners nas Ferramentas)", () => {
        it("deve renderizar o CTA completo quando o usuário NÃO for Pro (anônimo ou free)", () => {
            mockUseUser.mockReturnValue({
                user: null,
                profile: null,
                isPro: false,
                isInTrial: false,
            })

            const html = renderToString(
                <ToolProCta
                    toolName="Telefones"
                    description="Gere dados em grande volume para testes."
                />
            )

            // Valida título contextual
            expect(html).toContain("Precisa de escala em testes com Telefones?")
            expect(html).toContain("Gere dados em grande volume para testes.")

            // Valida benefícios destacados do Pro
            expect(html).toContain("Geração em Lote (1.000 itens)")
            expect(html).toContain("Exportação CSV, JSON e Excel")
            expect(html).toContain("Salvar Configurações &amp; Histórico")

            // Valida link e botão para /pricing
            expect(html).toContain('href="/pricing"')
            expect(html).toContain("Conhecer Plano Pro")
            expect(html).toContain("A partir de R$ 29/mês")
        })

        it("NÃO deve renderizar nada (retorna string vazia) quando o usuário já for assinante Pro", () => {
            mockUseUser.mockReturnValue({
                user: { id: "user-123" },
                profile: { subscription_tier: "pro" },
                isPro: true,
                isInTrial: false,
            })

            const html = renderToString(
                <ToolProCta
                    toolName="NF-e"
                    description="Gere lotes fiscais em massa."
                />
            )

            // Assinante Pro não deve receber banner de upgrade
            expect(html).toBe("")
        })

        it("deve aceitar título customizado quando fornecido", () => {
            mockUseUser.mockReturnValue({
                user: null,
                isPro: false,
            })

            const html = renderToString(
                <ToolProCta
                    title="Teste de Carga em Pagamentos"
                    toolName="Cartões"
                />
            )

            expect(html).toContain("Teste de Carga em Pagamentos")
        })
    })

    describe("2. Lógica de Trial & Permissões (Reverse Trial)", () => {
        it("deve identificar corretamente usuário em período de teste ativo", () => {
            const futureDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
            const profileInTrial = {
                id: "test-user",
                subscription_tier: "free",
                trial_ends_at: futureDate,
            }

            expect(isUserInTrial(profileInTrial)).toBe(true)

            // Durante o trial ativo, as permissões devem ser de nível PRO (1.000 gerações)
            const permissions = getPlanPermissions(profileInTrial)
            expect(permissions.generation_limit).toBe(1000)
            expect(permissions.export_formats.csv).toBe(true)
            expect(permissions.export_formats.json).toBe(true)
        })

        it("deve identificar corretamente quando o período de teste expirou", () => {
            const pastDate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            const profileExpiredTrial = {
                id: "test-user",
                subscription_tier: "free",
                trial_ends_at: pastDate,
            }

            expect(isUserInTrial(profileExpiredTrial)).toBe(false)

            // Com o trial expirado, usuário free volta ao limite básico (5 gerações)
            const permissions = getPlanPermissions(profileExpiredTrial)
            expect(permissions.generation_limit).toBe(5)
            expect(permissions.export_formats.csv).toBe(false)
        })

        it("deve tratar perfil sem trial_ends_at como plano free padrão", () => {
            const profileNoTrial = {
                id: "test-user",
                subscription_tier: "free",
                trial_ends_at: null,
            }

            expect(isUserInTrial(profileNoTrial)).toBe(false)
            expect(getPlanPermissions(profileNoTrial).generation_limit).toBe(5)
        })
    })

    describe("3. Configurações dos Planos Stripe", () => {
        it("deve possuir planos PRO e BUSINESS configurados com slugs corretos", () => {
            expect(STRIPE_PLANS.PRO.slug).toBe("pro")
            expect(STRIPE_PLANS.PRO.name).toBe("Pro")

            expect(STRIPE_PLANS.BUSINESS.slug).toBe("business")
            expect(STRIPE_PLANS.BUSINESS.name).toBe("Business")
        })
    })

    describe("4. Preservação de Redirecionamento e Intent de Compra", () => {
        it("deve codificar e decodificar corretamente a URL de checkout no redirect", () => {
            const targetPlan = "price_1ScAmUF7PJBozC8Np5Doyvy3"
            const checkoutRedirect = `/pricing?action=checkout&plan=${encodeURIComponent(targetPlan)}`
            const loginUrl = `/login?redirect=${encodeURIComponent(checkoutRedirect)}`

            const parsedLogin = new URL(`https://devthru.com${loginUrl}`)
            const extractedRedirect = parsedLogin.searchParams.get("redirect")

            expect(extractedRedirect).toBe(checkoutRedirect)

            const parsedPricing = new URL(`https://devthru.com${extractedRedirect}`)
            expect(parsedPricing.searchParams.get("action")).toBe("checkout")
            expect(parsedPricing.searchParams.get("plan")).toBe(targetPlan)
        })
    })
})
