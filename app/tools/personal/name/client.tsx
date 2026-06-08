"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToolResult } from "@/components/tools/tool-result"
import { RefreshCw } from "lucide-react"
import { BulkGenerator } from "@/components/tools/bulk-generator"
import { useUser } from "@/lib/hooks/use-user"
import { getPlanLimitMessage } from "@/lib/constants"
import { Navbar } from "@/components/layout/navbar"
import { ShareButtons } from "@/components/share-buttons"
import { RelatedTools } from "@/components/tools/related-tools"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { CodeExamplesAccordion } from "@/components/tools/code-examples-accordion"

const NAME_JS_CODE = `function generateRandomBrName(gender = "all") {
  const firstMale = ["Miguel", "Arthur", "Gael", "Théo", "Heitor"];
  const firstFemale = ["Helena", "Alice", "Laura", "Maria", "Sophia"];
  const lastNames = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues"];
  
  let firstList = [];
  if (gender === "male") firstList = firstMale;
  else if (gender === "female") firstList = firstFemale;
  else firstList = [...firstMale, ...firstFemale];
  
  const firstName = firstList[Math.floor(Math.random() * firstList.length)];
  const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)];
  let lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
  while (lastName1 === lastName2) {
    lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
  }
  
  return \`\${firstName} \${lastName1} \${lastName2}\`;
}`;

const NAME_PYTHON_CODE = `import random

def generate_random_br_name(gender="all"):
    first_male = ["Miguel", "Arthur", "Gael", "Théo", "Heitor"]
    first_female = ["Helena", "Alice", "Laura", "Maria", "Sophia"]
    last_names = ["Silva", "Santos", "Oliveira", "Souza", "Rodrigues"]
    
    if gender == "male":
        first_list = first_male
    elif gender == "female":
        first_list = first_female
    else:
        first_list = first_male + first_female
        
    first_name = random.choice(first_list)
    last_name1 = random.choice(last_names)
    last_name2 = random.choice(last_names)
    while last_name1 == last_name2:
        last_name2 = random.choice(last_names)
        
    return f"{first_name} {last_name1} {last_name2}"`;

const NAME_CSHARP_CODE = `using System;
using System.Collections.Generic;

public static class NameGenerator
{
    private static readonly string[] FirstMale = { "Miguel", "Arthur", "Gael", "Théo", "Heitor" };
    private static readonly string[] FirstFemale = { "Helena", "Alice", "Laura", "Maria", "Sophia" };
    private static readonly string[] LastNames = { "Silva", "Santos", "Oliveira", "Souza", "Rodrigues" };
    private static readonly Random Rand = new Random();

    public static string Generate(string gender = "all")
    {
        List<string> firstList = new List<string>();
        if (gender == "male") firstList.AddRange(FirstMale);
        else if (gender == "female") firstList.AddRange(FirstFemale);
        else { firstList.AddRange(FirstMale); firstList.AddRange(FirstFemale); }

        string firstName = firstList[Rand.Next(firstList.Count)];
        string lastName1 = LastNames[Rand.Next(LastNames.Length)];
        string lastName2 = LastNames[Rand.Next(LastNames.Length)];
        while (lastName1 == lastName2)
        {
            lastName2 = LastNames[Rand.Next(LastNames.Length)];
        }

        return $"{firstName} {lastName1} {lastName2}";
    }
}`;

const NAME_JAVA_CODE = `import java.util.Random;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class NameGenerator {
    private static final String[] FIRST_MALE = { "Miguel", "Arthur", "Gael", "Théo", "Heitor" };
    private static final String[] FIRST_FEMALE = { "Helena", "Alice", "Laura", "Maria", "Sophia" };
    private static final String[] LAST_NAMES = { "Silva", "Santos", "Oliveira", "Souza", "Rodrigues" };
    private static final Random RAND = new Random();

    public static String generate(String gender) {
        List<String> firstList = new ArrayList<>();
        if ("male".equals(gender)) {
            firstList.addAll(Arrays.asList(FIRST_MALE));
        } else if ("female".equals(gender)) {
            firstList.addAll(Arrays.asList(FIRST_FEMALE));
        } else {
            firstList.addAll(Arrays.asList(FIRST_MALE));
            firstList.addAll(Arrays.asList(FIRST_FEMALE));
        }

        String firstName = firstList.get(RAND.nextInt(firstList.size()));
        String lastName1 = LAST_NAMES[RAND.nextInt(LAST_NAMES.length)];
        String lastName2 = LAST_NAMES[RAND.nextInt(LAST_NAMES.length)];
        while (lastName1.equals(lastName2)) {
            lastName2 = LAST_NAMES[RAND.nextInt(LAST_NAMES.length)];
        }

        return firstName + " " + lastName1 + " " + lastName2;
    }
}`;

const firstNamesMale = [
    "Miguel", "Arthur", "Gael", "Théo", "Heitor", "Ravi", "Davi", "Bernardo", "Noah", "Gabriel",
    "Samuel", "Pedro", "Anthony", "Isaac", "Benício", "Benjamin", "Matheus", "Lucas", "Joaquim", "Nicolas",
    "Lucca", "Lorenzo", "Henrique", "João", "Rafael", "Daniel", "Enzo", "Murilo", "Gustavo", "Felipe"
]

const firstNamesFemale = [
    "Helena", "Alice", "Laura", "Maria", "Sophia", "Manuela", "Maitê", "Liz", "Cecília", "Isabella",
    "Luísa", "Eloá", "Heloísa", "Júlia", "Ayla", "Madalena", "Isis", "Antonella", "Esther", "Maya",
    "Olivia", "Bárbara", "Nicole", "Lívia", "Agatha", "Melissa", "Yasmin", "Beatriz", "Clara", "Ana"
]

const lastNames = [
    "Silva", "Santos", "Oliveira", "Souza", "Rodrigues", "Ferreira", "Alves", "Pereira", "Lima", "Gomes",
    "Costa", "Ribeiro", "Martins", "Carvalho", "Almeida", "Lopes", "Soares", "Fernandes", "Vieira", "Barbosa",
    "Rocha", "Dias", "Nascimento", "Andrade", "Moreira", "Nunes", "Marques", "Machado", "Mendes", "Freitas"
]

export function NameGeneratorPage() {
    const [name, setName] = useState<string>("")
    const [gender, setGender] = useState<"all" | "male" | "female">("all")
    const { isPro, limit } = useUser()

    const generateName = (selectedGender: "all" | "male" | "female" = gender): string => {
        let firstNameList: string[] = []
        if (selectedGender === "male") firstNameList = firstNamesMale
        else if (selectedGender === "female") firstNameList = firstNamesFemale
        else firstNameList = [...firstNamesMale, ...firstNamesFemale]

        const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)]
        const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)]
        const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)]

        // Avoid duplicate last names
        const finalLastName2 = lastName1 === lastName2
            ? lastNames[(lastNames.indexOf(lastName2) + 1) % lastNames.length]
            : lastName2

        return `${firstName} ${lastName1} ${finalLastName2}`
    }

    const handleGenerate = () => {
        setName(generateName())
    }

    useEffect(() => {
        if (!name) {
            setTimeout(() => handleGenerate(), 0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <div className="container mx-auto py-10 space-y-8">
                    <Breadcrumbs items={[
                        { label: "Home", href: "/" },
                        { label: "Ferramentas", href: "/ferramentas" },
                        { label: "Dados Pessoais", href: "/ferramentas-pessoais" },
                        { label: "Gerador de Nomes" }
                    ]} className="mb-6" />
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">Gerador de Nomes</h1>
                        <p className="text-muted-foreground">
                            Gere nomes completos brasileiros aleatórios para testes.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Gerar Nome</CardTitle>
                                <CardDescription>Gere um único nome completo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label>Gênero</Label>
                                    <RadioGroup
                                        defaultValue="all"
                                        value={gender}
                                        onValueChange={(v) => setGender(v as "all" | "male" | "female")}
                                        className="flex space-x-4"
                                    >
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="all" id="all" />
                                            <Label htmlFor="all">Todos</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="male" id="male" />
                                            <Label htmlFor="male">Masculino</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="female" id="female" />
                                            <Label htmlFor="female">Feminino</Label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                {name && (
                                    <ToolResult
                                        result={name}
                                        toolId="name"
                                        toolName="Nome"
                                        input={{ gender }}
                                        successMessage="Nome gerado com sucesso"
                                    />
                                )}

                                <Button onClick={handleGenerate} className="w-full">
                                    <RefreshCw className="mr-2 h-4 w-4" />
                                    Gerar Novo Nome
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Geração em Massa</CardTitle>
                                <CardDescription>
                                    {getPlanLimitMessage(limit)}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <BulkGenerator
                                    generatorFn={() => generateName(gender)}
                                    label="Nomes"
                                    limit={limit}
                                    isPro={isPro}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Info Section & FAQ */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Sobre o Gerador de Nomes e Perguntas Frequentes (FAQ)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="prose prose-sm max-w-none dark:prose-invert text-muted-foreground">
                                <p>
                                    O Gerador de Nomes cria nomes e sobrenomes brasileiros aleatórios para preenchimento de mock data, testes de usabilidade e simulação de dados em ambientes de homologação.
                                </p>
                            </div>

                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>Para que serve um gerador de nomes aleatórios?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Esta ferramenta ajuda programadores e analistas de QA a criar rapidamente massa de dados fictícios para testar a validação de formulários, persistência em bancos de dados, renderização de layouts com diferentes tamanhos de nomes e exportação de relatórios sem infringir a LGPD (Lei Geral de Proteção de Dados).
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2">
                                    <AccordionTrigger>Como a filtragem por gênero funciona?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Ao selecionar "Masculino" ou "Feminino", a ferramenta restringe o primeiro nome à lista correspondente de nomes comuns no Brasil, mantendo a aleatoriedade e integridade estrutural dos sobrenomes gerados.
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3">
                                    <AccordionTrigger>Como gerar nomes em lote?</AccordionTrigger>
                                    <AccordionContent className="text-muted-foreground">
                                        Use a aba **Geração em Massa** na lateral direita. Defina a quantidade de nomes que precisa e a ferramenta gerará uma lista contínua pronta para copiar, perfeita para popular bases SQL, planilhas ou arquivos JSON.
                                    </AccordionContent>
                                </AccordionItem>
                                <CodeExamplesAccordion
                                    title="Como gerar nomes brasileiros aleatórios? (Exemplos de Código)"
                                    examples={[
                                        { language: "javascript", label: "JavaScript / TS", code: NAME_JS_CODE },
                                        { language: "python", label: "Python", code: NAME_PYTHON_CODE },
                                        { language: "csharp", label: "C#", code: NAME_CSHARP_CODE },
                                        { language: "java", label: "Java", code: NAME_JAVA_CODE }
                                    ]}
                                />
                            </Accordion>

                            <div className="pt-4 border-t">
                                <Label className="text-sm text-muted-foreground mb-2 block">Compartilhe esta ferramenta:</Label>
                                <ShareButtons
                                    title="Gerador de Nomes"
                                    description="Gere nomes e sobrenomes brasileiros aleatórios para testes."
                                />
                            </div>
                        </CardContent>
                    </Card>
                    <RelatedTools currentToolSlug="name" category="personal" />
                </div>
            </main>
        </div>
    )
}
