import { createClient } from './client'
import { GenerationHistory } from '../storage/history'

/**
 * Save a generation to Supabase
 */
export async function saveHistoryToSupabase(item: Omit<GenerationHistory, "id" | "timestamp">) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return null

    const { data, error } = await supabase
        .from('generation_history')
        .insert({
            user_id: user.id,
            tool_id: item.toolId,
            tool_name: item.toolName,
            input: item.input,
            output: item.output,
        })
        .select()
        .single()

    if (error) {
        console.error('Error saving history to Supabase:', error)
        return null
    }

    return data
}

/**
 * Fetch history from Supabase
 */
export async function getHistoryFromSupabase(limit = 50) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    const { data, error } = await supabase
        .from('generation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit)

    if (error) {
        console.error('Error fetching history from Supabase:', error)
        return []
    }

    // Map to GenerationHistory format
    return data.map((item: any) => ({
        id: item.id,
        toolId: item.tool_id,
        toolName: item.tool_name,
        timestamp: new Date(item.created_at).getTime(),
        input: item.input,
        output: item.output,
    })) as GenerationHistory[]
}

/**
 * Sync localStorage history to Supabase
 */
export async function syncHistoryToSupabase(localHistory: GenerationHistory[]) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    // Filter items that are not already in Supabase (this is a simplified check)
    // In a real app, you might want to check IDs or use a "synced" flag in localStorage

    const itemsToSync = localHistory.map(item => ({
        user_id: user.id,
        tool_id: item.toolId,
        tool_name: item.toolName,
        input: item.input,
        output: item.output,
        created_at: new Date(item.timestamp).toISOString(),
    }))

    if (itemsToSync.length === 0) return

    const { error } = await supabase
        .from('generation_history')
        .insert(itemsToSync)

    if (error) {
        console.error('Error syncing history:', error)
    }
}
