export function generateCNH(): string {
    const digits = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10))
    return digits.join('')
}
