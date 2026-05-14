import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';

export default function Drop001({ onEnter }: { onEnter?: () => void }) {
  const { ref: headerRef, isInView } = useInView(0.08);
  const { ref: contentRef, isInView: contentVis } = useInView(0.05);
  const [ctaClicked, setCtaClicked] = useState(false);
  const handleCtaClick = () => { setCtaClicked(true); setTimeout(() => { setCtaClicked(false); if (onEnter) onEnter(); }, 400); };

  return (
    <section id="drop" className="th-bg overflow-hidden relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-heading text-[35vw] md:text-[24vw] font-bold tracking-tighter" style={{ color: 'var(--c-gold3)' }}>001</span>
      </div>

      <div className="py-24 md:py-36 lg:py-44 relative">
        <div className="px-5 md:px-10 lg:px-14">
          <div ref={headerRef} className="mb-14 md:mb-20">
            <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}
              className="th-gold2 text-[9px] tracking-[0.5em] uppercase mb-3">Latest Release</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[32px] md:text-[44px] lg:text-[56px] font-light tracking-[-0.02em] th-fg leading-[1]">
              Drop <span className="th-gold">001</span></motion.h2>
            <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="mt-6 h-[0.5px] origin-left" style={{ background: `linear-gradient(to right, var(--c-gold3), transparent)` }} />
          </div>

          <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={contentVis ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] overflow-hidden cursor-pointer group tap-sm" style={{ background: 'var(--c-bg3)' }}>
                <img src="/images/drop001.jpg" alt="Drop 001"
                  className="w-full h-full object-cover group-hover:scale-[1.02] group-active:opacity-70 transition-all duration-[1.2s]"
                  style={{ filter: `brightness(var(--c-img))` }} />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--c-bg), transparent 50%)`, opacity: 0.4 }} />
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10">
                  <p className="font-heading text-[16px] md:text-[22px] th-fg2 font-light tracking-wide leading-[1.4]">"Less noise.<br />More intention."</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5 flex flex-col justify-between gap-10 lg:gap-0 lg:py-4">
              <motion.p initial={{ opacity: 0, y: 15 }} animate={contentVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, delay: 0.15 }}
                className="th-fg2 text-[12px] md:text-[13px] font-light leading-[2.2] max-w-sm">
                Eight essential pieces. Stripped of excess. Built around fit, fabric, and feeling. Each garment is numbered. Limited to 200 units.</motion.p>

              <motion.div initial={{ opacity: 0 }} animate={contentVis ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.35 }}
                className="grid grid-cols-3 gap-3">
                {[{ n: '08', l: 'Pieces' }, { n: '200', l: 'Per Style' }, { n: '01', l: 'Drop' }].map((s) => (
                  <div key={s.l} className="text-center py-6 border hover:opacity-80 transition-opacity duration-500" style={{ borderColor: 'var(--c-gold3)' }}>
                    <span className="font-heading text-[22px] md:text-[26px] font-light th-gold block mb-2 tracking-tight">{s.n}</span>
                    <span className="th-fg4 text-[7px] md:text-[8px] tracking-[0.35em] uppercase">{s.l}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={contentVis ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.55 }}>
                <button onClick={handleCtaClick}
                  className="w-full block border py-5 text-center tap-sm hover:opacity-90 transition-opacity duration-500"
                  style={{ borderColor: ctaClicked ? 'var(--c-gold)' : 'var(--c-gold3)', background: ctaClicked ? 'var(--c-gold3)' : 'transparent' }}>
                  <span className="text-[9px] tracking-[0.4em] uppercase font-light th-gold">
                    {ctaClicked ? 'Coming Soon →' : 'Enter Drop 001'}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
