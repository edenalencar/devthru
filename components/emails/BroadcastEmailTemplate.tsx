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

interface BroadcastEmailTemplateProps {
    subject: string;
    content: string;
    recipientEmail?: string;
    unsubscribeUrl?: string;
}

export const BroadcastEmailTemplate = ({
    subject,
    content,
    recipientEmail = '',
    // Sem URL assinada, o link cai no fluxo de confirmação por e-mail
    unsubscribeUrl = `https://www.devthru.com/newsletter/unsubscribe?email=${encodeURIComponent(recipientEmail)}`,
}: BroadcastEmailTemplateProps) => {
    // Process content paragraphs
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);

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
            <Preview>{subject}</Preview>
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
                    <Section style={contentSection}>
                        <Heading as="h1" style={title}>
                            {subject}
                        </Heading>

                        {paragraphs.map((p, idx) => (
                            <Text key={idx} style={paragraph}>
                                {p}
                            </Text>
                        ))}

                        <Text style={closing}>
                            Atenciosamente,<br />
                            <strong>Equipe DevThru</strong><br />
                            <Link href="https://www.devthru.com" style={brandWebLink}>
                                devthru.com
                            </Link>
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Hr style={hr} />
                        <Text style={footerText}>
                            Você recebeu esta mensagem porque está cadastrado ou assinou as novidades no DevThru.
                        </Text>
                        {recipientEmail ? (
                            <Text style={footerUnsubscribe}>
                                Não deseja mais receber comunicados?{' '}
                                <Link href={unsubscribeUrl} style={unsubscribeLink}>
                                    Cancelar inscrição
                                </Link>
                            </Text>
                        ) : null}
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

const contentSection = {
    padding: '32px',
};

const title = {
    fontSize: '22px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 20px',
    lineHeight: '1.3',
};

const paragraph = {
    fontSize: '15px',
    color: '#334155',
    lineHeight: '1.6',
    margin: '0 0 16px',
    whiteSpace: 'pre-wrap' as const,
};

const closing = {
    fontSize: '14px',
    color: '#475569',
    lineHeight: '1.5',
    marginTop: '28px',
};

const brandWebLink = {
    color: '#135bec',
    textDecoration: 'none',
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
    margin: '0 0 6px',
};

const footerUnsubscribe = {
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'center' as const,
    margin: 0,
};

const unsubscribeLink = {
    color: '#64748b',
    textDecoration: 'underline',
};

