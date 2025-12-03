import { createClient } from './client'

export type ToolFeedback = {
    tool_slug: string
    rating: number
    comment?: string
}

/**
 * Submit feedback for a tool
 */
export async function submitFeedback(feedback: ToolFeedback) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase
        .from('tool_feedbacks') as any)
        .insert({
            tool_slug: feedback.tool_slug,
            rating: feedback.rating,
            comment: feedback.comment,
            user_id: user?.id || null,
        })

    if (error) {
        console.error('Error submitting feedback:', error)
        throw error
    }

    return true
}
