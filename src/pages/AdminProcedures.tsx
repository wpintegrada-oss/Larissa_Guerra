import { useEffect, useState, type FormEvent } from 'react'
import { addDoc, collection, deleteDoc, doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { CATS, brl, seed, type Opcao, type Procedure } from '../data/procedures'

const cls = 'mt-1 w-full rounded-sm border border-nude bg-white px-3 py-2'
const empty = { nome: '', categoria: 'enfermagem' as Procedure['categoria'], descricao: '', itens: '', observacao: '', opcoes: '', ordem: '1', ativo: true }
const toText = (o: Opcao[]) => o.map(x => `${x.rotulo ? x.rotulo + ' | ' : ''}${String(x.valor).replace('.', ',')}`).join('\n')
const num = (s: string) => Number(s.replace(/R\$|\s/g, '').replace(/\./g, '').replace(',', '.'))
function parseOpcoes(t: string): Opcao[] | null {
  const out: Opcao[] = []
  for (const line of t.split('\n').map(l => l.trim()).filter(Boolean)) {
    const i = line.lastIndexOf('|')
    const rotulo = i >= 0 ? line.slice(0, i).trim() : ''
    const valor = num(i >= 0 ? line.slice(i + 1) : line)
    if (!isFinite(valor) || valor < 0) return null
    out.push({ rotulo, valor })
  }
  return out
}

export default function AdminProcedures() {
  const [rows, setRows] = useState<Procedure[]>([]); const [f, setF] = useState(empty); const [editId, setEditId] = useState<string | null>(null)
  const [msg, setMsg] = useState('')
  useEffect(() => onSnapshot(collection(db!, 'procedures'),
    s => setRows(s.docs.map(d => ({ ...d.data(), id: d.id }) as Procedure).sort((a, b) => a.categoria.localeCompare(b.categoria) || (a.ordem ?? 0) - (b.ordem ?? 0))),
    () => setMsg('Sem permissão para ler os procedimentos.')), [])
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })

  function edit(p: Procedure) {
    setEditId(p.id); setMsg(''); window.scrollTo({ top: 0, behavior: 'smooth' })
    setF({ nome: p.nome, categoria: p.categoria, descricao: p.descricao ?? '', itens: (p.itens ?? []).join('\n'), observacao: p.observacao ?? '', opcoes: toText(p.opcoes ?? []), ordem: String(p.ordem ?? 1), ativo: p.ativo !== false })
  }
  async function save(e: FormEvent) {
    e.preventDefault()
    const opcoes = parseOpcoes(f.opcoes)
    if (!f.nome.trim()) return setMsg('Informe o nome do procedimento.')
    if (!opcoes) return setMsg('Valores inválidos. Use uma linha por opção, no formato "30 min | 120".')
    const data: Omit<Procedure, 'id'> = { nome: f.nome.trim(), categoria: f.categoria, descricao: f.descricao.trim(), itens: f.itens.split('\n').map(s => s.trim()).filter(Boolean), observacao: f.observacao.trim(), opcoes, ordem: Number(f.ordem) || 1, ativo: f.ativo }
    try {
      if (editId) await setDoc(doc(db!, 'procedures', editId), data); else await addDoc(collection(db!, 'procedures'), data)
      setMsg(editId ? 'Procedimento atualizado.' : 'Procedimento cadastrado.'); setEditId(null); setF(empty)
    } catch { setMsg('Não foi possível salvar. Verifique suas permissões.') }
  }
  async function remove(p: Procedure) {
    if (!confirm(`Excluir "${p.nome}"? Isso não pode ser desfeito.`)) return
    try { await deleteDoc(doc(db!, 'procedures', p.id)) } catch { setMsg('Não foi possível excluir.') }
  }
  async function importar() {
    try { await Promise.all(seed.map(({ id, ...d }) => setDoc(doc(db!, 'procedures', id), d))); setMsg('Procedimentos iniciais importados. Agora você pode editá-los.') }
    catch { setMsg('Não foi possível importar.') }
  }

  return <div className="mt-6">
    <form onSubmit={save} className="max-w-2xl rounded-sm border border-nude bg-white p-6">
      <h2 className="font-serif text-2xl">{editId ? 'Editar procedimento' : 'Novo procedimento'}</h2>
      <label className="mt-4 block text-sm">Nome *<input className={cls} value={f.nome} onChange={set('nome')} /></label>
      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="block text-sm">Categoria<select className={cls} value={f.categoria} onChange={set('categoria')}>{CATS.map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></label>
        <label className="block text-sm">Ordem na lista<input type="number" className={cls} value={f.ordem} onChange={set('ordem')} /></label></div>
      <label className="mt-3 block text-sm">Descrição (opcional)<textarea rows={2} className={cls} value={f.descricao} onChange={set('descricao')} /></label>
      <label className="mt-3 block text-sm">Itens inclusos (um por linha, opcional)<textarea rows={3} className={cls} value={f.itens} onChange={set('itens')} /></label>
      <label className="mt-3 block text-sm">Observação (ex.: R$ 190,00 por sessão)<input className={cls} value={f.observacao} onChange={set('observacao')} /></label>
      <label className="mt-3 block text-sm">Valores — uma opção por linha: <em>nome | valor</em> (ex.: <em>60 min | 120</em>). Valor único: só o número.
        <textarea rows={3} className={cls} value={f.opcoes} onChange={set('opcoes')} placeholder={'30 min | 70\n60 min | 120'} /></label>
      <label className="mt-3 flex items-center gap-2 text-sm"><input type="checkbox" checked={f.ativo} onChange={e => setF({ ...f, ativo: e.target.checked })} />Ativo (aparece no site)</label>
      {msg && <p role="status" className="mt-3 text-sm">{msg}</p>}
      <div className="mt-4 flex gap-2"><button className="rounded-full bg-cacau px-6 py-2 text-white hover:bg-marrom">{editId ? 'Salvar alterações' : 'Cadastrar'}</button>
        {editId && <button type="button" onClick={() => { setEditId(null); setF(empty); setMsg('') }} className="rounded-full border border-cacau px-6 py-2">Cancelar</button>}</div>
    </form>

    {!rows.length && <div className="mt-6 rounded-sm bg-nude/40 p-4 text-sm">Nenhum procedimento cadastrado. O site mostra os valores iniciais enquanto a lista estiver vazia.
      <button onClick={importar} className="mt-3 block rounded-full bg-cacau px-5 py-2 text-white hover:bg-marrom">Importar procedimentos iniciais para editar</button></div>}

    {CATS.map(([k, l]) => { const g = rows.filter(r => r.categoria === k); return !g.length ? null : <div key={k} className="mt-8">
      <h3 className="font-serif text-2xl">{l}</h3>
      <ul className="mt-3 space-y-3">{g.map(p => <li key={p.id} className={`rounded-sm border border-nude bg-white p-4 text-sm ${p.ativo === false ? 'opacity-60' : ''}`}>
        <div className="flex flex-wrap items-center justify-between gap-2"><strong>{p.nome}{p.ativo === false ? ' (inativo)' : ''}</strong>
          <span className="text-marrom">{(p.opcoes ?? []).map(o => `${o.rotulo ? o.rotulo + ': ' : ''}${brl(o.valor)}`).join(' · ')}</span></div>
        <div className="mt-3 flex gap-4">
          <button className="underline" onClick={() => edit(p)}>Editar</button>
          <button className="underline" onClick={() => updateDoc(doc(db!, 'procedures', p.id), { ativo: p.ativo === false })}>{p.ativo === false ? 'Ativar' : 'Desativar'}</button>
          <button className="text-red-700 underline" onClick={() => remove(p)}>Excluir</button></div></li>)}</ul></div> })}
  </div>
}
