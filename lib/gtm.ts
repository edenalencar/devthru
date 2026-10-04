type GTMEvent = {
  event: string;
  [key: string]: any;
}

export const sendGTMEvent = (data: GTMEvent) => {
  if (typeof window === 'undefined') return

  const push = () => {
    if (typeof (window as any).dataLayer !== 'undefined') {
      ;(window as any).dataLayer.push(data)
    } else {
      console.warn('[GTM] dataLayer not found, event not sent:', data)
    }
  }

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(push, { timeout: 1500 })
  } else {
    setTimeout(push, 0)
  }
}

