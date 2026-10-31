import { describe, it, expect, vi } from "vitest"
import React from "react"
import { renderToString } from "react-dom/server"
import { HistoryPage } from "@/app/dashboard/history/client"
import { DashboardPage } from "@/app/dashboard/client"

const mockUseUser = vi.fn()

vi.mock("@/lib/hooks/use-user", () => ({
    useUser: () => mockUseUser(),
}))

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
}))

vi.mock("@/lib/supabase/client", () => ({
    createClient: () => ({}),
}))

vi.mock("@/lib/supabase/history", () => ({
    getHistoryFromSupabase: vi.fn(),
    getHistoryWithFilters: vi.fn(),
    getHistoryCount: vi.fn(),
    deleteHistoryItem: vi.fn(),
    deleteHistoryItems: vi.fn(),
}))

const freeUser = { user: { id: "user-1" }, profile: { subscription_tier: "free" }, isPro: false, planLoading: false, loading: false }
const proUser = { ...freeUser, profile: { subscription_tier: "pro" }, isPro: true }
const loadingUser = { ...freeUser, profile: null, planLoading: true }

describe("Bloqueio do histórico no plano Free", () => {
    it("bloqueia a página de histórico e a exportação para contas Free", () => {
        mockUseUser.mockReturnValue(freeUser)

        const html = renderToString(<HistoryPage />)

        expect(html).toContain("Histórico Bloqueado")
        expect(html).toContain('href="/pricing"')
        expect(html).not.toContain("Exportar</button>")
    })

    it("libera a página de histórico para Pro, Business e trial", () => {
        mockUseUser.mockReturnValue(proUser)

        const html = renderToString(<HistoryPage />)

        expect(html).not.toContain("Histórico Bloqueado")
        expect(html).toContain("Exportar")
    })

    it("não mostra o bloqueio enquanto o plano carrega", () => {
        mockUseUser.mockReturnValue(loadingUser)

        expect(renderToString(<HistoryPage />)).not.toContain("Histórico Bloqueado")
        expect(renderToString(<DashboardPage />)).not.toContain("Histórico Bloqueado")
    })

    it("bloqueia o histórico recente e a exportação no painel para contas Free", () => {
        mockUseUser.mockReturnValue(freeUser)

        const html = renderToString(<DashboardPage />)

        expect(html).toContain("Histórico Bloqueado")
        expect(html).not.toContain("Limpar")
    })

    it("mantém a exportação do painel para contas Pro", () => {
        mockUseUser.mockReturnValue(proUser)

        const html = renderToString(<DashboardPage />)

        expect(html).not.toContain("Histórico Bloqueado")
        expect(html).toContain("Limpar")
    })
})
