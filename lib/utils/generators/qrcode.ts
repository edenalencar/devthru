import QRCode from "qrcode"

export type QRCodeSize = "small" | "medium" | "large"
export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H"

const SIZE_MAP: Record<QRCodeSize, number> = {
    small: 200,
    medium: 400,
    large: 600,
}

/**
 * Gera um QR Code como Data URL
 */
export async function generateQRCode(
    text: string,
    size: QRCodeSize = "medium",
    errorCorrectionLevel: ErrorCorrectionLevel = "M"
): Promise<string> {
    try {
        const dataUrl = await QRCode.toDataURL(text, {
            width: SIZE_MAP[size],
            errorCorrectionLevel,
            margin: 2,
        })
        return dataUrl
    } catch (error) {
        throw new Error("Erro ao gerar QR Code")
    }
}

/**
 * Gera um QR Code como Canvas
 */
export async function generateQRCodeCanvas(
    canvas: HTMLCanvasElement,
    text: string,
    size: QRCodeSize = "medium",
    errorCorrectionLevel: ErrorCorrectionLevel = "M"
): Promise<void> {
    try {
        await QRCode.toCanvas(canvas, text, {
            width: SIZE_MAP[size],
            errorCorrectionLevel,
            margin: 2,
        })
    } catch (error) {
        throw new Error("Erro ao gerar QR Code no canvas")
    }
}

/**
 * Retorna tamanhos disponíveis
 */
export function getQRCodeSizes(): QRCodeSize[] {
    return ["small", "medium", "large"]
}

/**
 * Retorna níveis de correção de erro
 */
export function getErrorCorrectionLevels(): ErrorCorrectionLevel[] {
    return ["L", "M", "Q", "H"]
}
