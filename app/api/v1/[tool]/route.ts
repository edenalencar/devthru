import { validateApiKey } from "@/lib/api/keys"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Map tool names to their generator functions
const tools: Record<string, (input: any) => Promise<any>> = { // eslint-disable-line @typescript-eslint/no-explicit-any
    hash: async () => ({ result: "hash_placeholder" }),
    uuid: async () => ({ result: crypto.randomUUID() }),
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ tool: string }> }
) {
    const headerList = await headers()
    const apiKey = headerList.get("x-api-key")

    if (!apiKey) {
        return new NextResponse("Missing API Key", { status: 401 })
    }

    const user = await validateApiKey(apiKey)

    if (!user) {
        return new NextResponse("Invalid API Key", { status: 401 })
    }

    if (user.subscription_tier === 'free') {
        return new NextResponse("API access requires Pro plan", { status: 403 })
    }

    const { tool: toolName } = await params
    const tool = tools[toolName]

    if (!tool) {
        return new NextResponse("Tool not found", { status: 404 })
    }

    try {
        const body = await req.json()
        const result = await tool(body)
        return NextResponse.json(result)
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        return new NextResponse(error.message, { status: 500 })
    }
}
