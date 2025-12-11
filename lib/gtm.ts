type GTMEvent = {
  event: string;
  [key: string]: any;
}

export const sendGTMEvent = (data: GTMEvent) => {
  if (typeof window.dataLayer !== 'undefined') {
    window.dataLayer.push(data)
  } else {
    console.warn('[GTM] dataLayer not found, event not sent:', data)
  }
}
