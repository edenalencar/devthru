import { describe, it, expect } from 'vitest';
import React from 'react';
import { MonthlyUpdatesEmailTemplate } from './MonthlyUpdatesEmailTemplate';

describe('MonthlyUpdatesEmailTemplate', () => {
    it('renderiza corretamente com os valores fornecidos', () => {
        const element = React.createElement(MonthlyUpdatesEmailTemplate, {
            userEmail: 'dev@example.com',
            monthYear: 'Outubro/2026',
        });

        expect(element).toBeDefined();
        expect(element.props.userEmail).toBe('dev@example.com');
        expect(element.props.monthYear).toBe('Outubro/2026');
    });

    it('renderiza com seção de destaque da área logada sem mencionar supabase', () => {
        const featuredSection = {
            badge: 'Produtividade',
            title: '🚀 Conheça os Superpoderes da sua Conta no DevThru',
            subtitle: 'Recursos avançados para o seu fluxo',
            points: [
                {
                    title: '📂 Histórico Persistente e Sincronizado',
                    description: 'Salvo com segurança na nuvem.'
                },
                {
                    title: '📊 Exportação para Excel (.xlsx)',
                    description: 'Baixe em 1 clique.'
                }
            ],
            ctaText: 'Acessar Dashboard →',
            ctaUrl: 'https://www.devthru.com/dashboard'
        };

        const element = React.createElement(MonthlyUpdatesEmailTemplate, {
            userEmail: 'dev@example.com',
            featuredSection: featuredSection,
        });

        expect(element).toBeDefined();
        expect(element.props.featuredSection.title).toContain('Superpoderes');
        expect(element.props.featuredSection.points).toHaveLength(2);
        expect(element.props.featuredSection.points[0].description).not.toContain('supabase');
    });
});
