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

interface UnsubscribeConfirmEmailTemplateProps {
    confirmUrl: string;
}

export const UnsubscribeConfirmEmailTemplate = ({
    confirmUrl,
}: UnsubscribeConfirmEmailTemplateProps) => {
    return (
        <Html lang="pt-BR">
            <Head />
            <Preview>Confirme o cancelamento dos e-mails do DevThru</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={content}>
                        <Heading as="h1" style={title}>
                            Confirme o cancelamento
                        </Heading>
                        <Text style={paragraph}>
                            Recebemos um pedido para parar de enviar novidades e campanhas do DevThru para este e-mail. Para concluir, abra o link abaixo e confirme.
                        </Text>

                        <Section style={ctaContainer}>
                            <Link href={confirmUrl} target="_blank" style={ctaButton}>
                                Confirmar cancelamento →
                            </Link>
                        </Section>

                        <Text style={closing}>
                            Se não foi você, ignore esta mensagem: nada será alterado.
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
    margin: 0,
};
