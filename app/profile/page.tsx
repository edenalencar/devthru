"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { Loader2, LogOut, User, CreditCard, Key } from "lucide-react"
import { toast } from "sonner"

export default function ProfilePage() {
    const router = useRouter()
    const supabase = createClient()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<any>(null)
    const [profile, setProfile] = useState<any>(null)
    const [fullName, setFullName] = useState("")

    useEffect(() => {
        getProfile()
    }, [])

    const getProfile = async () => {
        try {
            setLoading(true)
            const { data: { user }, error: userError } = await supabase.auth.getUser()

            if (userError || !user) {
                router.push("/login")
                return
            }

            setUser(user)

            // Fetch profile data
            const { data: profile, error: profileError } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single()

            if (profile) {
                setProfile(profile)
                setFullName(profile.full_name || user.user_metadata.full_name || "")
            }
        } catch (error) {
            console.error("Error loading profile:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateProfile = async () => {
        try {
            setLoading(true)
            const { error } = await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    full_name: fullName,
                    updated_at: new Date().toISOString(),
                })

            if (error) throw error
            toast.success("Perfil atualizado com sucesso!")
        } catch (error) {
            toast.error("Erro ao atualizar perfil")
        } finally {
            setLoading(false)
        }
    }

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    if (loading && !user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto max-w-6xl py-12 px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Meu Perfil</h1>
                        <p className="text-muted-foreground">
                            Gerencie suas informações e assinatura
                        </p>
                    </div>
                    <Button variant="destructive" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                    </Button>
                </div>

                <div className="grid gap-8 md:grid-cols-4">
                    {/* Sidebar Navigation */}
                    <Card className="md:col-span-1 h-fit">
                        <CardContent className="p-4 space-y-2">
                            <Button variant="ghost" className="w-full justify-start font-bold bg-muted">
                                <User className="mr-2 h-4 w-4" />
                                Perfil
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" disabled>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Assinatura (Em breve)
                            </Button>
                            <Button variant="ghost" className="w-full justify-start" disabled>
                                <Key className="mr-2 h-4 w-4" />
                                Chaves de API (Em breve)
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Main Content */}
                    <div className="md:col-span-3 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Informações Pessoais</CardTitle>
                                <CardDescription>
                                    Atualize seus dados de identificação
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                                        <AvatarFallback>
                                            {fullName?.charAt(0) || user?.email?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-medium">{user?.email}</h3>
                                        <Badge variant="outline" className="mt-1">
                                            Plano Gratuito
                                        </Badge>
                                    </div>
                                </div>

                                <div className="grid gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" value={user?.email} disabled />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Nome Completo</Label>
                                        <Input
                                            id="fullName"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <Button onClick={handleUpdateProfile} disabled={loading}>
                                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Salvar Alterações
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
