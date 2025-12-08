export function generateLicensePlate(type: 'mercosul' | 'old' = 'mercosul'): string {
    const generateRandomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26))
    const generateRandomNumber = () => Math.floor(Math.random() * 10).toString()

    let plate = ""
    // Common: AAA
    plate += generateRandomLetter() + generateRandomLetter() + generateRandomLetter()

    if (type === "mercosul") {
        // Mercosul: AAA0A00
        plate += generateRandomNumber()
        plate += generateRandomLetter()
        plate += generateRandomNumber() + generateRandomNumber()
    } else {
        // Old: AAA-0000
        plate += "-"
        plate += generateRandomNumber() + generateRandomNumber() + generateRandomNumber() + generateRandomNumber()
    }

    return plate
}
