"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { User } from "@supabase/supabase-js"
import { getPlanPermissions, PlanPermissions, isUserInTrial } from "@/lib/permissions"

export function useUser() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<any>(null)
    const [permissions, setPermissions] = useState<PlanPermissions>(getPlanPermissions(null))
    const [isPro, setIsPro] = useState(false)
    const [isInTrial, setIsInTrial] = useState(false)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)

                if (user) {
                    // Fetch profile to check subscription
                    const { data: profileData } = await supabase
                        .from("profiles")
                        .select("*")
                        .eq("id", user.id)
                        .single()

                    setProfile(profileData)

                    const perms = getPlanPermissions(profileData)
                    setPermissions(perms)
                    setIsPro(profileData?.subscription_tier === "pro" || profileData?.subscription_tier === "business" || isUserInTrial(profileData))
                    setIsInTrial(isUserInTrial(profileData))
                } else {
                    setPermissions(getPlanPermissions(null))
                    setIsPro(false)
                    setIsInTrial(false)
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
                const { data: profileData } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single()

                setProfile(profileData)
                const perms = getPlanPermissions(profileData)
                setPermissions(perms)
                setIsPro(profileData?.subscription_tier === "pro" || profileData?.subscription_tier === "business" || isUserInTrial(profileData))
                setIsInTrial(isUserInTrial(profileData))
            } else {
                setProfile(null)
                setPermissions(getPlanPermissions(null))
                setIsPro(false)
                setIsInTrial(false)
            }
            setLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    return {
        user,
        profile,
        permissions,
        isPro,
        isInTrial,
        loading,
        limit: permissions.generation_limit
    }
}
