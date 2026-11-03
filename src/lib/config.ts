export const WHATSAPP = (import.meta.env.VITE_WHATSAPP_NUMBER as string) || ''
export const waLink = (msg: string) =>
  WHATSAPP ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}` : undefined
export const EMAIL = (import.meta.env.VITE_CONTACT_EMAIL as string) || ''
export const HORARIO = (import.meta.env.VITE_CONTACT_HOURS as string) || ''
export const REGIOES = (import.meta.env.VITE_CONTACT_REGIONS as string) || ''
export const formatPhone = (n: string) => {
  const d = n.replace(/\D/g, '').replace(/^55/, '')
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : n
}
