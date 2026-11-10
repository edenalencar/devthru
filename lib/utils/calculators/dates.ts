// Contagem de dias entre datas, dias úteis e feriados nacionais.
// Tudo em UTC sobre strings "AAAA-MM-DD" para o fuso do navegador não mover a data.

const DAY_MS = 86_400_000

export interface Holiday {
    date: string // AAAA-MM-DD
    name: string
    optional?: boolean // ponto facultativo (Carnaval, Corpus Christi)
}

export function parseISODate(value: string): number | null {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
    if (!m) return null
    const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])]
    const t = Date.UTC(y, mo - 1, d)
    const check = new Date(t)
    if (check.getUTCFullYear() !== y || check.getUTCMonth() !== mo - 1 || check.getUTCDate() !== d) return null
    return t
}

export function toISODate(t: number): string {
    return new Date(t).toISOString().slice(0, 10)
}

/** Domingo de Páscoa (algoritmo de Meeus/Jones/Butcher, calendário gregoriano). */
export function easterSunday(year: number): number {
    const a = year % 19
    const b = Math.floor(year / 100)
    const c = year % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const month = Math.floor((h + l - 7 * m + 114) / 31)
    const day = ((h + l - 7 * m + 114) % 31) + 1
    return Date.UTC(year, month - 1, day)
}

/**
 * Feriados nacionais (Lei 662/1949, Lei 6.802/1980 e Lei 14.759/2023, que incluiu
 * a Consciência Negra a partir de 2024) e, marcados como optional, os pontos
 * facultativos de Carnaval e Corpus Christi.
 */
export function brazilianHolidays(year: number): Holiday[] {
    const fixed = (mmdd: string, name: string): Holiday => ({ date: `${year}-${mmdd}`, name })
    const easter = easterSunday(year)
    const rel = (offset: number, name: string, optional = false): Holiday => ({
        date: toISODate(easter + offset * DAY_MS),
        name,
        ...(optional ? { optional } : {}),
    })

    const list: Holiday[] = [
        fixed("01-01", "Confraternização Universal"),
        rel(-48, "Carnaval (segunda-feira)", true),
        rel(-47, "Carnaval (terça-feira)", true),
        rel(-2, "Sexta-feira Santa"),
        fixed("04-21", "Tiradentes"),
        fixed("05-01", "Dia do Trabalho"),
        rel(60, "Corpus Christi", true),
        fixed("09-07", "Independência do Brasil"),
        fixed("10-12", "Nossa Senhora Aparecida"),
        fixed("11-02", "Finados"),
        fixed("11-15", "Proclamação da República"),
        fixed("12-25", "Natal"),
    ]
    if (year >= 2024) list.push(fixed("11-20", "Dia Nacional de Zumbi e da Consciência Negra"))
    return list.sort((x, y) => x.date.localeCompare(y.date))
}

export interface CountOptions {
    /** Conta o dia final também (ex.: de 01 a 03 = 3 dias em vez de 2). */
    includeEnd?: boolean
    /** Considera Carnaval e Corpus Christi como dias não úteis. */
    includeOptional?: boolean
}

export interface DayCount {
    /** Dias corridos, com sinal: negativo quando a data final é anterior à inicial. */
    totalDays: number
    weeks: number
    remainingDays: number
    businessDays: number
    weekendDays: number
    holidaysOnWeekdays: Holiday[]
    years: number
    months: number
    days: number
}

function addMonthsClamped(t: number, months: number): number {
    const d = new Date(t)
    const y = d.getUTCFullYear()
    const m = d.getUTCMonth() + months
    const lastDay = new Date(Date.UTC(y, m + 1, 0)).getUTCDate()
    return Date.UTC(y, m, Math.min(d.getUTCDate(), lastDay))
}

/**
 * Diferença em anos, meses e dias (mesma regra do Period.between do Java):
 * soma os meses inteiros à data inicial, ajustando para o fim do mês quando
 * o dia não existe (31/01 + 1 mês = 28/02), e conta os dias que sobram.
 */
export function ymdDiff(startT: number, endT: number): { years: number; months: number; days: number } {
    const s = new Date(startT)
    const e = new Date(endT)
    let total = (e.getUTCFullYear() - s.getUTCFullYear()) * 12 + (e.getUTCMonth() - s.getUTCMonth())
    if (total > 0 && addMonthsClamped(startT, total) > endT) total--
    const days = Math.round((endT - addMonthsClamped(startT, total)) / DAY_MS)
    return { years: Math.floor(total / 12), months: total % 12, days }
}

export function countDays(start: string, end: string, opts: CountOptions = {}): DayCount | null {
    const a = parseISODate(start)
    const b = parseISODate(end)
    if (a === null || b === null) return null

    const sign = b >= a ? 1 : -1
    const from = Math.min(a, b)
    const to = Math.max(a, b)
    const extra = opts.includeEnd ? 1 : 0
    const span = Math.round((to - from) / DAY_MS) + extra

    // Dias considerados: de "from" até "to", excluindo o último se includeEnd = false
    const lastIncluded = opts.includeEnd ? to : to - DAY_MS
    const holidayMap = new Map<string, Holiday>()
    for (let y = new Date(from).getUTCFullYear(); y <= new Date(to).getUTCFullYear(); y++) {
        for (const h of brazilianHolidays(y)) {
            if (!h.optional || opts.includeOptional) holidayMap.set(h.date, h)
        }
    }

    let business = 0
    let weekend = 0
    const holidaysOnWeekdays: Holiday[] = []
    for (let t = from; t <= lastIncluded; t += DAY_MS) {
        const dow = new Date(t).getUTCDay()
        if (dow === 0 || dow === 6) {
            weekend++
            continue
        }
        const h = holidayMap.get(toISODate(t))
        if (h) holidaysOnWeekdays.push(h)
        else business++
    }

    const ymd = ymdDiff(from, opts.includeEnd ? to + DAY_MS : to)
    return {
        totalDays: sign * span,
        weeks: Math.floor(span / 7),
        remainingDays: span % 7,
        businessDays: business,
        weekendDays: weekend,
        holidaysOnWeekdays,
        ...ymd,
    }
}
