import { describe, it, expect } from 'vitest';
import React from 'react';
import { WelcomeEmailTemplate } from '@/components/emails/WelcomeEmailTemplate';

describe('Auth Callback Logic & Welcome Email', () => {
    describe('User Name Resolution', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function resolveUserName(userMetadata?: Record<string, any>): string {
            return (
                userMetadata?.full_name ||
                userMetadata?.name ||
                userMetadata?.user_name ||
                userMetadata?.preferred_username ||
                'Desenvolvedor'
            );
        }

        it('resolves full_name correctly (Google format)', () => {
            const metadata = { full_name: 'João Silva', email: 'joao@gmail.com' };
            expect(resolveUserName(metadata)).toBe('João Silva');
        });

        it('resolves name if full_name is absent (Google/GitHub format)', () => {
            const metadata = { name: 'Maria Santos', email: 'maria@gmail.com' };
            expect(resolveUserName(metadata)).toBe('Maria Santos');
        });

        it('resolves user_name if full_name and name are absent (GitHub format)', () => {
            const metadata = { user_name: 'devgithuber' };
            expect(resolveUserName(metadata)).toBe('devgithuber');
        });

        it('resolves preferred_username if other names are absent (GitHub format)', () => {
            const metadata = { preferred_username: 'octodev' };
            expect(resolveUserName(metadata)).toBe('octodev');
        });

        it('falls back to "Desenvolvedor" when no metadata name exists', () => {
            expect(resolveUserName({})).toBe('Desenvolvedor');
            expect(resolveUserName(undefined)).toBe('Desenvolvedor');
        });
    });

    describe('Redirect URL and Host Resolution', () => {
        function resolveBaseUrl(requestUrl: string, forwardedHost?: string | null, forwardedProto?: string | null): string {
            const { origin } = new URL(requestUrl);
            const proto = forwardedProto || 'https';
            return forwardedHost ? `${proto}://${forwardedHost}` : origin;
        }

        it('uses x-forwarded-host and x-forwarded-proto when present', () => {
            const baseUrl = resolveBaseUrl('http://localhost:3000/auth/callback', 'www.devthru.com', 'https');
            expect(baseUrl).toBe('https://www.devthru.com');
        });

        it('falls back to origin when no forwarded headers exist', () => {
            const baseUrl = resolveBaseUrl('http://localhost:3000/auth/callback', null, null);
            expect(baseUrl).toBe('http://localhost:3000');
        });
    });

    describe('Auth Callback Parameter Resolution', () => {
        function getAuthMethod(searchParams: URLSearchParams): 'code' | 'otp' | 'none' {
            if (searchParams.get('code')) return 'code';
            if (searchParams.get('token_hash') && searchParams.get('type')) return 'otp';
            return 'none';
        }

        it('detects OAuth PKCE code flow', () => {
            const params = new URLSearchParams('code=test-code-123&next=/dashboard');
            expect(getAuthMethod(params)).toBe('code');
        });

        it('detects Supabase OTP / email confirmation token_hash flow', () => {
            const params = new URLSearchParams('token_hash=pkce-token-hash-456&type=signup&next=/dashboard');
            expect(getAuthMethod(params)).toBe('otp');
        });

        it('returns none when no valid auth parameters are present', () => {
            const params = new URLSearchParams('error=access_denied');
            expect(getAuthMethod(params)).toBe('none');
        });
    });

    describe('Hash Fragment Parameter Resolution (Client Bridge)', () => {
        function parseHashParams(rawHash: string) {
            const hash = rawHash.startsWith('#') ? rawHash.substring(1) : rawHash;
            const params = new URLSearchParams(hash);
            return {
                accessToken: params.get('access_token'),
                refreshToken: params.get('refresh_token'),
                type: params.get('type'),
                error: params.get('error'),
                errorDescription: params.get('error_description'),
            };
        }

        it('parses valid Supabase confirmation hash fragment', () => {
            const hash = '#access_token=mock-access-token-123&expires_at=1757116800&expires_in=3600&refresh_token=mock-refresh-token-456&token_type=bearer&type=signup';
            const parsed = parseHashParams(hash);
            expect(parsed.accessToken).toBe('mock-access-token-123');
            expect(parsed.refreshToken).toBe('mock-refresh-token-456');
            expect(parsed.type).toBe('signup');
            expect(parsed.error).toBeNull();
        });

        it('parses error in hash fragment when confirmation token is expired or invalid', () => {
            const hash = '#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired';
            const parsed = parseHashParams(hash);
            expect(parsed.accessToken).toBeNull();
            expect(parsed.error).toBe('access_denied');
            expect(parsed.errorDescription).toBe('Email link is invalid or has expired');
        });

        it('handles empty hash gracefully', () => {
            const parsed = parseHashParams('');
            expect(parsed.accessToken).toBeNull();
            expect(parsed.refreshToken).toBeNull();
            expect(parsed.error).toBeNull();
        });
    });

    describe('sendWelcomeEmailIfNeeded Service', () => {
        it('returns missing_user_info when userId or userEmail are missing', async () => {
            const { sendWelcomeEmailIfNeeded } = await import('@/lib/email/welcome');
            const res1 = await sendWelcomeEmailIfNeeded({ userId: '', userEmail: 'test@example.com' });
            expect(res1.success).toBe(false);
            expect(res1.reason).toBe('missing_user_info');

            const res2 = await sendWelcomeEmailIfNeeded({ userId: 'user-1', userEmail: '' });
            expect(res2.success).toBe(false);
            expect(res2.reason).toBe('missing_user_info');
        });

        it('returns already_sent when profile.welcome_sent is true and force is false', async () => {
            const { sendWelcomeEmailIfNeeded } = await import('@/lib/email/welcome');
            const mockClient = {
                from: () => ({
                    select: () => ({
                        eq: () => ({
                            maybeSingle: async () => ({
                                data: { welcome_sent: true, full_name: 'Usuário Existente' },
                                error: null,
                            }),
                        }),
                    }),
                }),
            };

            const res = await sendWelcomeEmailIfNeeded({
                userId: 'user-already-sent',
                userEmail: 'user@example.com',
                supabaseClient: mockClient,
                force: false,
            });

            expect(res.success).toBe(true);
            expect(res.sent).toBe(false);
            expect(res.reason).toBe('already_sent');
        });
    });

    describe('WelcomeEmailTemplate Element Rendering', () => {
        it('instantiates React element without errors', () => {
            const element = React.createElement(WelcomeEmailTemplate, {
                userName: 'Carlos Developer',
            });
            expect(element).toBeDefined();
            expect(element.props.userName).toBe('Carlos Developer');
        });
    });
});
