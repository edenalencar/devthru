import { describe, it, expect, vi } from 'vitest';
import * as emailModule from '@/lib/email';
import { sendWelcomeEmailIfNeeded } from '@/lib/email/welcome';

describe('Welcome Email Concurrency & Race Condition Simulation', () => {
    it('guarantees ONLY 1 email is sent even when 5 requests fire simultaneously', async () => {
        // Espionamos a função sendEmail e simulamos um delay de 200ms na rede do Resend
        let sendCount = 0;
        vi.spyOn(emailModule, 'sendEmail').mockImplementation(async (params) => {
            sendCount++;
            console.log(`[Spy] Envio de e-mail interceptado (#${sendCount}) para: ${params.to}`);
            await new Promise(r => setTimeout(r, 200));
            return { data: { id: 'mock-email-id-' + sendCount } as any, error: null };
        });

        const mockUserId = 'user-race-test-' + Date.now();
        const mockUserEmail = 'concorrencia@devthru.com';

        // Simulação do PostgreSQL com row-lock condicional
        let isAlreadyClaimed = false;

        const mockClient = {
            from: () => ({
                select: () => ({
                    eq: () => ({
                        maybeSingle: async () => ({
                            data: { welcome_sent: isAlreadyClaimed, full_name: 'Usuário Concorrente' },
                            error: null,
                        }),
                    }),
                }),
                update: () => ({
                    eq: () => ({
                        or: () => ({
                            select: async () => {
                                // Se a reserva já foi adquirida, o banco retorna 0 linhas
                                if (isAlreadyClaimed) {
                                    return { data: [], error: null };
                                }
                                isAlreadyClaimed = true;
                                return { data: [{ id: mockUserId, full_name: 'Usuário Concorrente' }], error: null };
                            },
                        }),
                    }),
                }),
            }),
        };

        console.log('\n🚀 Disparando 5 requisições rigorosamente simultâneas (Promise.all)...');

        // Disparamos 5 requisições exatamente no mesmo tick
        const results = await Promise.all([
            sendWelcomeEmailIfNeeded({ userId: mockUserId, userEmail: mockUserEmail, supabaseClient: mockClient }),
            sendWelcomeEmailIfNeeded({ userId: mockUserId, userEmail: mockUserEmail, supabaseClient: mockClient }),
            sendWelcomeEmailIfNeeded({ userId: mockUserId, userEmail: mockUserEmail, supabaseClient: mockClient }),
            sendWelcomeEmailIfNeeded({ userId: mockUserId, userEmail: mockUserEmail, supabaseClient: mockClient }),
            sendWelcomeEmailIfNeeded({ userId: mockUserId, userEmail: mockUserEmail, supabaseClient: mockClient }),
        ]);

        console.log('\n📊 Resultados individuais de cada uma das 5 requisições:');
        results.forEach((res, i) => {
            console.log(`  Req #${i + 1}: success=${res.success}, sent=${res.sent}, reason=${res.reason || 'N/A'}`);
        });

        // Verificações rigorosas:
        // 1. O gateway de e-mail só pode ter sido invocado EXATAMENTE 1 vez em todas as 5 requisições simultâneas!
        expect(sendCount).toBe(1);

        // 2. Todas as 5 requisições concorrentes retornam sucesso sem disparar e-mails duplicados
        results.forEach(res => expect(res.success).toBe(true));

        console.log('\n🚀 Disparando uma 6ª requisição subsequente (após o término da promessa)...');
        const req6 = await sendWelcomeEmailIfNeeded({
            userId: mockUserId,
            userEmail: mockUserEmail,
            supabaseClient: mockClient,
        });

        console.log(`  Req #6: success=${req6.success}, sent=${req6.sent}, reason=${req6.reason}`);

        // 3. A requisição subsequente deve retornar immediately already_sent
        expect(req6.success).toBe(true);
        expect(req6.sent).toBe(false);
        expect(req6.reason).toBe('already_sent');

        // 4. E o contador de e-mails disparados continua rigorosamente 1!
        expect(sendCount).toBe(1);
    });
});
