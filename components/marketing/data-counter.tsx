"use client"

import { useEffect, useState } from "react"
import { Activity } from "lucide-react"

export function DataGeneratedCounter() {
    const [count, setCount] = useState(10450)

    useEffect(() => {
        // Initial random value between 10k and 15k
        const initialBase = 10000 + Math.floor(Math.random() * 5000)
        setCount(initialBase)

        // Simulate live updates
        const interval = setInterval(() => {
            setCount((prev) => prev + Math.floor(Math.random() * 3) + 1)
        }, 3000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full w-fit mx-auto md:mx-0">
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>
                <span className="font-mono font-semibold text-foreground">
                    {count.toLocaleString("pt-BR")}
                </span>{" "}
                dados gerados hoje
            </span>
        </div>
    )
}
