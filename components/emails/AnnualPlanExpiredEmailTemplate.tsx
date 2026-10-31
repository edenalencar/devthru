import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import * as React from 'react';

interface AnnualPlanExpiredEmailTemplateProps {
    planName: string;
}

export const AnnualPlanExpiredEmailTemplate = ({
    planName,
}: AnnualPlanExpiredEmailTemplateProps) => {
    return (
        <Html lang="pt-BR">
            <Head />
            <Preview>Seu plano anual {planName} do DevThru terminou</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={content}>
                        <Heading as="h1" style={title}>
                            Seu plano anual terminou
                        </Heading>
                        <Text style={paragraph}>
                            Os 12 meses do seu <strong>Plano {planName}</strong> chegaram ao fim, e sua conta voltou para o plano Gratuito. Seus dados continuam salvos.
                        </Text>
                        <Text style={paragraph}>
                            Para recuperar o acesso aos recursos do plano, escolha uma nova opção:
                        </Text>

                        <Section style={ctaContainer}>
                            <Link href="https://www.devthru.com/pricing" target="_blank" style={ctaButton}>
                                Ver planos →
                            </Link>
                        </Section>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: '#f6f8fb',
    fontFamily: 'Inter, Arial, sans-serif',
    padding: '32px 0',
};

const container = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    margin: '0 auto',
    maxWidth: '560px',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
};

const content = {
    padding: '32px',
};

const title = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 16px',
    lineHeight: '1.3',
};

const paragraph = {
    fontSize: '15px',
    color: '#334155',
    lineHeight: '1.6',
    margin: '0 0 16px',
};

const ctaContainer = {
    textAlign: 'center' as const,
    margin: '28px 0 8px',
};

const ctaButton = {
    backgroundColor: '#135bec',
    borderRadius: '8px',
    color: '#ffffff',
    display: 'inline-block',
    fontSize: '15px',
    fontWeight: '600',
    padding: '12px 24px',
    textDecoration: 'none',
};
