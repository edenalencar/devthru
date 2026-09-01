import { describe, it, expect } from 'vitest';
import { formatEmailSender } from './email';

describe('formatEmailSender', () => {
    it('deve formatar um e-mail simples (bare email) com o nome padrão DevThru', () => {
        const result = formatEmailSender('newsletter@devthru.com', 'DevThru', 'newsletter@devthru.com');
        expect(result).toBe('DevThru <newsletter@devthru.com>');
    });

    it('deve formatar contato@devthru.com para o formato com nome amigável DevThru', () => {
        const result = formatEmailSender('contato@devthru.com');
        expect(result).toBe('DevThru <contato@devthru.com>');
    });

    it('deve preservar um endereço já formatado com nome amigável', () => {
        const result = formatEmailSender('DevThru Newsletter <newsletter@devthru.com>');
        expect(result).toBe('DevThru Newsletter <newsletter@devthru.com>');
    });

    it('deve limpar aspas em volta do nome amigável', () => {
        const result = formatEmailSender('"DevThru Suporte" <suporte@devthru.com>');
        expect(result).toBe('DevThru Suporte <suporte@devthru.com>');
    });

    it('deve aplicar o nome padrão quando recebe apenas colchetes angulares <email@dominio.com>', () => {
        const result = formatEmailSender('<newsletter@devthru.com>', 'DevThru');
        expect(result).toBe('DevThru <newsletter@devthru.com>');
    });

    it('deve usar valores de fallback quando o input for vazio ou indefinido', () => {
        expect(formatEmailSender(undefined, 'DevThru', 'contato@devthru.com')).toBe('DevThru <contato@devthru.com>');
        expect(formatEmailSender('', 'DevThru', 'newsletter@devthru.com')).toBe('DevThru <newsletter@devthru.com>');
        expect(formatEmailSender('   ', 'DevThru', 'newsletter@devthru.com')).toBe('DevThru <newsletter@devthru.com>');
    });
});
