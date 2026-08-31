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
