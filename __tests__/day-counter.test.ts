import { describe, it, expect } from "vitest"
import { countDays, easterSunday, brazilianHolidays, toISODate, ymdDiff, parseISODate } from "@/lib/utils/calculators/dates"

describe("Páscoa e feriados", () => {
    it("calcula o domingo de Páscoa", () => {
        expect(toISODate(easterSunday(2024))).toBe("2024-03-31")
        expect(toISODate(easterSunday(2025))).toBe("2025-04-20")
        expect(toISODate(easterSunday(2026))).toBe("2026-04-05")
    })

    it("lista os feriados móveis de 2026", () => {
        const h = Object.fromEntries(brazilianHolidays(2026).map((x) => [x.name, x.date]))
        expect(h["Sexta-feira Santa"]).toBe("2026-04-03")
        expect(h["Carnaval (terça-feira)"]).toBe("2026-02-17")
        expect(h["Corpus Christi"]).toBe("2026-06-04")
        expect(h["Dia Nacional de Zumbi e da Consciência Negra"]).toBe("2026-11-20")
    })

    it("não inclui a Consciência Negra antes de 2024", () => {
        expect(brazilianHolidays(2023).some((x) => x.date === "2023-11-20")).toBe(false)
    })
})

describe("contador de dias", () => {
    it("conta dias corridos sem e com o dia final", () => {
        expect(countDays("2026-01-01", "2026-01-03")!.totalDays).toBe(2)
        expect(countDays("2026-01-01", "2026-01-03", { includeEnd: true })!.totalDays).toBe(3)
    })

    it("dá sinal negativo quando a data final vem antes", () => {
        expect(countDays("2026-03-10", "2026-03-01")!.totalDays).toBe(-9)
    })

    it("conta o ano de 2026 inteiro", () => {
        const r = countDays("2026-01-01", "2026-12-31", { includeEnd: true })!
        expect(r.totalDays).toBe(365)
        expect(r.weekendDays).toBe(104)
        expect(r.holidaysOnWeekdays).toHaveLength(9)
        expect(r.businessDays).toBe(252)
        expect(countDays("2026-01-01", "2026-12-31", { includeEnd: true, includeOptional: true })!.businessDays).toBe(249)
        expect([r.years, r.months, r.days]).toEqual([1, 0, 0])
    })

    it("atravessa anos bissextos", () => {
        expect(countDays("2024-02-28", "2024-03-01")!.totalDays).toBe(2)
        expect(countDays("2023-02-28", "2023-03-01")!.totalDays).toBe(1)
    })

    it("quebra em anos, meses e dias", () => {
        const a = parseISODate("2020-01-31")!
        const b = parseISODate("2026-03-15")!
        expect(ymdDiff(a, b)).toEqual({ years: 6, months: 1, days: 15 })
    })

    it("rejeita datas inválidas", () => {
        expect(countDays("2026-02-30", "2026-03-01")).toBeNull()
        expect(countDays("", "2026-03-01")).toBeNull()
    })
})
