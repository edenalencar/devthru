import { describe, it, expect, beforeEach } from "vitest"
import { gtag, pushConsentUpdateEvent } from "@/components/analytics/cookie-consent"

describe("cookie consent → GTM", () => {
    beforeEach(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ;(window as any).dataLayer = []
    })

    it("envia comandos gtag como objeto arguments (formato que o GTM processa)", () => {
        gtag("consent", "update", { analytics_storage: "granted" })

        const entry = window.dataLayer[0] as IArguments
        expect(Array.isArray(entry)).toBe(false)
        expect(Object.prototype.toString.call(entry)).toBe("[object Arguments]")
        expect(entry[0]).toBe("consent")
        expect(entry[1]).toBe("update")
    })

    it("publica o evento consent_update para as tags do GTM reagirem", () => {
        pushConsentUpdateEvent({
            ad_storage: "denied",
            analytics_storage: "granted",
            ad_user_data: "denied",
            ad_personalization: "denied",
        })

        expect(window.dataLayer[0]).toEqual({
            event: "consent_update",
            analytics_storage: "granted",
            ad_storage: "denied",
        })
    })
})
