import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Mail, Users, ArrowLeft } from 'lucide-react';
import React from 'react';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect('/login');
    }

    const adminEmailsEnv = process.env.ADMIN_EMAILS || '';
    const adminEmails = adminEmailsEnv.split(',').map(email => email.trim().toLowerCase());

    if (!adminEmails.includes(user.email.toLowerCase())) {
        redirect('/');
    }

    return (
        <div className="flex min-h-screen bg-[#f6f6f8] text-[#0d121b]">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-[#e2e6ea] flex flex-col fixed h-screen z-20">
                <div className="p-6 border-b border-[#e2e6ea]">
                    <Link href="/admin" className="flex items-center gap-2">
                        <img
                            src="/logo-optimized.png"
                            width="28"
                            height="28"
                            alt="DevThru Logo"
                            className="inline-block"
                        />
                        <span className="text-lg font-bold tracking-tight text-[#0d121b]">
                            DevThru Admin
                        </span>
                    </Link>
                </div>
                
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-[#4c669a] hover:text-[#135bec] hover:bg-[#f6f6f8] transition-all duration-200"
                    >
                        <LayoutDashboard className="h-4 w-4 text-[#135bec]" />
                        Visão Geral
                    </Link>
                    <Link
                        href="/admin/messages"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-[#4c669a] hover:text-[#135bec] hover:bg-[#f6f6f8] transition-all duration-200"
                    >
                        <Mail className="h-4 w-4 text-[#135bec]" />
                        Mensagens
                    </Link>
                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-[#4c669a] hover:text-[#135bec] hover:bg-[#f6f6f8] transition-all duration-200"
                    >
                        <Users className="h-4 w-4 text-[#135bec]" />
                        Usuários
                    </Link>
                </nav>
                
                <div className="p-4 border-t border-[#e2e6ea]">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-[#4c669a] hover:text-[#0d121b] hover:bg-[#f6f6f8] transition-all duration-200"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Voltar para o Site
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 pl-64 min-h-screen flex flex-col">
                <header className="h-16 border-b border-[#e2e6ea] bg-white/80 backdrop-blur flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-sm font-semibold text-[#4c669a]">Painel de Controle</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-[#f6f6f8] text-[#4c669a] border border-[#e2e6ea] font-medium">
                            Admin: {user.email}
                        </span>
                    </div>
                </header>
                <main className="flex-1 p-8 bg-[#f6f6f8]">
                    {children}
                </main>
            </div>
        </div>
    );
}
