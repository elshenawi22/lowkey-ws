import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ ready }: { ready: boolean }) {
  const { cartCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => { const y = window.scrollY; setScrolled(y > 60); setHidden(y > lastY && y > 200); setLastY(y); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  useEffect(() => { document.body.style.overflow = menuOpen ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen]);

  const links = [
    { label: 'Collection', href: '#products' },
    { label: 'Drop 001', href: '#drop' },
    { label: 'Lookbook', href: '#lookbook' },
    { label: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <>
      <motion.nav initial={{ y: -80 }} animate={{ y: ready ? (hidden && !menuOpen ? -80 : 0) : -80 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        className="fixed top-0 left-0 right-0 z-[100]"
        style={{ background: scrolled && !menuOpen ? 'var(--c-nav)' : 'transparent', backdropFilter: scrolled && !menuOpen ? 'blur(20px)' : 'none', boxShadow: scrolled && !menuOpen ? '0 1px 0 var(--c-line)' : 'none' }}>
        <div className="flex items-center justify-between px-5 md:px-10 lg:px-14 py-5">
          <button onClick={() => setMenuOpen(!menuOpen)} className="relative w-7 h-4 flex flex-col justify-between z-[110] tap-xs" aria-label="Menu">
            {[menuOpen ? 'rotate-[42deg] w-[22px] translate-y-[-1px]' : 'w-5', menuOpen ? 'opacity-0 w-0' : 'w-3', menuOpen ? '-rotate-[42deg] w-[22px] translate-y-[1px]' : 'w-7'].map((cls, i) => (
              <span key={i} className={`block h-[0.5px] transition-all duration-[600ms] ease-out ${i !== 1 ? 'origin-left' : ''} ${cls}`}
                style={{ background: menuOpen ? 'rgba(230,226,219,0.8)' : 'var(--c-fg2)' }} />
            ))}
          </button>

          <a href="#" className="absolute left-1/2 -translate-x-1/2 z-[110] tap-xs">
            <span className="font-heading text-[12px] md:text-[14px] font-semibold tracking-[0.45em] th-fg" style={menuOpen ? { color: 'rgba(230,226,219,0.9)' } : {}}>LOWKEY</span>
          </a>

          <div className="flex items-center gap-2 z-[110]">
            {!menuOpen && <ThemeToggle />}
            <button onClick={openCart}
              className="text-[9px] tracking-[0.3em] uppercase th-fg3 hover:opacity-80 transition-opacity duration-300 tap"
              style={menuOpen ? { color: 'rgba(230,226,219,0.35)' } : {}}>
              Bag ({cartCount})
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] flex items-center" style={{ background: 'var(--c-overlay)', backdropFilter: 'blur(30px)' }}>
            <div className="w-full px-8 md:px-16 lg:px-24">
              <div className="space-y-1">
                {links.map((link, i) => (
                  <div key={link.label} className="overflow-hidden">
                    <motion.a href={link.href} onClick={() => setMenuOpen(false)}
                      initial={{ y: 60 }} animate={{ y: 0 }} exit={{ y: -20 }}
                      transition={{ duration: 0.5, delay: i * 0.04 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className="block py-3 md:py-4 group tap">
                      <span className="font-heading text-[28px] md:text-[44px] lg:text-[54px] font-light tracking-[0.03em] text-offwhite/75 group-hover:text-offwhite/35 transition-colors duration-300">
                        {link.label}
                      </span>
                    </motion.a>
                  </div>
                ))}
              </div>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="mt-16 md:mt-20 text-gold/20 text-[9px] tracking-[0.5em] uppercase">Not Made For All.</motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
