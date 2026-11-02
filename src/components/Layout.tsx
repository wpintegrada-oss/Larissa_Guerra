import { Link, NavLink, Outlet } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { WHATSAPP } from '../lib/firebase'
const nav = [['/', 'Início'], ['/sobre', 'Sobre'], ['/procedimentos', 'Procedimentos'], ['/minha-conta', 'Minha conta']]
export default function Layout() {
  const wa = WHATSAPP ? `https://wa.me/${WHATSAPP}` : undefined
  return (<>
    <header className="sticky top-0 z-20 border-b border-nude/60 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link to="/"><Logo /></Link>
        <nav className="flex gap-6 text-sm">{nav.map(([to, l]) =>
          <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'text-marrom' : 'hover:text-marrom'}>{l}</NavLink>)}</nav>
        <Link to="/procedimentos" className="rounded-full bg-cacau px-5 py-2 text-sm text-white hover:bg-marrom">Agendar</Link>
      </div></header>
    <main><Outlet /></main>
    <footer className="mt-24 bg-cacau text-bege"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
      <Logo light /><p className="text-sm">Atendimento exclusivamente domiciliar.</p>
      <div className="flex flex-col gap-1 text-sm"><Link to="/privacidade">Política de privacidade</Link><Link to="/termos">Termos de uso</Link></div></div></footer>
    {wa && <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 rounded-full bg-marrom p-4 text-white shadow-lg hover:bg-cacau"><MessageCircle /></a>}
  </>)
}
