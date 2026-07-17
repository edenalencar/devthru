"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Search, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface Message {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    reply_message?: string;
    replied_at?: string;
    created_at: string;
}

export function AdminMessagesClient() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [replyText, setReplyText] = useState('');
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'pending' | 'replied'>('all');
    const [searchTerm, setSearchTerm] = useState('');

    const loadMessages = async () => {
        try {
            const res = await fetch('/api/admin/messages');
            if (!res.ok) throw new Error();
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (err) {
            console.error(err);
            toast.error('Erro ao carregar mensagens de contato');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    useEffect(() => {
        let result = [...messages];

        if (filter === 'pending') {
            result = result.filter(m => m.status === 'pending');
        } else if (filter === 'replied') {
            result = result.filter(m => m.status === 'replied');
        }

        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            result = result.filter(
                m =>
                    m.name.toLowerCase().includes(term) ||
                    m.email.toLowerCase().includes(term) ||
                    m.subject.toLowerCase().includes(term) ||
                    m.message.toLowerCase().includes(term)
            );
        }

        setFilteredMessages(result);

        // Keep selected message reference updated with latest status
        if (selectedMessage) {
            const updated = messages.find(m => m.id === selectedMessage.id);
            if (updated) setSelectedMessage(updated);
        }
    }, [messages, filter, searchTerm, selectedMessage]);

    const handleSendReply = async () => {
        if (!selectedMessage || replyText.trim().length < 5) {
            toast.error('Escreva uma resposta com pelo menos 5 caracteres');
            return;
        }

        setSending(true);
        try {
            const res = await fetch('/api/admin/messages/reply', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messageId: selectedMessage.id,
                    replyText,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Erro ao enviar resposta');
            }

            toast.success('Resposta enviada com sucesso por e-mail!');
            setReplyText('');
            await loadMessages();
        } catch (err) {
            console.error(err);
            toast.error(err instanceof Error ? err.message : 'Erro ao enviar resposta');
        } finally {
            setSending(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#135bec] border-r-transparent"></div>
                <p className="text-sm text-[#4c669a]">Carregando mensagens...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#0d121b]">Mensagens de Contato</h1>
                <p className="text-sm text-[#4c669a] mt-1">Veja e responda as dúvidas e feedbacks enviados pelos usuários.</p>
            </div>

            {/* Filters and Search */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white border border-[#e2e6ea] p-4 rounded-xl shadow-sm">
                <div className="flex gap-2">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        onClick={() => setFilter('all')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${filter === 'all' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Todas ({messages.length})
                    </Button>
                    <Button
                        variant={filter === 'pending' ? 'default' : 'outline'}
                        onClick={() => setFilter('pending')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${filter === 'pending' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Pendentes ({messages.filter(m => m.status === 'pending').length})
                    </Button>
                    <Button
                        variant={filter === 'replied' ? 'default' : 'outline'}
                        onClick={() => setFilter('replied')}
                        className={`h-9 px-4 rounded-lg text-xs font-semibold ${filter === 'replied' ? 'bg-[#135bec] text-white hover:bg-[#135bec]/90' : 'border-[#e2e6ea] text-[#4c669a] hover:text-[#0d121b]'}`}
                    >
                        Respondidas ({messages.filter(m => m.status === 'replied').length})
                    </Button>
                </div>
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#4c669a]" />
                    <input
                        type="text"
                        placeholder="Buscar por nome, email ou assunto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 h-9 w-full bg-[#f6f6f8] border border-[#e2e6ea] rounded-lg text-xs text-[#0d121b] placeholder-[#4c669a] focus:outline-none focus:border-[#135bec] focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Layout Grid */}
            <div className="grid gap-6 lg:grid-cols-5 items-start">
                {/* Messages List */}
                <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {filteredMessages.length === 0 ? (
                        <div className="text-center py-12 border border-dashed border-[#e2e6ea] rounded-xl bg-white">
                            <Mail className="h-8 w-8 text-[#4c669a] mx-auto mb-2" />
                            <p className="text-sm text-[#4c669a]">Nenhuma mensagem encontrada.</p>
                        </div>
                    ) : (
                        filteredMessages.map((msg) => (
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                                    selectedMessage?.id === msg.id
                                        ? 'bg-white border-[#135bec] shadow-md'
                                        : 'bg-white/70 border-[#e2e6ea] hover:bg-white hover:border-[#4c669a]/30'
                                }`}
                            >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="font-semibold text-sm truncate text-[#0d121b]">{msg.name}</span>
                                    {msg.status === 'replied' ? (
                                        <Badge className="bg-[#10b981]/10 text-[#10b981] border-[#10b981]/20 text-[10px]">
                                            Respondido
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/20 text-[10px]">
                                            Pendente
                                        </Badge>
                                    )}
                                </div>
                                <div className="text-xs font-semibold text-[#0d121b] mb-1 truncate">{msg.subject}</div>
                                <div className="text-xs text-[#4c669a] line-clamp-2 mb-2">{msg.message}</div>
                                <div className="text-[10px] text-[#4c669a]">{formatDate(msg.created_at)}</div>
                            </div>
                        ))
                    )}
                </div>

                {/* Message Detail View */}
                <div className="lg:col-span-3">
                    {selectedMessage ? (
                        <Card className="bg-white border-[#e2e6ea] text-[#0d121b] shadow-sm">
                            <CardHeader className="border-b border-[#e2e6ea]">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <CardTitle className="text-lg text-[#0d121b]">{selectedMessage.subject}</CardTitle>
                                        <CardDescription className="text-[#4c669a] mt-1">
                                            De: {selectedMessage.name} ({selectedMessage.email})
                                        </CardDescription>
                                    </div>
                                    <div className="text-xs text-[#4c669a] text-right">
                                        {formatDate(selectedMessage.created_at)}
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 space-y-6">
                                {/* Message Body */}
                                <div className="bg-[#f6f6f8] border border-[#e2e6ea] p-4 rounded-xl">
                                    <h4 className="text-xs font-bold text-[#4c669a] uppercase mb-2">Mensagem</h4>
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed text-[#0d121b]">
                                        {selectedMessage.message}
                                    </p>
                                </div>

                                {/* Reply Section */}
                                {selectedMessage.status === 'replied' ? (
                                    <div className="bg-[#135bec]/5 border border-[#135bec]/20 p-4 rounded-xl">
                                        <div className="flex items-center gap-2 mb-2 text-[#135bec]">
                                            <CheckCircle2 className="h-4 w-4" />
                                            <h4 className="text-xs font-bold uppercase">Resposta Enviada por E-mail</h4>
                                        </div>
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed text-[#4c669a] mb-3">
                                            {selectedMessage.reply_message}
                                        </p>
                                        {selectedMessage.replied_at && (
                                            <div className="flex items-center gap-1.5 text-[10px] text-[#4c669a]">
                                                <Clock className="h-3 w-3" />
                                                <span>Respondido em {formatDate(selectedMessage.replied_at)}</span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-[#4c669a] uppercase">Responder Mensagem</h4>
                                        <Textarea
                                            placeholder="Digite sua resposta aqui... (O e-mail será enviado formatado com o template oficial do DevThru)"
                                            value={replyText}
                                            onChange={(e) => setReplyText(e.target.value)}
                                            className="min-h-[150px] bg-[#f6f6f8] border-[#e2e6ea] text-[#0d121b] focus:bg-white focus:border-[#135bec] placeholder-[#4c669a] outline-none"
                                            disabled={sending}
                                        />
                                        <div className="flex justify-end">
                                            <Button
                                                onClick={handleSendReply}
                                                disabled={sending || replyText.trim().length < 5}
                                                className="bg-[#135bec] hover:bg-[#135bec]/90 text-white font-semibold"
                                            >
                                                {sending ? (
                                                    'Enviando...'
                                                ) : (
                                                    <>
                                                        <Send className="mr-2 h-4 w-4" />
                                                        Enviar Resposta
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="text-center py-24 border border-dashed border-[#e2e6ea] rounded-xl bg-white shadow-sm">
                            <MessageSquare className="h-12 w-12 text-[#4c669a]/40 mx-auto mb-3" />
                            <h3 className="text-sm font-semibold text-[#0d121b]">Nenhuma mensagem selecionada</h3>
                            <p className="text-xs text-[#4c669a] mt-1">Selecione uma mensagem na barra lateral para responder.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
