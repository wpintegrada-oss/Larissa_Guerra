export default function Logo({ light = false }: { light?: boolean }) {
  return (<div className={`leading-none ${light ? 'text-bege' : 'text-cacau'}`}>
    <div className="font-serif text-3xl tracking-wide">Larissa Guerra</div>
    <div className="mt-1 text-[11px] tracking-[0.35em] text-marrom">enfermagem e estética</div></div>)
}
