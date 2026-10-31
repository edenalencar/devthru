type GTMEvent = {
  event: string;
  [key: string]: any;
}

const DATA_LAYER_RETRY_MS = 500
const DATA_LAYER_MAX_RETRIES = 30

export const sendGTMEvent = (data: GTMEvent) => {
  if (typeof window === 'undefined') return

  // O GTM carrega com lazyOnload e define o consentimento antes de criar o fluxo de eventos.
  // Por isso esperamos o dataLayer em vez de criá-lo aqui.
  const push = (attempt = 0) => {
    if (typeof (window as any).dataLayer !== 'undefined') {
      ;(window as any).dataLayer.push(data)
    } else if (attempt < DATA_LAYER_MAX_RETRIES) {
      setTimeout(() => push(attempt + 1), DATA_LAYER_RETRY_MS)
    } else {
      console.warn('[GTM] dataLayer not found, event not sent:', data)
    }
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => push(), { timeout: 1500 })
  } else {
    setTimeout(() => push(), 0)
  }
}

