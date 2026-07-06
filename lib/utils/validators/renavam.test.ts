import { describe, it, expect } from "vitest"
import { generateRenavam, validateRenavam, formatRenavam } from "./renavam"

describe("Renavam Validator Utility", () => {
    it("should generate a valid 11-digit Renavam", () => {
        const renavam = generateRenavam()
        expect(renavam.length).toBe(11)
        expect(validateRenavam(renavam)).toBe(true)
    })

    it("should format Renavam correctly", () => {
        const renavam = "12345678901"
        const formatted = formatRenavam(renavam)
        expect(formatted).toBe("1234567890-1")
    })

    it("should invalidate incorrect Renavam", () => {
        expect(validateRenavam("12345678909")).toBe(false)
        expect(validateRenavam("00000000000")).toBe(false)
        expect(validateRenavam("123")).toBe(false)
    })
})
