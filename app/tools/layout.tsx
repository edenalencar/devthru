'use client'

import { usePathname } from 'next/navigation'
import { ToolFeedback } from '@/components/tools/tool-feedback'
import { NewsletterCard } from '@/components/marketing/newsletter-card'
import { Footer } from '@/components/layout/footer'

export default function ToolsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    // Extract the tool slug from the pathname
    // Example: /tools/text/case-converter -> case-converter
    const segments = pathname?.split('/').filter(Boolean) || []
    const toolSlug = segments.length > 0 ? segments[segments.length - 1] : null

    // Show feedback and newsletter capture on tool pages (at least 3 segments: /tools/category/tool-name)
    const showFeedback = segments.length >= 3

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                {children}
                {showFeedback && toolSlug && (
                    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">
                        <NewsletterCard
                            title="Receba novas ferramentas e atualizações úteis"
                            description="Sem spam. Lançamentos de novas ferramentas, geradores práticos e melhorias do DevThru diretamente no seu e-mail."
                            source={`tool-${toolSlug}`}
                        />
                        <ToolFeedback toolSlug={toolSlug} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
