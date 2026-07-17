import { Metadata } from 'next';
import { AdminUsersClient } from './client';

export const metadata: Metadata = {
    title: 'Usuários - Admin DevThru',
    description: 'Gerencie e visualize a lista de usuários registrados no DevThru.',
};

export default function Page() {
    return <AdminUsersClient />;
}
