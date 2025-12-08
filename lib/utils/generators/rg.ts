export function generateRG(formatted: boolean = false): string {
    const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10))
    const rg = digits.join('')

    if (formatted) {
        return `${rg.slice(0, 2)}.${rg.slice(2, 5)}.${rg.slice(5, 8)}-${rg.slice(8)}`
    }

    return rg
}
