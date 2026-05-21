import { describe, it, expect } from "vitest"
import { validateCron, parseCron, translateCron } from "./cron-parser"

describe("Cron Validator", () => {
    it("should validate correct cron expressions", () => {
        expect(validateCron("* * * * *")).toBe(true)
        expect(validateCron("*/5 * * * *")).toBe(true)
        expect(validateCron("0 12 * * 1-5")).toBe(true)
        expect(validateCron("30 8 1,15 1-12 0")).toBe(true)
        expect(validateCron("*/15 9-17 1 * *")).toBe(true)
    })

    it("should reject invalid cron expressions", () => {
        expect(validateCron("* * * *")).toBe(false) // 4 parts
        expect(validateCron("* * * * * *")).toBe(false) // 6 parts
        expect(validateCron("60 * * * *")).toBe(false) // minute 60
        expect(validateCron("* 24 * * *")).toBe(false) // hour 24
        expect(validateCron("* * 0 * *")).toBe(false) // day of month 0
        expect(validateCron("* * * 13 *")).toBe(false) // month 13
        expect(validateCron("* * * * 8")).toBe(false) // day of week 8
        expect(validateCron("invalid-cron")).toBe(false)
    })
})

describe("Cron Parser", () => {
    it("should parse components correctly", () => {
        const result = parseCron("5 4 3 2 1")
        expect(result).toEqual({
            minute: "5",
            hour: "4",
            dayOfMonth: "3",
            month: "2",
            dayOfWeek: "1"
        })
    })

    it("should return asterisks on invalid expressions", () => {
        const result = parseCron("5 4")
        expect(result).toEqual({
            minute: "*",
            hour: "*",
            dayOfMonth: "*",
            month: "*",
            dayOfWeek: "*"
        })
    })
})

describe("Cron Translator (Portuguese)", () => {
    it("should translate common expressions naturally", () => {
        expect(translateCron("* * * * *")).toBe("Executa a cada minuto, de cada hora, todos os dias")
        expect(translateCron("*/5 * * * *")).toBe("Executa a cada 5 minutos, todos os dias")
        expect(translateCron("0 */2 * * *")).toBe("Executa a cada 2 horas, no minuto zero, todos os dias")
        expect(translateCron("0 12 * * *")).toBe("Executa diariamente às 12:00")
        expect(translateCron("30 8 1 * *")).toBe("Executa às 08:30, no dia 1 do mês")
        expect(translateCron("0 22 * * 1-5")).toBe("Executa às 22:00, de segunda-feira a sexta-feira")
    })

    it("should translate lists, intervals, and increments", () => {
        expect(translateCron("15,30 9-17 * * 6")).toBe("Executa nos minutos 15 e 30, das 09:00 às 17:59, de/no sábado")
        expect(translateCron("0 0 1,15 1,6 *")).toBe("Executa às 00:00, nos dias 1 e 15 do mês, nos meses de Janeiro e Junho")
    })

    it("should return invalid message for wrong crons", () => {
        expect(translateCron("invalid")).toBe("Expressão cron inválida")
    })
})
