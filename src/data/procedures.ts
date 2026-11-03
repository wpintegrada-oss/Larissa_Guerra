// Dados extraídos dos materiais de divulgação enviados pela profissional.
// Na etapa do painel administrativo, estes dados passam a ser cadastrados no Firestore (coleção "procedures").
export type Package = {
  id: string; name: string; unit: 'sessão' | 'plantão'; price: number
  services: string[]; note?: string
}
export const PACKAGE_DAYS = [7, 10] as const

export const packages: Package[] = [
  { id: 'pacote-1', name: 'Pacote 1 — Cuidado completo', unit: 'sessão', price: 190,
    services: ['Banho assistido', 'Curativos', 'Massagens relaxantes', 'Vestimenta da cinta', 'Administração de medicação'] },
  { id: 'pacote-2', name: 'Pacote 2 — Plantões 12 horas', unit: 'plantão', price: 250,
    services: ['Banho assistido', 'Curativos', 'Exercícios e mobilização', 'Orientação alimentar adequada',
      'Aplicação de medicação (IM e EV)', 'Administração medicamentosa', 'Acompanhamento em clínicas (pós-operatório)'] },
  { id: 'pacote-3', name: 'Pacote 3 — Plantões 24 horas', unit: 'plantão', price: 480,
    services: ['Banho assistido', 'Curativos', 'Exercícios e mobilização', 'Orientação alimentar adequada',
      'Aplicação de medicação (IM e EV)', 'Administração medicamentosa', 'Acompanhamento em clínicas (pós-operatório)'] },
  { id: 'pacote-4', name: 'Pacote 4 — Cuidado especializado', unit: 'sessão', price: 210,
    services: ['Drenagens', 'Tapping', 'Curativos', 'Banho assistido', 'Vestimenta da cinta'] },
]

export const estetica = [
  { id: 'drenagem', name: 'Drenagem', price: 210 },
  { id: 'limpeza-de-pele', name: 'Limpeza de pele', price: 160 },
]

export const massages = [
  { name: 'Relaxante', prices: { 30: 70, 60: 120, 90: 170 } },
  { name: 'Terapêutica', prices: { 30: 80, 60: 130, 90: 180 } },
  { name: 'Liberação miofascial', prices: { 30: 80, 60: 150, 90: 200 } },
  { name: 'Tensão muscular', prices: { 30: 80, 60: 140, 90: 190 } },
  { name: 'Relaxante + terapêutica', prices: { 60: 140, 90: 180 } },
] as { name: string; prices: Partial<Record<30 | 60 | 90, number>> }[]

export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })
