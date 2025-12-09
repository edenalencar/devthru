"use client"

import { useUserContext } from "@/components/providers/user-provider"

export function useUser() {
    const context = useUserContext()

    return {
        user: context.user,
        profile: context.profile,
        permissions: context.permissions,
        isPro: context.isPro,
        isInTrial: context.isInTrial,
        loading: context.isLoading,
        limit: context.limit,
        refreshUser: context.refreshUser
    }
}
