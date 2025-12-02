'use client'

import { usePathname } from 'next/navigation'
import { ToolFeedback } from '@/components/tools/tool-feedback'
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

    // Don't show feedback on the main tools page or category pages if they exist
    // Assuming tool pages are at least 3 levels deep: /tools/category/tool-name
    // But let's be safer: if the last segment is 'tools' or a category name, maybe we shouldn't show it?
    // Actually, checking if it's a leaf node is hard without knowing the route structure perfectly.
    // However, most tool pages are distinct.
    // Let's assume if it's not just "/tools", we show it.
    // But wait, /tools/text is a category page. We probably don't want it there.
    // Usually tool pages have a specific structure.
    // Let's check if the path has at least 3 segments: tools, category, tool-name
    const showFeedback = segments.length >= 3

    return (
        <div className="flex min-h-screen flex-col">
            <div className="flex-1">
                {children}
                {showFeedback && toolSlug && (
                    <div className="container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                        <ToolFeedback toolSlug={toolSlug} />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}
