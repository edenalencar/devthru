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
    title = 'Receba novas ferramentas e atualizações úteis',
    description = 'Sem spam. Lançamentos de novas ferramentas, geradores práticos e melhorias do DevThru diretamente no seu e-mail.',
    source = 'tool-footer',
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
            <div className={`p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center space-y-2 ${className}`}>
                <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Inscrição Confirmada!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                    Você receberá nossas novidades e atualizações diretamente na sua caixa de entrada.
                </p>
            </div>
        );
    }

    return (
        <div className={`p-6 bg-gradient-to-r from-blue-500/5 via-primary/5 to-indigo-500/5 border border-border rounded-xl shadow-sm space-y-3 ${className}`}>
            <div className="flex items-center gap-2.5">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Mail className="h-4 w-4" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-foreground">{title}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
                <Input
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="h-10 text-xs bg-background"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="h-10 px-4 text-xs font-semibold shrink-0"
                >
                    {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                        <>
                            <Sparkles className="h-4 w-4 mr-1.5" />
                            Receber Novidades
                        </>
                    )}
                </Button>
            </form>
        </div>
    );
}
