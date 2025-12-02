'use client'

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { submitFeedback } from '@/lib/supabase/feedback'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ToolFeedbackProps {
    toolSlug: string
}

export function ToolFeedback({ toolSlug }: ToolFeedbackProps) {
    const [rating, setRating] = useState<number>(0)
    const [hoverRating, setHoverRating] = useState<number>(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [showCommentInput, setShowCommentInput] = useState(false)

    const handleRatingClick = (selectedRating: number) => {
        setRating(selectedRating)
        setShowCommentInput(true)
    }

    const handleSubmit = async () => {
        setIsSubmitting(true)
        try {
            await submitFeedback({
                tool_slug: toolSlug,
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
            <div className="mt-12 p-6 bg-muted/30 rounded-lg text-center border border-muted animate-in fade-in zoom-in duration-300">
                <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">Obrigado pelo seu feedback!</h3>
                <p className="text-muted-foreground text-sm">Sua opinião é muito importante para melhorarmos nossas ferramentas.</p>
            </div>
        )
    }

    return (
        <div className="mt-12 p-6 bg-muted/30 rounded-lg border border-muted">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-lg font-medium">Essa ferramenta foi útil?</h3>

                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            type="button"
                            className="focus:outline-none transition-transform hover:scale-110"
                            onClick={() => handleRatingClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                        >
                            <Star
                                className={cn(
                                    "w-8 h-8 transition-colors duration-200",
                                    (hoverRating || rating) >= star
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "fill-muted text-muted-foreground/30"
                                )}
                            />
                        </button>
                    ))}
                </div>

                {showCommentInput && (
                    <div className="w-full max-w-md space-y-4 animate-in slide-in-from-top-2 fade-in duration-300">
                        <Textarea
                            placeholder="Alguma sugestão de melhoria? (Opcional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="min-h-[80px] resize-none bg-background"
                        />
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="w-full"
                        >
                            {isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
