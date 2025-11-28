"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [isPro, setIsPro] = useState(false)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)

                if (user) {
                    // Fetch profile to check subscription
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("subscription_tier")
                        .eq("id", user.id)
                        .single()

                    setIsPro(profile?.subscription_tier === "pro")
                } else {
                    setIsPro(false)
                }
            } catch (error) {
                console.error("Error fetching user:", error)
            } finally {
                setLoading(false)
            }
        }

        getUser()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)
            if (session?.user) {
                const { data: profile } = await supabase
                    .from("profiles")
                    .select("subscription_tier")
                    .eq("id", session.user.id)
                    .single()
                setIsPro(profile?.subscription_tier === "pro")
            } else {
                setIsPro(false)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        user,
        isPro,
        loading,
        limit: isPro ? 10000 : 50
    }
}
