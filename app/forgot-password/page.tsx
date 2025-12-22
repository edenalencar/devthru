"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { Mail, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const supabase = createClient()

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/callback?next=/dashboard/settings`,
            })

            if (error) throw error

            setSuccess(true)
            toast.success("Email de recuperação enviado!")
        } catch (error: any) {
            toast.error(error.message || "Erro ao enviar email de recuperação")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 flex items-center justify-center py-12">
                <div className="container max-w-md">
                    <Card>
                        <CardHeader className="space-y-1">
                            <div className="flex items-center justify-center mb-4">
                                <div className="p-3 bg-primary/10 rounded-full">
                                    <Mail className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-semibold text-center tracking-tight">Recuperar Senha</h1>
                            <CardDescription className="text-center">
                                Digite seu email para receber um link de redefinição
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {success ? (
                                <div className="text-center space-y-4">
                                    <div className="flex justify-center">
                                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-medium text-lg">Email Enviado!</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Verifique sua caixa de entrada (e spam) para redefinir sua senha.
                                        </p>
                                    </div>
                                    <Button asChild className="w-full mt-4">
                                        <Link href="/login">Voltar para o Login</Link>
                                    </Button>
                                    <div className="text-sm text-center mt-4">
                                        <button
                                            onClick={() => setSuccess(false)}
                                            className="text-primary hover:underline"
                                        >
                                            Tentar outro email
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleResetPassword} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="seu@email.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            disabled={loading}
                                        />
                                    </div>

                                    <Button type="submit" className="w-full" disabled={loading}>
                                        {loading ? "Enviando..." : "Enviar link de recuperação"}
                                    </Button>

                                    <div className="text-center text-sm">
                                        Lembrou sua senha?{" "}
                                        <Link href="/login" className="text-primary hover:underline">
                                            Voltar para o Login
                                        </Link>
                                    </div>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
