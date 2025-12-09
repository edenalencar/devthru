"use client"

import Link from "next/link"
import { Menu, X, User, LogOut, Settings, LayoutDashboard, History } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { navLinks } from "@/config/site"
import { createClient } from "@/lib/supabase/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

import { CommandMenu } from "@/components/command-menu"
import Image from "next/image"
import { useUser } from "@/lib/hooks/use-user"
import { Badge } from "@/components/ui/badge"

const Logo = () => (
    <div className="flex items-center gap-3 text-foreground">
        <div className="size-14 relative">
            <Image
                src="/logo-new-sem-fundo.png"
                alt="DevThru Logo"
                fill
                className="invert dark:invert-0 object-contain"
                priority
            />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">DevThru</h2>
    </div>
);

export function Navbar() {
    const { user, profile, isInTrial } = useUser()
    const router = useRouter()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const supabase = createClient()


    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push("/")
        router.refresh()
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm dark:bg-background/80">
            <div className="flex h-16 items-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                {/* Logo - Left */}
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Logo />
                    </Link>
                </div>

                {/* Desktop Navigation - Center */}
                <nav className="hidden md:flex flex-1 justify-center">
                    <div className="flex items-center gap-6">
                        {navLinks.filter(link => link.href !== '/dashboard').map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </nav>

                {/* Actions - Right */}
                <div className="hidden md:flex items-center gap-3">
                    <CommandMenu />
                    <ThemeToggle />

                    {user ? (
                        <>
                            <Badge
                                variant={
                                    isInTrial ? "secondary" :
                                        profile?.subscription_tier === 'business' ? "default" :
                                            profile?.subscription_tier === 'pro' ? "outline" : "secondary"
                                }
                                className="hidden lg:inline-flex"
                            >
                                {isInTrial ? "TRIAL" : (profile?.subscription_tier || 'FREE').toUpperCase()}
                            </Badge>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full border">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                                            <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-[hsl(var(--popover))] text-[hsl(var(--popover-foreground))]" align="end" forceMount>
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                {user.user_metadata?.full_name || "Usuário"}
                                            </p>
                                            <p className="text-xs leading-none text-muted-foreground">
                                                {user.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/history">
                                            <History className="mr-2 h-4 w-4" />
                                            <span>Histórico</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/profile">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Perfil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard/settings">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Configurações</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleSignOut}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sair</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button variant="ghost" size="sm" asChild>
                                <Link href="/login">Entrar</Link>
                            </Button>
                            <Button size="sm" className="rounded-lg" asChild>
                                <Link href="/register">Cadastrar</Link>
                            </Button>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="flex items-center gap-2 md:hidden ml-auto">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="border-t md:hidden bg-card dark:bg-background">
                    <div className="flex flex-col gap-4 p-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
                        {navLinks.filter(link => link.href !== '/dashboard').map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.title}
                            </Link>
                        ))}
                        <div className="flex gap-2 mt-2">
                            {user ? (
                                <>
                                    <Link href="/dashboard" className="flex-1 flex items-center justify-center rounded-lg h-10 bg-secondary text-secondary-foreground text-sm font-bold">Dashboard</Link>
                                    <Button variant="ghost" onClick={handleSignOut} className="flex-1 text-destructive">
                                        Sair
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="flex-1 flex items-center justify-center rounded-lg h-10 bg-secondary text-secondary-foreground text-sm font-bold">Entrar</Link>
                                    <Link href="/register" className="flex-1 flex items-center justify-center rounded-lg h-10 bg-primary text-primary-foreground text-sm font-bold">Cadastrar</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}
