import { describe, it, expect } from 'vitest';
import React from 'react';
import { SubscriptionSuccessEmailTemplate } from './SubscriptionSuccessEmailTemplate';

describe('SubscriptionSuccessEmailTemplate', () => {
    it('renderiza corretamente o template para o Plano Pro', () => {
        const element = React.createElement(SubscriptionSuccessEmailTemplate, {
            userName: 'Lucas Dev',
            planName: 'Pro',
            planSlug: 'pro',
        });

        expect(element).toBeDefined();
        expect(element.props.userName).toBe('Lucas Dev');
        expect(element.props.planName).toBe('Pro');
        expect(element.props.planSlug).toBe('pro');
    });

    it('renderiza corretamente o template para o Plano Business', () => {
        const element = React.createElement(SubscriptionSuccessEmailTemplate, {
            userName: 'Geremais Mendes',
            planName: 'Business',
            planSlug: 'business',
        });

        expect(element).toBeDefined();
        expect(element.props.userName).toBe('Geremais Mendes');
        expect(element.props.planName).toBe('Business');
        expect(element.props.planSlug).toBe('business');
    });

    it('usa valores padrão quando não são fornecidos', () => {
        const element = React.createElement(SubscriptionSuccessEmailTemplate, {});
        expect(element).toBeDefined();
    });
});
