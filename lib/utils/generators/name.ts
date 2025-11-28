const FIRST_NAMES_MALE = [
    "João", "Pedro", "Lucas", "Gabriel", "Matheus", "Rafael", "Felipe", "Bruno",
    "Guilherme", "Rodrigo", "Thiago", "Leonardo", "Daniel", "Diego", "Carlos",
    "André", "Fernando", "Marcelo", "Paulo", "Ricardo", "Vinícius", "Gustavo",
    "Henrique", "Leandro", "Fábio", "Renato", "Eduardo", "Marcos", "Alexandre",
    "Caio", "Murilo", "Renan", "Igor", "Otávio", "Arthur", "Miguel", "Davi",
    "Bernardo", "Enzo", "Lorenzo", "Theo", "Samuel", "Benjamin", "Heitor"
]

const FIRST_NAMES_FEMALE = [
    "Maria", "Ana", "Juliana", "Fernanda", "Camila", "Amanda", "Beatriz",
    "Larissa", "Gabriela", "Mariana", "Letícia", "Rafaela", "Bianca", "Carla",
    "Patrícia", "Aline", "Tatiana", "Vanessa", "Priscila", "Renata", "Cristina",
    "Débora", "Bruna", "Carolina", "Natália", "Isabela", "Giovanna", "Sophia",
    "Alice", "Laura", "Helena", "Valentina", "Luna", "Manuela", "Lívia",
    "Cecília", "Elisa", "Marina", "Clara", "Luiza", "Melissa", "Nicole"
]

const LAST_NAMES = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves",
    "Pereira", "Lima", "Gomes", "Costa", "Ribeiro", "Martins", "Carvalho",
    "Rocha", "Almeida", "Nascimento", "Araújo", "Melo", "Barbosa", "Cardoso",
    "Correia", "Dias", "Fernandes", "Freitas", "Gonçalves", "Lopes", "Marques",
    "Mendes", "Miranda", "Monteiro", "Moreira", "Nunes", "Pinto", "Ramos",
    "Reis", "Rezende", "Ribeiro", "Rodrigues", "Santana", "Teixeira", "Vieira"
]

export type Gender = "male" | "female" | "random"

/**
 * Gera um nome completo brasileiro
 */
export function generateName(gender: Gender = "random"): string {
    const selectedGender = gender === "random"
        ? (Math.random() > 0.5 ? "male" : "female")
        : gender

    const firstNames = selectedGender === "male" ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]

    // Gera 1 ou 2 sobrenomes
    const numLastNames = Math.random() > 0.5 ? 2 : 1
    const lastNames: string[] = []

    for (let i = 0; i < numLastNames; i++) {
        let lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
        // Evita sobrenomes duplicados
        while (lastNames.includes(lastName)) {
            lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
        }
        lastNames.push(lastName)
    }

    return `${firstName} ${lastNames.join(" ")}`
}

/**
 * Gera múltiplos nomes
 */
export function generateMultipleNames(count: number, gender: Gender = "random"): string[] {
    return Array.from({ length: count }, () => generateName(gender))
}

/**
 * Gera apenas o primeiro nome
 */
export function generateFirstName(gender: Gender = "random"): string {
    const selectedGender = gender === "random"
        ? (Math.random() > 0.5 ? "male" : "female")
        : gender

    const firstNames = selectedGender === "male" ? FIRST_NAMES_MALE : FIRST_NAMES_FEMALE
    return firstNames[Math.floor(Math.random() * firstNames.length)]
}

/**
 * Gera apenas o sobrenome
 */
export function generateLastName(): string {
    return LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
}
