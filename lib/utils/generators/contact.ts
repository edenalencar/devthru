export function generateEmail(name: string): string {
    const domains = ['gmail.com', 'outlook.com', 'yahoo.com', 'hotmail.com', 'uol.com.br', 'bol.com.br', 'terra.com.br']
    const cleanName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '.')
    const domain = domains[Math.floor(Math.random() * domains.length)]
    const random = Math.floor(Math.random() * 1000)
    return `${cleanName}${random}@${domain}`
}

export function generatePhone(mobile: boolean = true): string {
    const ddd = Math.floor(Math.random() * 90) + 10

    if (mobile) {
        const part1 = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        return `(${ddd}) 9${part1}-${part2}`
    } else {
        const part1 = Math.floor(Math.random() * 8000 + 2000).toString()
        const part2 = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
        return `(${ddd}) ${part1}-${part2}`
    }
}
