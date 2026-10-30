/**
 * Utilitário de Geração e Validação de Código de Barras (EAN-13 e Code 128)
 * Gera representações vetoriais SVG puras e cálculo de dígito verificador módulo 10.
 */

// Padrões de codificação EAN-13 (L-code, G-code, R-code)
const L_CODE = [
    "0001101", "0011001", "0010011", "0111101", "0100011",
    "0110001", "0101111", "0111011", "0110111", "0001011"
];

const G_CODE = [
    "0100111", "0110011", "0011011", "0100001", "0011101",
    "0111001", "0000101", "0010001", "0001001", "0010111"
];

const R_CODE = [
    "1110010", "1100110", "1101100", "1000010", "1011100",
    "1001110", "1010000", "1000100", "1001000", "1110100"
];

// O primeiro dígito determina o padrão de L e G para os 6 dígitos da esquerda
const FIRST_DIGIT_STRUCTURE = [
    "LLLLLL", "LLGLGG", "LLGGLG", "LLGGGL", "LGLLGG",
    "LGGLLG", "LGGGLL", "LGLGLG", "LGLGGL", "LGGLGL"
];

/**
 * Calcula o Dígito Verificador (DV) de um código EAN-13 a partir de 12 dígitos.
 * Algoritmo oficial GS1 (pesos alternados 1 e 3 da direita para a esquerda).
 */
export function calculateEan13Checksum(digits12: string): number {
    const clean = digits12.replace(/\D/g, "");
    if (clean.length < 12) return -1;

    let sum = 0;
    // Para os 12 dígitos (posições 1 a 12): posições ímpares peso 1, pares peso 3
    for (let i = 0; i < 12; i++) {
        const val = parseInt(clean[i], 10);
        sum += (i % 2 === 0) ? val * 1 : val * 3;
    }

    const mod = sum % 10;
    return mod === 0 ? 0 : 10 - mod;
}

/**
 * Valida se uma string é um EAN-13 válido (13 dígitos e DV correto).
 */
export function validateEan13(code: string): boolean {
    const clean = code.replace(/\D/g, "");
    if (clean.length !== 13) return false;

    const base12 = clean.substring(0, 12);
    const expectedDv = calculateEan13Checksum(base12);
    const actualDv = parseInt(clean[12], 10);

    return expectedDv === actualDv;
}

/**
 * Gera o padrão binário (1s e 0s) de um código de barras EAN-13.
 */
export function generateEan13Binary(code: string): string | null {
    let clean = code.replace(/\D/g, "");
    if (clean.length === 12) {
        clean += calculateEan13Checksum(clean);
    }
    if (clean.length !== 13) return null;

    const firstDigit = parseInt(clean[0], 10);
    const structure = FIRST_DIGIT_STRUCTURE[firstDigit];

    let binary = "101"; // Guard bar inicial (3 bits)

    // 6 dígitos da esquerda
    for (let i = 1; i <= 6; i++) {
        const digit = parseInt(clean[i], 10);
        const codeType = structure[i - 1];
        binary += (codeType === "L") ? L_CODE[digit] : G_CODE[digit];
    }

    binary += "01010"; // Guard bar central (5 bits)

    // 6 dígitos da direita (sempre R-code)
    for (let i = 7; i <= 12; i++) {
        const digit = parseInt(clean[i], 10);
        binary += R_CODE[digit];
    }

    binary += "101"; // Guard bar final (3 bits)

    return binary;
}

/**
 * Padrões de código 128 (Subset B - alfanumérico ASCII padrão)
 */
const CODE128B_START = "11010010000";
const CODE128_STOP = "1100011101011";

// Tabela compacta de Code 128 (Subset B: caracteres ASCII 32 a 126)
const CODE128_PATTERNS: string[] = [
    "11011001100", "11001101100", "11001100110", "10010011000", "10010001100",
    "10001001100", "10011001000", "10011000100", "10001100100", "11001001000",
    "11001000100", "11000100100", "10110011100", "10011011100", "10011001110",
    "10111001100", "10011101100", "10011100110", "11001110010", "11001011100",
    "11001001110", "11011100100", "11001110100", "11101101110", "11101001100",
    "11100101100", "11100100110", "11101100100", "11100110100", "11100110010",
    "11011011000", "11011000110", "11000110110", "10100011000", "10001011000",
    "10001000110", "10110001000", "10001101000", "10001100010", "11010001000",
    "11000101000", "11000100010", "10110111000", "10110001110", "10001101110",
    "10111011000", "10111000110", "10001110110", "11101110110", "11010001110",
    "11000101110", "11011101000", "11011100010", "11011101110", "11101011000",
    "11101000110", "11100010110", "11101101000", "11101100010", "11100011010",
    "11101111010", "11001000010", "11110001010", "10100110000", "10100001100",
    "10010110000", "10010000110", "10000101100", "10000100110", "10110010000",
    "10110000100", "10011010000", "10011000010", "10000110100", "10000110010",
    "11000010010", "11001010000", "11110111010", "11000010100", "10001111010",
    "10100111100", "10010111100", "10010011110", "10111100100", "10011110100",
    "10011110010", "11110100100", "11110010100", "11110010010", "11011011110",
    "11011110110", "11110110110", "10101111000", "10100011110", "10001011110",
    "10111101000"
];

export function generateCode128Binary(text: string): string | null {
    if (!text || text.length === 0) return null;

    let binary = CODE128B_START;
    let checksum = 104; // Start B tem valor 104

    for (let i = 0; i < text.length; i++) {
        const ascii = text.charCodeAt(i);
        const codeValue = ascii - 32;
        if (codeValue < 0 || codeValue >= CODE128_PATTERNS.length) return null;

        binary += CODE128_PATTERNS[codeValue];
        checksum += codeValue * (i + 1);
    }

    const checkValue = checksum % 103;
    binary += CODE128_PATTERNS[checkValue];
    binary += CODE128_STOP;

    return binary;
}

export interface BarcodeSVGOptions {
    type: 'ean13' | 'code128';
    value: string;
    width?: number;
    height?: number;
    showText?: boolean;
    barColor?: string;
    bgColor?: string;
}

/**
 * Renderiza um código de barras em formato SVG vetorial limpo.
 */
export function generateBarcodeSVG(options: BarcodeSVGOptions): { svg: string; formattedValue: string; isValid: boolean } {
    const {
        type,
        value,
        width = 2,
        height = 100,
        showText = true,
        barColor = '#000000',
        bgColor = '#ffffff',
    } = options;

    let binary: string | null = null;
    let formattedValue = value.trim();

    if (type === 'ean13') {
        const clean = value.replace(/\D/g, "");
        if (clean.length === 12) {
            formattedValue = clean + calculateEan13Checksum(clean);
        } else {
            formattedValue = clean;
        }
        binary = generateEan13Binary(formattedValue);
    } else {
        binary = generateCode128Binary(formattedValue);
    }

    if (!binary) {
        return { svg: '', formattedValue, isValid: false };
    }

    const totalBars = binary.length;
    const quietZone = 20; // margem de respiro lateral
    const svgWidth = totalBars * width + quietZone * 2;
    const textHeight = showText ? 25 : 0;
    const svgHeight = height + textHeight + 20;

    let rects = '';
    for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
            const x = quietZone + i * width;
            rects += `<rect x="${x}" y="10" width="${width}" height="${height}" fill="${barColor}" />`;
        }
    }

    let textElement = '';
    if (showText) {
        textElement = `<text x="${svgWidth / 2}" y="${height + 25}" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="${barColor}">${formattedValue}</text>`;
    }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${svgWidth} ${svgHeight}" width="${svgWidth}" height="${svgHeight}">
  <rect width="100%" height="100%" fill="${bgColor}" />
  ${rects}
  ${textElement}
</svg>`;

    return { svg, formattedValue, isValid: true };
}

