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

interface ReplyEmailTemplateProps {
    userName: string;
    originalMessage: string;
    replyText: string;
}

export const ReplyEmailTemplate = ({
    userName = 'Desenvolvedor',
    originalMessage = '',
    replyText = '',
}: ReplyEmailTemplateProps) => {
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
            <Preview>Resposta ao seu contato no DevThru</Preview>
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
                            Agradecemos por entrar em contato conosco. Aqui está a resposta para a sua mensagem:
                        </Text>
                        
                        <Section style={replyBox}>
                            <Text style={replyHeading}>Nossa Resposta:</Text>
                            <Text style={replyBody}>{replyText}</Text>
                        </Section>
                        
                        <Hr style={hr} />
                        
                        <Section style={originalBox}>
                            <Text style={originalHeading}>Sua mensagem original:</Text>
                            <Text style={originalBody}>"{originalMessage}"</Text>
                        </Section>

                        <Text style={paragraph}>
                            Se tiver mais alguma dúvida ou sugestão, sinta-se à vontade para nos responder diretamente.
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

const replyBox = {
    backgroundColor: '#f6f6f8',
    borderLeft: '4px solid #135bec',
    borderRadius: '6px',
    padding: '20px',
    margin: '24px 0',
};

const replyHeading = {
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase' as const,
    color: '#135bec',
    margin: '0 0 8px 0',
    letterSpacing: '0.05em',
};

const replyBody = {
    fontSize: '15px',
    lineHeight: '24px',
    margin: '0',
    color: '#0d121b',
    whiteSpace: 'pre-wrap' as const,
};

const hr = {
    borderColor: '#e2e6ea',
    margin: '32px 0',
};

const originalBox = {
    backgroundColor: '#f6f6f8',
    border: '1px solid #e2e6ea',
    borderRadius: '6px',
    padding: '16px',
    margin: '0 0 24px 0',
};

const originalHeading = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#71717a',
    margin: '0 0 8px 0',
};

const originalBody = {
    fontSize: '14px',
    lineHeight: '20px',
    fontStyle: 'italic',
    margin: '0',
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
