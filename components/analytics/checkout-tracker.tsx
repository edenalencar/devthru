"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { isBillingPeriod, trackPurchase } from "@/lib/analytics/checkout"
import { isAnnualPlan } from "@/lib/stripe/plans"

function wasAlreadyTracked(sessionId: string) {
    const key = `purchase_tracked_${sessionId}`

    try {
        if (localStorage.getItem(key)) return true
        localStorage.setItem(key, "1")
    } catch {
        // Sem localStorage, a limpeza da URL ainda evita a repetição ao recarregar
    }

    return false
}

export function CheckoutTracker() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const success = searchParams.get("success")
    const sessionId = searchParams.get("session_id")
    const plan = searchParams.get("plan")
    const billing = searchParams.get("billing")

    useEffect(() => {
        if (success !== "true" || !sessionId || !isAnnualPlan(plan) || !isBillingPeriod(billing)) return

        if (!wasAlreadyTracked(sessionId)) {
            trackPurchase(sessionId, plan, billing)
        }

        router.replace("/dashboard")
    }, [success, sessionId, plan, billing, router])

    return null
}
