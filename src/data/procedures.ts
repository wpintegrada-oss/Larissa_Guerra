export type Opcao = { rotulo: string; valor: number }
export type Procedure = {
  id: string; nome: string; categoria: 'enfermagem' | 'estetica' | 'massagens'
  descricao?: string; itens: string[]; observacao?: string; opcoes: Opcao[]; ordem: number; ativo: boolean
}
export const CATS = [['enfermagem', 'Enfermagem'], ['estetica', 'Estética'], ['massagens', 'Massagens']] as const
export const brl = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 })

// Procedimentos iniciais (dos materiais de divulgação). Servem de padrão até serem cadastrados no painel.
const pos = ['Banho assistido', 'Curativos', 'Exercícios e mobilização', 'Orientação alimentar adequada',
  'Aplicação de medicação (IM e EV)', 'Administração medicamentosa', 'Acompanhamento em clínicas (pós-operatório)']
const pk = (id: string, nome: string, preco: number, un: string, itens: string[], ordem: number): Procedure => ({
  id, nome, categoria: 'enfermagem', itens, ordem, ativo: true, observacao: `${brl(preco)} por ${un}`,
  opcoes: [7, 10].map(d => ({ rotulo: `${d} dias`, valor: preco * d })) })
const ms = (id: string, nome: string, p: [number, number?, number?], ordem: number): Procedure => ({
  id, nome, categoria: 'massagens', itens: [], ordem, ativo: true,
  opcoes: ([30, 60, 90] as const).map((t, i) => ({ t, v: p[i] })).filter(x => x.v != null).map(x => ({ rotulo: `${x.t} min`, valor: x.v! })) })
export const seed: Procedure[] = [
  pk('pacote-1', 'Pacote 1 — Cuidado completo', 190, 'sessão', ['Banho assistido', 'Curativos', 'Massagens relaxantes', 'Vestimenta da cinta', 'Administração de medicação'], 1),
  pk('pacote-2', 'Pacote 2 — Plantões 12 horas', 250, 'plantão', pos, 2),
  pk('pacote-3', 'Pacote 3 — Plantões 24 horas', 480, 'plantão', pos, 3),
  pk('pacote-4', 'Pacote 4 — Cuidado especializado', 210, 'sessão', ['Drenagens', 'Tapping', 'Curativos', 'Banho assistido', 'Vestimenta da cinta'], 4),
  { id: 'drenagem', nome: 'Drenagem', categoria: 'estetica', itens: [], ordem: 1, ativo: true, opcoes: [{ rotulo: '', valor: 210 }] },
  { id: 'limpeza-de-pele', nome: 'Limpeza de pele', categoria: 'estetica', itens: [], ordem: 2, ativo: true, opcoes: [{ rotulo: '', valor: 160 }] },
  ms('massagem-relaxante', 'Massagem relaxante', [70, 120, 170], 1),
  ms('massagem-terapeutica', 'Massagem terapêutica', [80, 130, 180], 2),
  ms('liberacao-miofascial', 'Liberação miofascial', [80, 150, 200], 3),
  ms('tensao-muscular', 'Tensão muscular', [80, 140, 190], 4),
  { id: 'relaxante-terapeutica', nome: 'Relaxante + terapêutica', categoria: 'massagens', itens: [], ordem: 5, ativo: true,
    opcoes: [{ rotulo: '60 min', valor: 140 }, { rotulo: '90 min', valor: 180 }] },
]
