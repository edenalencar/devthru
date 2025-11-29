'use client'

import { useEffect, useState } from 'react'
import { Download, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HistoryCard } from '@/components/tools/history-card'
import { HistoryFilters } from '@/components/tools/history-filters'

import { toast } from 'sonner'
import {
    getHistoryWithFilters,
    getHistoryCount,
    deleteHistoryItem,
    deleteHistoryItems,
} from '@/lib/supabase/history'
import { exportToCSV, exportToJSON, exportToExcel } from '@/lib/export'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface GenerationHistory {
    id: string
    toolId: string
    toolName: string
    timestamp: number
    input?: any
    output: any
}

const ITEMS_PER_PAGE = 50

export default function HistoryPage() {
    const [history, setHistory] = useState<GenerationHistory[]>([])
    const [loading, setLoading] = useState(true)
    const [totalCount, setTotalCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    // Filters
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTool, setSelectedTool] = useState('all')
    const [dateFrom, setDateFrom] = useState('')
    const [dateTo, setDateTo] = useState('')

    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

    useEffect(() => {
        loadHistory()
    }, [currentPage, searchQuery, selectedTool, dateFrom, dateTo])

    const loadHistory = async () => {
        setLoading(true)

        const filters = {
            toolId: selectedTool,
            dateFrom: dateFrom ? new Date(dateFrom) : undefined,
            dateTo: dateTo ? new Date(dateTo) : undefined,
            search: searchQuery || undefined,
            limit: ITEMS_PER_PAGE,
            offset: (currentPage - 1) * ITEMS_PER_PAGE,
        }

        const [data, count] = await Promise.all([
            getHistoryWithFilters(filters),
            getHistoryCount({
                toolId: filters.toolId,
                dateFrom: filters.dateFrom,
                dateTo: filters.dateTo,
                search: filters.search,
            }),
        ])

        setHistory(data)
        setTotalCount(count)
        setLoading(false)
    }

    const handleDelete = async (id: string) => {
        const success = await deleteHistoryItem(id)

        if (success) {
            toast.success('Item deletado com sucesso!')
            loadHistory()
        } else {
            toast.error('Erro ao deletar item')
        }
    }

    const handleDeleteSelected = async () => {
        if (selectedItems.size === 0) return

        if (!confirm(`Deseja realmente deletar ${selectedItems.size} itens?`)) {
            return
        }

        const success = await deleteHistoryItems(Array.from(selectedItems))

        if (success) {
            toast.success(`${selectedItems.size} itens deletados com sucesso!`)
            setSelectedItems(new Set())
            loadHistory()
        } else {
            toast.error('Erro ao deletar itens')
        }
    }

    const handleExport = async (format: 'csv' | 'json' | 'excel') => {
        const itemsToExport = selectedItems.size > 0
            ? history.filter((item) => selectedItems.has(item.id))
            : history

        if (itemsToExport.length === 0) {
            toast.error('Nenhum item para exportar')
            return
        }

        try {
            const data = itemsToExport.map((item) => ({
                Ferramenta: item.toolName,
                Data: new Date(item.timestamp).toLocaleString('pt-BR'),
                Resultado: typeof item.output === 'string' ? item.output : JSON.stringify(item.output),
            }))

            if (format === 'csv') {
                exportToCSV(data, 'historico')
            } else if (format === 'json') {
                exportToJSON(itemsToExport, 'historico')
            } else if (format === 'excel') {
                exportToExcel(data, 'historico')
            }

            toast.success(`Exportado ${itemsToExport.length} itens como ${format.toUpperCase()}`)
        } catch (error) {
            toast.error('Erro ao exportar')
        }
    }

    const handleClearFilters = () => {
        setSearchQuery('')
        setSelectedTool('all')
        setDateFrom('')
        setDateTo('')
        setCurrentPage(1)
    }

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

    return (
        <div className="space-y-8 max-w-6xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">Histórico de Gerações</h1>
                    <p className="text-muted-foreground mt-1">
                        {totalCount} {totalCount === 1 ? 'item salvo' : 'itens salvos'}
                    </p>
                </div>

                <div className="flex gap-2">
                    {selectedItems.size > 0 && (
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDeleteSelected}
                            className="gap-2"
                        >
                            <Trash2 className="h-4 w-4" />
                            Deletar ({selectedItems.size})
                        </Button>
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Download className="h-4 w-4" />
                                Exportar
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleExport('csv')}>
                                Exportar como CSV
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('json')}>
                                Exportar como JSON
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleExport('excel')}>
                                Exportar como Excel
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Filters */}
            <div className="mb-6">
                <HistoryFilters
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedTool={selectedTool}
                    onToolChange={setSelectedTool}
                    dateFrom={dateFrom}
                    onDateFromChange={setDateFrom}
                    dateTo={dateTo}
                    onDateToChange={setDateTo}
                    onClearFilters={handleClearFilters}
                />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            )}

            {/* Empty State */}
            {!loading && history.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                        {searchQuery || selectedTool !== 'all' || dateFrom || dateTo
                            ? 'Nenhum item encontrado com os filtros aplicados'
                            : 'Você ainda não salvou nenhum item no histórico'}
                    </p>
                    {(searchQuery || selectedTool !== 'all' || dateFrom || dateTo) && (
                        <Button
                            variant="outline"
                            onClick={handleClearFilters}
                            className="mt-4"
                        >
                            Limpar Filtros
                        </Button>
                    )}
                </div>
            )}

            {/* History List */}
            {!loading && history.length > 0 && (
                <div className="space-y-4">
                    {history.map((item) => (
                        <HistoryCard
                            key={item.id}
                            id={item.id}
                            toolName={item.toolName}
                            timestamp={item.timestamp}
                            input={item.input}
                            output={item.output}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        Anterior
                    </Button>

                    <span className="text-sm text-muted-foreground px-4">
                        Página {currentPage} de {totalPages}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        Próxima
                    </Button>
                </div>
            )}
        </div>
    )
}
