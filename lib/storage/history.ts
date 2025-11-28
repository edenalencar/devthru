import { saveHistoryToSupabase } from "../supabase/history"

export interface GenerationHistory {
    id: string
    toolId: string
    toolName: string
    timestamp: number
    input?: any
    output: any
}

const STORAGE_KEY = "devtools_history"
const MAX_HISTORY = 50

/**
 * Get generation history from localStorage
 */
export function getHistory(): GenerationHistory[] {
    if (typeof window === "undefined") return []

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return []
        return JSON.parse(stored)
    } catch (error) {
        console.error("Error reading history:", error)
        return []
    }
}

/**
 * Add a generation to history
 */
export async function addToHistory(item: Omit<GenerationHistory, "id" | "timestamp">): Promise<void> {
    if (typeof window === "undefined") return

    const history = getHistory()
    const newItem: GenerationHistory = {
        ...item,
        id: crypto.randomUUID(),
        timestamp: Date.now(),
    }

    // Add to beginning and limit to MAX_HISTORY
    const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY)

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory))

        // Try to save to Supabase if authenticated
        // We don't await this to not block the UI
        saveHistoryToSupabase(item).catch(console.error)
    } catch (error) {
        console.error("Error saving to history:", error)
    }
}

/**
 * Clear all history
 */
export function clearHistory(): void {
    if (typeof window === "undefined") return

    try {
        localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
        console.error("Error clearing history:", error)
    }
}

/**
 * Get history for a specific tool
 */
export function getToolHistory(toolId: string): GenerationHistory[] {
    return getHistory().filter((item) => item.toolId === toolId)
}

/**
 * Get history stats
 */
export function getHistoryStats() {
    const history = getHistory()

    const toolCounts: Record<string, number> = {}
    history.forEach((item) => {
        toolCounts[item.toolId] = (toolCounts[item.toolId] || 0) + 1
    })

    const mostUsedTool = Object.entries(toolCounts).sort((a, b) => b[1] - a[1])[0]

    return {
        totalGenerations: history.length,
        mostUsedTool: mostUsedTool ? { id: mostUsedTool[0], count: mostUsedTool[1] } : null,
        toolCounts,
    }
}

/**
 * Export history as JSON
 */
export function exportHistory(): string {
    const history = getHistory()
    return JSON.stringify(history, null, 2)
}
