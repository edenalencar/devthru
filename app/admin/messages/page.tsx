import { Metadata } from 'next';
import { AdminMessagesClient } from './client';

export const metadata: Metadata = {
    title: 'Mensagens - Admin DevThru',
    description: 'Gerencie e responda às mensagens de contato do DevThru.',
};

export default function Page() {
    return <AdminMessagesClient />;
}
