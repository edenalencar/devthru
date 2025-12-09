"use client"

import { useRouter } from "next/navigation"
import { Loader2, User, Shield, AlertTriangle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "@/components/profile/profile-form"
import { SecurityForm } from "@/components/profile/security-form"
import { DeleteAccount } from "@/components/profile/delete-account"
import { useUser } from "@/lib/hooks/use-user"
import { useEffect } from "react"

export default function ProfilePage() {
    const router = useRouter()
    const { user, profile, loading, refreshUser } = useUser()

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [user, loading, router])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold">Meu Perfil</h1>
                <p className="text-muted-foreground">
                    Gerencie suas informações pessoais e segurança da conta.
                </p>
            </div>

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="general" className="gap-2">
                        <User className="h-4 w-4" />
                        Geral
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="h-4 w-4" />
                        Segurança
                    </TabsTrigger>
                    <TabsTrigger value="danger" className="gap-2 text-destructive data-[state=active]:text-destructive">
                        <AlertTriangle className="h-4 w-4" />
                        Zona de Perigo
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general">
                    <ProfileForm user={user} profile={profile} onUpdate={refreshUser} />
                </TabsContent>

                <TabsContent value="security">
                    <SecurityForm user={user} />
                </TabsContent>

                <TabsContent value="danger">
                    <DeleteAccount />
                </TabsContent>
            </Tabs>
        </div>
    )
}
