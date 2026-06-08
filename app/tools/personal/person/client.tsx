"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw, Copy, Check } from "lucide-react"
import { generatePerson, Person } from "@/lib/utils/validators/person"
import { toast } from "sonner"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Label } from "@/components/ui/label"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const PERSON_JS_CODE = `function generatePersonDataset() {
  const names = ["João Silva", "Maria Santos", "Pedro Oliveira"];
  const cpfs = ["111.111.111-11", "222.222.222-22", "333.333.333-33"];
  const rgs = ["12.345.678-9", "98.765.432-1", "55.555.555-5"];
  const birthDates = ["15/05/1990", "22/10/1985", "03/12/1998"];
  const emails = ["joao.silva@exemplo.com", "maria.santos@exemplo.com", "pedro.oliveira@exemplo.com"];
  
  const idx = Math.floor(Math.random() * names.length);
  return {
    nome: names[idx],
    cpf: cpfs[idx],
    rg: rgs[idx],
    dataNascimento: birthDates[idx],
    email: emails[idx],
    telefone: \`(11) 98765-\${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}\`,
    endereco: {
      logradouro: "Rua Exemplo",
      numero: Math.floor(Math.random() * 1000) + 1,
      bairro: "Centro",
      cidade: "São Paulo",
      estado: "SP",
      cep: "01001-000"
    }
  };
}`;

const PERSON_PYTHON_CODE = `import random

def generate_person_dataset():
    names = ["João Silva", "Maria Santos", "Pedro Oliveira"]
    cpfs = ["111.111.111-11", "222.222.222-22", "333.333.333-33"]
    rgs = ["12.345.678-9", "98.765.432-1", "55.555.555-5"]
    birth_dates = ["15/05/1990", "22/10/1985", "03/12/1998"]
    emails = ["joao.silva@exemplo.com", "maria.santos@exemplo.com", "pedro.oliveira@exemplo.com"]
    
    idx = random.randint(0, len(names) - 1)
    return {
        "nome": names[idx],
        "cpf": cpfs[idx],
        "rg": rgs[idx],
        "data_nascimento": birth_dates[idx],
        "email": emails[idx],
        "telefone": f"(11) 98765-{random.randint(0, 9999):04d}",
        "endereco": {
            "logradouro": "Rua Exemplo",
            "numero": random.randint(1, 1000),
            "bairro": "Centro",
            "cidade": "São Paulo",
            "estado": "SP",
            "cep": "01001-000"
        }
    }`;

const PERSON_CSHARP_CODE = `using System;
using System.Collections.Generic;

public class Person
{
    public string Nome { get; set; }
    public string Cpf { get; set; }
    public string Rg { get; set; }
    public string DataNascimento { get; set; }
    public string Email { get; set; }
    public string Telefone { get; set; }
    public Dictionary<string, object> Endereco { get; set; }
}

public static class PersonGenerator
{
    private static readonly string[] Names = { "João Silva", "Maria Santos", "Pedro Oliveira" };
    private static readonly string[] Cpfs = { "111.111.111-11", "222.222.222-22", "333.333.333-33" };
    private static readonly string[] Rgs = { "12.345.678-9", "98.765.432-1", "55.555.555-5" };
    private static readonly string[] BirthDates = { "15/05/1990", "22/10/1985", "03/12/1998" };
    private static readonly string[] Emails = { "joao.silva@exemplo.com", "maria.santos@exemplo.com", "pedro.oliveira@exemplo.com" };
    private static readonly Random Rand = new Random();

    public static Person Generate()
    {
        int idx = Rand.Next(Names.Length);
        return new Person
        {
            Nome = Names[idx],
            Cpf = Cpfs[idx],
            Rg = Rgs[idx],
            DataNascimento = BirthDates[idx],
            Email = Emails[idx],
            Telefone = $"(11) 98765-{Rand.Next(10000):D4}",
            Endereco = new Dictionary<string, object>
            {
                { "logradouro", "Rua Exemplo" },
                { "numero", Rand.Next(1000) + 1 },
                { "bairro", "Centro" },
                { "cidade", "São Paulo" },
                { "estado", "SP" },
                { "cep", "01001-000" }
            }
        };
    }
}`;

const PERSON_JAVA_CODE = `import java.util.Random;
import java.util.HashMap;
import java.util.Map;

public class PersonGenerator {
    private static final String[] NAMES = { "João Silva", "Maria Santos", "Pedro Oliveira" };
    private static final String[] CPFS = { "111.111.111-11", "222.222.222-22", "333.333.333-33" };
    private static final String[] RGS = { "12.345.678-9", "98.765.432-1", "55.555.555-5" };
    private static final String[] BIRTH_DATES = { "15/05/1990", "22/10/1985", "03/12/1998" };
    private static final String[] EMAILS = { "joao.silva@exemplo.com", "maria.santos@exemplo.com", "pedro.oliveira@exemplo.com" };
    private static final Random RAND = new Random();

    public static Map<String, Object> generate() {
        int idx = RAND.nextInt(NAMES.length);
        Map<String, Object> person = new HashMap<>();
        person.put("nome", NAMES[idx]);
        person.put("cpf", CPFS[idx]);
        person.put("rg", RGS[idx]);
        person.put("dataNascimento", BIRTH_DATES[idx]);
        person.put("email", EMAILS[idx]);
        person.put("telefone", String.format("(11) 98765-%04d", RAND.nextInt(10000)));
        
        Map<String, Object> addr = new HashMap<>();
        addr.put("logradouro", "Rua Exemplo");
        addr.put("numero", RAND.nextInt(1000) + 1);
        addr.put("bairro", "Centro");
        addr.put("cidade", "São Paulo");
        addr.put("estado", "SP");
        addr.put("cep", "01001-000");
        person.put("endereco", addr);

        return person;
    }
}`;

const Field = ({ label, value }: { label: string; value: string }) => {
    const [hasCopied, setHasCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(value)
        toast.success(`${label} copiado!`)
        setHasCopied(true)
        setTimeout(() => setHasCopied(false), 2000)
    }

    return (
        <div className="flex flex-col space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
            <div className="flex items-center justify-between rounded-md border bg-muted/50 px-3 py-2 text-sm">
                <span className="font-mono truncate mr-2">{value}</span>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 shrink-0 hover:bg-background"
                    onClick={handleCopy}
                >
                    {hasCopied ? (
                        <Check className="h-3 w-3 text-green-500" />
                    ) : (
                        <Copy className="h-3 w-3 text-muted-foreground" />
                    )}
                </Button>
            </div>
        </div>
    )
}

export function PersonGeneratorPage() {
    const [person, setPerson] = useState<Person | null>(null)

    const handleGenerate = () => {
        setPerson(generatePerson())
    }

    useEffect(() => {
        if (!person) {
            setTimeout(() => handleGenerate(), 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                    {/* Header */}
                    <Breadcrumbs items={[{ "label": "Ferramentas" }, { "label": "Dados Pessoais" }, { "label": "Pessoa Completa" }]} className="mb-6" />
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Gerador de Pessoa Completa</h1>
                        <p className="text-lg text-muted-foreground">
                            Gere dados pessoais completos para testes, incluindo documentos, endereço e contatos.
                        </p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-[300px_1fr]">
                        {/* Controls */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Opções</CardTitle>
                                    <CardDescription>Clique para gerar um novo perfil</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={handleGenerate} className="w-full" size="lg">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Gerar Nova Pessoa
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Quick JSON Export */}
                            {person && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle>JSON</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ToolResult
                                            result={JSON.stringify(person, null, 2)}
                                            toolId="person"
                                            toolName="Gerador de Pessoa"
                                            successMessage="JSON copiado com sucesso"
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Results */}
                        <div className="space-y-6">
                            {person ? (
                                <div className="grid gap-6">
                                    {/* Identity */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Identidade</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="Nome Completo" value={person.name} />
                                            <Field label="Sexo" value={person.gender} />
                                            <Field label="Data de Nascimento" value={person.birthDate} />
                                            <Field label="Idade" value={`${person.age} anos`} />
                                            <Field label="Signo" value={person.sign} />
                                            <Field label="Nome da Mãe" value={person.mother} />
                                            <Field label="Nome do Pai" value={person.father} />
                                        </CardContent>
                                    </Card>

                                    {/* Documents */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Documentos</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="CPF" value={person.cpf} />
                                            <Field label="RG" value={person.rg} />
                                        </CardContent>
                                    </Card>

                                    {/* Contact */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Contato e Acesso</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-2">
                                            <Field label="Email" value={person.email} />
                                            <Field label="Senha" value={person.password} />
                                            <Field label="Celular" value={person.mobile} />
                                            <Field label="Telefone Fixo" value={person.phone} />
                                        </CardContent>
                                    </Card>

                                    {/* Physical */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Características Físicas</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4 sm:grid-cols-3">
                                            <Field label="Altura" value={person.height} />
                                            <Field label="Peso" value={person.weight} />
                                            <Field label="Tipo Sanguíneo" value={person.bloodType} />
                                        </CardContent>
                                    </Card>

                                    {/* Address */}
                                    <Card>
                                        <CardHeader className="pb-3">
                                            <CardTitle className="text-lg">Endereço</CardTitle>
                                        </CardHeader>
                                        <CardContent className="grid gap-4">
                                            <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
                                                <Field label="Logradouro" value={person.address.street} />
                                                <Field label="Número" value={person.address.number.toString()} />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-2">
                                                <Field label="Bairro" value={person.address.neighborhood} />
                                                <Field label="CEP" value={person.address.zipCode} />
                                            </div>
                                            <div className="grid gap-4 sm:grid-cols-[1fr_80px]">
                                                <Field label="Cidade" value={person.address.city} />
                                                <Field label="Estado" value={person.address.state} />
                                            </div>
                                            <Field label="Endereço Completo" value={`${person.address.street}, ${person.address.number} - ${person.address.neighborhood}, ${person.address.city} - ${person.address.state}, ${person.address.zipCode}`} />
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : (
                                <Card className="border-dashed">
                                    <CardContent className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                                        <div className="mb-4 rounded-full bg-muted p-4">
                                            <RefreshCw className="h-8 w-8" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Nenhum perfil gerado</h3>
                                        <p className="mb-4 max-w-sm text-sm">
                                            Clique no botão &quot;Gerar Nova Pessoa&quot; para criar um perfil completo com dados aleatórios válidos.
                                        </p>
                                        <Button onClick={handleGenerate}>Gerar Agora</Button>
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Pessoa Completa e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O Gerador de Pessoa Completa cria perfis cadastrais fictícios e realistas contendo dados pessoais (nome, data de nascimento, nome dos pais), documentos (CPF, RG), contatos (email, telefones), endereço estruturado e características físicas.
                                </p>
                                <p className="text-amber-600 dark:text-amber-400">
                                    <strong>Atenção:</strong> Todas as informações fornecidas por esta ferramenta são <strong>dados gerados de forma aleatória e fictícia</strong>. CPFs e RGs são válidos sintaticamente para testes de validação de formulários, mas não possuem registro em órgãos públicos.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Para que serve o gerador de pessoa completa?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        É uma utilidade para desenvolvedores de software, engenheiros de QA e administradores de banco de dados que precisam popular tabelas de testes com perfis de usuários variados, simulando fluxos completos de checkout, faturamento, cadastro e entrega em e-commerces ou CRMs.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como exportar os dados da pessoa gerada em JSON?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Assim que você gera um perfil de pessoa, a ferramenta monta automaticamente um objeto no formato JSON estruturado na lateral esquerda. Você pode copiar o conteúdo inteiro de forma estruturada em apenas um clique para usar em requisições de API ou scripts de carga.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Esta ferramenta está em conformidade com a LGPD?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Sim. Por gerar dados de forma 100% sintética baseados em listas genéricas e algoritmos matemáticos públicos (sem vazamento de pessoas reais), a ferramenta elimina qualquer risco de exposição de dados sensíveis e ajuda a manter seu ambiente de desenvolvimento em plena conformidade com a LGPD.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como estruturar um gerador de pessoas? (Exemplos de Código)"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: PERSON_JS_CODE },
                                        { language: "python", label: "Python", code: PERSON_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: PERSON_CSHARP_CODE },
                                        { language: "java", label: "Java", code: PERSON_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Pessoa"
                                    description="Gere dados pessoais completos para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="person" category="personal" />
                </div>
            </main>
        </div>
    )
}
