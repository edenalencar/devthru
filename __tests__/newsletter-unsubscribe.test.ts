import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { NextRequest } from 'next/server';
import { buildUnsubscribeUrl, verifyUnsubscribeToken } from '@/lib/newsletter/unsubscribe-token';

const updates: Array<{ table: string; values: Record<string, unknown>; email: string }> = [];
const lookups: Record<string, unknown> = {};
const sendEmail = vi.fn();

vi.mock('@/lib/email', () => ({
    sendEmail: (...args: unknown[]) => sendEmail(...args),
}));

vi.mock('@/lib/supabase/admin', () => ({
    createAdminClient: () => ({
        from: (table: string) => ({
            select: () => ({
                eq: () => ({
                    maybeSingle: async () => ({ data: lookups[table] ?? null }),
                }),
            }),
            update: (values: Record<string, unknown>) => ({
                eq: async (_column: string, email: string) => {
                    updates.push({ table, values, email });
                    return { error: null };
                },
            }),
        }),
    }),
}));

function tokenFor(email: string) {
    return new URL(buildUnsubscribeUrl(email)).searchParams.get('token') as string;
}

async function post(body: Record<string, unknown>) {
    const { POST } = await import('@/app/api/newsletter/unsubscribe/route');
    const res = await POST(new NextRequest('http://localhost/api/newsletter/unsubscribe', {
        method: 'POST',
        body: JSON.stringify(body),
    }));
    return { status: res.status, data: await res.json() };
}

describe('Newsletter unsubscribe', () => {
    beforeEach(() => {
        vi.stubEnv('UNSUBSCRIBE_SECRET', 'test-secret');
        updates.length = 0;
        sendEmail.mockReset();
        delete lookups.profiles;
        delete lookups.newsletter_subscribers;
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('accepts a token only for the email it was issued to', () => {
        const token = tokenFor('Dev@Exemplo.com');

        expect(verifyUnsubscribeToken('dev@exemplo.com', token)).toBe(true);
        expect(verifyUnsubscribeToken('outra@exemplo.com', token)).toBe(false);
        expect(verifyUnsubscribeToken('dev@exemplo.com', 'invalido')).toBe(false);
    });

    it('rejects every token when the secret is not configured', () => {
        const token = tokenFor('dev@exemplo.com');
        vi.stubEnv('UNSUBSCRIBE_SECRET', '');

        expect(verifyUnsubscribeToken('dev@exemplo.com', token)).toBe(false);
    });

    it('deactivates both lists with a valid token', async () => {
        const { status, data } = await post({ email: 'dev@exemplo.com', token: tokenFor('dev@exemplo.com') });

        expect(status).toBe(200);
        expect(data).toEqual({ success: true });
        expect(updates.map(u => u.table)).toEqual(['profiles', 'newsletter_subscribers']);
        expect(updates[0].values).toEqual({ newsletter_subscribed: false });
        expect(updates[1].values.active).toBe(false);
    });

    it('requires email confirmation when the link has no token', async () => {
        lookups.profiles = { id: 'user-1' };

        const { status, data } = await post({ email: 'dev@exemplo.com' });

        expect(status).toBe(200);
        expect(data.confirmationRequired).toBe(true);
        expect(updates).toHaveLength(0);
        expect(sendEmail).toHaveBeenCalledOnce();
        expect(sendEmail.mock.calls[0][0].to).toBe('dev@exemplo.com');
    });

    it('does not reveal or email addresses outside the lists', async () => {
        const { data } = await post({ email: 'desconhecido@exemplo.com', token: 'forjado' });

        expect(data.confirmationRequired).toBe(true);
        expect(updates).toHaveLength(0);
        expect(sendEmail).not.toHaveBeenCalled();
    });
});
