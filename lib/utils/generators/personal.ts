export function generateBirthDate(minAge: number = 18, maxAge: number = 80): Date {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - maxAge, 0, 1)
    const maxDate = new Date(today.getFullYear() - minAge, 11, 31)
    return new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()))
}

export function generateHeight(): number {
    // 1.50 to 1.95
    return Math.floor((Math.random() * 0.45 + 1.50) * 100) / 100
}

export function generateWeight(): number {
    // 50 to 120
    return Math.floor(Math.random() * 70) + 50
}

export function generateBloodType(): string {
    const types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    return types[Math.floor(Math.random() * types.length)]
}

export function generateSign(date: Date): string {
    const day = date.getDate()
    const month = date.getMonth() + 1

    if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) return "Capricórnio"
    if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) return "Aquário"
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Peixes"
    if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) return "Áries"
    if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) return "Touro"
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gêmeos"
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Câncer"
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leão"
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgem"
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra"
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Escorpião"
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagitário"
    return "Desconhecido"
}
