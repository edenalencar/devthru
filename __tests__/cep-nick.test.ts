import { describe, it, expect } from "vitest"
import {
    ALL_UFS,
    CEP_RANGES,
    findUfByCep,
    generateCep,
    generateCepForCity,
} from "@/lib/utils/generators/cep"
import { generateAddress } from "@/lib/utils/generators/address"
import { generateNicks, NICK_STYLE_IDS } from "@/lib/utils/generators/nick"

describe("faixas de CEP", () => {
    it("cobrem os 27 estados sem sobreposição e sem buracos de 01000 a 99999", () => {
        expect(ALL_UFS).toHaveLength(27)
        const ranges = ALL_UFS.flatMap((uf) => CEP_RANGES[uf]).sort((a, b) => a[0] - b[0])
        expect(ranges[0][0]).toBe(1000)
        expect(ranges[ranges.length - 1][1]).toBe(99999)
        for (let i = 1; i < ranges.length; i++) {
            expect(ranges[i][0]).toBe(ranges[i - 1][1] + 1)
        }
    })

    it.each([
        ["01310-100", "SP"],
        ["20040-020", "RJ"],
        ["30130-010", "MG"],
        ["70040-010", "DF"],
        ["74000-000", "GO"],
        ["69301-000", "RR"],
        ["90010-000", "RS"],
        ["78900-000", "RO"],
    ])("%s pertence a %s", (cep, uf) => {
        expect(findUfByCep(cep)).toBe(uf)
    })

    it("rejeita CEP com formato inválido ou fora das faixas", () => {
        expect(findUfByCep("1234")).toBeNull()
        expect(findUfByCep("00500-000")).toBeNull()
    })
})

describe("geração de CEP", () => {
    it("gera CEPs da UF escolhida, com sufixo 000–899", () => {
        for (const uf of ALL_UFS) {
            for (let i = 0; i < 20; i++) {
                const cep = generateCep(uf)
                expect(cep).toMatch(/^\d{5}-\d{3}$/)
                expect(findUfByCep(cep)).toBe(uf)
                expect(Number(cep.slice(6))).toBeLessThan(900)
            }
        }
    })

    it("gera sem hífen quando pedido", () => {
        expect(generateCep("SP", false)).toMatch(/^\d{8}$/)
    })

    it("usa a faixa da capital quando conhecida", () => {
        for (let i = 0; i < 50; i++) {
            const prefix = Number(generateCepForCity("Porto Alegre", "RS").slice(0, 5))
            expect(prefix).toBeGreaterThanOrEqual(90000)
            expect(prefix).toBeLessThanOrEqual(91999)
        }
    })

    it("o endereço gerado tem CEP do mesmo estado da cidade", () => {
        for (let i = 0; i < 100; i++) {
            const addr = generateAddress()
            expect(findUfByCep(addr.zipCode)).toBe(addr.state)
        }
    })
})

describe("gerador de nicks", () => {
    it("gera nicks únicos, sem espaços, em todos os estilos", () => {
        for (const style of [...NICK_STYLE_IDS, "aleatorio" as const]) {
            const nicks = generateNicks({ style, count: 12 })
            expect(nicks).toHaveLength(12)
            expect(new Set(nicks).size).toBe(12)
            expect(nicks.every((n) => !/\s/.test(n))).toBe(true)
        }
    })

    it("usa o nome informado, sem caracteres especiais", () => {
        const nicks = generateNicks({ style: "gamer", name: "  lu cas!! ", count: 10 })
        expect(nicks.every((n) => n.includes("LuCas"))).toBe(true)
    })

    it("não adiciona números quando desligado", () => {
        const nicks = generateNicks({ style: "fofo", numbers: false, count: 20 })
        expect(nicks.every((n) => !/\d/.test(n))).toBe(true)
    })
})
