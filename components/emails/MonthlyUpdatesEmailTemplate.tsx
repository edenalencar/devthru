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

interface UpdateItem {
    title: string;
    description: string;
    url: string;
}

interface MonthlyUpdatesEmailTemplateProps {
    monthYear?: string;
    introText?: string;
    newTools?: UpdateItem[];
    blogPosts?: UpdateItem[];
    userEmail: string;
}

export const MonthlyUpdatesEmailTemplate = ({
    monthYear = 'Julho/2026',
    introText = 'Temos o prazer de compartilhar as últimas novidades e ferramentas que lançamos neste mês no DevThru para tornar o seu fluxo de desenvolvimento ainda mais ágil.',
    newTools = [],
    blogPosts = [],
    userEmail = '',
}: MonthlyUpdatesEmailTemplateProps) => {
    // URL de descadastro com o e-mail do usuário em query string
    const unsubscribeUrl = `https://www.devthru.com/newsletter/unsubscribe?email=${encodeURIComponent(userEmail)}`;

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
            <Preview>Confira as novidades e atualizações do DevThru - {monthYear}!</Preview>
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
                        <Heading style={greeting}>Novidades do DevThru • {monthYear}</Heading>
                        <Text style={paragraph}>{introText}</Text>
                        
                        <Hr style={hr} />

                        {/* Novas Ferramentas */}
                        {newTools.length > 0 && (
                            <Section style={sectionWrapper}>
                                <Heading style={sectionTitle}>🛠️ Novas Ferramentas</Heading>
                                {newTools.map((tool, idx) => (
                                    <div key={idx} style={toolCard}>
                                        <Text style={toolName}>{tool.title}</Text>
                                        <Text style={toolDesc}>{tool.description}</Text>
                                        <Link href={tool.url} style={toolLink}>Testar Ferramenta →</Link>
                                    </div>
                                ))}
                            </Section>
                        )}

                        {/* Novidades do Blog */}
                        {blogPosts.length > 0 && (
                            <Section style={sectionWrapper}>
                                <Heading style={sectionTitle}>📝 Posts Recentes no Blog</Heading>
                                {blogPosts.map((post, idx) => (
                                    <div key={idx} style={blogCard}>
                                        <Text style={blogTitle}>{post.title}</Text>
                                        <Text style={blogDesc}>{post.description}</Text>
                                        <Link href={post.url} style={blogLink}>Ler Artigo →</Link>
                                    </div>
                                ))}
                            </Section>
                        )}

                        <Hr style={hr} />

                        <Text style={paragraph}>
                            Trabalhamos constantemente para melhorar a sua experiência. Se você tem alguma ideia de ferramenta nova ou melhoria, não hesite em responder este e-mail nos contando a sua sugestão.
                        </Text>

                        <Text style={footerSignature}>
                            Atenciosamente,<br />
                            <strong>Equipe DevThru</strong>
                        </Text>
                    </Section>
                    
                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            DevThru - Dados rápidos pra viagem.<br />
                            Acesse: <Link href="https://devthru.com.br" style={footerLink}>devthru.com.br</Link>
                        </Text>
                        <Text style={unsubscribeText}>
                            Não deseja mais receber nossas novidades mensais? <br />
                            <Link href={unsubscribeUrl} style={unsubscribeLink}>Cancele sua inscrição aqui</Link>.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Estilos limpos baseados no Light Mode do DevThru
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

const sectionWrapper = {
    margin: '0 0 28px 0',
};

const sectionTitle = {
    fontSize: '16px',
    fontWeight: '700',
    margin: '0 0 16px 0',
    color: '#0d121b',
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

const blogCard = {
    backgroundColor: '#ffffff',
    border: '1px solid #e2e6ea',
    borderRadius: '8px',
    padding: '16px',
    margin: '0 0 12px 0',
};

const blogTitle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0d121b',
    margin: '0 0 4px 0',
};

const blogDesc = {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#4c669a',
    margin: '0 0 10px 0',
};

const blogLink = {
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
    margin: '0 0 12px 0',
    color: '#4c669a',
};

const footerLink = {
    color: '#135bec',
    textDecoration: 'underline',
};

const unsubscribeText = {
    fontSize: '11px',
    lineHeight: '16px',
    margin: '0',
    color: '#71717a',
};

const unsubscribeLink = {
    color: '#71717a',
    textDecoration: 'underline',
};
