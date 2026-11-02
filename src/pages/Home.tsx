import { Link } from 'react-router-dom'
import { Home as HomeIcon, HeartHandshake, CalendarCheck } from 'lucide-react'
const steps = [[CalendarCheck, 'Escolha o procedimento e a data'], [HomeIcon, 'Informe o endereço do atendimento'], [HeartHandshake, 'Receba o cuidado em casa']] as const
export default function Home() {
  return (<>
    <section className="bg-gradient-to-br from-bege to-nude"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
      <div><h1 className="font-serif text-5xl leading-[1.05] md:text-6xl">Seu cuidado, sua beleza e seu bem-estar no conforto da sua casa.</h1>
      <p className="mt-6 max-w-xl text-lg font-light">Atendimento domiciliar em enfermagem e estética, com cuidado humanizado, profissionalismo e atenção individualizada.</p>
      <div className="mt-10 flex flex-wrap gap-3"><Link to="/procedimentos" className="rounded-full bg-cacau px-7 py-3 text-white hover:bg-marrom">Agendar atendimento</Link>
        <Link to="/sobre" className="rounded-full border border-cacau px-7 py-3 hover:bg-white/50">Conhecer a profissional</Link></div></div>
      <img src="/larissa.webp" alt="Larissa Guerra sorrindo, sentada à mesa" width={670} height={785} fetchPriority="high"
        className="mx-auto w-full max-w-sm rounded-t-[10rem] rounded-b-sm object-cover shadow-xl" /></div></section>
    <section className="mx-auto max-w-6xl px-5 pt-20"><h2 className="font-serif text-4xl">Como funciona o atendimento</h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">{steps.map(([I, t], i) => <li key={i} className="rounded-sm border border-nude bg-white p-6"><I className="text-marrom" /><p className="mt-4">{t}</p></li>)}</ol></section>
    <section className="mx-auto max-w-6xl px-5 pt-20"><h2 className="font-serif text-4xl">Procedimentos em destaque</h2>
      <p className="mt-3 max-w-2xl">Pacotes de acompanhamento no pós-operatório de cirurgia plástica e massoterapia, sempre no conforto da sua casa.</p>
      <Link to="/procedimentos" className="mt-6 inline-block rounded-full bg-cacau px-7 py-3 text-white hover:bg-marrom">Ver pacotes e valores</Link></section>
  </>)
}
