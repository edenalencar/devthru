import { Metadata } from 'next';
import { AdminDashboardClient } from './client';

export const metadata: Metadata = {
    title: 'Visão Geral - Admin DevThru',
    description: 'Estatísticas e métricas gerais do sistema DevThru.',
};

export default function Page() {
    return <AdminDashboardClient />;
}
