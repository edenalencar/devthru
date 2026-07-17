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

interface ConfirmEmailTemplateProps {
    userName: string;
    originalSubject: string;
    originalMessage: string;
}

export const ConfirmEmailTemplate = ({
    userName = 'Desenvolvedor',
    originalSubject = '',
    originalMessage = '',
}: ConfirmEmailTemplateProps) => {
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
                <Font
                    fontFamily="Inter"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfAZ9hjp-Ek-_y.woff2',
                        format: 'woff2',
                    }}
                    fontWeight={800}
                    fontStyle="normal"
                />
            </Head>
            <Preview>Recebemos o seu contato no DevThru</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={header}>
                        <Link href="https://www.devthru.com" style={logoContainer}>
                            <Img
                                src="https://www.devthru.com/logo-optimized.png"
                                width="32"
                                height="32"
                                alt="DevThru Logo"
                                style={logoImage}
                            />
                            <span style={logoText}>DevThru</span>
                        </Link>
                    </Section>
                    
                    <Section style={content}>
                        <Heading style={greeting}>Olá, {userName}!</Heading>
                        <Text style={paragraph}>
                            Confirmamos o recebimento da sua mensagem de contato. Nossa equipe já está revisando as informações e responderá o mais breve possível.
                        </Text>
                        
                        <Hr style={hr} />
                        
                        <Section style={originalBox}>
                            <Text style={originalHeading}>Detalhes do seu contato:</Text>
                            <Text style={detailsText}><strong>Assunto:</strong> {originalSubject}</Text>
                            <Text style={originalBody}>"{originalMessage}"</Text>
                        </Section>

                        <Text style={paragraph}>
                            Você receberá nossa resposta diretamente neste e-mail. Se precisar adicionar mais detalhes, basta responder a esta mensagem.
                        </Text>

                        <Text style={footerSignature}>
                            Atenciosamente,<br />
                            <strong>Equipe DevThru</strong>
                        </Text>
                    </Section>
                    
                    <Section style={footer}>
                        <Text style={footerText}>
                            DevThru - Dados rápidos pra viagem.<br />
                            Acesse: <Link href="https://devthru.com.br" style={footerLink}>devthru.com.br</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Estilos limpos baseados no Light Mode oficial do site DevThru
const main = {
    backgroundColor: '#f6f6f8',
    color: '#0d121b',
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '40px 0',
};

const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e6ea',
    borderRadius: '12px',
    margin: '0 auto',
    maxWidth: '580px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.025)',
};

const header = {
    backgroundColor: '#ffffff',
    padding: '28px 24px',
    borderBottom: '1px solid #e2e6ea',
    textAlign: 'center' as const,
};

const logoContainer = {
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center' as const,
};

const logoImage = {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: '12px', // Espaçamento explícito garantido para clientes de email
};

const logoText = {
    color: '#0d121b',
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontSize: '24px',
    fontWeight: '800', // Peso forte e encorpado idêntico ao site
    verticalAlign: 'middle',
    letterSpacing: '-0.04em', // Tracking ajustado do logotipo
};

const content = {
    padding: '32px 32px',
};

const greeting = {
    fontSize: '18px',
    fontWeight: '700',
    margin: '0 0 16px 0',
    color: '#0d121b',
};

const paragraph = {
    fontSize: '15px',
    lineHeight: '24px',
    margin: '0 0 20px 0',
    color: '#4c669a',
};

const hr = {
    borderColor: '#e2e6ea',
    margin: '28px 0',
};

const originalBox = {
    backgroundColor: '#f6f6f8',
    border: '1px solid #e2e6ea',
    borderRadius: '8px',
    padding: '20px',
    margin: '0 0 20px 0',
};

const originalHeading = {
    fontSize: '12px',
    fontWeight: '700',
    color: '#135bec',
    margin: '0 0 12px 0',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
};

const detailsText = {
    fontSize: '14px',
    color: '#0d121b',
    margin: '0 0 8px 0',
};

const originalBody = {
    fontSize: '14px',
    lineHeight: '20px',
    fontStyle: 'italic',
    margin: '8px 0 0 0',
    color: '#4c669a',
};

const footerSignature = {
    fontSize: '15px',
    lineHeight: '24px',
    margin: '32px 0 0 0',
    color: '#4c669a',
};

const footer = {
    backgroundColor: '#f6f6f8',
    borderTop: '1px solid #e2e6ea',
    padding: '24px',
    textAlign: 'center' as const,
};

const footerText = {
    fontSize: '12px',
    lineHeight: '18px',
    margin: '0',
    color: '#4c669a',
};

const footerLink = {
    color: '#135bec',
    textDecoration: 'underline',
};
