import { useState } from 'react'
import { Check, MapPin } from 'lucide-react'
import { packages, massages, brl, PACKAGE_DAYS } from '../data/procedures'
import RequestDialog, { type Pick } from '../components/RequestDialog'

export default function Procedimentos() {
  const [cat, setCat] = useState<'enfermagem' | 'estetica'>('enfermagem')
  const [days, setDays] = useState<7 | 10>(10)
  const [pick, setPick] = useState<Pick | null>(null)
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="font-serif text-5xl">Procedimentos</h1>
      <p className="mt-3 flex items-center gap-2 text-marrom"><MapPin size={16} />Atendimento exclusivamente domiciliar. Taxa de deslocamento conforme a localização.</p>
      <div role="tablist" className="mt-8 flex gap-2">
        {([['enfermagem', 'Enfermagem'], ['estetica', 'Estética']] as const).map(([k, l]) =>
          <button key={k} role="tab" aria-selected={cat === k} onClick={() => setCat(k)}
            className={`rounded-full px-6 py-2 ${cat === k ? 'bg-cacau text-white' : 'border border-nude bg-white'}`}>{l}</button>)}
      </div>
      {cat === 'enfermagem' ? (<>
        <h2 className="mt-10 font-serif text-3xl">Pacotes de cuidados no pós-operatório de cirurgia plástica</h2>
        <div className="mt-4 flex items-center gap-2 text-sm">Duração do pacote:
          {PACKAGE_DAYS.map(d => <button key={d} onClick={() => setDays(d)} aria-pressed={days === d}
            className={`rounded-full px-4 py-1 ${days === d ? 'bg-marrom text-white' : 'border border-nude bg-white'}`}>{d} dias</button>)}</div>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {packages.map(p => {
            const total = p.price * days
            const label = `${p.name} (${days} dias, ${brl(total)})`
            return (<article key={p.id} className="flex flex-col rounded-sm border border-nude bg-white p-6">
              <h3 className="font-serif text-2xl">{p.name}</h3>
              <ul className="mt-4 space-y-2 text-sm">{p.services.map(s =>
                <li key={s} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-marrom" />{s}</li>)}</ul>
              <p className="mt-6 text-sm">{brl(p.price)} por {p.unit}</p>
              <p className="font-serif text-3xl">{brl(total)} <span className="text-base font-sans">total em {days} dias</span></p>
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={() => setPick({ label, tipo: 'agendar' })} className="rounded-full bg-cacau px-5 py-2 text-sm text-white hover:bg-marrom">Agendar</button>
                <button onClick={() => setPick({ label, tipo: 'orcamento' })} className="rounded-full border border-cacau px-5 py-2 text-sm hover:bg-bege">Pedir orçamento</button></div>
            </article>)
          })}
        </div>
      </>) : (<>
        <h2 className="mt-10 font-serif text-3xl">Massoterapia</h2>
        <p className="mt-2 text-sm">Toque no valor para solicitar o tempo escolhido.</p>
        <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[480px] border-collapse bg-white text-left">
          <thead><tr className="bg-cacau text-white"><th className="p-3">Massagem</th>{[30, 60, 90].map(m => <th key={m} className="p-3">{m} min</th>)}</tr></thead>
          <tbody>{massages.map(m => <tr key={m.name} className="border-b border-nude">
            <th scope="row" className="p-3 font-normal">{m.name}</th>
            {([30, 60, 90] as const).map(t => <td key={t} className="p-3">{m.prices[t] == null ? '—' :
              <button className="font-medium text-marrom underline" onClick={() => setPick({ label: `Massagem ${m.name} de ${t} min (${brl(m.prices[t]!)})`, tipo: 'agendar' })}>{brl(m.prices[t]!)}</button>}</td>)}
          </tr>)}</tbody></table></div>
      </>)}
      {pick && <RequestDialog pick={pick} onClose={() => setPick(null)} />}
    </section>
  )
}
