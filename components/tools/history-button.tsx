'use client'

import { useState } from 'react'
import { Bookmark, BookmarkCheck, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { saveHistoryToSupabase } from '@/lib/supabase/history'

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
    const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle')

    const handleSave = async () => {
        if (disabled || state === 'saving') return

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
