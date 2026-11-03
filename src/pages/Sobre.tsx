import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'

const atuacao: [string, string][] = [
  ['Acompanhamento pré e pós-operatório', 'Assistência e orientações aos pacientes submetidos a cirurgias plásticas.'],
  ['Cuidados domiciliares', 'Acompanhamento individualizado, com profissionais capacitados.'],
  ['Drenagem linfática', 'Atendimento voltado ao bem-estar e à recuperação, respeitando as indicações e contraindicações.'],
  ['Acompanhamento online', 'Suporte e orientações aos pacientes durante o processo de recuperação.'],
  ['Estética e bem-estar', 'Atuação com foco na qualidade de vida, autoestima e cuidado integral.'],
]

export default function Sobre() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.4fr]">
        <img src="/larissa.webp" alt="Larissa Guerra" width={670} height={785}
          className="w-full max-w-md rounded-t-[10rem] rounded-b-sm object-cover shadow-xl md:sticky md:top-28" />
        <div>
          <h1 className="font-serif text-5xl">Larissa Guerra</h1>
          <p className="mt-2 text-marrom">Enfermeira · COREN-PI 989.535</p>
          <div className="mt-6 max-w-prose space-y-4 leading-relaxed">
            <p>Larissa é profissional da área da saúde: enfermeira, massoterapeuta e pós-graduada em Estética e Cosméticos. Empreendedora dedicada ao cuidado, à saúde e ao bem-estar das pessoas, construiu sua trajetória com experiência, responsabilidade e amor pelo que faz.</p>
            <p>São aproximadamente 6 anos de experiência em cirurgia plástica, acompanhamento de pacientes e cuidados assistenciais. Sua atuação é voltada ao cuidado humanizado, com atenção especial a quem passa por procedimentos cirúrgicos e precisa de acompanhamento antes e depois da cirurgia.</p>
          </div>

          <h2 className="mt-12 font-serif text-3xl">Atuação profissional</h2>
          <ul className="mt-5 space-y-4">{atuacao.map(([t, d]) =>
            <li key={t} className="flex gap-3"><Check size={18} className="mt-1 shrink-0 text-marrom" />
              <p><strong className="font-medium">{t}.</strong> {d}</p></li>)}</ul>

          <h2 className="mt-12 font-serif text-3xl">Diferencial</h2>
          <div className="mt-4 max-w-prose space-y-4 leading-relaxed">
            <p>Larissa acredita que cuidar vai muito além de realizar procedimentos: é oferecer acolhimento, segurança, atenção aos detalhes e respeito à individualidade de cada paciente.</p>
            <p>Seu trabalho combina conhecimento técnico, experiência prática e atendimento humanizado. Ela também coordena profissionais que realizam atendimentos presenciais, mantendo o acompanhamento e a supervisão dos serviços.</p>
          </div>

          <h2 className="mt-12 font-serif text-3xl">Propósito</h2>
          <p className="mt-4 max-w-prose leading-relaxed">Oferecer um atendimento ético, responsável e humanizado, proporcionando mais tranquilidade, confiança e segurança em cada etapa do cuidado.</p>
          <p className="mt-6 font-serif text-2xl text-marrom">Cuidado, profissionalismo e humanização em cada detalhe.</p>

          <Link to="/procedimentos" className="mt-10 inline-block rounded-full bg-cacau px-7 py-3 text-white hover:bg-marrom">Ver procedimentos</Link>
        </div>
      </div>
    </section>
  )
}
