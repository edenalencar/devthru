import { createClient } from '../supabase/server';
import { NextResponse } from 'next/server';
import { User } from '@supabase/supabase-js';

interface VerifyAdminResult {
    isAdmin: boolean;
    user: User | null;
    response: NextResponse | null;
}

/**
 * Validates if the current logged-in user is listed in ADMIN_EMAILS
 */
export async function verifyAdmin(): Promise<VerifyAdminResult> {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();

        if (error || !user || !user.email) {
            return {
                isAdmin: false,
                user: null,
                response: NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
            };
        }

        const adminEmailsEnv = process.env.ADMIN_EMAILS || '';
        const adminEmails = adminEmailsEnv.split(',').map(email => email.trim().toLowerCase());

        if (!adminEmails.includes(user.email.toLowerCase())) {
            return {
                isAdmin: false,
                user,
                response: NextResponse.json({ error: 'Acesso negado. Apenas administradores podem acessar esta rota.' }, { status: 403 })
            };
        }

        return {
            isAdmin: true,
            user,
            response: null
        };
    } catch (err) {
        console.error('Error during admin verification:', err);
        return {
            isAdmin: false,
            user: null,
            response: NextResponse.json({ error: 'Erro interno na verificação de privilégios' }, { status: 500 })
        };
    }
}
