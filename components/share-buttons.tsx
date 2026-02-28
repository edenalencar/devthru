"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Twitter,
    Linkedin,
    Link as LinkIcon,
    Check,
    MessageCircle
} from "lucide-react"
import { toast } from "sonner"

interface ShareButtonsProps {
    title: string
    description?: string
    url?: string
    className?: string
    iconOnly?: boolean
}

export function ShareButtons({ title, description = "", url, className = "", iconOnly = false }: ShareButtonsProps) {
    const [currentUrl, setCurrentUrl] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            setCurrentUrl(url || window.location.href)
        }
    }, [url])

    const text = `${title}\n${description}`
    const encodedUrl = encodeURIComponent(currentUrl)
    const encodedText = encodeURIComponent(text)

    const shareLinks = {
        whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} - ${description} ${currentUrl}`)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(currentUrl)
            toast.success("Link copiado para a área de transferência!")
        } catch (err) {
            toast.error("Erro ao copiar link")
        }
    }

    const handleShare = (network: string, link: string) => {
        window.open(link, '_blank', 'width=600,height=400')
    }

    if (!currentUrl) return null

    if (iconOnly) {
        return (
            <div className={`flex items-center gap-1 ${className}`}>
                <button
                    onClick={() => handleShare('whatsapp', shareLinks.whatsapp)}
                    className="p-1.5 rounded-full text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 transition-colors"
                    title="WhatsApp"
                >
                    <MessageCircle className="h-4 w-4" />
                </button>
                <button
                    onClick={() => handleShare('twitter', shareLinks.twitter)}
                    className="p-1.5 rounded-full text-muted-foreground hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                    title="Twitter/X"
                >
                    <Twitter className="h-4 w-4" />
                </button>
                <button
                    onClick={() => handleShare('linkedin', shareLinks.linkedin)}
                    className="p-1.5 rounded-full text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
                    title="LinkedIn"
                >
                    <Linkedin className="h-4 w-4" />
                </button>
                <button
                    onClick={handleCopyLink}
                    className="p-1.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="Copiar Link"
                >
                    <LinkIcon className="h-4 w-4" />
                </button>
            </div>
        )
    }

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('whatsapp', shareLinks.whatsapp)}
                className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-950/30"
                title="Compartilhar no WhatsApp"
            >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('twitter', shareLinks.twitter)}
                className="hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30"
                title="Compartilhar no Twitter/X"
            >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare('linkedin', shareLinks.linkedin)}
                className="hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/30"
                title="Compartilhar no LinkedIn"
            >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
            </Button>

            <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                title="Copiar Link"
            >
                <LinkIcon className="h-4 w-4 mr-2" />
                Copiar Link
            </Button>
        </div>
    )
}
