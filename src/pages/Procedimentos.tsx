import { useState } from 'react'
import { Check, MapPin } from 'lucide-react'
import { CATS, brl } from '../data/procedures'
import { useProcedures } from '../lib/useProcedures'
import RequestDialog, { type Pick } from '../components/RequestDialog'

export default function Procedimentos() {
  const [cat, setCat] = useState<(typeof CATS)[number][0]>('enfermagem')
  const [pick, setPick] = useState<Pick | null>(null)
  const { list, loading } = useProcedures()
  const items = list.filter(p => p.categoria === cat)
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-serif text-5xl">Procedimentos</h1>
      <p className="mt-3 flex items-center gap-2 text-marrom"><MapPin size={16} />Atendimento exclusivamente domiciliar. Taxa de deslocamento conforme a localização.</p>
      <div role="tablist" className="mt-8 flex flex-wrap gap-2">
        {CATS.map(([k, l]) => <button key={k} role="tab" aria-selected={cat === k} onClick={() => setCat(k)}
          className={`rounded-full px-6 py-2 ${cat === k ? 'bg-cacau text-white' : 'border border-nude bg-white'}`}>{l}</button>)}
      </div>
      {loading ? <p className="mt-10">Carregando…</p> : !items.length ? <p className="mt-10 text-marrom">Nenhum procedimento disponível nesta categoria no momento.</p> : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {items.map(p => (
            <article key={p.id} className="flex flex-col rounded-sm border border-nude bg-white p-6">
              <h2 className="font-serif text-2xl">{p.nome}</h2>
              {p.descricao && <p className="mt-3 text-sm">{p.descricao}</p>}
              {!!p.itens?.length && <ul className="mt-4 space-y-2 text-sm">{p.itens.map(s =>
                <li key={s} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-marrom" />{s}</li>)}</ul>}
              {p.observacao && <p className="mt-4 text-sm text-marrom">{p.observacao}</p>}
              {!!p.opcoes?.length && <ul className="mt-4 divide-y divide-nude/70">{p.opcoes.map((o, i) => {
                const label = `${p.nome}${o.rotulo ? ' — ' + o.rotulo : ''} (${brl(o.valor)})`
                return <li key={i} className="flex items-center justify-between gap-3 py-2">
                  <span>{o.rotulo && <span className="mr-2 text-sm">{o.rotulo}</span>}<strong className="font-serif text-2xl font-medium">{brl(o.valor)}</strong></span>
                  <button onClick={() => setPick({ label, tipo: 'agendar' })} className="rounded-full bg-cacau px-4 py-1.5 text-sm text-white hover:bg-marrom">Agendar</button></li>
              })}</ul>}
              <button onClick={() => setPick({ label: p.nome, tipo: 'orcamento' })} className="mt-4 self-start rounded-full border border-cacau px-5 py-2 text-sm hover:bg-bege">Pedir orçamento</button>
            </article>))}
        </div>)}
      {pick && <RequestDialog pick={pick} onClose={() => setPick(null)} />}
    </section>
  )
}
