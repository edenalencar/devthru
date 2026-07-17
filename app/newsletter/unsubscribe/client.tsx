"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function UnsubscribeContent() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email');

    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUnsubscribe = async () => {
        if (!email) {
            setStatus('error');
            setErrorMessage('Nenhum endereço de e-mail foi fornecido.');
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/newsletter/unsubscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Erro ao processar descadastro.');
            }

            setStatus('success');
        } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
            console.error(err);
            setStatus('error');
            setErrorMessage(err.message || 'Houve um erro inesperado no servidor.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-[#f6f6f8] text-[#0d121b]">
            {/* Logo */}
            <div className="mb-8 flex items-center gap-2">
                <img
                    src="/logo-optimized.png"
                    width="32"
                    height="32"
                    alt="DevThru Logo"
                    className="inline-block"
                />
                <span className="text-xl font-bold tracking-tight text-[#0d121b]">
                    DevThru
                </span>
            </div>

            <Card className="w-full max-w-md bg-white border-[#e2e6ea] shadow-md p-4">
                {status === 'success' ? (
                    <CardContent className="pt-6 text-center space-y-4">
                        <CheckCircle2 className="h-12 w-12 text-[#10b981] mx-auto" />
                        <h2 className="text-xl font-bold text-[#0d121b]">Inscrição Cancelada</h2>
                        <p className="text-sm text-[#4c669a] leading-relaxed">
                            O e-mail <strong>{email}</strong> foi removido da nossa lista de novidades. Você não receberá mais os e-mails mensais de atualizações do DevThru.
                        </p>
                        <div className="pt-4">
                            <Button asChild className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white font-semibold">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar para o Site
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                ) : status === 'error' ? (
                    <CardContent className="pt-6 text-center space-y-4">
                        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto" />
                        <h2 className="text-xl font-bold text-[#0d121b]">Houve um Problema</h2>
                        <p className="text-sm text-[#4c669a] leading-relaxed">
                            {errorMessage}
                        </p>
                        <div className="pt-4">
                            <Button asChild className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white font-semibold">
                                <Link href="/">
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar para o Site
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                ) : (
                    <>
                        <CardHeader className="text-center pb-2">
                            <CardTitle className="text-xl text-[#0d121b]">Cancelar Assinatura</CardTitle>
                            <CardDescription className="text-[#4c669a]">
                                Confirme o cancelamento de e-mails de novidades da plataforma.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6 pt-4">
                            {email ? (
                                <p className="text-sm text-[#4c669a] text-center leading-relaxed">
                                    Deseja mesmo parar de receber as atualizações mensais de ferramentas e posts no e-mail <strong>{email}</strong>?
                                </p>
                            ) : (
                                <p className="text-sm text-red-500 text-center">
                                    Nenhum e-mail de inscrição foi detectado na URL.
                                </p>
                            )}

                            <div className="space-y-2">
                                <Button
                                    onClick={handleUnsubscribe}
                                    disabled={status === 'loading' || !email}
                                    className="w-full bg-[#135bec] hover:bg-[#135bec]/90 text-white font-semibold"
                                >
                                    {status === 'loading' ? 'Processando...' : 'Confirmar Cancelamento'}
                                </Button>
                                <Button asChild variant="outline" className="w-full border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]">
                                    <Link href="/">
                                        Cancelar
                                    </Link>
                                </Button>
                            </div>
                        </CardContent>
                    </>
                )}
            </Card>
        </div>
    );
}

export function UnsubscribeClient() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#f6f6f8]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando...</p>
            </div>
        }>
            <UnsubscribeContent />
        </Suspense>
    );
}
