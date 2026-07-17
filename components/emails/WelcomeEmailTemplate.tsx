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

interface WelcomeEmailTemplateProps {
    userName: string;
}

export const WelcomeEmailTemplate = ({
    userName = 'Desenvolvedor',
}: WelcomeEmailTemplateProps) => {
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
            <Preview>Bem-vindo ao DevThru! Sua conta foi confirmada.</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
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
                    
                    {/* Content */}
                    <Section style={content}>
                        <Heading style={greeting}>Bem-vindo ao DevThru, {userName}! 🚀</Heading>
                        <Text style={paragraph}>
                            Ficamos muito felizes em ter você por aqui. Sua conta foi confirmada com sucesso e agora você tem acesso completo ao nosso toolkit de desenvolvimento.
                        </Text>
                        
                        <Text style={paragraph}>
                            O DevThru foi feito de desenvolvedores para desenvolvedores, com foco em velocidade, simplicidade e ferramentas que rodam direto no seu navegador.
                        </Text>

                        <Hr style={hr} />

                        <Heading style={sectionTitle}>Ferramentas populares para começar:</Heading>
                        
                        <Section style={toolGrid}>
                            <div style={toolCard}>
                                <Text style={toolName}>📎 Gerador de CPF & CNPJ</Text>
                                <Text style={toolDesc}>Gere dados de teste válidos em segundos para validar seus fluxos de cadastro localmente.</Text>
                                <Link href="https://www.devthru.com/tools/documents/cpf-generator" style={toolLink}>Acessar Gerador →</Link>
                            </div>

                            <div style={toolCard}>
                                <Text style={toolName}>📷 Gerador de QR Code</Text>
                                <Text style={toolDesc}>Crie QR Codes personalizados gratuitamente para links, Wi-Fi ou textos e baixe em PNG/SVG.</Text>
                                <Link href="https://www.devthru.com/tools/utilities/qrcode" style={toolLink}>Acessar Gerador →</Link>
                            </div>

                            <div style={toolCard}>
                                <Text style={toolName}>💳 Decodificador Pix</Text>
                                <Text style={toolDesc}>Decodifique links e chaves copia e cola do Pix de forma limpa na tela.</Text>
                                <Link href="https://www.devthru.com/tools/utilities/pix-decoder" style={toolLink}>Acessar Decodificador →</Link>
                            </div>
                        </Section>

                        <Hr style={hr} />

                        <Text style={paragraph}>
                            Se precisar de ajuda ou tiver alguma sugestão de ferramenta que gostaria de ver na plataforma, basta acessar nossa página de contato no menu do site ou responder diretamente a este e-mail.
                        </Text>

                        <Text style={footerSignature}>
                            Abraços,<br />
                            <strong>Equipe DevThru</strong>
                        </Text>
                    </Section>
                    
                    {/* Footer */}
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

// Estilos baseados no Light Mode do DevThru
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
    marginRight: '12px',
};

const logoText = {
    color: '#0d121b',
    fontFamily: '"Inter", -apple-system, sans-serif',
    fontSize: '24px',
    fontWeight: '800',
    verticalAlign: 'middle',
    letterSpacing: '-0.04em',
};

const content = {
    padding: '32px 32px',
};

const greeting = {
    fontSize: '20px',
    fontWeight: '800',
    margin: '0 0 16px 0',
    color: '#0d121b',
    letterSpacing: '-0.02em',
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

const sectionTitle = {
    fontSize: '16px',
    fontWeight: '700',
    margin: '0 0 16px 0',
    color: '#0d121b',
};

const toolGrid = {
    margin: '0 0 20px 0',
};

const toolCard = {
    backgroundColor: '#f6f6f8',
    border: '1px solid #e2e6ea',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 12px 0',
};

const toolName = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0d121b',
    margin: '0 0 4px 0',
};

const toolDesc = {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#4c669a',
    margin: '0 0 10px 0',
};

const toolLink = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#135bec',
    textDecoration: 'none',
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
