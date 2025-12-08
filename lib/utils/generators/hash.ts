export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512"

/**
 * Gera hash MD5 (usando SubtleCrypto não é possível, então usamos uma implementação simples)
 */
async function md5(text: string): Promise<string> {
    // MD5 não é suportado nativamente no SubtleCrypto
    // Vamos usar uma implementação simplificada ou retornar um placeholder
    // Para produção, seria melhor usar uma biblioteca como crypto-js
    return "MD5 não disponível nativamente no navegador"
}

/**
 * Gera hash usando Web Crypto API
 */
async function generateHash(text: string, algorithm: string): Promise<string> {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest(algorithm, data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}

/**
 * Gera hash SHA-1
 */
export async function sha1(text: string): Promise<string> {
    return generateHash(text, "SHA-1")
}

/**
 * Gera hash SHA-256
 */
export async function sha256(text: string): Promise<string> {
    return generateHash(text, "SHA-256")
}

/**
 * Gera hash SHA-512
 */
export async function sha512(text: string): Promise<string> {
    return generateHash(text, "SHA-512")
}

/**
 * Gera todos os hashes de uma vez
 */
export async function generateAllHashes(text: string): Promise<Record<HashAlgorithm, string>> {
    const [sha1Hash, sha256Hash, sha512Hash] = await Promise.all([
        sha1(text),
        sha256(text),
        sha512(text),
    ])

    return {
        "MD5": "MD5 não disponível (use biblioteca externa)",
        "SHA-1": sha1Hash,
        "SHA-256": sha256Hash,
        "SHA-512": sha512Hash,
    }
}
