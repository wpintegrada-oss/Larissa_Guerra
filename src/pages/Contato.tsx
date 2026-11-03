import { useState, type FormEvent } from 'react'
import { MessageCircle, Mail, Clock, Home, Phone, Send } from 'lucide-react'
import { WHATSAPP, EMAIL, HORARIO, REGIOES, formatPhone, waLink } from '../lib/config'

const pending = <span className="text-marrom/70">A informar</span>

function Row({ icon: I, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return <li className="flex gap-4"><I className="mt-1 shrink-0 text-marrom" size={22} />
    <div><p className="text-sm font-medium">{title}</p><div className="mt-1 whitespace-pre-line text-sm">{children}</div></div></li>
}

export default function Contato() {
  const [f, setF] = useState({ nome: '', fone: '', email: '', msg: '' })
  const [erro, setErro] = useState('')
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })
  const wa = waLink('Olá! Gostaria de atendimento.')

  function enviar(e: FormEvent) {
    e.preventDefault()
    if (!f.nome.trim() || !f.fone.trim() || !f.msg.trim()) return setErro('Preencha nome, WhatsApp e a mensagem.')
    const link = waLink(`Olá! Meu nome é ${f.nome}. ${f.msg}\nContato: ${f.fone}${f.email ? ' | ' + f.email : ''}`)
    if (!link) return setErro('O WhatsApp de atendimento ainda não foi configurado. Tente novamente em breve.')
    setErro(''); window.open(link, '_blank', 'noopener')
  }
  const input = 'mt-1 w-full rounded-sm border border-nude bg-bege/30 px-3 py-2'

  return (
    <section className="mx-auto max-w-5xl px-5 py-16">
      <p className="text-center text-xs tracking-[0.3em] text-marrom">CANAIS DE ATENDIMENTO</p>
      <h1 className="mt-3 text-center font-serif text-5xl">Fale com a Larissa Guerra</h1>
      <p className="mx-auto mt-4 max-w-2xl text-center">Estamos à disposição para esclarecer dúvidas sobre procedimentos, verificar sua região de atendimento e agendar sua visita domiciliar.</p>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <div className="rounded-lg border border-nude bg-white p-6">
          <h2 className="font-serif text-3xl text-marrom">Informações</h2>
          <ul className="mt-6 space-y-5">
            <Row icon={Phone} title="WhatsApp">{WHATSAPP ? formatPhone(WHATSAPP) : pending}</Row>
            <Row icon={Mail} title="E-mail">{EMAIL ? <a className="underline" href={`mailto:${EMAIL}`}>{EMAIL}</a> : pending}</Row>
            <Row icon={Clock} title="Horário de atendimento domiciliar">{HORARIO || pending}</Row>
            <Row icon={Home} title="Regiões atendidas (exclusivo domiciliar)">{REGIOES || pending}</Row>
          </ul>
          {wa ? <a href={wa} target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-center gap-2 rounded-sm bg-cacau px-5 py-3 text-white hover:bg-marrom"><MessageCircle size={18} />Conversar agora no WhatsApp</a>
            : <p className="mt-8 rounded-sm bg-nude/40 p-3 text-sm">O botão de WhatsApp será ativado quando o número for configurado.</p>}
        </div>

        <form onSubmit={enviar} noValidate className="rounded-lg border border-nude bg-white p-6">
          <h2 className="font-serif text-3xl">Envie uma mensagem</h2>
          <label className="mt-5 block text-sm">Seu nome *<input className={input} value={f.nome} onChange={set('nome')} autoComplete="name" placeholder="Nome completo" /></label>
          <label className="mt-4 block text-sm">WhatsApp / Telefone *<input className={input} value={f.fone} onChange={set('fone')} inputMode="tel" autoComplete="tel" placeholder="(DDD) 90000-0000" /></label>
          <label className="mt-4 block text-sm">E-mail<input type="email" className={input} value={f.email} onChange={set('email')} autoComplete="email" placeholder="seuemail@exemplo.com" /></label>
          <label className="mt-4 block text-sm">Como podemos ajudar? *<textarea rows={4} className={input} value={f.msg} onChange={set('msg')} placeholder="Escreva sua dúvida ou o procedimento de interesse" /></label>
          {erro && <p role="alert" className="mt-3 text-sm text-red-700">{erro}</p>}
          <button className="mt-5 flex items-center gap-2 rounded-sm bg-cacau px-6 py-3 text-white hover:bg-marrom"><Send size={16} />Enviar pelo WhatsApp</button>
          <p className="mt-3 text-xs text-marrom">Ao enviar, a conversa abre no seu WhatsApp com a mensagem pronta. Seus dados não são armazenados neste formulário.</p>
        </form>
      </div>
    </section>
  )
}
