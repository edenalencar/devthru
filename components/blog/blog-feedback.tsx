'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { submitFeedback } from '@/lib/supabase/feedback'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface BlogFeedbackProps {
    postSlug: string
}

export function BlogFeedback({ postSlug }: BlogFeedbackProps) {
    const [rating, setRating] = useState<number | null>(null)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showCommentInput, setShowCommentInput] = useState(false)

    const handleVote = (selectedRating: number) => {
        setRating(selectedRating)
        setShowCommentInput(true)
    }

    const handleSubmit = async () => {
        if (rating === null) return

        setIsSubmitting(true)
        try {
            await submitFeedback({
                tool_slug: `blog:${postSlug}`,
                rating,
                comment: comment.trim() || undefined
            })
            setIsSuccess(true)
            toast.success('Obrigado pelo seu feedback!')
        } catch (error) {
            console.error(error)
            toast.error('Erro ao enviar feedback. Tente novamente.')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="mt-12 p-6 bg-muted/30 rounded-xl text-center border border-muted/60 animate-in fade-in zoom-in-95 duration-300">
                <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-1">
                    Obrigado pelo seu feedback!
                </h3>
                <p className="text-muted-foreground text-sm">
                    Sua opinião é fundamental para nos ajudar a criar artigos melhores.
                </p>
            </div>
        )
    }

    return (
        <div className="mt-12 p-6 bg-muted/20 rounded-xl border border-muted/50 transition-all duration-300 hover:border-muted-foreground/20">
            <div className="flex flex-col items-center justify-center space-y-5">
                <h3 className="text-base font-semibold text-foreground">
                    Esse artigo foi útil para você?
                </h3>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => handleVote(5)}
                        className={cn(
                            "flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95",
                            rating === 5
                                ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400 shadow-sm"
                                : "bg-background border-input hover:bg-green-50 hover:border-green-300 hover:text-green-600 dark:hover:bg-green-950/20 dark:hover:border-green-900/50 dark:hover:text-green-400"
                        )}
                        aria-label="Sim, este artigo foi útil"
                    >
                        <ThumbsUp className={cn("w-4 h-4", rating === 5 && "fill-green-600/10")} />
                        <span>Sim</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => handleVote(1)}
                        className={cn(
                            "flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95",
                            rating === 1
                                ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400 shadow-sm"
                                : "bg-background border-input hover:bg-red-50 hover:border-red-300 hover:text-red-600 dark:hover:bg-red-950/20 dark:hover:border-red-900/50 dark:hover:text-red-400"
                        )}
                        aria-label="Não, este artigo não foi útil"
                    >
                        <ThumbsDown className={cn("w-4 h-4", rating === 1 && "fill-red-600/10")} />
                        <span>Não</span>
                    </button>
                </div>

                {showCommentInput && (
                    <div className="w-full max-w-lg space-y-4 animate-in slide-in-from-top-3 fade-in duration-300">
                        <Textarea
                            placeholder={
                                rating === 5
                                    ? "O que você mais gostou ou o que podemos adicionar? (Opcional)"
                                    : "O que faltou no artigo ou o que podemos melhorar? (Opcional)"
                            }
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[90px] resize-none bg-background focus-visible:ring-1 focus-visible:ring-ring border-muted-foreground/30"
                        />
                        <div className="flex justify-end gap-3">
                            {comment.trim() === '' ? (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Pular e Enviar'}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="w-full sm:w-auto"
                                >
                                    {isSubmitting ? 'Enviando...' : 'Enviar Comentário'}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
