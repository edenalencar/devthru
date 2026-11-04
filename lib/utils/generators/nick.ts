// Gerador de nicks: combina palavras por estilo com conectores, números e (opcionalmente) o nome do usuário.

export type NickStyle = 'gamer' | 'fofo' | 'sombrio' | 'engracado' | 'aleatorio'

interface WordSet {
    prefixes: string[]
    cores: string[]
    suffixes: string[]
}

export const NICK_STYLES: Record<Exclude<NickStyle, 'aleatorio'>, { label: string } & WordSet> = {
    gamer: {
        label: 'Gamer',
        prefixes: ['Pro', 'Mega', 'Ultra', 'Dark', 'Neo', 'Cyber', 'Turbo', 'Hyper', 'Xx', 'Mr', 'Lord', 'King', 'Capitão', 'Mestre', 'Rei'],
        cores: ['Sniper', 'Ninja', 'Dragão', 'Lobo', 'Fênix', 'Tigre', 'Falcão', 'Viper', 'Titan', 'Raptor', 'Spectro', 'Trovão', 'Blaze', 'Storm', 'Ghost', 'Reaper', 'Hunter', 'Samurai', 'Gladiador', 'Corvo'],
        suffixes: ['BR', 'Pro', 'GG', 'X', 'Zika', 'Craque', 'Brabo', 'Rush', 'Top1', 'MVP', 'Clutch', 'Lendário'],
    },
    fofo: {
        label: 'Fofo',
        prefixes: ['Mini', 'Docinho', 'Lili', 'Pitty', 'Nana', 'Bubu', 'Cute', 'Little', 'Baby', 'Mel'],
        cores: ['Panda', 'Gatinha', 'Coelhinho', 'Morango', 'Pudim', 'Nuvem', 'Estrelinha', 'Pipoca', 'Bolinho', 'Ursinho', 'Algodão', 'Cereja', 'Pandinha', 'Abelhinha', 'Florzinha'],
        suffixes: ['Fofa', 'Love', 'Doce', 'Cute', 'Rosa', 'Mimosa', 'Kawaii', 'Lindinha', 'Star', 'Bee'],
    },
    sombrio: {
        label: 'Sombrio',
        prefixes: ['Dark', 'Shadow', 'Night', 'Black', 'Blood', 'Dead', 'Lost', 'Silent', 'Cold', 'Void'],
        cores: ['Corvo', 'Sombra', 'Abismo', 'Ceifador', 'Eclipse', 'Fantasma', 'Lâmina', 'Noite', 'Caos', 'Espectro', 'Vazio', 'Névoa', 'Lua', 'Sina', 'Ruína'],
        suffixes: ['Sombrio', 'Eterno', 'Oculto', 'Maldito', 'Sem Alma', 'Silencioso', 'Noturno', 'Perdido', 'Nox', 'Zero'],
    },
    engracado: {
        label: 'Engraçado',
        prefixes: ['Seu', 'Dona', 'Tio', 'Tia', 'Mestre', 'Doutor', 'Professor', 'Capitão', 'Sr', 'Lord'],
        cores: ['Pastel', 'Coxinha', 'Pão de Queijo', 'Biscoito', 'Batata', 'Pamonha', 'Feijoada', 'Brigadeiro', 'Paçoca', 'Torresmo', 'Cuscuz', 'Tapioca', 'Miojo', 'Chinelo', 'Sabonete'],
        suffixes: ['Nervoso', 'Sem Freio', 'do Grau', 'Lagado', 'Bugado', 'Raiz', 'da Quebrada', 'Sem Wi-Fi', 'Atrasado', 'Dormindo'],
    },
}

export const NICK_STYLE_IDS = Object.keys(NICK_STYLES) as Exclude<NickStyle, 'aleatorio'>[]

export interface NickOptions {
    style: NickStyle
    name?: string
    numbers?: boolean
    count?: number
    random?: () => number
}

const pick = <T,>(list: T[], random: () => number): T => list[Math.floor(random() * list.length)]

function compact(text: string): string {
    // Remove espaços das palavras compostas: "Pão de Queijo" → "PãoDeQueijo"
    return text.split(/\s+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('')
}

function buildNick(style: Exclude<NickStyle, 'aleatorio'>, name: string, numbers: boolean, random: () => number): string {
    const set = NICK_STYLES[style]
    const core = name ? compact(name) : compact(pick(set.cores, random))
    const pattern = Math.floor(random() * 5)
    let nick: string
    switch (pattern) {
        case 0: nick = `${compact(pick(set.prefixes, random))}${core}`; break
        case 1: nick = `${core}${compact(pick(set.suffixes, random))}`; break
        case 2: nick = `${compact(pick(set.prefixes, random))}${core}${compact(pick(set.suffixes, random))}`; break
        case 3: nick = `${core}_${compact(pick(set.suffixes, random))}`; break
        default: nick = name ? `${compact(pick(set.cores, random))}${core}` : `${compact(pick(set.prefixes, random))}_${core}`
    }
    if (style === 'gamer' && nick.startsWith('Xx')) nick = `${nick}xX`
    if (numbers && random() < 0.6) nick += Math.floor(random() * 100).toString()
    return nick
}

/** Gera nicks únicos no estilo escolhido. O nome, se informado, vira o núcleo do nick. */
export function generateNicks({ style, name = '', numbers = true, count = 12, random = Math.random }: NickOptions): string[] {
    const cleanName = name.trim().replace(/[^\p{L}\p{N}\s]/gu, '').slice(0, 20)
    const result = new Set<string>()
    let attempts = 0
    while (result.size < count && attempts < count * 20) {
        const s = style === 'aleatorio' ? pick(NICK_STYLE_IDS, random) : style
        result.add(buildNick(s, cleanName, numbers, random))
        attempts++
    }
    return [...result]
}
