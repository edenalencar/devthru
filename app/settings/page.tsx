"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ApiKeysSettings } from "@/components/settings/api-keys"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Shield } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Settings className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Configurações</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Gerencie suas preferências e chaves de acesso.
                        </p>
                    </div>

                    <div className="grid gap-8">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Shield className="h-5 w-5 text-primary" />
                                    <CardTitle>Segurança & Integração</CardTitle>
                                </div>
                                <CardDescription>
                                    Gerencie suas chaves de API para acesso programático.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ApiKeysSettings />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
