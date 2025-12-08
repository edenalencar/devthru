'use client'

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface HistoryFiltersProps {
    searchQuery: string
    onSearchChange: (value: string) => void
    selectedTool: string
    onToolChange: (value: string) => void
    dateFrom: string
    onDateFromChange: (value: string) => void
    dateTo: string
    onDateToChange: (value: string) => void
    onClearFilters: () => void
}

const TOOL_OPTIONS = [
    { value: 'all', label: 'Todas as ferramentas' },
    { value: 'cpf', label: 'CPF' },
    { value: 'cnpj', label: 'CNPJ' },
    { value: 'rg', label: 'RG' },
    { value: 'cnh', label: 'CNH' },
    { value: 'name', label: 'Nome' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Telefone' },
    { value: 'address', label: 'Endereço' },
    { value: 'uuid', label: 'UUID' },
    { value: 'password', label: 'Senha' },
    { value: 'hash', label: 'Hash' },
    { value: 'base64', label: 'Base64' },
    { value: 'qrcode', label: 'QR Code' },
    { value: 'lorem', label: 'Lorem Ipsum' },
    { value: 'json', label: 'JSON Formatter' },
]

export function HistoryFilters({
    searchQuery,
    onSearchChange,
    selectedTool,
    onToolChange,
    dateFrom,
    onDateFromChange,
    dateTo,
    onDateToChange,
    onClearFilters,
}: HistoryFiltersProps) {
    const hasActiveFilters = searchQuery || selectedTool !== 'all' || dateFrom || dateTo

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Buscar no histórico..."
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="pl-9"
                    />
                </div>

                {/* Tool Filter */}
                <Select value={selectedTool} onValueChange={onToolChange}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="Ferramenta" />
                    </SelectTrigger>
                    <SelectContent>
                        {TOOL_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClearFilters}
                        title="Limpar filtros"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Date Range */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Data inicial</label>
                    <Input
                        type="date"
                        value={dateFrom}
                        onChange={(e) => onDateFromChange(e.target.value)}
                    />
                </div>
                <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">Data final</label>
                    <Input
                        type="date"
                        value={dateTo}
                        onChange={(e) => onDateToChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}
