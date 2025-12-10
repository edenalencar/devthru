import { createClient } from './client'
import { GenerationHistory } from '../storage/history'

/**
 * Save a generation to Supabase
 */
export async function saveHistoryToSupabase(item: Omit<GenerationHistory, "id" | "timestamp"> & { userId?: string }) {
    const supabase = createClient()
    let userId = item.userId

    if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return null
        userId = user.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await Promise.race([
        (supabase
            .from('generation_history') as any)
            .insert({
                user_id: userId,
                tool_id: item.toolId,
                tool_name: item.toolName,
                input: item.input,
                output: item.output,
            })
            .select()
            .single(),
        new Promise<{ data: any; error: any }>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )
    ]).catch(err => ({ data: null, error: err }))

    if (error) {
        if (error.message === 'Timeout') {
            console.warn('History save timed out')
        } else {
            console.error('Error saving history to Supabase:', error)
        }
        return null
    }

    return data
}

/**
 * Fetch history from Supabase
 */
export async function getHistoryFromSupabase(limit = 50, userId?: string) {
    const supabase = createClient()

    if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return []
        userId = user.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await Promise.race([
        (supabase
            .from('generation_history') as any)
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .range(0, limit - 1),
        new Promise<{ data: any; error: any }>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )
    ]).catch(err => ({ data: [], error: err }))

    if (error) {
        if (error.message === 'Timeout') {
            console.warn('History fetch timed out')
        } else {
            console.error('Error fetching history from Supabase:', error)
        }
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase
        .from('generation_history') as any)
        .insert(itemsToSync)

    if (error) {
        console.error('Error syncing history:', error)
    }
}

/**
 * Delete a single history item
 */
export async function deleteHistoryItem(id: string, userId?: string) {
    const supabase = createClient()

    if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return false
        userId = user.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await Promise.race([
        (supabase
            .from('generation_history') as any)
            .delete()
            .eq('id', id)
            .eq('user_id', userId),
        new Promise<{ error: any }>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )
    ]).catch(err => ({ error: err }))

    if (error) {
        if (error.message === 'Timeout') {
            console.warn('Delete history timed out')
        } else {
            console.error('Error deleting history item:', error)
        }
        return false
    }

    return true
}

/**
 * Delete multiple history items
 */
export async function deleteHistoryItems(ids: string[], userId?: string) {
    const supabase = createClient()

    if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return false
        userId = user.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await Promise.race([
        (supabase
            .from('generation_history') as any)
            .delete()
            .in('id', ids)
            .eq('user_id', userId),
        new Promise<{ error: any }>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )
    ]).catch(err => ({ error: err }))

    if (error) {
        if (error.message === 'Timeout') {
            console.warn('Delete multiple history timed out')
        } else {
            console.error('Error deleting history items:', error)
        }
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
    userId?: string
}) {
    const supabase = createClient()
    let userId = filters.userId

    if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return []
        userId = user.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase
        .from('generation_history') as any)
        .select('*')
        .eq('user_id', userId)

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
        query = query.ilike('tool_name', `%${filters.search}%`)
    }

    // Order and pagination
    query = query.order('created_at', { ascending: false })

    const from = filters.offset || 0
    const to = from + (filters.limit || 50) - 1
    query = query.range(from, to)

    const { data, error } = await Promise.race([
        query,
        new Promise<{ data: any; error: any }>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )
    ]).catch(err => ({ data: [], error: err }))

    if (error) {
        if (error.message === 'Timeout') {
            console.warn('Filtered history fetch timed out')
        } else {
            console.error('Error fetching filtered history:', error)
        }
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
    userId?: string
}) {
    const supabase = createClient()
    let userId = filters?.userId

    if (!userId) {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return 0
        userId = user.id
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let query = (supabase
        .from('generation_history') as any)
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

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
        query = query.ilike('tool_name', `%${filters.search}%`)
    }

    const { count, error } = await Promise.race([
        query,
        new Promise<{ count: number | null; error: any }>((_, reject) =>
            setTimeout(() => reject(new Error('Timeout')), 10000)
        )
    ]).catch(err => ({ count: 0, error: err }))

    if (error) {
        if (error.message === 'Timeout') {
            console.warn('History count fetch timed out')
        } else {
            console.error('Error counting history:', error)
        }
        return 0
    }

    return count || 0
}
