"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HistoryLocked() {
    return (
        <div className="flex flex-col items-center text-center gap-3 rounded-lg border border-dashed p-8">
            <div className="p-3 bg-primary/10 rounded-full">
                <Lock className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-lg font-semibold">Histórico Bloqueado</h2>
            <p className="text-sm text-muted-foreground max-w-md">
                Consultar e exportar suas gerações é um recurso exclusivo. Faça upgrade para o plano Pro para acessar seu histórico e exportar seus dados em CSV, JSON e Excel.
            </p>
            <Button asChild className="mt-2">
                <Link href="/pricing">Fazer Upgrade Agora</Link>
            </Button>
        </div>
    )
}
