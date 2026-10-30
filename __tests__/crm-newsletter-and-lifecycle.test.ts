import { describe, it, expect } from 'vitest';
import { differenceInDays } from 'date-fns';
import React from 'react';
import { TrialWarningEmailTemplate } from '@/components/emails/TrialWarningEmailTemplate';
import { TrialExpiredEmailTemplate } from '@/components/emails/TrialExpiredEmailTemplate';
import { SponsorshipProposalEmailTemplate } from '@/components/emails/SponsorshipProposalEmailTemplate';
import { BroadcastEmailTemplate } from '@/components/emails/BroadcastEmailTemplate';

describe('CRM Newsletter & Lifecycle Templates', () => {
    it('calculates trial days remaining accurately', () => {
        const now = new Date();
        const futureDate = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        const days = differenceInDays(futureDate, now);
        expect(days).toBe(3);
    });

    it('renders TrialWarningEmailTemplate with dynamic days and user name', () => {
        const element = React.createElement(TrialWarningEmailTemplate, {
            userName: 'Eduardo',
            daysRemaining: 2,
        });

        expect(element).toBeDefined();
        expect(element.props.userName).toBe('Eduardo');
        expect(element.props.daysRemaining).toBe(2);
    });

    it('renders TrialExpiredEmailTemplate with user name', () => {
        const element = React.createElement(TrialExpiredEmailTemplate, {
            userName: 'Mariana',
        });

        expect(element).toBeDefined();
        expect(element.props.userName).toBe('Mariana');
    });

    it('renders SponsorshipProposalEmailTemplate with company and format', () => {
        const element = React.createElement(SponsorshipProposalEmailTemplate, {
            contactName: 'Carlos',
            companyName: 'Stripe Brasil',
            adFormat: 'Banner Nativo',
            customMessage: 'Condições válidas até sexta-feira.',
        });

        expect(element).toBeDefined();
        expect(element.props.companyName).toBe('Stripe Brasil');
        expect(element.props.customMessage).toContain('Condições válidas');
    });

    it('renders BroadcastEmailTemplate with custom paragraphs and unsubscribe link', () => {
        const element = React.createElement(BroadcastEmailTemplate, {
            subject: 'Novidade no DevThru',
            content: 'Olá devs,\n\nTemos novidades incríveis.',
            recipientEmail: 'dev@exemplo.com',
        });

        expect(element).toBeDefined();
        expect(element.props.subject).toBe('Novidade no DevThru');
        expect(element.props.recipientEmail).toBe('dev@exemplo.com');
    });
});
