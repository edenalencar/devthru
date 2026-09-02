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

interface SubscriptionSuccessEmailTemplateProps {
    userName?: string;
    planName?: 'Pro' | 'Business' | string;
    planSlug?: 'pro' | 'business' | string;
}

export const SubscriptionSuccessEmailTemplate = ({
    userName = 'Desenvolvedor',
    planName = 'Pro',
    planSlug = 'pro',
}: SubscriptionSuccessEmailTemplateProps) => {
    const isBusiness = planSlug.toLowerCase() === 'business';
    const previewText = `Seu Plano ${planName} do DevThru está ativo! 🎉`;

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
            <Preview>{previewText}</Preview>
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
                        <div style={badge}>Assinatura Confirmada ✨</div>
                        
                        <Heading style={greeting}>Muito obrigado pelo apoio, {userName}! 🚀</Heading>
                        <Text style={paragraph}>
                            Seu pagamento foi processado com sucesso e sua conta foi atualizada para o <strong>Plano {planName}</strong>. 
                            Estamos muito empolgados em acelerar o seu fluxo de desenvolvimento!
                        </Text>

                        <Hr style={hr} />

                        {/* Plan Benefits */}
                        <Heading style={sectionTitle}>
                            {isBusiness ? 'O que você desbloqueou no Plano Business:' : 'O que você desbloqueou no Plano Pro:'}
                        </Heading>

                        {isBusiness ? (
                            <Section style={benefitGrid}>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>⚡ Acesso Completo à API REST</Text>
                                    <Text style={benefitDesc}>
                                        Integre todas as ferramentas do DevThru diretamente no seu código com sua chave <code style={inlineCode}>x-api-key</code>.
                                    </Text>
                                </div>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>🚀 Limite Elevado de API & Lotes</Text>
                                    <Text style={benefitDesc}>
                                        Até 1.000.000 requisições/mês e geração em lote de até 10.000 itens por execução.
                                    </Text>
                                </div>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>📦 Exportação em Massa</Text>
                                    <Text style={benefitDesc}>
                                        Exporte dados prontos para uso em formatos CSV, JSON, Excel e SQL.
                                    </Text>
                                </div>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>🛡️ Suporte Prioritário & SLA</Text>
                                    <Text style={benefitDesc}>
                                        Atendimento prioritário da nossa equipe e garantia de 99.9% de disponibilidade.
                                    </Text>
                                </div>
                            </Section>
                        ) : (
                            <Section style={benefitGrid}>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>⚡ Geração em Lote Ampliada</Text>
                                    <Text style={benefitDesc}>
                                        Gere até 1.000 itens em lote instantaneamente para testes massivos.
                                    </Text>
                                </div>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>📦 Exportação em Massa</Text>
                                    <Text style={benefitDesc}>
                                        Exporte dados em formatos CSV, JSON, Excel e scripts SQL prontos para seu banco.
                                    </Text>
                                </div>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>💾 Salvar Configurações</Text>
                                    <Text style={benefitDesc}>
                                        Salve suas preferências de máscaras, formatos e presets para aplicar em 1 clique.
                                    </Text>
                                </div>
                                <div style={benefitCard}>
                                    <Text style={benefitTitle}>🕒 Histórico de Gerações</Text>
                                    <Text style={benefitDesc}>
                                        Acesse e consulte suas gerações anteriores a qualquer momento para reutilizar dados.
                                    </Text>
                                </div>
                            </Section>
                        )}

                        {/* CTA Buttons */}
                        <Section style={ctaSection}>
                            {isBusiness ? (
                                <Link href="https://www.devthru.com/dashboard/settings" style={primaryButton}>
                                    Gerenciar Chaves de API →
                                </Link>
                            ) : (
                                <Link href="https://www.devthru.com/dashboard" style={primaryButton}>
                                    Acessar meu Dashboard →
                                </Link>
                            )}
                            
                            <div style={secondaryLinkContainer}>
                                {isBusiness ? (
                                    <Link href="https://www.devthru.com/docs/api" style={secondaryLink}>
                                        Ver Documentação da API
                                    </Link>
                                ) : (
                                    <Link href="https://www.devthru.com" style={secondaryLink}>
                                        Explorar Todas as Ferramentas
                                    </Link>
                                )}
                            </div>
                        </Section>

                        <Hr style={hr} />

                        {/* Management info */}
                        <Text style={smallText}>
                            💡 <strong>Gerenciamento da Assinatura:</strong> Você pode consultar faturas, recibos e alterar sua forma de pagamento a qualquer momento pelo seu painel de configurações no DevThru ou pelo Portal do Cliente Stripe.
                        </Text>

                        <Text style={paragraph}>
                            Tem alguma dúvida técnica ou sugestão de melhoria? Responda diretamente a este e-mail ou fale conosco pelo suporte.
                        </Text>

                        <Text style={footerSignature}>
                            Boas criações,<br />
                            <strong>Equipe DevThru</strong>
                        </Text>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            DevThru - Dados rápidos pra viagem.<br />
                            Acesse: <Link href="https://www.devthru.com" style={footerLink}>devthru.com</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// Estilos
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

const badge = {
    display: 'inline-block',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    fontSize: '12px',
    fontWeight: '700',
    padding: '4px 12px',
    borderRadius: '9999px',
    marginBottom: '16px',
    border: '1px solid #bfdbfe',
};

const greeting = {
    fontSize: '22px',
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

const benefitGrid = {
    margin: '0 0 24px 0',
};

const benefitCard = {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    padding: '14px 16px',
    margin: '0 0 10px 0',
};

const benefitTitle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#0f172a',
    margin: '0 0 4px 0',
};

const benefitDesc = {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#475569',
    margin: '0',
};

const inlineCode = {
    backgroundColor: '#e2e8f0',
    color: '#0f172a',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontFamily: 'monospace',
};

const ctaSection = {
    textAlign: 'center' as const,
    margin: '28px 0 20px 0',
};

const primaryButton = {
    display: 'inline-block',
    backgroundColor: '#135bec',
    color: '#ffffff',
    fontSize: '15px',
    fontWeight: '700',
    padding: '14px 28px',
    borderRadius: '8px',
    textDecoration: 'none',
    boxShadow: '0 4px 6px -1px rgba(19, 91, 236, 0.25)',
};

const secondaryLinkContainer = {
    marginTop: '12px',
};

const secondaryLink = {
    fontSize: '13px',
    color: '#64748b',
    textDecoration: 'underline',
};

const smallText = {
    fontSize: '13px',
    lineHeight: '20px',
    color: '#64748b',
    margin: '0 0 20px 0',
};

const footerSignature = {
    fontSize: '15px',
    lineHeight: '24px',
    margin: '28px 0 0 0',
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
