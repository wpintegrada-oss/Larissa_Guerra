import { useState, type FormEvent } from 'react'
import { waLink } from '../lib/config'
import { saveRequest } from '../lib/requests'
export type Pick = { label: string; tipo: 'agendar' | 'orcamento' }
export default function RequestDialog({ pick, onClose }: { pick: Pick; onClose: () => void }) {
  const [f, setF] = useState({ nome: '', fone: '', endereco: '', data: '', obs: '' })
  const [erro, setErro] = useState('')
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const cls = 'mt-1 w-full rounded-sm border border-nude bg-bege/30 px-3 py-2'
  function enviar(e: FormEvent) {
    e.preventDefault()
    if (!f.nome.trim() || !f.fone.trim() || !f.endereco.trim()) return setErro('Preencha nome, WhatsApp e endereço/bairro.')
    const acao = pick.tipo === 'agendar' ? 'agendar' : 'um orçamento para'
    const link = waLink(`Olá! Gostaria de ${acao}: ${pick.label}.\nNome: ${f.nome}\nContato: ${f.fone}\nEndereço/bairro: ${f.endereco}${f.data ? '\nData preferida: ' + f.data : ''}${f.obs ? '\nObs.: ' + f.obs : ''}`)
    if (!link) return setErro('O WhatsApp de atendimento ainda não foi configurado.')
    void saveRequest({ tipo: pick.tipo, item: pick.label.slice(0, 200), nome: f.nome.slice(0, 100), fone: f.fone.slice(0, 25), endereco: f.endereco.slice(0, 200), data: f.data, obs: f.obs.slice(0, 500) })
    window.open(link, '_blank', 'noopener'); onClose()
  }
  return (
    <div role="dialog" aria-modal="true" className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form onSubmit={enviar} onClick={e => e.stopPropagation()} noValidate className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="font-serif text-2xl">{pick.tipo === 'agendar' ? 'Solicitar agendamento' : 'Pedir orçamento'}</h2>
        <p className="mt-1 text-sm text-marrom">{pick.label}</p>
        <label className="mt-4 block text-sm">Nome *<input className={cls} value={f.nome} onChange={set('nome')} autoComplete="name" /></label>
        <label className="mt-3 block text-sm">WhatsApp *<input className={cls} value={f.fone} onChange={set('fone')} inputMode="tel" autoComplete="tel" /></label>
        <label className="mt-3 block text-sm">Endereço / bairro do atendimento *<input className={cls} value={f.endereco} onChange={set('endereco')} /></label>
        <label className="mt-3 block text-sm">Data preferida<input type="date" className={cls} value={f.data} onChange={set('data')} /></label>
        <label className="mt-3 block text-sm">Observações<textarea rows={2} className={cls} value={f.obs} onChange={set('obs')} /></label>
        {erro && <p role="alert" className="mt-3 text-sm text-red-700">{erro}</p>}
        <div className="mt-5 flex gap-2"><button className="rounded-full bg-cacau px-6 py-2 text-white hover:bg-marrom">Enviar pelo WhatsApp</button>
          <button type="button" onClick={onClose} className="rounded-full border border-cacau px-6 py-2">Cancelar</button></div>
        <p className="mt-3 text-xs text-marrom">A solicitação fica registrada para a profissional e a conversa abre no seu WhatsApp.</p>
      </form></div>)
}
