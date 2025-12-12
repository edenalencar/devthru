"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Trash2, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function DeleteAccount() {
    const supabase = createClient()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const [confirmText, setConfirmText] = useState("")

    const handleDelete = async () => {
        if (confirmText !== "EXCLUIR") return

        try {
            setLoading(true)

            // Call the API to delete the user
            const response = await fetch("/api/auth/delete-user", {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete account")
            }

            // Sign out locally to clear session
            await supabase.auth.signOut()

            toast.success("Sua conta foi excluída permanentemente.")
            router.push("/")
            router.refresh()
        } catch (error) {
            toast.error("Erro ao excluir conta. Tente novamente.")
            console.error(error)
        } finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <Card className="border-destructive/50">
            <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                    <Trash2 className="h-5 w-5" />
                    Excluir Conta
                </CardTitle>
                <CardDescription>
                    Esta ação é irreversível. Todos os seus dados serão apagados permanentemente.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="destructive">Excluir minha conta</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                                Tem certeza absoluta?
                            </DialogTitle>
                            <DialogDescription>
                                Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta,
                                <span className="font-bold text-destructive"> cancelará sua assinatura ativa imediatamente </span>
                                e removerá seus dados de nossos servidores.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="confirm">
                                    Digite <span className="font-bold text-destructive">EXCLUIR</span> para confirmar
                                </Label>
                                <Input
                                    id="confirm"
                                    value={confirmText}
                                    onChange={(e) => setConfirmText(e.target.value)}
                                    placeholder="EXCLUIR"
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDelete}
                                disabled={confirmText !== "EXCLUIR" || loading}
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Excluir Conta
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    )
}
