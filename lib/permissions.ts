import { User } from "@supabase/supabase-js"

export type PlanType = 'free' | 'pro' | 'business'

export interface PlanPermissions {
    generation_limit: number
    export_formats: {
        csv: boolean
        json: boolean
        excel: boolean
        sql: boolean
    }
    saved_configs_access: {
        can_create: boolean
        can_read: boolean
        can_update: boolean
        can_delete: boolean
        can_apply: boolean
    }
    api_access: boolean
}

export const PLAN_LIMITS: Record<PlanType, PlanPermissions> = {
    free: {
        generation_limit: 5,
        export_formats: {
            csv: false,
            json: false,
            excel: false,
            sql: false
        },
        saved_configs_access: {
            can_create: false,
            can_read: true,
            can_update: false,
            can_delete: false,
            can_apply: false // Blocked for free users (post-trial)
        },
        api_access: false
    },
    pro: {
        generation_limit: 1000,
        export_formats: {
            csv: true,
            json: true,
            excel: true,
            sql: true
        },
        saved_configs_access: {
            can_create: true,
            can_read: true,
            can_update: true,
            can_delete: true,
            can_apply: true
        },
        api_access: false
    },
    business: {
        generation_limit: 10000,
        export_formats: {
            csv: true,
            json: true,
            excel: true,
            sql: true
        },
        saved_configs_access: {
            can_create: true,
            can_read: true,
            can_update: true,
            can_delete: true,
            can_apply: true
        },
        api_access: true
    }
}

export function isUserInTrial(profile: any): boolean {
    if (!profile?.trial_ends_at) return false
    return new Date(profile.trial_ends_at) > new Date()
}

export function getPlanPermissions(profile: any): PlanPermissions {
    if (!profile) return PLAN_LIMITS.free

    // Reverse Trial Logic: If in trial, give Pro permissions
    if (isUserInTrial(profile)) {
        return PLAN_LIMITS.pro
    }

    const plan = (profile.subscription_tier as PlanType) || 'free'
    return PLAN_LIMITS[plan] || PLAN_LIMITS.free
}

export function canUseConfig(profile: any): boolean {
    const permissions = getPlanPermissions(profile)
    return permissions.saved_configs_access.can_apply
}
