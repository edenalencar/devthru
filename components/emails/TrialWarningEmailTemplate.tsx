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

interface TrialWarningEmailTemplateProps {
    userName?: string;
    daysRemaining?: number;
}

export const TrialWarningEmailTemplate = ({
    userName = '',
    daysRemaining = 3,
}: TrialWarningEmailTemplateProps) => {
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
            <Preview>{`Seu período de testes no DevThru Pro termina em ${daysRemaining} dias`}</Preview>
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
                            Seu trial Pro encerra em {daysRemaining} dias ⏳
                        </Heading>
                        <Text style={paragraph}>
                            {userName && userName !== 'Desenvolvedor' ? (
                                <>Olá, <strong>{userName}</strong>!</>
                            ) : (
                                <>Olá!</>
                            )}
                        </Text>
                        <Text style={paragraph}>
                            Esperamos que os recursos avançados do <strong>DevThru Pro</strong> estejam acelerando sua rotina e otimizando seu fluxo de trabalho.
                        </Text>
                        <Text style={paragraph}>
                            Este é um lembrete amigável de que seu período de testes gratuitos termina em <strong>{daysRemaining} dias</strong>. Para continuar com acesso ilimitado sem interrupções, você pode ativar sua assinatura por apenas <strong>R$ 29/mês</strong>.
                        </Text>

                        {/* Pro Features Box */}
                        <Section style={featuresBox}>
                            <Text style={featuresTitle}>O que você mantém no Plano Pro:</Text>
                            <Text style={bulletPoint}>
                                🚀 <strong>Geração em Lote até 1.000 itens:</strong> Massa de dados completa para homologação e carga em banco.
                            </Text>
                            <Text style={bulletPoint}>
                                📂 <strong>Histórico na Nuvem Persistente:</strong> Seus dados salvos e sincronizados em qualquer máquina.
                            </Text>
                            <Text style={bulletPoint}>
                                📊 <strong>Exportação com 1 Clique:</strong> Baixe massas em CSV, JSON e Excel (.xlsx).
                            </Text>
                            <Text style={bulletPoint}>
                                💾 <strong>Configurações Salvas:</strong> Guarde seus presets e aplique em 1 clique nas próximas gerações.
                            </Text>
                        </Section>

                        <Section style={ctaContainer}>
                            <Link href="https://www.devthru.com/pricing" target="_blank" style={ctaButton}>
                                Manter Meu Plano Pro (R$ 29/mês) →
                            </Link>
                        </Section>

                        <Text style={paragraph}>
                            Caso prefira não assinar, sua conta continuará funcionando normalmente no plano Gratuito (com limite de até 5 itens em lote).
                        </Text>

                        <Text style={closing}>
                            Qualquer dúvida, basta responder a este e-mail.<br />
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

const featuresBox = {
    backgroundColor: '#eff6ff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};

const featuresTitle = {
    fontSize: '15px',
    fontWeight: '700',
    color: '#1e40af',
    margin: '0 0 12px',
};

const bulletPoint = {
    fontSize: '14px',
    color: '#1e3a8a',
    lineHeight: '1.5',
    margin: '0 0 8px',
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
