import { Metadata } from 'next';
import { AdminCampaignsClient } from './client';

export const metadata: Metadata = {
    title: 'Audiência & Campanhas (CRM Broadcasts) - Admin DevThru',
    description: 'Gerencie audiência, listas de inscritos e disparos de comunicados por e-mail no DevThru.',
};

export default function Page() {
    return <AdminCampaignsClient />;
}

