'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { saveHistoryToSupabase } from '@/lib/supabase/history'
import { createClient } from '@/lib/supabase/client'
import { useUser } from '@/lib/hooks/use-user'

interface HistoryButtonProps {
    toolId: string
    toolName: string
    input: any
    output: any
    disabled?: boolean
}

export function HistoryButton({
    toolId,
    toolName,
    input,
    output,
    disabled = false,
}: HistoryButtonProps) {
    const router = useRouter()
    const { user } = useUser()
    const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')

    const handleSave = async () => {
        if (disabled || state === 'saving') return

        if (!user) {
            toast.error('Faça login para salvar', {
                description: 'Você precisa estar logado para salvar no histórico.',
                action: {
                    label: 'Entrar',
                    onClick: () => router.push('/login'),
                },
            })
            return
        }

        setState('saving')

        try {
            const result = await saveHistoryToSupabase({
                toolId,
                toolName,
                input,
                output,
            })

            if (result) {
                setState('saved')
                toast.success('Salvo no histórico!', {
                    description: 'Você pode acessar em Dashboard > Histórico',
                })

                // Reset to idle after 2 seconds
                setTimeout(() => setState('idle'), 2000)
            } else {
                throw new Error('Failed to save')
            }
        } catch (error) {
            console.error('Error saving to history:', error)
            toast.error('Erro ao salvar', {
                description: 'Não foi possível salvar no histórico. Tente novamente.',
            })
            setState('idle')
        }
    }

    return (
        <Button
            variant={state === 'saved' ? 'default' : 'outline'}
            size="sm"
            onClick={handleSave}
            disabled={disabled || state === 'saving'}
            className="gap-2"
        >
            {state === 'saving' && <Loader2 className="h-4 w-4 animate-spin" />}
            {state === 'saved' && <BookmarkCheck className="h-4 w-4" />}
            {state === 'idle' && <Bookmark className="h-4 w-4" />}
            {state === 'saving' ? 'Salvando...' : state === 'saved' ? 'Salvo!' : 'Salvar no Histórico'}
        </Button>
    )
}
