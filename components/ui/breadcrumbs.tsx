import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
    label: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
    return (
        <nav aria-label="Breadcrumb" className={cn("flex", className)}>
            <ol className="flex items-center space-x-2">
                <li>
                    <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                        aria-label="Home"
                    >
                        <Home className="h-4 w-4" />
                    </Link>
                </li>

                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" aria-hidden="true" />
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className="text-sm font-medium text-foreground"
                                aria-current="page"
                            >
                                {item.label}
                            </span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    )
}
