import { validateApiKey } from "@/lib/api/keys"
import { NextResponse } from "next/server"
import { headers } from "next/headers"

// Map tool names to their generator functions
const tools: Record<string, (input: any) => Promise<any>> = {
    hash: async (input) => ({ result: "hash_placeholder" }),
    uuid: async () => ({ result: crypto.randomUUID() }),
}

export async function POST(
    req: Request,
    { params }: { params: { tool: string } }
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

    const tool = tools[params.tool]

    if (!tool) {
        return new NextResponse("Tool not found", { status: 404 })
    }

    try {
        const body = await req.json()
        const result = await tool(body)
        return NextResponse.json(result)
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}
