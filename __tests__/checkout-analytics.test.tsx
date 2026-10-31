import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import React, { act } from "react"
import { createRoot, Root } from "react-dom/client"
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics/checkout"
import { CheckoutTracker } from "@/components/analytics/checkout-tracker"
import { sendGTMEvent } from "@/lib/gtm"

const replace = vi.fn()
let search = ""

vi.mock("next/navigation", () => ({
    useRouter: () => ({ replace }),
    useSearchParams: () => new URLSearchParams(search),
}))

const dataLayer = () => (window as unknown as { dataLayer: Array<Record<string, any>> }).dataLayer // eslint-disable-line @typescript-eslint/no-explicit-any

describe("Medição do checkout", () => {
    let container: HTMLDivElement
    let root: Root

    const renderTracker = async () => {
        await act(async () => {
            root.render(<CheckoutTracker />)
        })
        await act(async () => {
            await vi.runAllTimersAsync()
        })
    }

    beforeEach(() => {
        vi.useFakeTimers()
        vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true)
        vi.stubGlobal("dataLayer", [])
        replace.mockReset()
        const storage = new Map<string, string>()
        vi.stubGlobal("localStorage", {
            getItem: (key: string) => storage.get(key) ?? null,
            setItem: (key: string, value: string) => storage.set(key, value),
        })
        search = ""
        container = document.createElement("div")
        document.body.appendChild(container)
        root = createRoot(container)
    })

    afterEach(async () => {
        await act(async () => root.unmount())
        container.remove()
        vi.unstubAllGlobals()
        vi.useRealTimers()
    })

    it("envia begin_checkout com o valor do plano mensal", async () => {
        trackBeginCheckout("pro", "monthly")
        await vi.runAllTimersAsync()

        expect(dataLayer()[0].event).toBe("begin_checkout")
        expect(dataLayer()[0].ecommerce).toMatchObject({ currency: "BRL", value: 29 })
        expect(dataLayer()[0].ecommerce.items[0].item_id).toBe("pro_monthly")
    })

    it("envia purchase com o valor do plano anual e a sessão da Stripe", async () => {
        trackPurchase("cs_teste", "business", "annual")
        await vi.runAllTimersAsync()

        expect(dataLayer()[0].event).toBe("purchase")
        expect(dataLayer()[0].ecommerce).toMatchObject({ transaction_id: "cs_teste", value: 990 })
    })

    it("aguarda o GTM carregar antes de enviar o evento", async () => {
        vi.stubGlobal("dataLayer", undefined)
        sendGTMEvent({ event: "purchase" })
        await vi.advanceTimersByTimeAsync(2000)

        const lateDataLayer: unknown[] = []
        vi.stubGlobal("dataLayer", lateDataLayer)
        await vi.advanceTimersByTimeAsync(1000)

        expect(lateDataLayer).toEqual([{ event: "purchase" }])
    })

    it("registra a compra ao voltar da Stripe e limpa a URL", async () => {
        search = "success=true&plan=pro&billing=annual&session_id=cs_1"
        await renderTracker()

        expect(dataLayer()).toHaveLength(1)
        expect(dataLayer()[0].ecommerce.transaction_id).toBe("cs_1")
        expect(replace).toHaveBeenCalledWith("/dashboard")
    })

    it("não repete a compra da mesma sessão", async () => {
        localStorage.setItem("purchase_tracked_cs_1", "1")
        search = "success=true&plan=pro&billing=annual&session_id=cs_1"
        await renderTracker()

        expect(dataLayer()).toHaveLength(0)
        expect(replace).toHaveBeenCalledWith("/dashboard")
    })

    it("ignora URLs sem os dados da compra", async () => {
        search = "success=true"
        await renderTracker()

        expect(dataLayer()).toHaveLength(0)
        expect(replace).not.toHaveBeenCalled()
    })

    it("ignora plano desconhecido na URL", async () => {
        search = "success=true&plan=enterprise&billing=annual&session_id=cs_2"
        await renderTracker()

        expect(dataLayer()).toHaveLength(0)
    })
})
