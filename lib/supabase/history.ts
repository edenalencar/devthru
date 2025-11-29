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

/**
 * Delete a single history item
 */
export async function deleteHistoryItem(id: string) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
        .from('generation_history')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error deleting history item:', error)
        return false
    }

    return true
}

/**
 * Delete multiple history items
 */
export async function deleteHistoryItems(ids: string[]) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return false

    const { error } = await supabase
        .from('generation_history')
        .delete()
        .in('id', ids)
        .eq('user_id', user.id)

    if (error) {
        console.error('Error deleting history items:', error)
        return false
    }

    return true
}

/**
 * Fetch history with filters
 */
export async function getHistoryWithFilters(filters: {
    toolId?: string
    dateFrom?: Date
    dateTo?: Date
    search?: string
    limit?: number
    offset?: number
}) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return []

    let query = supabase
        .from('generation_history')
        .select('*')
        .eq('user_id', user.id)

    // Apply filters
    if (filters.toolId && filters.toolId !== 'all') {
        query = query.eq('tool_id', filters.toolId)
    }

    if (filters.dateFrom) {
        query = query.gte('created_at', filters.dateFrom.toISOString())
    }

    if (filters.dateTo) {
        const endOfDay = new Date(filters.dateTo)
        endOfDay.setHours(23, 59, 59, 999)
        query = query.lte('created_at', endOfDay.toISOString())
    }

    // Search in tool_name and output
    if (filters.search) {
        query = query.or(`tool_name.ilike.%${filters.search}%,output::text.ilike.%${filters.search}%`)
    }

    // Order and pagination
    query = query.order('created_at', { ascending: false })

    if (filters.limit) {
        query = query.limit(filters.limit)
    }

    if (filters.offset) {
        query = query.range(filters.offset, filters.offset + (filters.limit || 50) - 1)
    }

    const { data, error } = await query

    if (error) {
        console.error('Error fetching filtered history:', error)
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
 * Get total count of history items with filters
 */
export async function getHistoryCount(filters?: {
    toolId?: string
    dateFrom?: Date
    dateTo?: Date
    search?: string
}) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return 0

    let query = supabase
        .from('generation_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)

    // Apply same filters as getHistoryWithFilters
    if (filters?.toolId && filters.toolId !== 'all') {
        query = query.eq('tool_id', filters.toolId)
    }

    if (filters?.dateFrom) {
        query = query.gte('created_at', filters.dateFrom.toISOString())
    }

    if (filters?.dateTo) {
        const endOfDay = new Date(filters.dateTo)
        endOfDay.setHours(23, 59, 59, 999)
        query = query.lte('created_at', endOfDay.toISOString())
    }

    if (filters?.search) {
        query = query.or(`tool_name.ilike.%${filters.search}%,output::text.ilike.%${filters.search}%`)
    }

    const { count, error } = await query

    if (error) {
        console.error('Error counting history:', error)
        return 0
    }

    return count || 0
}
