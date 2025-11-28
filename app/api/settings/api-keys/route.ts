import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import { randomBytes, createHash } from "crypto"

export async function GET(req: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data: keys, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

    if (error) {
        return new NextResponse(error.message, { status: 500 })
    }

    return NextResponse.json(keys)
}

export async function POST(req: Request) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return new NextResponse("Unauthorized", { status: 401 })
    }

    const { name } = await req.json()

    if (!name) {
        return new NextResponse("Name is required", { status: 400 })
    }

    // Generate a secure random key
    const prefix = "dht_" // devhubtools prefix
    const secret = randomBytes(32).toString("hex")
    const key = `${prefix}${secret}`

    // Hash the key for storage
    const keyHash = createHash("sha256").update(key).digest("hex")
    const keyPrefix = `${prefix}${secret.substring(0, 4)}...`

    const { data, error } = await supabase
        .from("api_keys")
        .insert({
            user_id: user.id,
            name,
            key_prefix: keyPrefix,
            key_hash: keyHash,
        })
        .select()
        .single()

    if (error) {
        return new NextResponse(error.message, { status: 500 })
    }

    // Return the full key ONLY ONCE
    return NextResponse.json({ ...data, key })
}
