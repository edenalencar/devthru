"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { getPlanPermissions, PlanPermissions, isUserInTrial } from "@/lib/permissions"

type UserContextType = {
    user: User | null
    profile: any
    permissions: PlanPermissions
    isPro: boolean
    isInTrial: boolean
    isLoading: boolean
    limit: number
    refreshUser: () => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({
    children,
    initialUser = null,
}: {
    children: React.ReactNode
    initialUser?: User | null
}) {
    const [user, setUser] = useState<User | null>(initialUser)
    const [profile, setProfile] = useState<any>(null)
    const [permissions, setPermissions] = useState<PlanPermissions>(getPlanPermissions(null))
    const [isPro, setIsPro] = useState(false)
    const [isInTrial, setIsInTrial] = useState(false)
    const [isLoading, setIsLoading] = useState(!initialUser)
    const supabase = createClient()

    // Function to calculate derived state from user and profile
    const updateDerivedState = (currentUser: User | null, currentProfile: any) => {
        setProfile(currentProfile)
        const perms = getPlanPermissions(currentProfile)
        setPermissions(perms)
        setIsPro(currentProfile?.subscription_tier === "pro" || currentProfile?.subscription_tier === "business" || isUserInTrial(currentProfile))
        setIsInTrial(isUserInTrial(currentProfile))
    }

    // Fetch profile if we have a user but no profile
    const refreshProfile = async (currentUser: User) => {
        try {
            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", currentUser.id)
                .single()
            updateDerivedState(currentUser, data)
        } catch (error) {
            console.error("Error fetching profile:", error)
            // Even if profile fetch fails, we have the user
            updateDerivedState(currentUser, null)
        }
    }

    useEffect(() => {
        const init = async () => {
            if (initialUser) {
                // If we have an initial user, we just need the profile
                await refreshProfile(initialUser)
                setIsLoading(false)
            } else {
                // No initial user, verify with supabase
                const { data: { user: currentUser } } = await supabase.auth.getUser()
                setUser(currentUser)
                if (currentUser) {
                    await refreshProfile(currentUser)
                } else {
                    updateDerivedState(null, null)
                }
                setIsLoading(false)
            }
        }

        init()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
            const currentUser = session?.user ?? null
            setUser(currentUser)

            if (currentUser) {
                // For SIGNed_IN or TOKEN_REFRESHED, we usually want fresh profile data
                await refreshProfile(currentUser)
            } else {
                updateDerivedState(null, null)
            }
            setIsLoading(false)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [initialUser]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <UserContext.Provider
            value={{
                user,
                profile,
                permissions,
                isPro,
                isInTrial,
                isLoading,
                limit: permissions.generation_limit,
                refreshUser: async () => {
                    if (user) await refreshProfile(user)
                }
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const context = useContext(UserContext)
    if (context === undefined) {
        throw new Error("useUserContext must be used within a UserProvider")
    }
    return context
}
