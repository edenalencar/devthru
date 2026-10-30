import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Font,
} from '@react-email/components';
import * as React from 'react';

interface TrialExpiredEmailTemplateProps {
    userName?: string;
}

export const TrialExpiredEmailTemplate = ({
    userName = '',
}: TrialExpiredEmailTemplateProps) => {
    return (
        <Html lang="pt-BR">
            <Head>
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hjp-Ek-_y.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={400}
                    fontStyle="normal"
                />
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hjp-Ek-_y.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={700}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Seu período de teste no DevThru Pro encerrou</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={header}>
                        <Link href="https://www.devthru.com" target="_blank" style={brandLink}>
                            <Img
                                src="https://www.devthru.com/logo-optimized.png"
                                width="36"
                                height="36"
                                alt="DevThru"
                                style={logo}
                            />
                            <Text style={brandName}>DevThru</Text>
                        </Link>
                    </Section>

                    {/* Main Content */}
                    <Section style={content}>
                        <Heading as="h1" style={title}>
                            Seu período de testes encerrou
                        </Heading>
                        <Text style={paragraph}>
                            {userName && userName !== 'Desenvolvedor' ? (
                                <>Olá, <strong>{userName}</strong>!</>
                            ) : (
                                <>Olá!</>
                            )}
                        </Text>
                        <Text style={paragraph}>
                            Seu período de testes gratuitos no <strong>DevThru Pro</strong> chegou ao fim. Sua conta agora voltou para o plano Gratuito.
                        </Text>
                        <Text style={paragraph}>
                            Você ainda pode continuar usando todas as ferramentas de forma gratuita. Mas se você precisa de <strong>geração em lote de até 1.000 itens</strong>, <strong>histórico na nuvem permanente</strong> e <strong>configurações salvas</strong> para seus testes, você pode desbloquear o Pro agora mesmo:
                        </Text>

                        <Section style={ctaContainer}>
                            <Link href="https://www.devthru.com/pricing" target="_blank" style={ctaButton}>
                                Desbloquear DevThru Pro (R$ 29/mês) →
                            </Link>
                        </Section>

                        <Text style={paragraph}>
                            O plano não tem fidelidade e pode ser cancelado a qualquer momento com apenas 1 clique no seu painel.
                        </Text>

                        <Text style={closing}>
                            Tem algum feedback sobre a plataforma ou sugestão de ferramenta? Adoraríamos ouvir respondendo diretamente a esta mensagem.<br /><br />
                            <strong>Equipe DevThru</strong>
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={hr} />
                        <Text style={footerText}>
                            DevThru — Dados rápidos pra viagem. Feito para desenvolvedores.
                        </Text>
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

const header = {
    padding: '24px 32px',
    borderBottom: '1px solid #edf2f7',
};

const brandLink = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
};

const logo = {
    display: 'inline-block',
    verticalAlign: 'middle',
};

const brandName = {
    display: 'inline-block',
    verticalAlign: 'middle',
    fontSize: '20px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 0 10px',
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
    margin: '28px 0',
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

const closing = {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.5',
    marginTop: '28px',
};

const footer = {
    padding: '0 32px 28px',
};

const hr = {
    borderColor: '#edf2f7',
    margin: '0 0 20px',
};

const footerText = {
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center' as const,
    margin: 0,
};

