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

interface SponsorshipProposalEmailTemplateProps {
    contactName: string;
    companyName: string;
    adFormat: string;
    customMessage?: string;
}

export const SponsorshipProposalEmailTemplate = ({
    contactName = 'Parceiro',
    companyName = 'Sua Empresa',
    adFormat = 'Banner Nativo nas Ferramentas',
    customMessage,
}: SponsorshipProposalEmailTemplateProps) => {
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
            <Preview>{`Proposta Comercial & Mídia Kit DevThru para ${companyName}`}</Preview>
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
                            Proposta Comercial de Mídia & Patrocínio
                        </Heading>
                        <Text style={paragraph}>
                            Olá, <strong>{contactName}</strong>! É um prazer conversar com a equipe da <strong>{companyName}</strong>.
                        </Text>
                        <Text style={paragraph}>
                            Recebemos o seu interesse em anunciar no <strong>DevThru</strong> ({adFormat}). Agradecemos pela oportunidade de apresentar como podemos conectar sua marca diretamente a milhares de desenvolvedores, engenheiros e arquitetos de software em ambiente de trabalho.
                        </Text>

                        {customMessage ? (
                            <Section style={customBox}>
                                <Text style={customText}>{customMessage}</Text>
                            </Section>
                        ) : null}

                        {/* Audience Highlights */}
                        <Section style={statsBox}>
                            <Text style={statsTitle}>Por que anunciar no DevThru?</Text>
                            <Text style={bulletPoint}>
                                🎯 <strong>Audiência 100% Técnica:</strong> Desenvolvedores ativos utilizando ferramentas essenciais durante seu fluxo diário de desenvolvimento.
                            </Text>
                            <Text style={bulletPoint}>
                                🛡️ <strong>Formatos Nativos & Imunes a AdBlock:</strong> Anúncios integrados diretamente ao layout, garantindo 100% de visibilidade real.
                            </Text>
                            <Text style={bulletPoint}>
                                📬 <strong>Newsletter Especializada:</strong> Alcance direto na caixa de entrada com conteúdos técnicos curados e alto engajamento.
                            </Text>
                        </Section>

                        <Text style={paragraph}>
                            Você pode conferir as especificações completas e métricas detalhadas em nosso mídia kit online:
                        </Text>

                        <Section style={ctaContainer}>
                            <Link href="https://www.devthru.com/anuncie" target="_blank" style={ctaButton}>
                                Acessar Mídia Kit do DevThru →
                            </Link>
                        </Section>

                        <Text style={paragraph}>
                            Basta responder a este e-mail para alinharmos os formatos desejados, datas de início de veiculação e condições especiais.
                        </Text>

                        <Text style={closing}>
                            Atenciosamente,<br />
                            <strong>Time DevThru</strong><br />
                            <Link href="https://www.devthru.com" style={footerLink}>
                                devthru.com
                            </Link>
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={hr} />
                        <Text style={footerText}>
                            DevThru — Dados rápidos pra viagem. Plataforma para desenvolvedores.
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
    maxWidth: '580px',
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

const customBox = {
    backgroundColor: '#f8fafc',
    borderLeft: '4px solid #135bec',
    padding: '16px 20px',
    borderRadius: '4px',
    margin: '20px 0',
};

const customText = {
    fontSize: '14px',
    color: '#1e293b',
    lineHeight: '1.6',
    margin: 0,
    whiteSpace: 'pre-wrap' as const,
};

const statsBox = {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    padding: '20px',
    margin: '24px 0',
};

const statsTitle = {
    fontSize: '15px',
    fontWeight: '700',
    color: '#166534',
    margin: '0 0 12px',
};

const bulletPoint = {
    fontSize: '14px',
    color: '#14532d',
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

const footerLink = {
    color: '#135bec',
    textDecoration: 'none',
};
