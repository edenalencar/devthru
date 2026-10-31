import { describe, it, expect, vi, afterEach } from "vitest"
import { sendClarityEvent } from "@/lib/analytics/clarity"
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics/checkout"

vi.mock("@/lib/gtm", () => ({ sendGTMEvent: vi.fn() }))

describe("Eventos do Clarity", () => {
    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it("envia o evento quando o Clarity está carregado", () => {
        const clarity = vi.fn()
        vi.stubGlobal("clarity", clarity)

        sendClarityEvent("pro_cta_click")

        expect(clarity).toHaveBeenCalledWith("event", "pro_cta_click")
    })

    it("ignora o envio quando o Clarity não está carregado", () => {
        expect(() => sendClarityEvent("pro_cta_click")).not.toThrow()
    })

    it("não quebra se o Clarity lançar erro", () => {
        vi.stubGlobal("clarity", () => {
            throw new Error("falha")
        })

        expect(() => sendClarityEvent("purchase")).not.toThrow()
    })

    it("marca início de checkout e compra no funil", () => {
        const clarity = vi.fn()
        vi.stubGlobal("clarity", clarity)

        trackBeginCheckout("pro", "annual")
        trackPurchase("cs_test_1", "pro", "annual")

        expect(clarity).toHaveBeenCalledWith("event", "begin_checkout")
        expect(clarity).toHaveBeenCalledWith("event", "purchase")
    })
})
