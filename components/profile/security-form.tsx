"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Lock, Mail } from "lucide-react"
import { toast } from "sonner"
import { updatePasswordAction } from "@/app/dashboard/profile/actions"

interface SecurityFormProps {
    user: any
}

export function SecurityForm({ user }: SecurityFormProps) {
    const [supabase] = useState(() => createClient())
    const [loadingEmail, setLoadingEmail] = useState(false)
    const [loadingPass, setLoadingPass] = useState(false)
    const [email, setEmail] = useState(user?.email || "")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        if (email === user?.email) return

        try {
            setLoadingEmail(true)
            const { error } = await supabase.auth.updateUser({ email })
            if (error) throw error
            toast.success("Verifique seu novo email para confirmar a alteração.")
        } catch (error: any) {
            console.error("Error updating email:", error)
            toast.error(error.message || "Erro ao atualizar email")
        } finally {
            setLoadingEmail(false)
        }
    }

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem")
            return
        }
        if (password.length < 6) {
            toast.error("A senha deve ter pelo menos 6 caracteres")
            return
        }

        try {
            console.log("Starting password update process via Server Action...")
            setLoadingPass(true)

            // Call Server Action
            const result = await updatePasswordAction(password)

            if (!result.success) {
                throw new Error(result.error)
            }

            toast.success("Senha atualizada com sucesso!")
            setPassword("")
            setConfirmPassword("")
        } catch (error: any) {
            console.error("Error updating password:", error)
            toast.error(error.message || "Erro ao atualizar senha")
        } finally {
            setLoadingPass(false)
        }
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Email</CardTitle>
                    <CardDescription>
                        Alterar seu endereço de email.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateEmail} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Novo Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={loadingEmail || email === user?.email}>
                            {loadingEmail && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Atualizar Email
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Senha</CardTitle>
                    <CardDescription>
                        Alterar sua senha de acesso.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdatePassword} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="password">Nova Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                        <Button type="submit" disabled={loadingPass || !password}>
                            {loadingPass && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Atualizar Senha
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
