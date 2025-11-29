export interface Address {
    street: string
    number: number
    neighborhood: string
    city: string
    state: string
    zipCode: string
    full: string
}

export function generateAddress(): Address {
    const types = ['Rua', 'Avenida', 'Travessa', 'Alameda', 'Praça']
    const names = ['das Flores', 'Brasil', 'Paulista', 'dos Andradas', 'Tiradentes', 'Sete de Setembro', 'Amazonas', 'Bela Vista', 'Santo Antônio', 'São João', 'Pedro II', 'Getúlio Vargas']
    const neighborhoods = ['Centro', 'Jardim das Flores', 'Vila Nova', 'Santo Antônio', 'Bela Vista', 'São José', 'Boa Vista', 'Santa Mônica']

    const cities = [
        { city: 'São Paulo', state: 'SP' },
        { city: 'Rio de Janeiro', state: 'RJ' },
        { city: 'Belo Horizonte', state: 'MG' },
        { city: 'Curitiba', state: 'PR' },
        { city: 'Porto Alegre', state: 'RS' },
        { city: 'Salvador', state: 'BA' },
        { city: 'Recife', state: 'PE' },
        { city: 'Brasília', state: 'DF' },
        { city: 'Fortaleza', state: 'CE' },
        { city: 'Manaus', state: 'AM' },
        { city: 'Goiânia', state: 'GO' },
        { city: 'Belém', state: 'PA' }
    ]

    const type = types[Math.floor(Math.random() * types.length)]
    const name = names[Math.floor(Math.random() * names.length)]
    const neighborhood = neighborhoods[Math.floor(Math.random() * neighborhoods.length)]
    const location = cities[Math.floor(Math.random() * cities.length)]
    const number = Math.floor(Math.random() * 2000) + 1
    const cep = `${Math.floor(Math.random() * 89999) + 10000}-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`

    return {
        street: `${type} ${name}`,
        number,
        neighborhood,
        city: location.city,
        state: location.state,
        zipCode: cep,
        full: `${type} ${name}, ${number} - ${neighborhood}, ${location.city} - ${location.state}, ${cep}`
    }
}
