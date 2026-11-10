// Estimativa das verbas rescisórias da CLT (valores brutos, sem INSS e IRRF).
import { parseISODate, toISODate, ymdDiff } from "./dates"

const DAY_MS = 86_400_000

export type SeveranceReason = "sem_justa_causa" | "pedido_demissao" | "justa_causa" | "acordo"
/**
 * indenizado: empresa dispensa e paga o aviso sem trabalho;
 * trabalhado: o aviso foi cumprido (a data de saída já é o fim do aviso);
 * nao_cumprido: no pedido de demissão, o empregado não cumpre o aviso e pode ter 1 salário descontado.
 */
export type NoticeType = "indenizado" | "trabalhado" | "nao_cumprido"

export interface SeveranceInput {
    salary: number
    admission: string // AAAA-MM-DD
    exit: string // último dia trabalhado
    reason: SeveranceReason
    notice: NoticeType
    /** Períodos de férias vencidas e não tiradas (0, 1 ou 2). */
    vestedVacationPeriods: number
    /** Saldo do FGTS para fins rescisórios; sem ele a multa é estimada. */
    fgtsBalance?: number | null
}

export interface SeveranceItem {
    key: string
    label: string
    value: number
    detail: string
}

export interface SeveranceResult {
    items: SeveranceItem[]
    total: number
    noticeDays: number
    projectedEnd: string
    serviceYears: number
    fgts: {
        fine: number
        rate: number
        estimated: boolean
        withdrawal: string
    }
    unemploymentInsurance: boolean
}

const round2 = (n: number) => Math.round(n * 100) / 100

function addYears(t: number, years: number): number {
    const d = new Date(t)
    const y = d.getUTCFullYear() + years
    const last = new Date(Date.UTC(y, d.getUTCMonth() + 1, 0)).getUTCDate()
    return Date.UTC(y, d.getUTCMonth(), Math.min(d.getUTCDate(), last))
}

/** Dias de aviso prévio: 30 + 3 por ano completo de serviço, no máximo 90 (Lei 12.506/2011). */
export function noticeDaysFor(serviceYears: number): number {
    return Math.min(90, 30 + 3 * Math.max(0, serviceYears))
}

/** Avos de 13º: meses do ano com 15 dias ou mais trabalhados (Lei 4.090/1962). */
export function thirteenthAvos(admission: number, end: number, year: number): number {
    let avos = 0
    for (let m = 0; m < 12; m++) {
        const from = Math.max(admission, Date.UTC(year, m, 1))
        const to = Math.min(end, Date.UTC(year, m + 1, 0))
        if (to < from) continue
        if (Math.round((to - from) / DAY_MS) + 1 >= 15) avos++
    }
    return avos
}

/**
 * Férias proporcionais: meses do período aquisitivo em curso, com a fração
 * maior que 14 dias contando como mês inteiro (art. 146, parágrafo único, CLT).
 * Retorna também quantos períodos completos existem até a data informada.
 */
export function vacationAvos(admission: number, end: number): { avos: number; completedPeriods: number } {
    const dayAfter = end + DAY_MS
    const completedPeriods = ymdDiff(admission, dayAfter).years
    const periodStart = addYears(admission, completedPeriods)
    const { months, days } = ymdDiff(periodStart, dayAfter)
    return { avos: Math.min(12, months + (days >= 15 ? 1 : 0)), completedPeriods }
}

/** Dias de saldo de salário no mês da saída, no mês comercial de 30 dias. */
export function salaryBalanceDays(admission: number, exit: number): number {
    const e = new Date(exit)
    const monthStart = Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), 1)
    const monthEnd = Date.UTC(e.getUTCFullYear(), e.getUTCMonth() + 1, 0)
    const from = Math.max(admission, monthStart)
    if (from === monthStart && exit === monthEnd) return 30
    return Math.min(30, Math.round((exit - from) / DAY_MS) + 1)
}

export function calculateSeverance(input: SeveranceInput): SeveranceResult | null {
    const adm = parseISODate(input.admission)
    const exit = parseISODate(input.exit)
    if (adm === null || exit === null || exit < adm || !(input.salary > 0)) return null

    const { salary, reason } = input
    const daily = salary / 30
    const serviceYears = ymdDiff(adm, exit + DAY_MS).years
    const items: SeveranceItem[] = []
    const push = (key: string, label: string, value: number, detail: string) => {
        if (Math.abs(value) >= 0.005) items.push({ key, label, value: round2(value), detail })
    }

    // Aviso prévio
    const employerDismissal = reason === "sem_justa_causa" || reason === "acordo"
    const noticeDays = employerDismissal ? noticeDaysFor(serviceYears) : 30
    const indemnified = employerDismissal && input.notice === "indenizado"
    const projectedEnd = indemnified ? exit + noticeDays * DAY_MS : exit

    // Saldo de salário
    const balanceDays = salaryBalanceDays(adm, exit)
    push("saldo", "Saldo de salário", daily * balanceDays, `${balanceDays} dia(s) trabalhado(s) no mês da saída`)

    if (indemnified) {
        const half = reason === "acordo"
        push(
            "aviso",
            "Aviso prévio indenizado",
            daily * noticeDays * (half ? 0.5 : 1),
            `${noticeDays} dias (30 + 3 por ano completo)${half ? ", pago pela metade no acordo" : ""}`
        )
    }

    const hasProportional = reason !== "justa_causa"

    // 13º proporcional (ano da saída e, se a projeção virar o ano, o seguinte)
    if (hasProportional) {
        let avos = 0
        for (let y = new Date(exit).getUTCFullYear(); y <= new Date(projectedEnd).getUTCFullYear(); y++) {
            avos += thirteenthAvos(adm, projectedEnd, y)
        }
        push("decimo", "13º salário proporcional", (salary / 12) * avos, `${avos}/12 avos${indemnified ? ", com a projeção do aviso" : ""}`)
    }

    // Férias
    const third = (v: number) => v / 3
    const vested = Math.max(0, Math.floor(input.vestedVacationPeriods || 0))
    if (vested > 0) {
        push("ferias_vencidas", "Férias vencidas", salary * vested, `${vested} período(s) completo(s) não tirado(s)`)
    }
    let vacationBase = salary * vested
    if (hasProportional) {
        const atExit = vacationAvos(adm, exit)
        const atProjection = vacationAvos(adm, projectedEnd)
        const completedByNotice = atProjection.completedPeriods - atExit.completedPeriods
        if (completedByNotice > 0) {
            push("ferias_aviso", "Férias do período completado pelo aviso", salary * completedByNotice, "período aquisitivo fechado com a projeção do aviso")
            vacationBase += salary * completedByNotice
        }
        const prop = (salary / 12) * atProjection.avos
        push("ferias_prop", "Férias proporcionais", prop, `${atProjection.avos}/12 avos do período aquisitivo atual`)
        vacationBase += prop
    }
    push("terco", "1/3 constitucional sobre férias", third(vacationBase), "um terço do total de férias acima")

    if (reason === "pedido_demissao" && input.notice === "nao_cumprido") {
        push("desconto_aviso", "Desconto do aviso não cumprido", -salary, "art. 487, § 2º, da CLT: até 30 dias de salário")
    }

    const total = round2(items.reduce((s, i) => s + i.value, 0))

    // FGTS
    const rate = reason === "sem_justa_causa" ? 0.4 : reason === "acordo" ? 0.2 : 0
    const months = ymdDiff(adm, exit + DAY_MS)
    const totalMonths = months.years * 12 + months.months + (months.days >= 15 ? 1 : 0)
    const estimated = input.fgtsBalance == null || !(input.fgtsBalance >= 0)
    // Estimativa: 8% ao mês sobre o salário atual, mais 8% do 13º (1/12 por mês)
    const balance = estimated ? salary * 0.08 * totalMonths * (13 / 12) : (input.fgtsBalance as number)
    const withdrawal =
        reason === "sem_justa_causa"
            ? "Saque de todo o saldo do FGTS"
            : reason === "acordo"
              ? "Saque de até 80% do saldo do FGTS"
              : "Sem saque do FGTS por este motivo"

    return {
        items,
        total,
        noticeDays: employerDismissal ? noticeDays : 30,
        projectedEnd: toISODate(projectedEnd),
        serviceYears,
        fgts: { fine: round2(balance * rate), rate, estimated, withdrawal },
        unemploymentInsurance: reason === "sem_justa_causa",
    }
}
