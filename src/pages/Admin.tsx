import { useEffect, useState, type FormEvent } from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import { collection, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '../lib/firebase'
import { site, waLink } from '../lib/config'

type Row = { id: string; tipo: string; item?: string; nome: string; fone: string; endereco?: string; data?: string; obs?: string; status: string; createdAt?: { toDate(): Date } }
const STATUS = ['novo', 'confirmado', 'concluido', 'cancelado']
const cls = 'mt-1 w-full rounded-sm border border-nude bg-white px-3 py-2'

function Login() {
  const [e, setE] = useState(''); const [p, setP] = useState(''); const [err, setErr] = useState('')
  async function go(ev: FormEvent) { ev.preventDefault(); try { await signInWithEmailAndPassword(auth!, e, p) } catch { setErr('E-mail ou senha incorretos.') } }
  return <form onSubmit={go} className="mx-auto mt-20 max-w-sm rounded-lg border border-nude bg-white p-6">
    <h1 className="font-serif text-3xl">Painel administrativo</h1>
    <label className="mt-5 block text-sm">E-mail<input type="email" className={cls} value={e} onChange={x => setE(x.target.value)} autoComplete="username" /></label>
    <label className="mt-3 block text-sm">Senha<input type="password" className={cls} value={p} onChange={x => setP(x.target.value)} autoComplete="current-password" /></label>
    {err && <p role="alert" className="mt-3 text-sm text-red-700">{err}</p>}
    <button className="mt-5 w-full rounded-full bg-cacau py-2 text-white hover:bg-marrom">Entrar</button></form>
}

function Requests() {
  const [rows, setRows] = useState<Row[]>([])
  useEffect(() => onSnapshot(query(collection(db!, 'requests'), orderBy('createdAt', 'desc')),
    s => setRows(s.docs.map(d => ({ id: d.id, ...d.data() } as Row)))), [])
  if (!rows.length) return <p className="mt-6">Nenhuma solicitação recebida ainda.</p>
  return <ul className="mt-6 space-y-4">{rows.map(r => (
    <li key={r.id} className="rounded-sm border border-nude bg-white p-4 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <strong>{r.nome}</strong>
        <span className="text-marrom">{r.tipo === 'agendar' ? 'Agendamento' : r.tipo === 'orcamento' ? 'Orçamento' : 'Contato'} · {r.createdAt?.toDate().toLocaleString('pt-BR') ?? ''}</span></div>
      {r.item && <p className="mt-1">{r.item}</p>}
      <p className="mt-1">WhatsApp: {r.fone}{r.endereco ? ` · Local: ${r.endereco}` : ''}{r.data ? ` · Data preferida: ${r.data.split('-').reverse().join('/')}` : ''}</p>
      {r.obs && <p className="mt-1 text-marrom">Obs.: {r.obs}</p>}
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <select aria-label="Status" value={r.status} onChange={x => updateDoc(doc(db!, 'requests', r.id), { status: x.target.value })} className="rounded-sm border border-nude px-2 py-1">
          {STATUS.map(s => <option key={s} value={s}>{s}</option>)}</select>
        <a className="underline" target="_blank" rel="noreferrer" href={waLink(`Olá, ${r.nome}! Recebi sua solicitação.`, '55' + r.fone.replace(/\D/g, '').replace(/^55/, ''))}>Responder no WhatsApp</a></div>
    </li>))}</ul>
}

function Settings() {
  const [f, setF] = useState({ whatsapp: site.whatsapp, email: site.email, hours: site.hours, regions: site.regions }); const [msg, setMsg] = useState('')
  useEffect(() => { getDoc(doc(db!, 'settings', 'site')).then(s => s.exists() && setF(o => ({ ...o, ...s.data() }))).catch(() => {}) }, [])
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  async function save(e: FormEvent) {
    e.preventDefault()
    try { await setDoc(doc(db!, 'settings', 'site'), { ...f, whatsapp: f.whatsapp.replace(/\D/g, '') }, { merge: true }); setMsg('Salvo! O site já usa os novos dados.') }
    catch { setMsg('Não foi possível salvar. Verifique suas permissões.') }
  }
  return <form onSubmit={save} className="mt-6 max-w-xl rounded-sm border border-nude bg-white p-6">
    <label className="block text-sm">WhatsApp que recebe os pedidos (com DDI e DDD)<input className={cls} value={f.whatsapp} onChange={set('whatsapp')} inputMode="tel" /></label>
    <label className="mt-3 block text-sm">E-mail<input className={cls} value={f.email} onChange={set('email')} /></label>
    <label className="mt-3 block text-sm">Horário de atendimento<textarea rows={2} className={cls} value={f.hours} onChange={set('hours')} /></label>
    <label className="mt-3 block text-sm">Regiões atendidas<textarea rows={3} className={cls} value={f.regions} onChange={set('regions')} /></label>
    <button className="mt-5 rounded-full bg-cacau px-6 py-2 text-white hover:bg-marrom">Salvar</button>
    {msg && <p role="status" className="mt-3 text-sm">{msg}</p>}</form>
}

export default function Admin() {
  const [st, setSt] = useState<'load' | 'out' | 'denied' | 'ok'>('load'); const [tab, setTab] = useState<'req' | 'cfg'>('req')
  useEffect(() => {
    if (!auth || !db) return
    return onAuthStateChanged(auth, async (u: User | null) => {
      if (!u) return setSt('out')
      try { setSt((await getDoc(doc(db!, 'admins', u.uid))).exists() ? 'ok' : 'denied') } catch { setSt('denied') }
    })
  }, [])
  if (!auth || !db) return <p className="p-10">Firebase ainda não configurado. Preencha as variáveis VITE_FIREBASE_* no Vercel.</p>
  if (st === 'load') return <p className="p-10">Carregando…</p>
  if (st === 'out') return <Login />
  if (st === 'denied') return <div className="p-10"><p>Esta conta não tem acesso de administradora.</p><button className="mt-4 underline" onClick={() => signOut(auth!)}>Sair</button></div>
  return <div className="mx-auto max-w-4xl px-5 py-10">
    <div className="flex items-center justify-between"><h1 className="font-serif text-4xl">Painel</h1><button className="underline" onClick={() => signOut(auth!)}>Sair</button></div>
    <div className="mt-6 flex gap-2">{([['req', 'Solicitações'], ['cfg', 'Configurações']] as const).map(([k, l]) =>
      <button key={k} onClick={() => setTab(k)} className={`rounded-full px-5 py-2 ${tab === k ? 'bg-cacau text-white' : 'border border-nude bg-white'}`}>{l}</button>)}</div>
    {tab === 'req' ? <Requests /> : <Settings />}</div>
}
