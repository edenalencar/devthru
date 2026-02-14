"use client"

import { useState } from "react"
import { Navbar } from "@/components/layout/navbar"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CopyButton } from "@/components/copy-button"
import { generatePassword, calculatePasswordStrength, type PasswordOptions } from "@/lib/utils/generators/password"
import { Key, Shield } from "lucide-react"
import { ConfigurationManager } from "@/components/tools/configuration-manager"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"

export function PasswordGeneratorPage() {
    const [password, setPassword] = useState("")
    const [options, setOptions] = useState<PasswordOptions>({
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
    })

    const strength = password ? calculatePasswordStrength(password) : null

    const handleGenerate = () => {
        try {
            const newPassword = generatePassword(options)
            setPassword(newPassword)
        } catch (error) {
            alert("Selecione pelo menos um tipo de caractere")
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Utilidades" }, { "label": "Gerador de Senha" }]} className="mb-6" />
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Key className="h-8 w-8 text-primary" />
                            <h1 className="text-4xl font-bold">Gerador de Senhas</h1>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            Crie senhas fortes e seguras personalizadas para suas contas.
                        </p>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-3">
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle>Configurações</CardTitle>
                                <CardDescription>
                                    Personalize sua senha
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="length">Comprimento: {options.length}</Label>
                                    <input
                                        id="length"
                                        type="range"
                                        min="8"
                                        max="64"
                                        value={options.length}
                                        onChange={(e) => setOptions({ ...options, length: parseInt(e.target.value) })}
                                        className="w-full"
                                    />
                                    <p className="text-xs text-muted-foreground">8 a 64 caracteres</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="uppercase"
                                            checked={options.uppercase}
                                            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="uppercase">Maiúsculas (A-Z)</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="lowercase"
                                            checked={options.lowercase}
                                            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="lowercase">Minúsculas (a-z)</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="numbers"
                                            checked={options.numbers}
                                            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="numbers">Números (0-9)</Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id="symbols"
                                            checked={options.symbols}
                                            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300"
                                        />
                                        <Label htmlFor="symbols">Símbolos (!@#$...)</Label>
                                    </div>
                                </div>

                                <Button onClick={handleGenerate} className="w-full" size="lg">
                                    Gerar Senha
                                </Button>

                                <ConfigurationManager
                                    toolId="password-generator"
                                    currentConfig={options}
                                    onLoadConfig={(config) => {
                                        if (config) {
                                            setOptions(config)
                                        }
                                    }}
                                />
                            </CardContent>
                        </Card>

                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <CardTitle>Senha Gerada</CardTitle>
                                <CardDescription>
                                    {password ? "Sua senha forte e segura" : "Clique em gerar para criar uma senha"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {password ? (
                                    <div className="space-y-4">
                                        <div className="rounded-lg border bg-muted p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <code className="text-2xl font-mono font-bold break-all">
                                                    {password}
                                                </code>
                                                <CopyButton text={password} />
                                            </div>

                                            {strength && (
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between text-sm">
                                                        <span className="text-muted-foreground">Força da senha:</span>
                                                        <span className={`font-semibold ${strength.color}`}>
                                                            {strength.label}
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-muted-foreground/20 rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full transition-all ${strength.score <= 2
                                                                ? "bg-destructive"
                                                                : strength.score <= 4
                                                                    ? "bg-yellow-500"
                                                                    : strength.score <= 6
                                                                        ? "bg-accent"
                                                                        : "bg-green-600"
                                                                }`}
                                                            style={{ width: `${(strength.score / 7) * 100}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-start gap-3 rounded-lg border border-accent/50 bg-accent/10 p-4">
                                            <Shield className="h-5 w-5 text-accent mt-0.5" />
                                            <div className="text-sm">
                                                <p className="font-semibold text-accent mb-1">Dica de Segurança</p>
                                                <p className="text-muted-foreground">
                                                    Use senhas únicas para cada conta e considere usar um gerenciador de senhas.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        Nenhum senha gerada ainda
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Dicas para Senhas Fortes</CardTitle>
                        </CardHeader>
                        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
                            <ul>
                                <li>Use pelo menos 12 caracteres (16+ é melhor)</li>
                                <li>Combine letras maiúsculas, minúsculas, números e símbolos</li>
                                <li>Evite palavras do dicionário e informações pessoais</li>
                                <li>Use uma senha única para cada conta</li>
                                <li>Considere usar um gerenciador de senhas</li>
                                <li>Ative autenticação de dois fatores quando disponível</li>
                            </ul>
                        </CardContent>
                        <div className="pt-4 border-t px-6 pb-6">
                            <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                            <ShareButtons
                                title="Gerador de Senhas"
                                description="Crie senhas fortes e seguras personalizadas."
                            />
                        </div>
                    </Card>
                    <RelatedTools currentToolSlug="password" category="utilities" />
                </div>
            </main>


        </div>
    )
}
