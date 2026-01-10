'use client'

// import { useState } from 'react'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CopyButton } from '@/components/copy-button'
import { Code2, Zap, Shield, BarChart3, Book, Key } from 'lucide-react'
import Link from 'next/link'

export function ApiDocsPage() {
    // const [selectedEndpoint, setSelectedEndpoint] = useState('generate')

    const codeExamples = {
        javascript: `// Generate CPF
const response = await fetch('https://devthru.com/api/v1/generate/cpf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    quantity: 10,
    options: { formatted: true }
  })
});

const data = await response.json();
console.log(data);
// { success: true, data: ["123.456.789-00", ...], count: 10 }`,

        python: `import requests

# Generate CPF
response = requests.post(
    'https://devthru.com/api/v1/generate/cpf',
    headers={'x-api-key': 'YOUR_API_KEY'},
    json={
        'quantity': 10,
        'options': {'formatted': True}
    }
)

data = response.json()
print(data)
# {'success': True, 'data': ['123.456.789-00', ...], 'count': 10}`,

        curl: `curl -X POST https://devthru.com/api/v1/generate/cpf \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "quantity": 10,
    "options": {"formatted": true}
  }'`,
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <Code2 className="h-10 w-10 text-primary" />
                            <h1 className="text-4xl font-bold">API Documentation</h1>
                        </div>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            API REST para geração e validação de dados brasileiros. Rápida, confiável e fácil de usar.
                        </p>
                        <div className="flex gap-4 justify-center mt-6">
                            <Link href="/dashboard/settings">
                                <Button size="lg" className="gap-2">
                                    <Key className="h-4 w-4" />
                                    Obter API Key
                                </Button>
                            </Link>
                            <a href="/api/v1/docs" target="_blank">
                                <Button size="lg" variant="outline" className="gap-2">
                                    <Book className="h-4 w-4" />
                                    OpenAPI Spec
                                </Button>
                            </a>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <Card>
                            <CardHeader>
                                <Zap className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Rápida</CardTitle>
                                <CardDescription>
                                    Respostas em milissegundos com infraestrutura otimizada
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <Shield className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Segura</CardTitle>
                                <CardDescription>
                                    Autenticação via API key com rate limiting inteligente
                                </CardDescription>
                            </CardHeader>
                        </Card>

                        <Card>
                            <CardHeader>
                                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                                <CardTitle>Monitorada</CardTitle>
                                <CardDescription>
                                    Acompanhe seu uso em tempo real com estatísticas detalhadas
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>

                    {/* Quick Start */}
                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle>Quick Start</CardTitle>
                            <CardDescription>Comece a usar a API em 3 passos simples</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    1
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold mb-1">Obtenha sua API Key</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Acesse <Link href="/settings/api-keys" className="text-primary hover:underline">/settings/api-keys</Link> e crie uma nova chave
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    2
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold mb-1">Faça sua primeira requisição</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        Use sua API key no header <code className="bg-muted px-1 rounded">x-api-key</code>
                                    </p>
                                    <Tabs defaultValue="javascript" className="w-full">
                                        <TabsList>
                                            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                                            <TabsTrigger value="python">Python</TabsTrigger>
                                            <TabsTrigger value="curl">cURL</TabsTrigger>
                                        </TabsList>
                                        {Object.entries(codeExamples).map(([lang, code]) => (
                                            <TabsContent key={lang} value={lang}>
                                                <div className="rounded-lg border bg-muted overflow-hidden">
                                                    <div className="flex items-center justify-end px-4 py-2 border-b border-border/10 bg-muted/50">
                                                        <CopyButton text={code} />
                                                    </div>
                                                    <pre className="p-4 overflow-x-auto text-sm">
                                                        <code>{code}</code>
                                                    </pre>
                                                </div>
                                            </TabsContent>
                                        ))}
                                    </Tabs>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                                    3
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold mb-1">Monitore seu uso</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Acompanhe suas estatísticas em tempo real via <code className="bg-muted px-1 rounded">GET /api/v1/usage</code>
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Endpoints */}
                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle>Endpoints Disponíveis</CardTitle>
                            <CardDescription>Todos os endpoints requerem autenticação via API key</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Generate */}
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="default">POST</Badge>
                                    <code className="text-sm font-mono">/api/v1/generate/{'{tool}'}</code>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Gera dados para testes. Suporta: cpf, cnpj, rg, cnh, inscricao-estadual, titulo-eleitor, pis, name, email, phone, address, person, license-plate, renavam, chassis, credit-card, iban, uuid, password, lorem
                                </p>
                                <details className="text-sm">
                                    <summary className="cursor-pointer font-semibold mb-2">Ver exemplo</summary>
                                    <div className="bg-muted p-3 rounded">
                                        <p className="font-semibold mb-1">Request:</p>
                                        <pre className="text-xs overflow-x-auto">{`{
  "quantity": 10,
  "options": { "formatted": true }
}`}</pre>
                                        <p className="font-semibold mt-2 mb-1">Response:</p>
                                        <pre className="text-xs overflow-x-auto">{`{
  "success": true,
  "data": ["123.456.789-00", ...],
  "count": 10
}`}</pre>
                                    </div>
                                </details>
                            </div>

                            {/* Validate */}
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="default">POST</Badge>
                                    <code className="text-sm font-mono">/api/v1/validate/{'{tool}'}</code>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Valida documentos brasileiros. Suporta: cpf, cnpj, pis, titulo-eleitor, cnh, iban, inscricao-estadual
                                </p>
                                <details className="text-sm">
                                    <summary className="cursor-pointer font-semibold mb-2">Ver exemplo</summary>
                                    <div className="bg-muted p-3 rounded">
                                        <p className="font-semibold mb-1">Request:</p>
                                        <pre className="text-xs overflow-x-auto">{`{
  "value": "123.456.789-00"
}`}</pre>
                                        <p className="font-semibold mt-2 mb-1">Response:</p>
                                        <pre className="text-xs overflow-x-auto">{`{
  "success": true,
  "valid": true,
  "value": "123.456.789-00"
}`}</pre>
                                    </div>
                                </details>
                            </div>

                            {/* Usage */}
                            <div className="border rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-2">
                                    <Badge variant="secondary">GET</Badge>
                                    <code className="text-sm font-mono">/api/v1/usage</code>
                                </div>
                                <p className="text-sm text-muted-foreground mb-3">
                                    Retorna estatísticas de uso da API
                                </p>
                                <details className="text-sm">
                                    <summary className="cursor-pointer font-semibold mb-2">Ver exemplo</summary>
                                    <div className="bg-muted p-3 rounded">
                                        <p className="font-semibold mb-1">Response:</p>
                                        <pre className="text-xs overflow-x-auto">{`{
  "success": true,
  "period": "monthly",
  "used": 150,
  "limit": 1000,
  "remaining": 850,
  "resetAt": "2025-12-01T00:00:00Z",
  "topTools": [
    { "tool": "cpf", "count": 80 },
    { "tool": "cnpj", "count": 45 }
  ]
}`}</pre>
                                    </div>
                                </details>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rate Limits */}
                    <Card className="mb-12">
                        <CardHeader>
                            <CardTitle>Rate Limits</CardTitle>
                            <CardDescription>Limites de uso por plano de assinatura</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="border rounded-lg p-4 opacity-50">
                                    <h3 className="font-semibold mb-2">Free Plan</h3>
                                    <p className="text-2xl font-bold mb-1">-</p>
                                    <p className="text-sm text-muted-foreground">Sem acesso à API</p>
                                </div>
                                <div className="border rounded-lg p-4 opacity-50">
                                    <h3 className="font-semibold mb-2">Pro Plan</h3>
                                    <p className="text-2xl font-bold mb-1">-</p>
                                    <p className="text-sm text-muted-foreground">Sem acesso à API</p>
                                </div>
                                <div className="border rounded-lg p-4 bg-primary/5 border-primary/20">
                                    <h3 className="font-semibold mb-2">Business Plan</h3>
                                    <p className="text-2xl font-bold mb-1">1,000,000</p>
                                    <p className="text-sm text-muted-foreground">requests por mês</p>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-4">
                                Todas as respostas incluem headers de rate limit: <code className="bg-muted px-1 rounded">X-RateLimit-Limit</code>,
                                <code className="bg-muted px-1 rounded ml-1">X-RateLimit-Remaining</code>,
                                <code className="bg-muted px-1 rounded ml-1">X-RateLimit-Reset</code>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Error Codes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Códigos de Erro</CardTitle>
                            <CardDescription>Possíveis erros retornados pela API</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3 text-sm">
                                <div className="flex gap-3">
                                    <code className="bg-muted px-2 py-1 rounded font-mono">INVALID_API_KEY</code>
                                    <span className="text-muted-foreground">API key inválida ou ausente</span>
                                </div>
                                <div className="flex gap-3">
                                    <code className="bg-muted px-2 py-1 rounded font-mono">RATE_LIMIT_EXCEEDED</code>
                                    <span className="text-muted-foreground">Limite de requisições excedido</span>
                                </div>
                                <div className="flex gap-3">
                                    <code className="bg-muted px-2 py-1 rounded font-mono">INVALID_INPUT</code>
                                    <span className="text-muted-foreground">Dados de entrada inválidos</span>
                                </div>
                                <div className="flex gap-3">
                                    <code className="bg-muted px-2 py-1 rounded font-mono">TOOL_NOT_FOUND</code>
                                    <span className="text-muted-foreground">Ferramenta não encontrada</span>
                                </div>
                                <div className="flex gap-3">
                                    <code className="bg-muted px-2 py-1 rounded font-mono">INTERNAL_ERROR</code>
                                    <span className="text-muted-foreground">Erro interno do servidor</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <Footer />
        </div>
    )
}
