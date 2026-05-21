export interface CronFields {
    minute: string
    hour: string
    dayOfMonth: string
    month: string
    dayOfWeek: string
}

const MONTHS: Record<number, string> = {
    1: "Janeiro", 2: "Fevereiro", 3: "Março", 4: "Abril",
    5: "Maio", 6: "Junho", 7: "Julho", 8: "Agosto",
    9: "Setembro", 10: "Outubro", 11: "Novembro", 12: "Dezembro"
}

const DAYS_OF_WEEK: Record<number, string> = {
    0: "domingo", 1: "segunda-feira", 2: "terça-feira",
    3: "quarta-feira", 4: "quinta-feira", 5: "sexta-feira",
    6: "sábado", 7: "domingo"
}

/**
 * Valida se uma string de cron expression tem 5 partes e caracteres válidos
 */
export function validateCron(cron: string): boolean {
    const parts = cron.trim().split(/\s+/)
    if (parts.length !== 5) return false

    const [min, hour, dom, month, dow] = parts

    const minRegex = /^(\*|([0-5]?\d)(-[0-5]?\d)?(,[0-5]?\d)*)(\/[1-9]\d*)?$/
    const hourRegex = /^(\*|((1?\d|2[0-3]))(-((1?\d|2[0-3])))?(,((1?\d|2[0-3])))*)(\/[1-9]\d*)?$/
    const domRegex = /^(\*|([1-9]|[12]\d|3[01])(-([1-9]|[12]\d|3[01]))?(,([1-9]|[12]\d|3[01]))*)(\/[1-9]\d*)?$/
    const monthRegex = /^(\*|([1-9]|1[0-2])(-([1-9]|1[0-2]))?(,([1-9]|1[0-2]))*)(\/[1-9]\d*)?$/
    const dowRegex = /^(\*|([0-7])(-[0-7])?(,[0-7])*)(\/[1-9]\d*)?$/

    return (
        minRegex.test(min) &&
        hourRegex.test(hour) &&
        domRegex.test(dom) &&
        monthRegex.test(month) &&
        dowRegex.test(dow)
    )
}

/**
 * Parseia uma expressão cron em um objeto estruturado de campos
 */
export function parseCron(cron: string): CronFields {
    const parts = cron.trim().split(/\s+/)
    if (parts.length !== 5) {
        return { minute: "*", hour: "*", dayOfMonth: "*", month: "*", dayOfWeek: "*" }
    }
    return {
        minute: parts[0],
        hour: parts[1],
        dayOfMonth: parts[2],
        month: parts[3],
        dayOfWeek: parts[4]
    }
}

/**
 * Converte um campo individual do cron para descrição em texto
 */
function translateField(
    field: string,
    type: "minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek"
): string {
    if (field === "*") {
        switch (type) {
            case "minute": return "a cada minuto"
            case "hour": return "a cada hora"
            case "dayOfMonth": return "todos os dias"
            case "month": return "todos os meses"
            case "dayOfWeek": return "todos os dias da semana"
        }
    }

    // Apenas incremento: */X
    if (field.startsWith("*/")) {
        const step = field.substring(2)
        switch (type) {
            case "minute": return `a cada ${step} minutos`
            case "hour": return `a cada ${step} horas`
            case "dayOfMonth": return `a cada ${step} dias`
            case "month": return `a cada ${step} meses`
            case "dayOfWeek": return `a cada ${step} dias da semana`
        }
    }

    // Intervalo com incremento: A-B/X
    if (field.includes("/") && field.includes("-")) {
        const [range, step] = field.split("/")
        const [start, end] = range.split("-")
        switch (type) {
            case "minute": return `a cada ${step} minutos do minuto ${start} ao ${end}`
            case "hour": return `a cada ${step} horas da hora ${start} às ${end}`
            case "dayOfMonth": return `a cada ${step} dias do dia ${start} ao ${end}`
            case "month": return `a cada ${step} meses do mês ${start} ao ${end}`
            case "dayOfWeek": {
                const sDay = DAYS_OF_WEEK[Number(start)] || start
                const eDay = DAYS_OF_WEEK[Number(end)] || end
                return `a cada ${step} dias de ${sDay} a ${eDay}`
            }
        }
    }

    // Intervalo básico: A-B
    if (field.includes("-") && !field.includes(",")) {
        const [start, end] = field.split("-")
        switch (type) {
            case "minute": return `do minuto ${start} ao minuto ${end}`
            case "hour": return `das ${start.padStart(2, "0")}:00 às ${end.padStart(2, "0")}:59`
            case "dayOfMonth": return `do dia ${start} ao dia ${end} do mês`
            case "month": return `de ${MONTHS[Number(start)]} a ${MONTHS[Number(end)]}`
            case "dayOfWeek": {
                const sDay = DAYS_OF_WEEK[Number(start)] || start
                const eDay = DAYS_OF_WEEK[Number(end)] || end
                return `de ${sDay} a ${eDay}`
            }
        }
    }

    // Lista de valores: A,B,C
    if (field.includes(",")) {
        const values = field.split(",")
        const lastVal = values.pop()
        let joined = ""

        if (type === "month") {
            const mapped = [...values.map(v => MONTHS[Number(v)] || v), MONTHS[Number(lastVal)] || lastVal]
            const last = mapped.pop()
            joined = mapped.join(", ") + " e " + last
            return `nos meses de ${joined}`
        }

        if (type === "dayOfWeek") {
            const mapped = [...values.map(v => DAYS_OF_WEEK[Number(v)] || v), DAYS_OF_WEEK[Number(lastVal)] || lastVal]
            const last = mapped.pop()
            joined = mapped.join(", ") + " e " + last
            return `às/aos ${joined}s`
        }

        if (type === "dayOfMonth") {
            joined = values.join(", ") + " e " + lastVal
            return `nos dias ${joined} do mês`
        }

        if (type === "hour") {
            const mapped = [...values.map(v => `${v.padStart(2, "0")}:00`), `${lastVal?.padStart(2, "0")}:00`]
            const last = mapped.pop()
            joined = mapped.join(", ") + " e " + last
            return `às ${joined}`
        }

        if (type === "minute") {
            joined = values.join(", ") + " e " + lastVal
            return `nos minutos ${joined}`
        }
    }

    // Valor único simples
    const valNum = Number(field)
    switch (type) {
        case "minute": return `no minuto ${field}`
        case "hour": return `às ${field.padStart(2, "0")}:00`
        case "dayOfMonth": return `no dia ${field} do mês`
        case "month": return `em ${MONTHS[valNum] || field}`
        case "dayOfWeek": return `de/no ${DAYS_OF_WEEK[valNum] || field}`
    }

    return field
}

/**
 * Traduz a expressão cron inteira para português legível
 */
export function translateCron(cron: string): string {
    if (!validateCron(cron)) {
        return "Expressão cron inválida"
    }

    const { minute, hour, dayOfMonth, month, dayOfWeek } = parseCron(cron)

    // Casos especiais simplificados para ficarem mais naturais
    
    // Todo minuto: * * * * *
    if (minute === "*" && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
        return "Executa a cada minuto, de cada hora, todos os dias"
    }

    // A cada X minutos: */X * * * *
    if (minute.startsWith("*/") && hour === "*" && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
        const step = minute.substring(2)
        return `Executa a cada ${step} minutos, todos os dias`
    }

    // A cada X horas na hora 0 do minuto: 0 */X * * *
    if (minute === "0" && hour.startsWith("*/") && dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
        const step = hour.substring(2)
        return `Executa a cada ${step} horas, no minuto zero, todos os dias`
    }

    // Diariamente em hora e minuto específicos: M H * * *
    if (!minute.includes("*") && !minute.includes(",") && !minute.includes("/") && !minute.includes("-") &&
        !hour.includes("*") && !hour.includes(",") && !hour.includes("/") && !hour.includes("-") &&
        dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
        return `Executa diariamente às ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`
    }

    // Tradução padrão por parte
    const tMin = translateField(minute, "minute")
    const tHour = translateField(hour, "hour")
    const tDom = translateField(dayOfMonth, "dayOfMonth")
    const tMonth = translateField(month, "month")
    const tDow = translateField(dayOfWeek, "dayOfWeek")

    const parts: string[] = []

    // Lógica para combinar Minuto e Hora de forma natural se forem valores estáticos
    if (!minute.includes("*") && !minute.includes(",") && !minute.includes("/") && !minute.includes("-") &&
        !hour.includes("*") && !hour.includes(",") && !hour.includes("/") && !hour.includes("-")) {
        parts.push(`às ${hour.padStart(2, "0")}:${minute.padStart(2, "0")}`)
    } else {
        // Se a hora for *, mas o minuto for estático (ex: 30 * * * *)
        if (hour === "*" && !minute.includes("*") && !minute.includes(",") && !minute.includes("/") && !minute.includes("-")) {
            parts.push(`no minuto ${minute} de cada hora`)
        } else {
            parts.push(tMin)
            if (hour !== "*") {
                parts.push(tHour)
            }
        }
    }

    if (dayOfMonth !== "*") {
        parts.push(tDom)
    }

    if (dayOfWeek !== "*") {
        // Se tiver dia do mês e dia da semana definidos, junta-se de forma natural
        parts.push(tDow)
    }

    if (month !== "*") {
        parts.push(tMonth)
    }

    // Constrói a frase
    const joined = parts.join(", ")
    // Capitaliza a primeira letra
    return "Executa " + joined.charAt(0).toLowerCase() + joined.slice(1)
}
