import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero({ ready }: { ready: boolean }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const i = new Image(); i.src = '/images/hero.jpg'; i.onload = () => setLoaded(true); }, []);
  useEffect(() => {
    const h = (e: MouseEvent) => setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 10, y: (e.clientY / window.innerHeight - 0.5) * 10 });
    window.addEventListener('mousemove', h); return () => window.removeEventListener('mousemove', h);
  }, []);
  const show = ready && loaded;

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden th-bg">
      <motion.div className="absolute inset-[-3%] w-[106%] h-[106%]"
        animate={{ x: mouse.x * 0.12, y: mouse.y * 0.12 }}
        transition={{ type: 'tween', duration: 2.5, ease: 'easeOut' }}>
        <motion.img src="/images/hero.jpg" alt="" className="w-full h-full object-cover object-[50%_25%]"
          style={{ filter: `brightness(var(--c-img))` }}
          initial={{ scale: 1.08, opacity: 0 }} animate={show ? { scale: 1, opacity: 0.6 } : {}}
          transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }} />
      </motion.div>

      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, var(--c-hero-overlay1), transparent, var(--c-hero-overlay2))` }} />
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 40%, transparent 35%, var(--c-hero-vig) 100%)` }} />

      <div className="relative h-full flex flex-col items-center justify-center px-5">
        <div className="overflow-hidden">
          <motion.h1 initial={{ y: 90 }} animate={show ? { y: 0 } : {}}
            transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[52px] md:text-[80px] lg:text-[100px] font-semibold tracking-[0.2em] md:tracking-[0.28em] th-fg text-center leading-none">LOWKEY</motion.h1>
        </div>
        <div className="overflow-hidden mt-6 md:mt-8">
          <motion.p initial={{ y: 30 }} animate={show ? { y: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="th-gold text-[11px] md:text-[13px] lg:text-[14px] tracking-[0.45em] md:tracking-[0.5em] uppercase text-center font-light">Not Made For All.</motion.p>
        </div>
        <motion.div initial={{ scaleX: 0 }} animate={show ? { scaleX: 1 } : {}}
          transition={{ duration: 1.8, delay: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="mt-12 md:mt-16 w-12 h-[0.5px] origin-center" style={{ background: `linear-gradient(to right, transparent, var(--c-gold2), transparent)` }} />
        <motion.a href="#products" initial={{ opacity: 0, y: 12 }} animate={show ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-8 md:mt-10 group inline-flex items-center gap-3 py-2 px-4 -mx-4 active:scale-95 active:opacity-50 transition-transform duration-150">
          <span className="th-fg3 text-[9px] md:text-[10px] tracking-[0.35em] uppercase group-hover:opacity-100 transition-opacity duration-500">Explore the Collection</span>
        </motion.a>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={show ? { opacity: 1 } : {}} transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-0 left-0 right-0 px-5 md:px-10 lg:px-14 pb-7 md:pb-9 flex items-end justify-between">
        <span className="th-fg4 text-[8px] tracking-[0.3em] uppercase">SS25</span>
        <div className="w-[0.5px] h-7 animate-pulse" style={{ background: `linear-gradient(to bottom, transparent, var(--c-gold3))` }} />
        <span className="th-fg4 text-[8px] tracking-[0.3em] uppercase">Drop 001</span>
      </motion.div>
    </section>
  );
}
