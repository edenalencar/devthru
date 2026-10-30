import { createHmac, timingSafeEqual } from 'crypto';

const UNSUBSCRIBE_PAGE_URL = 'https://www.devthru.com/newsletter/unsubscribe';

export function normalizeEmail(email: string): string {
    return email.toLowerCase().trim();
}

function signEmail(email: string, secret: string): string {
    return createHmac('sha256', secret).update(normalizeEmail(email)).digest('hex');
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
    const secret = process.env.UNSUBSCRIBE_SECRET;
    if (!secret) return false;

    const expected = Buffer.from(signEmail(email, secret));
    const received = Buffer.from(token);

    return expected.length === received.length && timingSafeEqual(expected, received);
}

/**
 * Sem UNSUBSCRIBE_SECRET o link sai sem token e o descadastro cai no fluxo de confirmação por e-mail.
 */
export function buildUnsubscribeUrl(email: string): string {
    const params = new URLSearchParams({ email });
    const secret = process.env.UNSUBSCRIBE_SECRET;

    if (secret) {
        params.set('token', signEmail(email, secret));
    }

    return `${UNSUBSCRIBE_PAGE_URL}?${params.toString()}`;
}
