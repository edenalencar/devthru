import { describe, it, expect } from "vitest"
import { calculateSeverance, noticeDaysFor, salaryBalanceDays, type SeveranceInput } from "@/lib/utils/calculators/severance"
import { parseISODate } from "@/lib/utils/calculators/dates"

const base: SeveranceInput = {
    salary: 3000,
    admission: "2024-03-10",
    exit: "2026-11-20",
    reason: "sem_justa_causa",
    notice: "indenizado",
    vestedVacationPeriods: 0,
    fgtsBalance: 5000,
}
const byKey = (r: ReturnType<typeof calculateSeverance>) => Object.fromEntries(r!.items.map((i) => [i.key, i.value]))

describe("aviso prévio e saldo", () => {
    it("soma 3 dias por ano completo até 90", () => {
        expect(noticeDaysFor(0)).toBe(30)
        expect(noticeDaysFor(1)).toBe(33)
        expect(noticeDaysFor(20)).toBe(90)
        expect(noticeDaysFor(25)).toBe(90)
    })

    it("usa o mês comercial de 30 dias", () => {
        const d = (s: string) => parseISODate(s)!
        expect(salaryBalanceDays(d("2020-01-01"), d("2026-02-28"))).toBe(30)
        expect(salaryBalanceDays(d("2020-01-01"), d("2026-11-20"))).toBe(20)
        expect(salaryBalanceDays(d("2026-05-10"), d("2026-05-20"))).toBe(11)
    })
})

describe("calculadora de rescisão", () => {
    it("demissão sem justa causa com aviso indenizado", () => {
        const r = calculateSeverance(base)!
        expect(r.serviceYears).toBe(2)
        expect(r.noticeDays).toBe(36)
        expect(r.projectedEnd).toBe("2026-12-26")
        expect(byKey(r)).toEqual({ saldo: 2000, aviso: 3600, decimo: 3000, ferias_prop: 2500, terco: 833.33 })
        expect(r.total).toBe(11933.33)
        expect(r.fgts).toMatchObject({ fine: 2000, rate: 0.4, estimated: false })
        expect(r.unemploymentInsurance).toBe(true)
    })

    it("justa causa: só saldo e férias vencidas com 1/3", () => {
        const r = calculateSeverance({ ...base, reason: "justa_causa", vestedVacationPeriods: 1 })!
        expect(byKey(r)).toEqual({ saldo: 2000, ferias_vencidas: 3000, terco: 1000 })
        expect(r.total).toBe(6000)
        expect(r.fgts.fine).toBe(0)
        expect(r.unemploymentInsurance).toBe(false)
    })

    it("pedido de demissão sem cumprir o aviso desconta 1 salário", () => {
        const r = calculateSeverance({ ...base, reason: "pedido_demissao", notice: "nao_cumprido" })!
        expect(byKey(r)).toEqual({ saldo: 2000, decimo: 2750, ferias_prop: 2000, terco: 666.67, desconto_aviso: -3000 })
        expect(r.total).toBe(4416.67)
    })

    it("acordo: aviso indenizado e multa do FGTS pela metade", () => {
        const r = calculateSeverance({ ...base, reason: "acordo" })!
        expect(byKey(r).aviso).toBe(1800)
        expect(r.total).toBe(10133.33)
        expect(r.fgts).toMatchObject({ fine: 1000, rate: 0.2 })
    })

    it("a projeção do aviso pode fechar um período de férias", () => {
        // Admitido em 10/12/2025, sai em 20/11/2026: 0 ano completo = 30 dias de aviso, projeção até 20/12/2026
        const r = calculateSeverance({ ...base, admission: "2025-12-10" })!
        expect(r.projectedEnd).toBe("2026-12-20")
        const k = byKey(r)
        expect(k.ferias_aviso).toBe(3000)
        expect(k.ferias_prop).toBeUndefined()
    })

    it("estima a multa quando o saldo do FGTS não é informado", () => {
        const r = calculateSeverance({ ...base, fgtsBalance: null })!
        expect(r.fgts.estimated).toBe(true)
        expect(r.fgts.fine).toBeGreaterThan(0)
    })

    it("rejeita dados inválidos", () => {
        expect(calculateSeverance({ ...base, exit: "2020-01-01" })).toBeNull()
        expect(calculateSeverance({ ...base, salary: 0 })).toBeNull()
    })
})
