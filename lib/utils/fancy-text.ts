// Letras diferentes: converte texto para estilos Unicode (negrito, cursiva, gótica...)
// que podem ser colados em bios, nicks e redes sociais.

export interface FancyStyle {
    id: string
    name: string
    transform: (text: string) => string
}

const UPPER_A = 0x41
const LOWER_A = 0x61
const DIGIT_0 = 0x30

interface AlphabetSpec {
    upper?: number
    lower?: number
    digits?: number
    exceptions?: Record<string, string>
}

function mapAlphabet(text: string, spec: AlphabetSpec): string {
    // NFD separa acentos para que "ã" vire base estilizada + til combinante.
    return Array.from(text.normalize('NFD'))
        .map((ch) => {
            if (spec.exceptions?.[ch]) return spec.exceptions[ch]
            const code = ch.codePointAt(0)!
            if (spec.upper !== undefined && code >= UPPER_A && code <= UPPER_A + 25) {
                return String.fromCodePoint(spec.upper + code - UPPER_A)
            }
            if (spec.lower !== undefined && code >= LOWER_A && code <= LOWER_A + 25) {
                return String.fromCodePoint(spec.lower + code - LOWER_A)
            }
            if (spec.digits !== undefined && code >= DIGIT_0 && code <= DIGIT_0 + 9) {
                return String.fromCodePoint(spec.digits + code - DIGIT_0)
            }
            return ch
        })
        .join('')
        .normalize('NFC')
}

function fromMap(text: string, map: Record<string, string>): string {
    return Array.from(text.normalize('NFD')).map((ch) => map[ch] ?? map[ch.toLowerCase()] ?? ch).join('').normalize('NFC')
}

function combining(text: string, mark: string): string {
    return Array.from(text).map((ch) => (/\s/.test(ch) ? ch : ch + mark)).join('')
}

const SMALL_CAPS: Record<string, string> = Object.fromEntries(
    'abcdefghijklmnopqrstuvwxyz'.split('').map((c, i) => [c, 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'[i]]),
)

const UPSIDE_DOWN: Record<string, string> = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ',
    n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z',
    '?': '¿', '!': '¡', '.': '˙', ',': "'", '(': ')', ')': '(',
}

export const FANCY_STYLES: FancyStyle[] = [
    { id: 'bold', name: 'Negrito', transform: (t) => mapAlphabet(t, { upper: 0x1d400, lower: 0x1d41a, digits: 0x1d7ce }) },
    { id: 'italic', name: 'Itálico', transform: (t) => mapAlphabet(t, { upper: 0x1d434, lower: 0x1d44e, exceptions: { h: 'ℎ' } }) },
    { id: 'bold-italic', name: 'Negrito itálico', transform: (t) => mapAlphabet(t, { upper: 0x1d468, lower: 0x1d482 }) },
    {
        id: 'script', name: 'Cursiva', transform: (t) => mapAlphabet(t, {
            upper: 0x1d49c, lower: 0x1d4b6,
            exceptions: { B: 'ℬ', E: 'ℰ', F: 'ℱ', H: 'ℋ', I: 'ℐ', L: 'ℒ', M: 'ℳ', R: 'ℛ', e: 'ℯ', g: 'ℊ', o: 'ℴ' },
        }),
    },
    { id: 'bold-script', name: 'Cursiva negrito', transform: (t) => mapAlphabet(t, { upper: 0x1d4d0, lower: 0x1d4ea }) },
    {
        id: 'fraktur', name: 'Gótica', transform: (t) => mapAlphabet(t, {
            upper: 0x1d504, lower: 0x1d51e,
            exceptions: { C: 'ℭ', H: 'ℌ', I: 'ℑ', R: 'ℜ', Z: 'ℨ' },
        }),
    },
    { id: 'bold-fraktur', name: 'Gótica negrito', transform: (t) => mapAlphabet(t, { upper: 0x1d56c, lower: 0x1d586 }) },
    {
        id: 'double-struck', name: 'Contorno', transform: (t) => mapAlphabet(t, {
            upper: 0x1d538, lower: 0x1d552, digits: 0x1d7d8,
            exceptions: { C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ' },
        }),
    },
    { id: 'sans-bold', name: 'Negrito sem serifa', transform: (t) => mapAlphabet(t, { upper: 0x1d5d4, lower: 0x1d5ee, digits: 0x1d7ec }) },
    { id: 'sans-italic', name: 'Itálico sem serifa', transform: (t) => mapAlphabet(t, { upper: 0x1d608, lower: 0x1d622 }) },
    { id: 'monospace', name: 'Máquina de escrever', transform: (t) => mapAlphabet(t, { upper: 0x1d670, lower: 0x1d68a, digits: 0x1d7f6 }) },
    { id: 'circled', name: 'Círculos', transform: (t) => mapAlphabet(t, { upper: 0x24b6, lower: 0x24d0 }) },
    { id: 'fullwidth', name: 'Largo', transform: (t) => mapAlphabet(t, { upper: 0xff21, lower: 0xff41, digits: 0xff10 }) },
    { id: 'small-caps', name: 'Versalete', transform: (t) => fromMap(t, SMALL_CAPS) },
    { id: 'strikethrough', name: 'Riscado', transform: (t) => combining(t, '̶') },
    { id: 'underline', name: 'Sublinhado', transform: (t) => combining(t, '̲') },
    { id: 'upside-down', name: 'De cabeça para baixo', transform: (t) => Array.from(fromMap(t, UPSIDE_DOWN)).reverse().join('') },
]
