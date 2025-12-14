"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Calculator, Calendar, CreditCard, Settings, User, Search, FileCode, Terminal, Database, Clock, Image } from "lucide-react"

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { tools } from "@/config/tools"

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(true)}
            >
                <Search className="h-5 w-5" />
                <span className="sr-only">Buscar ferramentas</span>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Digite um comando ou busque..." />
                <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                    <CommandGroup heading="Ferramentas">
                        {tools.map((tool) => (
                            <CommandItem
                                key={tool.href}
                                value={tool.name}
                                onSelect={() => {
                                    runCommand(() => router.push(tool.href))
                                }}
                            >
                                {tool.icon && <tool.icon className="mr-2 h-4 w-4" />}
                                <span>{tool.name}</span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Atalhos">
                        <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Home</span>
                            <CommandShortcut>⌘H</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
