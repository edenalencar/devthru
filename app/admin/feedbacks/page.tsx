import { Metadata } from 'next';
import { AdminFeedbacksClient } from './client';

export const metadata: Metadata = {
    title: 'Feedbacks de Ferramentas - Admin DevThru',
    description: 'Acompanhe as avaliações, notas e comentários enviados pelos usuários sobre as ferramentas e artigos do DevThru.',
};

export default function AdminFeedbacksPage() {
    return <AdminFeedbacksClient />;
}
