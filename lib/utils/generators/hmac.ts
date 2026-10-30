/**
 * Utilitário de Geração e Validação de Assinaturas HMAC (Web Crypto API)
 * Suporta SHA-256, SHA-512, SHA-384 e SHA-1 com codificação em Hex e Base64.
 */

export type HMACAlgorithm = 'SHA-256' | 'SHA-512' | 'SHA-384' | 'SHA-1';
export type HMACOutputFormat = 'hex' | 'base64';

export interface HMACResult {
    hex: string;
    base64: string;
    algorithm: HMACAlgorithm;
    messageLength: number;
    secretLength: number;
    snippets: {
        nodejs: string;
        python: string;
    };
}

export async function computeHMAC(
    message: string,
    secret: string,
    algorithm: HMACAlgorithm = 'SHA-256'
): Promise<HMACResult> {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const messageData = encoder.encode(message);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: algorithm } },
        false,
        ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
    const signatureBytes = new Uint8Array(signatureBuffer);

    // Formato Hexadecimal
    const hex = Array.from(signatureBytes)
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    // Formato Base64
    let binary = '';
    for (let i = 0; i < signatureBytes.byteLength; i++) {
        binary += String.fromCharCode(signatureBytes[i]);
    }
    const base64 = btoa(binary);

    // Gera snippets de código seguros para validação no backend
    const nodeAlgo = algorithm.toLowerCase().replace('-', '');
    const pythonAlgo = algorithm.toLowerCase().replace('-', '');

    const nodejsSnippet = `import crypto from 'node:crypto';

// Validação de Webhook com proteção contra Timing Attack
function verifyWebhookSignature(payload: string, signatureReceived: string, secretKey: string): boolean {
  const hmac = crypto.createHmac('${nodeAlgo}', secretKey);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');

  // Buffer seguro contra timing attacks
  const receivedBuf = Buffer.from(signatureReceived, 'utf8');
  const expectedBuf = Buffer.from(expectedSignature, 'utf8');

  if (receivedBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(receivedBuf, expectedBuf);
}`;

    const pythonSnippet = `import hmac
import hashlib

def verify_webhook_signature(payload: str, signature_received: str, secret_key: str) -> bool:
    expected_signature = hmac.new(
        secret_key.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.${pythonAlgo}
    ).hexdigest()

    # Comparação segura em tempo constante contra timing attacks
    return hmac.compare_digest(expected_signature, signature_received)`;

    return {
        hex,
        base64,
        algorithm,
        messageLength: message.length,
        secretLength: secret.length,
        snippets: {
            nodejs: nodejsSnippet,
            python: pythonSnippet,
        },
    };
}

/**
 * Valida se uma assinatura fornecida confere com a mensagem e a chave secreta.
 */
export async function verifyHMAC(
    message: string,
    secret: string,
    expectedSignature: string,
    algorithm: HMACAlgorithm = 'SHA-256'
): Promise<boolean> {
    try {
        const result = await computeHMAC(message, secret, algorithm);
        const cleanExpected = expectedSignature.trim().toLowerCase();
        return (
            result.hex.toLowerCase() === cleanExpected ||
            result.base64 === expectedSignature.trim()
        );
    } catch {
        return false;
    }
}

