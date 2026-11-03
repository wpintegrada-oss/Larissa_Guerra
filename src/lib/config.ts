const env = import.meta.env
// Valores padrão; a administradora pode alterá-los no painel (Firestore: settings/site).
export const site = {
  whatsapp: ((env.VITE_WHATSAPP_NUMBER as string) || '5586999933860'),
  email: (env.VITE_CONTACT_EMAIL as string) || '',
  hours: (env.VITE_CONTACT_HOURS as string) || '',
  regions: (env.VITE_CONTACT_REGIONS as string) || '',
}
export const waLink = (msg: string, number = site.whatsapp) => {
  const n = number.replace(/\D/g, '')
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(msg)}` : undefined
}
export const formatPhone = (n: string) => {
  const d = n.replace(/\D/g, '').replace(/^55/, '')
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : n
}
