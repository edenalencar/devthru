"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Calculator, Car, Calendar, Fuel, Hash, Search, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Interfaces for Parallelum API
interface Brand {
    codigo: string
    nome: string
}

interface Model {
    codigo: number | string
    nome: string
}

interface Year {
    codigo: string
    nome: string
}

interface FipeResult {
    Valor: string
    Marca: string
    Modelo: string
    AnoModelo: number
    Combustivel: string
    CodigoFipe: string
    MesReferencia: string
    TipoVeiculo: number
    SiglaCombustivel: string
}

export default function FipePage() {
    const [vehicleType, setVehicleType] = useState("carros")
    const [brands, setBrands] = useState<Brand[]>([])
    const [models, setModels] = useState<Model[]>([])
    const [years, setYears] = useState<Year[]>([])

    const [selectedBrand, setSelectedBrand] = useState("")
    const [selectedModel, setSelectedModel] = useState("")
    const [selectedYear, setSelectedYear] = useState("")

    const [result, setResult] = useState<FipeResult | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // Fetch Brands
    useEffect(() => {
        async function fetchBrands() {
            try {
                setLoading(true)
                setError("")
                // Reset downstream selections
                setBrands([])
                setModels([])
                setYears([])
                setSelectedBrand("")
                setSelectedModel("")
                setSelectedYear("")
                setResult(null)

                const url = `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas`

                const response = await fetch(url)

                if (!response.ok) throw new Error("Falha ao buscar marcas")
                const data = await response.json()
                setBrands(data)
            } catch (err) {
                console.error(err)
                setError("Erro ao carregar marcas. Tente novamente.")
            } finally {
                setLoading(false)
            }
        }

        fetchBrands()
    }, [vehicleType])

    // Fetch Models when Brand changes
    useEffect(() => {
        async function fetchModels() {
            if (!selectedBrand) return

            try {
                setLoading(true)
                setError("")
                setModels([])
                setYears([])
                setSelectedModel("")
                setSelectedYear("")
                setResult(null)

                const url = `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas/${selectedBrand}/modelos`

                const response = await fetch(url)

                if (!response.ok) throw new Error("Falha ao buscar modelos")
                const data = await response.json()
                // Parallelum returns { modelos: [], anos: [] }
                setModels(data.modelos)
            } catch (err) {
                console.error(err)
                setError("Erro ao carregar modelos.")
            } finally {
                setLoading(false)
            }
        }

        fetchModels()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBrand])

    // Fetch Years when Model changes
    useEffect(() => {
        async function fetchYears() {
            if (!selectedBrand || !selectedModel) return

            try {
                setLoading(true)
                setError("")
                setYears([])
                setSelectedYear("")
                setResult(null)

                const url = `https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas/${selectedBrand}/modelos/${selectedModel}/anos`

                const response = await fetch(url)

                if (!response.ok) throw new Error("Falha ao buscar anos")
                const data = await response.json()
                setYears(data)
            } catch (err) {
                console.error(err)
                setError("Erro ao carregar anos.")
            } finally {
                setLoading(false)
            }
        }

        fetchYears()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedModel, selectedBrand])

    // Fetch Price
    const handleConsult = async () => {
        if (!selectedBrand || !selectedModel || !selectedYear) return

        try {
            setLoading(true)
            setError("")
            setResult(null)

            const response = await fetch(`https://parallelum.com.br/fipe/api/v1/${vehicleType}/marcas/${selectedBrand}/modelos/${selectedModel}/anos/${selectedYear}`)
            if (!response.ok) throw new Error("Falha ao consultar preço")
            const data = await response.json()
            setResult(data)
        } catch (err) {
            console.error(err)
            setError("Erro ao consultar valor. Tente novamente.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 max-w-7xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
                            <Calculator className="h-8 w-8 text-primary" />
                            Tabela FIPE
                        </h1>
                        <p className="text-muted-foreground">
                            Consulte o preço médio de veículos atualizado pela Tabela FIPE.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Consulta</CardTitle>
                                <CardDescription>Selecione as características do veículo</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Tipo de Veículo</Label>
                                    <Select value={vehicleType} onValueChange={setVehicleType}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="carros">Carros</SelectItem>
                                            <SelectItem value="motos">Motos</SelectItem>
                                            <SelectItem value="caminhoes">Caminhões</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Marca</Label>
                                    <Select value={selectedBrand} onValueChange={setSelectedBrand} disabled={!brands.length || loading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione a marca" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {brands.filter(b => b.codigo).map(brand => (
                                                <SelectItem key={brand.codigo} value={brand.codigo.toString()}>
                                                    {brand.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Modelo</Label>
                                    <Select value={selectedModel} onValueChange={setSelectedModel} disabled={!models.length || loading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o modelo" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {models.filter(m => m.codigo).map(model => (
                                                <SelectItem key={model.codigo} value={model.codigo.toString()}>
                                                    {model.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Ano</Label>
                                    <Select value={selectedYear} onValueChange={setSelectedYear} disabled={!years.length || loading}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione o ano" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {years.filter(y => y.codigo).map(year => (
                                                <SelectItem key={year.codigo} value={year.codigo}>
                                                    {year.nome}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {error && (
                                    <Alert variant="destructive">
                                        <AlertTitle>Erro</AlertTitle>
                                        <AlertDescription>{error}</AlertDescription>
                                    </Alert>
                                )}

                                <Button
                                    className="w-full"
                                    onClick={handleConsult}
                                    disabled={!selectedYear || loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Consultando...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="mr-2 h-4 w-4" />
                                            Consultar Preço
                                        </>
                                    )}
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Resultado</CardTitle>
                                <CardDescription>Detalhes do veículo selecionado</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {result ? (
                                    <div className="space-y-6">
                                        <div className="flex flex-col items-center justify-center p-6 bg-primary/5 rounded-lg border border-primary/10">
                                            <span className="text-sm text-muted-foreground mb-1">Preço Médio</span>
                                            <span className="text-4xl font-bold text-primary">{result.Valor}</span>
                                            <span className="text-xs text-muted-foreground mt-2">
                                                Mês de referência: {result.MesReferencia}
                                            </span>
                                        </div>

                                        <div className="grid gap-4">
                                            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                                                <Car className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Marca/Modelo</p>
                                                    <p className="font-medium">{result.Marca} {result.Modelo}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                                                <Calendar className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Ano Modelo</p>
                                                    <p className="font-medium">{result.AnoModelo}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                                                <Fuel className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Combustível</p>
                                                    <p className="font-medium">{result.Combustivel}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                                                <Hash className="h-5 w-5 text-muted-foreground" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground">Código FIPE</p>
                                                    <p className="font-medium">{result.CodigoFipe}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
                                        <Calculator className="h-12 w-12 mb-4 opacity-20" />
                                        <p>Faça uma consulta para ver o resultado</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
