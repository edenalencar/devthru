'use client'

import { CheckCircle2 } from 'lucide-react'
import { CopyButton } from '@/components/copy-button'
import { HistoryButton } from '@/components/tools/history-button'

interface ToolResultProps {
    result: string | string[]
    toolId: string
    toolName: string
    input?: any
    successMessage?: string
    className?: string
}

export function ToolResult({
    result,
    toolId,
    toolName,
    input = {},
    successMessage,
    className = '',
}: ToolResultProps) {
    if (!result || (Array.isArray(result) && result.length === 0)) {
        return null
    }

    const displayResult = Array.isArray(result) ? result.join(', ') : result
    const outputForHistory = Array.isArray(result) ? result : result

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="rounded-lg border bg-muted p-4">
                <div className="flex items-center justify-between">
                    <code className="text-2xl font-mono font-bold break-all">
                        {displayResult}
                    </code>
                    <CopyButton text={displayResult} />
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    {successMessage || `${toolName} gerado com sucesso`}
                </div>
                <HistoryButton
                    toolId={toolId}
                    toolName={toolName}
                    input={input}
                    output={outputForHistory}
                />
            </div>
        </div>
    )
}
