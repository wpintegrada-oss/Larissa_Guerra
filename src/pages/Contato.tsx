import { MessageCircle, Mail, Clock, Home, Phone } from 'lucide-react'
import { site, formatPhone, waLink } from '../lib/config'

const pending = <span className="text-marrom/70">A informar</span>

function Row({ icon: I, title, children }: { icon: typeof Phone; title: string; children: React.ReactNode }) {
  return <li className="flex gap-4"><I className="mt-1 shrink-0 text-marrom" size={22} />
    <div><p className="text-sm font-medium">{title}</p><div className="mt-1 whitespace-pre-line text-sm">{children}</div></div></li>
}

export default function Contato() {
  const wa = waLink('Olá! Gostaria de atendimento.')
  return (
    <section className="mx-auto max-w-2xl px-5 py-16">
      <p className="text-center text-xs tracking-[0.3em] text-marrom">CANAIS DE ATENDIMENTO</p>
      <h1 className="mt-3 text-center font-serif text-5xl">Fale com a Larissa Guerra</h1>
      <p className="mx-auto mt-4 max-w-xl text-center">Estamos à disposição para esclarecer dúvidas sobre procedimentos, verificar sua região de atendimento e agendar sua visita domiciliar.</p>

      <div className="mt-12 rounded-lg border border-nude bg-white p-6 md:p-8">
        <h2 className="font-serif text-3xl text-marrom">Informações</h2>
        <ul className="mt-6 space-y-5">
          <Row icon={Phone} title="WhatsApp">{site.whatsapp ? formatPhone(site.whatsapp) : pending}</Row>
          <Row icon={Mail} title="E-mail">{site.email ? <a className="underline" href={`mailto:${site.email}`}>{site.email}</a> : pending}</Row>
          <Row icon={Clock} title="Horário de atendimento domiciliar">{site.hours || pending}</Row>
          <Row icon={Home} title="Regiões atendidas (exclusivo domiciliar)">{site.regions || pending}</Row>
        </ul>
        {wa ? <a href={wa} target="_blank" rel="noreferrer" className="mt-8 flex items-center justify-center gap-2 rounded-sm bg-cacau px-5 py-3 text-white hover:bg-marrom"><MessageCircle size={18} />Conversar agora no WhatsApp</a>
          : <p className="mt-8 rounded-sm bg-nude/40 p-3 text-sm">O botão de WhatsApp será ativado quando o número for configurado.</p>}
      </div>
    </section>
  )
}
