"use client"

import { useState, useTransition } from "react"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CopyButtonProps {
    text: string
    className?: string
    onCopy?: () => void
}

export function CopyButton({ text, className, onCopy }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)
    const [, startTransition] = useTransition()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text)
            startTransition(() => {
                setCopied(true)
                if (onCopy) onCopy()
            })
            setTimeout(() => {
                startTransition(() => {
                    setCopied(false)
                })
            }, 2000)
        } catch (err) {
            console.error("Failed to copy:", err)
        }
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className={className}
        >
            {copied ? (
                <>
                    <Check className="mr-2 h-4 w-4" />
                    Copiado!
                </>
            ) : (
                <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar
                </>
            )}
        </Button>
    )
}
