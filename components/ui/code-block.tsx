
import { codeToHtml } from 'shiki'

interface CodeBlockProps {
    code: string
    language: string
    filename?: string
}

export async function CodeBlock({ code, language, filename }: CodeBlockProps) {
    const html = await codeToHtml(code, {
        lang: language,
        theme: 'github-dark',
    })

    return (
        <div className="rounded-lg overflow-hidden border border-border bg-slate-950 my-6">
            {filename && (
                <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-white/10">
                    <span className="text-sm font-medium text-slate-400">{filename}</span>
                    <span className="text-xs text-slate-500 uppercase">{language}</span>
                </div>
            )}
            <div
                className="p-4 overflow-x-auto text-sm [&>pre]:!bg-transparent [&>pre]:!m-0"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}
