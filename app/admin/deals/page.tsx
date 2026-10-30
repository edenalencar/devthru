import { Metadata } from 'next';
import { AdminDealsClient } from './client';

export const metadata: Metadata = {
    title: 'Pipeline de Patrocínios (CRM Deals) - Admin DevThru',
    description: 'Gerencie oportunidades comerciais, propostas e patrocínios da página /anuncie no DevThru.',
};

export default function Page() {
    return <AdminDealsClient />;
}

