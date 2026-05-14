import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';

export default function Footer() {
  const { ref, isInView } = useInView(0.1);
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const [sub, setSub] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (!email) return; setSub(true); setTimeout(() => { setSub(false); setDone(true); }, 500); };

  return (
    <footer className="th-bg">
      <div className="h-[0.5px]" style={{ background: `linear-gradient(to right, transparent, var(--c-gold3), transparent)` }} />
      <div className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="max-w-xs mx-auto">
          {done ? (
            <p className="text-center th-gold text-[10px] tracking-[0.35em] uppercase">You're in. ✓</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for early access" required
                className="flex-1 bg-transparent px-0 py-3 th-fg2 text-[10px] tracking-wider focus:outline-none border-b"
                style={{ borderColor: 'var(--c-line)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--c-gold)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--c-line)'} />
              <button type="submit" disabled={sub}
                className="th-gold2 text-[9px] tracking-[0.3em] uppercase pb-3 hover:opacity-80 transition-opacity duration-300 tap">
                {sub ? '...' : 'Join'}
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="mx-5 md:mx-10 lg:mx-14 h-[0.5px]" style={{ background: 'var(--c-line)' }} />
      <div ref={ref} className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col items-center text-center">
          <a href="#" className="font-heading text-[13px] md:text-[15px] font-semibold tracking-[0.45em] th-fg tap-xs" style={{ opacity: 0.65 }}>LOWKEY</a>
          <p className="mt-3 th-gold text-[9px] tracking-[0.5em] uppercase font-light" style={{ opacity: 0.55 }}>Not Made For All.</p>
          <div className="mt-12 flex items-center gap-8">
            {['Instagram', 'Contact'].map((link) => (
              <a key={link} href="#" className="th-fg3 text-[9px] tracking-[0.3em] uppercase hover:opacity-80 transition-opacity duration-300 py-1 px-2 -mx-2 tap">{link}</a>
            ))}
          </div>
          <p className="mt-14 th-fg4 text-[8px] tracking-[0.2em]">© 2025</p>
        </motion.div>
      </div>
    </footer>
  );
}
