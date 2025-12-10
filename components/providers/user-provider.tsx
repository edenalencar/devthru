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
            const { data } = await Promise.race([
                supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", currentUser.id)
                    .single(),
                new Promise<{ data: any }>((_, reject) =>
                    setTimeout(() => reject(new Error("Profile fetch timeout")), 10000)
                )
            ])

            // Should verify data is not null before caching
            if (data) {
                localStorage.setItem(`cached_profile_${currentUser.id}`, JSON.stringify(data))
                updateDerivedState(currentUser, data)
            } else {
                throw new Error("Profile not found")
            }
        } catch (error: any) {
            console.warn("Using cached profile due to error:", error.message)

            // Attempt to load from cache
            try {
                const cached = localStorage.getItem(`cached_profile_${currentUser.id}`)
                if (cached) {
                    const parsed = JSON.parse(cached)
                    updateDerivedState(currentUser, parsed)
                    return // Succcessfully recovered from cache
                }
            } catch (e) {
                console.error("Error parsing cached profile", e)
            }

            // Fallback if no cache
            if (error.message === 'Profile fetch timeout') {
                console.warn("Profile fetch timed out, falling back to basic user state.")
            } else {
                console.error("Error fetching profile:", error)
            }
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
                try {
                    // Create a timeout promise that rejects instead of resolving with null
                    const timeoutPromise = new Promise<never>((_, reject) => {
                        setTimeout(() => reject(new Error("Auth check timeout")), 10000)
                    })

                    let currentUser: User | null = null;

                    try {
                        const { data } = await Promise.race([
                            supabase.auth.getUser(),
                            timeoutPromise
                        ]) as any
                        currentUser = data.user
                    } catch (error: any) {
                        console.warn("Auth check timed out or failed, checking local session...")
                        // Fallback: check for valid local session
                        const { data: { session } } = await supabase.auth.getSession()
                        if (session?.user) {
                            console.log("Recovered session from local storage")
                            currentUser = session.user
                        }
                    }

                    setUser(currentUser)
                    if (currentUser) {
                        await refreshProfile(currentUser)
                    } else {
                        updateDerivedState(null, null)
                    }
                } catch (error) {
                    console.error("Error checking auth session:", error)
                    updateDerivedState(null, null)
                } finally {
                    setIsLoading(false)
                }
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
