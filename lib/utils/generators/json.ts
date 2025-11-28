export interface JSONValidationResult {
    isValid: boolean
    error?: string
    lineNumber?: number
}

/**
 * Valida JSON
 */
export function validateJSON(text: string): JSONValidationResult {
    try {
        JSON.parse(text)
        return { isValid: true }
    } catch (error) {
        if (error instanceof SyntaxError) {
            // Tenta extrair o número da linha do erro
            const match = error.message.match(/position (\d+)/)
            const position = match ? parseInt(match[1]) : undefined

            let lineNumber: number | undefined
            if (position !== undefined) {
                lineNumber = text.substring(0, position).split('\n').length
            }

            return {
                isValid: false,
                error: error.message,
                lineNumber,
            }
        }
        return {
            isValid: false,
            error: "Erro desconhecido ao validar JSON",
        }
    }
}

/**
 * Formata (prettify) JSON
 */
export function formatJSON(text: string, indent: number = 2): string {
    try {
        const parsed = JSON.parse(text)
        return JSON.stringify(parsed, null, indent)
    } catch (error) {
        throw new Error("JSON inválido. Não é possível formatar.")
    }
}

/**
 * Minifica JSON
 */
export function minifyJSON(text: string): string {
    try {
        const parsed = JSON.parse(text)
        return JSON.stringify(parsed)
    } catch (error) {
        throw new Error("JSON inválido. Não é possível minificar.")
    }
}

/**
 * Conta linhas, caracteres e tamanho
 */
export function getJSONStats(text: string): {
    lines: number
    characters: number
    bytes: number
} {
    return {
        lines: text.split('\n').length,
        characters: text.length,
        bytes: new Blob([text]).size,
    }
}
