import { describe, it, expect } from "vitest"
import { generateRG, calculateRGCheckDigit } from "@/lib/utils/generators/rg"

// Mesma regra do código de validação exibido em /tools/documents/rg
function validateRG(rg: string): boolean {
    const cleaned = rg.toUpperCase().replace(/[^0-9X]/g, "")
    if (cleaned.length !== 9) return false
    let sum = 0
    for (let i = 0; i < 8; i++) sum += Number(cleaned[i]) * (i + 2)
    const calc = 11 - (sum % 11)
    const expected = calc === 11 ? "0" : calc === 10 ? "X" : String(calc)
    return cleaned[8] === expected
}

describe("gerador de RG", () => {
    it("gera RGs que passam na validação padrão SP", () => {
        for (let i = 0; i < 2000; i++) {
            expect(validateRG(generateRG())).toBe(true)
            expect(validateRG(generateRG(true))).toBe(true)
        }
    })

    it("formata como 00.000.000-D", () => {
        expect(generateRG(true)).toMatch(/^\d{2}\.\d{3}\.\d{3}-[\dX]$/)
    })

    it("calcula X quando o resto leva a 10 e 0 quando leva a 11", () => {
        // 24.678.351: soma = 2*2+4*3+6*4+7*5+8*6+3*7+5*8+1*9 = 193; 193 % 11 = 6; 11-6 = 5
        expect(calculateRGCheckDigit("24678351")).toBe("5")
        expect(calculateRGCheckDigit("00000000")).toBe("0")
        // 10000000: soma = 2; 11-2 = 9
        expect(calculateRGCheckDigit("10000000")).toBe("9")
        // Procura uma base cujo DV seja X e confere que o validador aceita
        const xCase = Array.from({ length: 100000 }, (_, n) => String(n).padStart(8, "0"))
            .find((b) => calculateRGCheckDigit(b) === "X")!
        expect(validateRG(xCase + "X")).toBe(true)
    })
})
