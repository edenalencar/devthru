import { UnsubscribeClient } from './client';

export const metadata = {
    title: 'Cancelar Inscrição - DevThru',
    description: 'Cancele sua inscrição e pare de receber os e-mails mensais de novidades do DevThru.',
};

export default function UnsubscribePage() {
    return <UnsubscribeClient />;
}
