"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/lib/supabase/client"
import { Loader2, Upload, User } from "lucide-react"
import { toast } from "sonner"
import { isUserInTrial } from "@/lib/permissions"

interface ProfileFormProps {
    user: any
    profile: any
    onUpdate: () => void
}

export function ProfileForm({ user, profile, onUpdate }: ProfileFormProps) {
    const supabase = createClient()
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState(profile?.full_name || user?.user_metadata?.full_name || "")
    const [uploading, setUploading] = useState(false)

    const handleUpdateProfile = async () => {
        try {
            setLoading(true)
            const updates = {
                id: user.id,
                full_name: fullName,
                email: user.email, // Required field
                updated_at: new Date().toISOString(),
            }

            const { error } = await supabase
                .from("profiles")
                .upsert(updates as any)

            if (error) throw error

            // Also update auth metadata
            await supabase.auth.updateUser({
                data: { full_name: fullName }
            })

            toast.success("Perfil atualizado com sucesso!")
            onUpdate()
        } catch (error) {
            toast.error("Erro ao atualizar perfil")
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true)
            const file = event.target.files?.[0]
            if (!file) return

            const fileExt = file.name.split('.').pop()
            const filePath = `${user.id}-${Math.random()}.${fileExt}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file)

            if (uploadError) {
                if (uploadError.message.includes("Bucket not found")) {
                    toast.error("Erro: Bucket de armazenamento não configurado.")
                    return
                }
                throw uploadError
            }

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath)

            // Update auth metadata
            await supabase.auth.updateUser({
                data: { avatar_url: publicUrl }
            })

            // Update profiles table
            await supabase
                .from("profiles")
                .upsert({
                    id: user.id,
                    email: user.email,
                    avatar_url: publicUrl,
                    updated_at: new Date().toISOString(),
                } as any)

            toast.success("Foto de perfil atualizada!")
            onUpdate()
            window.location.reload() // Force reload to show new avatar in navbar
        } catch (error) {
            toast.error("Erro ao fazer upload da imagem")
            console.error(error)
        } finally {
            setUploading(false)
        }
    }

    const [managingSubscription, setManagingSubscription] = useState(false)

    const handleManageSubscription = async () => {
        try {
            setManagingSubscription(true)
            const response = await fetch("/api/stripe/portal", {
                method: "POST",
            })

            if (!response.ok) throw new Error("Failed to create portal session")

            const { url } = await response.json()
            window.location.href = url
        } catch (error) {
            toast.error("Erro ao abrir portal de assinatura")
            console.error(error)
        } finally {
            setManagingSubscription(false)
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>
                    Atualize sua foto e nome de exibição.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={user?.user_metadata?.avatar_url} />
                        <AvatarFallback>
                            {fullName?.charAt(0) || user?.email?.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="avatar" className="cursor-pointer">
                            <div className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                                <Upload className="h-4 w-4" />
                                {uploading ? "Enviando..." : "Alterar foto"}
                            </div>
                            <Input
                                id="avatar"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarUpload}
                                disabled={uploading}
                            />
                        </Label>
                        <p className="text-xs text-muted-foreground">
                            JPG, GIF ou PNG. Máximo de 2MB.
                        </p>
                    </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                    <div className="space-y-1">
                        <Label>Plano Atual</Label>
                        <p className="text-sm text-muted-foreground">
                            Seu plano de assinatura ativo.
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium capitalize">
                                {isUserInTrial(profile) ? 'Trial (Pro)' : (profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'business' ? profile.subscription_tier : 'Gratuito')}
                            </span>
                            <div className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${isUserInTrial(profile)
                                ? 'bg-blue-500/20 text-blue-500'
                                : (profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'business'
                                    ? 'bg-primary/20 text-primary'
                                    : 'bg-secondary text-secondary-foreground')
                                }`}>
                                {isUserInTrial(profile) ? 'TRIAL' : (profile?.subscription_tier === 'pro' || profile?.subscription_tier === 'business' ? profile.subscription_tier.toUpperCase() : 'FREE')}
                            </div>
                        </div>

                        {profile?.current_period_end && profile?.subscription_tier !== 'free' && (
                            <p className="text-xs text-muted-foreground mt-1 text-right">
                                {profile.cancel_at_period_end ? "Encerra em " : "Renova em "}
                                {new Date(profile.current_period_end).toLocaleDateString()}
                            </p>
                        )}

                        {(profile?.subscription_tier === 'free' || !profile?.subscription_tier) ? (
                            <div className="flex gap-2">
                                {profile?.stripe_customer_id && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleManageSubscription}
                                        disabled={managingSubscription}
                                    >
                                        Histórico
                                    </Button>
                                )}
                                <Button variant="default" size="sm" asChild>
                                    <a href="/pricing">Fazer Upgrade</a>
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleManageSubscription}
                                disabled={managingSubscription}
                            >
                                {managingSubscription && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Gerenciar Assinatura
                            </Button>
                        )}
                    </div>
                </div>

                <div className="grid gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="pl-9"
                                placeholder="Seu nome"
                            />
                        </div>
                    </div>
                </div>

                <Button onClick={handleUpdateProfile} disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Salvar Alterações
                </Button>
            </CardContent>
        </Card >
    )
}
