import { describe, it, expect } from "vitest"
import {
    integerToWords,
    currencyToWords,
    ruleOfThree,
    percentage,
    generateRandomNumbers,
    parseBrazilianNumber,
} from "@/lib/utils/calculators/everyday"
import { FANCY_STYLES } from "@/lib/utils/fancy-text"

describe("leitura de números digitados", () => {
    it.each([
        ["1.000", 1000],
        ["1.234.567", 1234567],
        ["1.234,56", 1234.56],
        ["1234,56", 1234.56],
        ["2.5", 2.5],
        ["R$ 10,50", 10.5],
        ["-3", -3],
    ])("%s → %f", (raw, expected) => {
        expect(parseBrazilianNumber(raw)).toBe(expected)
    })

    it.each(["", "abc", "1,2,3"])("rejeita %j", (raw) => {
        expect(parseBrazilianNumber(raw)).toBeNull()
    })
})

describe("número por extenso", () => {
    it.each([
        [0, "zero"],
        [1, "um"],
        [15, "quinze"],
        [21, "vinte e um"],
        [100, "cem"],
        [101, "cento e um"],
        [345, "trezentos e quarenta e cinco"],
        [1000, "mil"],
        [1001, "mil e um"],
        [1100, "mil e cem"],
        [1234, "mil duzentos e trinta e quatro"],
        [2000000, "dois milhões"],
        [2000005, "dois milhões e cinco"],
        [1000000, "um milhão"],
        [1234567, "um milhão, duzentos e trinta e quatro mil, quinhentos e sessenta e sete"],
        [-7, "menos sete"],
    ])("%i → %s", (n, expected) => {
        expect(integerToWords(n)).toBe(expected)
    })

    it("rejeita números fora do intervalo", () => {
        expect(() => integerToWords(1e16)).toThrow(RangeError)
        expect(() => integerToWords(1.5)).toThrow(RangeError)
    })

    it.each([
        [1, "um real"],
        [10.5, "dez reais e cinquenta centavos"],
        [0.01, "um centavo"],
        [0, "zero real"],
        [1000000, "um milhão de reais"],
        [1250.99, "mil duzentos e cinquenta reais e noventa e nove centavos"],
    ])("R$ %f → %s", (n, expected) => {
        expect(currencyToWords(n)).toBe(expected)
    })
})

describe("regra de três", () => {
    it("direta", () => {
        expect(ruleOfThree(2, 10, 5)).toBe(25)
    })
    it("inversa", () => {
        // 4 pedreiros em 6 dias → 8 pedreiros em 3 dias
        expect(ruleOfThree(4, 6, 8, true)).toBe(3)
    })
    it("rejeita divisão por zero", () => {
        expect(() => ruleOfThree(0, 1, 1)).toThrow(RangeError)
        expect(() => ruleOfThree(1, 1, 0, true)).toThrow(RangeError)
    })
})

describe("porcentagem", () => {
    it("calcula as operações", () => {
        expect(percentage.of(15, 200)).toBe(30)
        expect(percentage.ratio(30, 200)).toBe(15)
        expect(percentage.change(80, 100)).toBe(25)
        expect(percentage.change(100, 80)).toBe(-20)
        expect(percentage.increase(200, 10)).toBeCloseTo(220)
        expect(percentage.decrease(200, 10)).toBeCloseTo(180)
    })
})

describe("números aleatórios", () => {
    it("respeita intervalo, quantidade e unicidade", () => {
        const nums = generateRandomNumbers({ min: 1, max: 10, count: 10, unique: true, sort: true })
        expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    })
    it("gera dentro do intervalo", () => {
        const nums = generateRandomNumbers({ min: -5, max: 5, count: 200 })
        expect(nums.every((n) => n >= -5 && n <= 5)).toBe(true)
    })
    it("rejeita entradas inválidas", () => {
        expect(() => generateRandomNumbers({ min: 5, max: 1, count: 1 })).toThrow(RangeError)
        expect(() => generateRandomNumbers({ min: 1, max: 3, count: 4, unique: true })).toThrow(RangeError)
        expect(() => generateRandomNumbers({ min: 1, max: 3, count: 2.5 })).toThrow(RangeError)
    })
})

describe("letras diferentes", () => {
    const style = (id: string) => FANCY_STYLES.find((s) => s.id === id)!

    it("converte para negrito, preservando acentos e espaços", () => {
        expect(style("bold").transform("Ab 1")).toBe("𝐀𝐛 𝟏")
        expect(style("bold").transform("ã")).toBe("𝐚̃")
    })
    it("usa os caracteres de exceção do Unicode", () => {
        expect(style("italic").transform("h")).toBe("ℎ")
        expect(style("script").transform("B")).toBe("ℬ")
        expect(style("double-struck").transform("R")).toBe("ℝ")
    })
    it("inverte o texto de cabeça para baixo", () => {
        expect(style("upside-down").transform("abc")).toBe("ɔqɐ")
    })
})
