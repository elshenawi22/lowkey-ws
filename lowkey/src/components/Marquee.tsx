export default function Marquee() {
  const items = Array(30).fill('NOT MADE FOR ALL').join(' \u2014 ');
  return (
    <div className="w-full overflow-hidden py-5 md:py-6 th-bg2 relative border-y" style={{ borderColor: 'var(--c-line)' }}>
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-36 z-10" style={{ background: `linear-gradient(to right, var(--c-bg2), transparent)` }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-36 z-10" style={{ background: `linear-gradient(to left, var(--c-bg2), transparent)` }} />
      <div className="animate-marquee whitespace-nowrap">
        <span className="font-heading text-[9px] md:text-[10px] tracking-[0.6em] uppercase" style={{ color: 'var(--c-gold3)' }}>
          {items} — {items}
        </span>
      </div>
    </div>
  );
}
