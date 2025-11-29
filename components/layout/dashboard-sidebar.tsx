"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, User, Settings, History, Key } from "lucide-react"

const sidebarItems = [
    {
        title: "Visão Geral",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Histórico",
        href: "/dashboard/history",
        icon: History,
    },
    {
        title: "Perfil",
        href: "/dashboard/profile",
        icon: User,
    },

    {
        title: "Configurações",
        href: "/dashboard/settings",
        icon: Settings,
    },
]

export function DashboardSidebar() {
    const pathname = usePathname()

    return (
        <nav className="w-64 hidden md:block border-r bg-muted/10 min-h-[calc(100vh-4rem)]">
            <div className="p-4 space-y-2">
                {sidebarItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link key={item.href} href={item.href}>
                            <Button
                                variant={isActive ? "secondary" : "ghost"}
                                className={cn(
                                    "w-full justify-start gap-2",
                                    isActive && "bg-secondary"
                                )}
                            >
                                <Icon className="h-4 w-4" />
                                {item.title}
                            </Button>
                        </Link>
                    )
                })}
            </div>
        </nav>
    )
}
