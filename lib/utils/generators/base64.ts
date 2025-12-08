/**
 * Codifica texto para Base64
 */
export function encodeBase64(text: string): string {
    try {
        return btoa(unescape(encodeURIComponent(text)))
    } catch (error) {
        throw new Error("Erro ao codificar para Base64")
    }
}

/**
 * Decodifica Base64 para texto
 */
export function decodeBase64(base64: string): string {
    try {
        return decodeURIComponent(escape(atob(base64)))
    } catch (error) {
        throw new Error("Base64 inválido ou corrompido")
    }
}

/**
 * Valida se uma string é Base64 válida
 */
export function isValidBase64(str: string): boolean {
    try {
        return btoa(atob(str)) === str
    } catch (error) {
        return false
    }
}
