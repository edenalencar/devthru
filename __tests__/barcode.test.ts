import { describe, it, expect } from 'vitest';
import { calculateEan13Checksum, validateEan13, generateBarcodeSVG } from '@/lib/utils/generators/barcode';

describe('Barcode Engine (EAN-13 & Code 128)', () => {
    it('calculates the correct EAN-13 checksum (modulo 10 GS1)', () => {
        // Exemplo oficial de produto brasileiro (789 = Brasil)
        const digits12 = '789100031550';
        const checksum = calculateEan13Checksum(digits12);
        expect(checksum).toBe(7);
    });

    it('validates a legitimate 13-digit EAN-13 code', () => {
        const validCode = '7891000315507';
        expect(validateEan13(validCode)).toBe(true);
    });

    it('rejects an EAN-13 with corrupted checksum or invalid length', () => {
        expect(validateEan13('7891000315508')).toBe(false); // DV errado
        expect(validateEan13('7891000315')).toBe(false); // Apenas 10 dígitos
    });

    it('generates a valid SVG representation for EAN-13', () => {
        const result = generateBarcodeSVG({
            type: 'ean13',
            value: '7891000315507',
            width: 2,
            height: 80,
            showText: true
        });

        expect(result.isValid).toBe(true);
        expect(result.svg).toContain('<svg');
        expect(result.svg).toContain('7891000315507');
        expect(result.svg).toContain('</svg>');
    });

    it('generates a valid SVG representation for Code 128', () => {
        const result = generateBarcodeSVG({
            type: 'code128',
            value: 'DEVTHRU-LOG-2026',
            width: 2,
            height: 70,
            showText: true
        });

        expect(result.isValid).toBe(true);
        expect(result.svg).toContain('<svg');
        expect(result.svg).toContain('DEVTHRU-LOG-2026');
    });
});

