import { Link, NavLink, Outlet } from 'react-router-dom'
import { Instagram, MessageCircle } from 'lucide-react'
import Logo from './Logo'
import { waLink } from '../lib/config'
const nav = [['/', 'Início'], ['/sobre', 'Sobre'], ['/procedimentos', 'Procedimentos'], ['/contato', 'Contato']]
export default function Layout() {
  const wa = waLink('Olá! Gostaria de atendimento.')
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
      <div><Logo light /><p className="mt-4 text-sm">Atendimento exclusivamente domiciliar.</p></div>
      <div className="flex flex-col gap-1 text-sm"><Link to="/privacidade">Política de privacidade</Link><Link to="/admin" className="opacity-60">Acesso restrito</Link></div>
      <div className="text-sm"><p className="text-[11px] tracking-[0.2em] opacity-80">DESENVOLVIDO POR</p>
        <p className="mt-1 font-medium">WP Integrada</p>
        <a href="https://wa.me/5586998030143" target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 hover:underline"><MessageCircle size={16} />(86) 99803-0143</a>
        <a href="https://www.instagram.com/wp.integrada" target="_blank" rel="noreferrer" className="mt-1 flex items-center gap-2 hover:underline"><Instagram size={16} />@wp.integrada</a></div>
    </div></footer>
    {wa && <a href={wa} target="_blank" rel="noreferrer" aria-label="WhatsApp"
      className="fixed bottom-5 right-5 rounded-full bg-marrom p-4 text-white shadow-lg hover:bg-cacau"><MessageCircle /></a>}
  </>)
}
