declare global {
    interface Window {
        clarity?: (...args: unknown[]) => void
    }
}

// O Clarity é carregado pelo GTM e só existe com o consentimento analítico.
// Sem ele a chamada é ignorada, então nunca quebra a página.
export function sendClarityEvent(name: string) {
    if (typeof window === 'undefined' || typeof window.clarity !== 'function') return

    try {
        window.clarity('event', name)
    } catch {}
}
