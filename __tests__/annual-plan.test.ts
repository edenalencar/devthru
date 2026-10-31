import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ANNUAL_PLANS, getAnnualPeriodEnd, getSubscriptionPeriodEnd, isAnnualPlan } from '@/lib/stripe/plans';

const updates: Array<Record<string, unknown>> = [];
const sendEmail = vi.fn();
const constructEvent = vi.fn();

vi.mock('next/headers', () => ({
    headers: async () => ({ get: () => 'assinatura' }),
}));

vi.mock('@/lib/stripe/server', () => ({
    stripe: { webhooks: { constructEvent: (...args: unknown[]) => constructEvent(...args) } },
}));

vi.mock('@/lib/email', () => ({
    sendEmail: async (...args: unknown[]) => {
        sendEmail(...args);
        return { error: null };
    },
}));

vi.mock('@supabase/supabase-js', () => ({
    createClient: () => ({
        from: () => ({
            update: (values: Record<string, unknown>) => ({
                eq: async () => {
                    updates.push(values);
                    return { error: null };
                },
            }),
            select: () => ({
                eq: () => ({
                    maybeSingle: async () => ({ data: { email: 'dev@exemplo.com', full_name: 'Dev' } }),
                }),
            }),
        }),
    }),
}));

function annualSession(overrides: Record<string, unknown> = {}) {
    return {
        mode: 'payment',
        payment_status: 'paid',
        created: Date.UTC(2026, 0, 15) / 1000,
        customer: 'cus_teste',
        metadata: { userId: 'user-1', plan: 'pro' },
        ...overrides,
    };
}

async function deliver(type: string, session: Record<string, unknown>) {
    constructEvent.mockReturnValue({ type, data: { object: session } });
    const { POST } = await import('@/app/api/stripe/webhook/route');
    return POST(new Request('http://localhost/api/stripe/webhook', { method: 'POST', body: '{}' }));
}

describe('Plano anual', () => {
    beforeEach(() => {
        updates.length = 0;
        sendEmail.mockReset();
        vi.stubEnv('NEXT_PUBLIC_SUPABASE_URL', 'http://localhost');
        vi.stubEnv('SUPABASE_SERVICE_ROLE_KEY', 'teste');
    });

    it('cobra o equivalente a 10 meses do plano mensal', () => {
        expect(ANNUAL_PLANS.pro.amount).toBe(2900 * 10);
        expect(ANNUAL_PLANS.business.amount).toBe(9900 * 10);
    });

    it('aceita somente planos conhecidos', () => {
        expect(isAnnualPlan('pro')).toBe(true);
        expect(isAnnualPlan('business')).toBe(true);
        expect(isAnnualPlan('enterprise')).toBe(false);
        expect(isAnnualPlan(undefined)).toBe(false);
    });

    it('termina 12 meses depois do pagamento', () => {
        expect(getAnnualPeriodEnd(new Date('2026-03-10T12:00:00Z')).toISOString()).toBe('2027-03-10T12:00:00.000Z');
    });

    it('lê o fim do período no item da assinatura', () => {
        expect(getSubscriptionPeriodEnd({ items: { data: [{ current_period_end: 1800000000 }] } })).toBe(1800000000);
        expect(getSubscriptionPeriodEnd({ current_period_end: 1700000000 })).toBe(1700000000);
        expect(getSubscriptionPeriodEnd({})).toBeNull();
    });

    it('ativa o plano quando o cartão já foi pago', async () => {
        const res = await deliver('checkout.session.completed', annualSession());

        expect(res.status).toBe(200);
        expect(updates).toHaveLength(1);
        expect(updates[0]).toMatchObject({
            subscription_tier: 'pro',
            stripe_subscription_id: null,
            stripe_customer_id: 'cus_teste',
            trial_ends_at: null,
            cancel_at_period_end: true,
        });
        expect(updates[0].current_period_end).toBe('2027-01-15T00:00:00.000Z');
        expect(sendEmail).toHaveBeenCalledOnce();
    });

    it('aguarda a confirmação do Pix antes de ativar', async () => {
        const res = await deliver('checkout.session.completed', annualSession({ payment_status: 'unpaid' }));

        expect(res.status).toBe(200);
        expect(updates).toHaveLength(0);
        expect(sendEmail).not.toHaveBeenCalled();
    });

    it('ativa o plano quando o Pix é confirmado', async () => {
        await deliver('checkout.session.async_payment_succeeded', annualSession());

        expect(updates).toHaveLength(1);
        expect(updates[0].subscription_tier).toBe('pro');
    });

    it('recusa metadados de plano inválidos', async () => {
        const res = await deliver(
            'checkout.session.completed',
            annualSession({ metadata: { userId: 'user-1', plan: 'enterprise' } })
        );

        expect(res.status).toBe(400);
        expect(updates).toHaveLength(0);
    });
});
