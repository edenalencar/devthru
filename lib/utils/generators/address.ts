const STREET_TYPES = ["Rua", "Avenida", "Travessa", "Alameda", "Praça"]

const STREET_NAMES = [
    "das Flores", "do Comércio", "Principal", "Central", "da Paz", "da Liberdade",
    "dos Andradas", "Sete de Setembro", "Quinze de Novembro", "Tiradentes",
    "Dom Pedro II", "Getúlio Vargas", "Santos Dumont", "Barão do Rio Branco",
    "Marechal Deodoro", "Presidente Vargas", "Rio Branco", "São João",
    "das Acácias", "dos Ipês", "das Palmeiras", "das Orquídeas"
]

const CITIES_BY_STATE: Record<string, string[]> = {
    SP: ["São Paulo", "Campinas", "Santos", "São Bernardo do Campo", "Guarulhos", "Osasco"],
    RJ: ["Rio de Janeiro", "Niterói", "Duque de Caxias", "Nova Iguaçu", "São Gonçalo"],
    MG: ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora", "Betim"],
    RS: ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas", "Santa Maria"],
    BA: ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna"],
    PR: ["Curitiba", "Londrina", "Maringá", "Ponta Grossa", "Cascavel"],
    PE: ["Recife", "Jaboatão dos Guararapes", "Olinda", "Caruaru", "Petrolina"],
    CE: ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
    SC: ["Florianópolis", "Joinville", "Blumenau", "São José", "Criciúma"],
    GO: ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziânia"],
}

export interface Address {
    street: string
    number: number
    complement?: string
    neighborhood: string
    city: string
    state: string
    cep: string
}

/**
 * Gera um CEP válido
 */
export function generateCEP(): string {
    const digits = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10))
    return digits.join("")
}

/**
 * Formata um CEP
 */
export function formatCEP(cep: string): string {
    const cleaned = cep.replace(/\D/g, "")
    return cleaned.replace(/(\d{5})(\d{3})/, "$1-$2")
}

/**
 * Gera um endereço completo
 */
export function generateAddress(state?: string): Address {
    const states = Object.keys(CITIES_BY_STATE)
    const selectedState = state || states[Math.floor(Math.random() * states.length)]
    const cities = CITIES_BY_STATE[selectedState] || CITIES_BY_STATE.SP

    const streetType = STREET_TYPES[Math.floor(Math.random() * STREET_TYPES.length)]
    const streetName = STREET_NAMES[Math.floor(Math.random() * STREET_NAMES.length)]
    const number = Math.floor(Math.random() * 9999) + 1
    const city = cities[Math.floor(Math.random() * cities.length)]
    const cep = generateCEP()

    const neighborhoods = ["Centro", "Jardim América", "Vila Nova", "Bela Vista", "Boa Vista"]
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)]

    return {
        street: `${streetType} ${streetName}`,
        number,
        neighborhood,
        city,
        state: selectedState,
        cep: formatCEP(cep),
    }
}

/**
 * Formata endereço completo como string
 */
export function formatAddress(address: Address): string {
    return `${address.street}, ${address.number}
${address.neighborhood}
${address.city} - ${address.state}
CEP: ${address.cep}`
}

/**
 * Gera múltiplos endereços
 */
export function generateMultipleAddresses(count: number, state?: string): Address[] {
    return Array.from({ length: count }, () => generateAddress(state))
}
