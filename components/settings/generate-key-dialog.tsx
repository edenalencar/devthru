'use client'

import { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/copy-button'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

interface GenerateKeyDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    newKey: string | null
}

export function GenerateKeyDialog({ open, onOpenChange, newKey }: GenerateKeyDialogProps) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        if (newKey) {
            navigator.clipboard.writeText(newKey)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Nova API Key Gerada!</DialogTitle>
                    <DialogDescription>
                        Copie e salve esta chave em um local seguro. Ela não será mostrada novamente.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Key Display */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                                {newKey}
                            </div>
                            <CopyButton text={newKey || ''} />
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="flex items-start gap-2 text-sm bg-amber-500/10 p-3 rounded-lg">
                        <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-semibold text-amber-600 dark:text-amber-400">
                                Importante!
                            </p>
                            <p className="text-muted-foreground mt-1">
                                Esta é a única vez que você verá esta chave completa. Certifique-se de copiá-la agora.
                            </p>
                        </div>
                    </div>

                    {/* Success Message */}
                    {copied && (
                        <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Chave copiada para a área de transferência!</span>
                        </div>
                    )}

                    {/* Close Button */}
                    <Button
                        onClick={() => onOpenChange(false)}
                        className="w-full"
                        variant={copied ? 'default' : 'outline'}
                    >
                        {copied ? 'Fechar' : 'Copiar e Fechar'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
