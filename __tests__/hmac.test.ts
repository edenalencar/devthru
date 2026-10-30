import { describe, it, expect } from 'vitest';
import { computeHMAC, verifyHMAC } from '@/lib/utils/generators/hmac';

describe('HMAC Generator & Validator Engine', () => {
    it('computes correct HMAC-SHA256 in hex and base64', async () => {
        const message = '{"event":"payment.created","amount":100}';
        const secret = 'my_super_secret_webhook_key';

        const result = await computeHMAC(message, secret, 'SHA-256');

        expect(result.algorithm).toBe('SHA-256');
        expect(result.hex).toHaveLength(64); // 256 bits = 64 hex chars
        expect(result.base64).toBeDefined();
        expect(result.snippets.nodejs).toContain('crypto.timingSafeEqual');
        expect(result.snippets.python).toContain('hmac.compare_digest');
    });

    it('computes correct HMAC-SHA512', async () => {
        const message = 'Hello World';
        const secret = 'secret';

        const result = await computeHMAC(message, secret, 'SHA-512');
        expect(result.hex).toHaveLength(128); // 512 bits = 128 hex chars
    });

    it('verifies signatures correctly and detects tampering', async () => {
        const message = 'valid_payload';
        const secret = 'secret123';

        const result = await computeHMAC(message, secret, 'SHA-256');

        // Confere com hex correto
        const isValidHex = await verifyHMAC(message, secret, result.hex, 'SHA-256');
        expect(isValidHex).toBe(true);

        // Confere com base64 correto
        const isValidBase64 = await verifyHMAC(message, secret, result.base64, 'SHA-256');
        expect(isValidBase64).toBe(true);

        // Falha com payload adulterado
        const isTampered = await verifyHMAC('tampered_payload', secret, result.hex, 'SHA-256');
        expect(isTampered).toBe(false);

        // Falha com secret errado
        const isWrongKey = await verifyHMAC(message, 'wrong_secret', result.hex, 'SHA-256');
        expect(isWrongKey).toBe(false);
    });
});
