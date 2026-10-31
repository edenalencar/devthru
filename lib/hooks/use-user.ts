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
        // isPro só é confiável depois que o perfil do usuário logado carrega
        planLoading: context.isLoading || (!!context.user && !context.profile),
        limit: context.limit,
        refreshUser: context.refreshUser
    }
}
