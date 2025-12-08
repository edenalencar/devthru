export const MALE_NAMES = ['Miguel', 'Arthur', 'Gael', 'Heitor', 'Theo', 'Davi', 'Gabriel', 'Bernardo', 'Samuel', 'João Miguel', 'Enzo Gabriel', 'Pedro', 'Lorenzo', 'Lucas', 'Matheus', 'Nicolas', 'Henrique', 'Rafael', 'Isaac', 'Murilo', 'Gustavo', 'Felipe', 'Bruno', 'Caio', 'Daniel', 'Eduardo', 'Fernando', 'Guilherme', 'Hugo', 'Igor', 'João', 'Leonardo', 'Marcelo', 'Otávio', 'Paulo', 'Renato', 'Rodrigo', 'Sérgio', 'Thiago', 'Vitor']
export const FEMALE_NAMES = ['Helena', 'Alice', 'Laura', 'Maria Alice', 'Sophia', 'Manuela', 'Maitê', 'Liz', 'Cecília', 'Isabella', 'Luísa', 'Eloá', 'Heloísa', 'Júlia', 'Ayla', 'Maria Luísa', 'Isis', 'Elisa', 'Antonella', 'Valentina', 'Ana', 'Beatriz', 'Camila', 'Daniela', 'Eduarda', 'Fernanda', 'Gabriela', 'Heloisa', 'Isabela', 'Juliana', 'Larissa', 'Mariana', 'Natália', 'Olívia', 'Patrícia', 'Rafaela', 'Sara', 'Tatiana', 'Vitória', 'Yasmin']
export const LAST_NAMES = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida', 'Lopes', 'Soares', 'Fernandes', 'Vieira', 'Barbosa', 'Rocha', 'Dias', 'Nascimento', 'Andrade', 'Moreira', 'Nunes', 'Marques', 'Machado', 'Mendes', 'Freitas', 'Cardoso', 'Ramos', 'Gonçalves', 'Santana', 'Teixeira']

export function generateName(gender?: 'M' | 'F'): string {
    const g = gender || (Math.random() > 0.5 ? 'M' : 'F')
    const first = g === 'M'
        ? MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)]
        : FEMALE_NAMES[Math.floor(Math.random() * FEMALE_NAMES.length)]
    const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    const last2 = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
    return `${first} ${last} ${last2}`
}
