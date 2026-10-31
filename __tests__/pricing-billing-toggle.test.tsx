import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import React, { act } from "react"
import { createRoot, Root } from "react-dom/client"
import { PricingPage } from "@/app/pricing/client"

const mockUseUser = vi.fn()

vi.mock("@/lib/hooks/use-user", () => ({
    useUser: () => mockUseUser(),
}))

vi.mock("next/navigation", () => ({
    useRouter: () => ({ push: vi.fn() }),
    useSearchParams: () => new URLSearchParams(),
}))

vi.mock("@/components/layout/navbar", () => ({ Navbar: () => null }))
vi.mock("@/components/layout/footer", () => ({ Footer: () => null }))

const freeUser = { user: { id: "user-1" }, profile: { subscription_tier: "free" }, isInTrial: false, loading: false }

describe("Seleção de cobrança na página de preços", () => {
    const fetchMock = vi.fn()
    let container: HTMLDivElement
    let root: Root

    const findButton = (name: string) =>
        Array.from(container.querySelectorAll("button")).find((button) => button.textContent?.trim() === name)

    const click = async (name: string) => {
        await act(async () => {
            findButton(name)?.dispatchEvent(new MouseEvent("click", { bubbles: true }))
        })
    }

    const renderPage = async () => {
        await act(async () => {
            root.render(<PricingPage />)
        })
    }

    beforeEach(() => {
        vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true)
        fetchMock.mockReset()
        fetchMock.mockResolvedValue({ ok: false, status: 500, statusText: "Erro", json: async () => ({ error: "teste" }) })
        vi.stubGlobal("fetch", fetchMock)
        container = document.createElement("div")
        document.body.appendChild(container)
        root = createRoot(container)
    })

    afterEach(async () => {
        await act(async () => root.unmount())
        container.remove()
        vi.unstubAllGlobals()
    })

    it("mostra os preços mensais por padrão", async () => {
        mockUseUser.mockReturnValue(freeUser)
        await renderPage()

        expect(container.textContent).toContain("R$ 29/mês")
        expect(container.textContent).toContain("R$ 99/mês")
        expect(findButton("Assinar Pro")).toBeTruthy()
    })

    it("troca preço e botão dos dois planos ao escolher Anual", async () => {
        mockUseUser.mockReturnValue(freeUser)
        await renderPage()

        await click("Anual: 2 meses grátis")

        expect(container.textContent).toContain("R$ 290/ano")
        expect(container.textContent).toContain("R$ 990/ano")
        expect(container.textContent).not.toContain("R$ 29/mês")
        expect(findButton("Pagar 1 ano do Pro")).toBeTruthy()
        expect(findButton("Pagar 1 ano do Business")).toBeTruthy()
    })

    it("envia o plano anual ao checkout", async () => {
        mockUseUser.mockReturnValue(freeUser)
        await renderPage()

        await click("Anual: 2 meses grátis")
        await click("Pagar 1 ano do Pro")

        expect(fetchMock).toHaveBeenCalledOnce()
        expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ annualPlan: "pro" })
    })

    it("oculta a seleção para quem já tem plano pago", async () => {
        mockUseUser.mockReturnValue({ ...freeUser, profile: { subscription_tier: "pro" } })
        await renderPage()

        expect(findButton("Anual: 2 meses grátis")).toBeUndefined()
    })
})
