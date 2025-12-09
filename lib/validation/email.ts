import { DISPOSABLE_DOMAINS } from "./disposable-domains"
import { z } from "zod"

export function isDisposableEmail(email: string): boolean {
    const domain = email.split('@')[1]?.toLowerCase()
    if (!domain) return false
    return DISPOSABLE_DOMAINS.includes(domain as any)
}

// Strict email regex:
// 1. Standard chars
// 2. @ symbol
// 3. Domain part
// 4. TLD of at least 2 chars (e.g. .co, .br, .com)
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

export const emailSchema = z.string()
    .email("Email inválido")
    .regex(emailRegex, "Formato de email inválido")
    .refine((email) => !isDisposableEmail(email), {
        message: "Emails temporários não são permitidos. Por favor, use um email corporativo ou pessoal válido."
    })

export function validateEmail(email: string) {
    return emailSchema.safeParse(email)
}
