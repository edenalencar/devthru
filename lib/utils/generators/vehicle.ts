export function generateRenavam(): string {
    const random = Math.floor(Math.random() * 9999999999).toString().padStart(10, '0')
    const renavamWithoutDigit = random.substring(0, 10)

    const renavamArr = renavamWithoutDigit.split("").reverse()
    let sum = 0
    for (let i = 0; i < 8; i++) {
        sum += parseInt(renavamArr[i]) * (i + 2)
    }
    sum += parseInt(renavamArr[8]) * 2
    sum += parseInt(renavamArr[9]) * 3

    const mod = sum % 11
    const digit = 11 - mod
    const finalDigit = digit >= 10 ? 0 : digit

    return renavamWithoutDigit + finalDigit
}

export function generateChassis(): string {
    // 1. WMI (World Manufacturer Identifier) - 3 chars
    // Using common Brazilian WMIs for realism
    const wmis = ["9BW", "9BD", "9BG", "93H", "936", "935", "9BF", "94D"]
    const wmi = wmis[Math.floor(Math.random() * wmis.length)]

    // 2. VDS (Vehicle Descriptor Section) - 6 chars (Euclidean random)
    const alphaNum = "ABCDEFGHJKLMNPRSTUVWXYZ0123456789"
    let vds = ""
    for (let i = 0; i < 5; i++) {
        vds += alphaNum[Math.floor(Math.random() * alphaNum.length)]
    }
    // 9th digit is check digit (placeholder for now)
    const checkDigitPlaceholder = "0"

    // 3. VIS (Vehicle Identifier Section) - 8 chars
    // 10th char is Year Code (L=2020, M=2021, N=2022, P=2023, R=2024, S=2025)
    const yearCodes = "LMNPRS"
    const yearCode = yearCodes[Math.floor(Math.random() * yearCodes.length)]

    // 11th char is Plant Code
    const plantCode = alphaNum[Math.floor(Math.random() * alphaNum.length)]

    // 12th-17th are sequential numbers
    let sequential = ""
    for (let i = 0; i < 6; i++) {
        sequential += Math.floor(Math.random() * 10).toString()
    }

    const vis = yearCode + plantCode + sequential

    // Calculate Check Digit (9th position)
    // Values: 0-9=0-9, A=1, B=2, C=3, D=4, E=5, F=6, G=7, H=8, J=1, K=2, L=3, M=4, N=5, P=7, R=9, S=2, T=3, U=4, V=5, W=6, X=7, Y=8, Z=9
    const values: { [key: string]: number } = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'P': 7, 'R': 9, 'S': 2,
        'T': 3, 'U': 4, 'V': 5, 'W': 6, 'X': 7, 'Y': 8, 'Z': 9,
        '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9
    }

    const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

    const tempVin = wmi + vds + checkDigitPlaceholder + vis
    let sum = 0
    for (let i = 0; i < 17; i++) {
        if (i === 8) continue // Skip check digit position in sum
        const char = tempVin[i]
        sum += values[char] * weights[i]
    }

    const remainder = sum % 11
    let checkDigit = ""
    if (remainder === 10) checkDigit = "X"
    else checkDigit = remainder.toString()

    return wmi + vds + checkDigit + vis
}
