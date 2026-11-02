export const WHATSAPP = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || ''
export const waLink = (msg: string) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` : undefined
