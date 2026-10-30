"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface NewsletterCardProps {
    title?: string;
    description?: string;
    source?: string;
    className?: string;
}

export function NewsletterCard({
    title = 'Receba novidades e utilitários para devs',
    description = 'Sem spam. Apenas atualizações de novas ferramentas, geradores e recursos técnicos do DevThru.',
    source = 'tool-sidebar',
    className = '',
}: NewsletterCardProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim() || !email.includes('@')) {
            toast.error('Por favor, informe um e-mail válido.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/newsletter/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, source }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Erro ao realizar inscrição');

            setSubscribed(true);
            toast.success(data.message || 'Inscrição realizada com sucesso!');
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'Erro ao se inscrever. Tente novamente.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (subscribed) {
        return (
            <div className={`p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2 ${className}`}>
                <CheckCircle2 className="h-6 w-6 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Inscrição Confirmada!</h4>
                <p className="text-xs text-emerald-700">
                    Você receberá nossas novidades técnicas diretamente na sua caixa de entrada.
                </p>
            </div>
        );
    }

    return (
        <div className={`p-5 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/40 border border-[#e2e8f0] rounded-xl shadow-sm space-y-3 ${className}`}>
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 rounded-lg text-[#135bec]">
                    <Mail className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-[#0f172a]">{title}</h4>
            </div>
            <p className="text-xs text-[#64748b] leading-relaxed">{description}</p>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    type="email"
                    placeholder="seu.email@empresa.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="h-9 text-xs bg-white"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="h-9 px-3 text-xs bg-[#135bec] hover:bg-[#104ec8] text-white shrink-0"
                >
                    {loading ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                        <>
                            <Sparkles className="h-3.5 w-3.5 mr-1" />
                            Inscrever
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
