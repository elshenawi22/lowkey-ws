import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function Lookbook() {
  const { ref, isInView } = useInView(0.05);
  const { ref: ref2, isInView: vis2 } = useInView(0.05);

  return (
    <section id="lookbook" className="py-24 md:py-36 lg:py-44 th-bg2">
      <div className="px-5 md:px-10 lg:px-14">
        <div ref={ref} className="mb-14 md:mb-20">
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}
            className="th-gold2 text-[9px] tracking-[0.5em] uppercase mb-3">Lookbook</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[28px] md:text-[36px] lg:text-[44px] font-light tracking-[-0.01em] th-fg">Campaign</motion.h2>
          <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
            className="mt-6 h-[0.5px] origin-left" style={{ background: `linear-gradient(to right, var(--c-gold3), transparent)` }} />
        </div>
        <div ref={ref2} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {[{ src: '/images/lookbook1.jpg', label: 'Look 01' }, { src: '/images/lookbook2.jpg', label: 'Look 02' }].map((look, i) => (
            <motion.div key={look.label} initial={{ opacity: 0, y: 35 }} animate={vis2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }} className="group cursor-pointer tap-sm">
              <div className="aspect-[3/4] overflow-hidden" style={{ background: 'var(--c-bg3)' }}>
                <img src={look.src} alt={look.label}
                  className="w-full h-full object-cover group-hover:scale-[1.03] group-active:opacity-70 transition-all duration-[1s]"
                  style={{ filter: `brightness(var(--c-img))` }} />
              </div>
              <p className="mt-4 th-gold2 text-[9px] tracking-[0.3em] uppercase">{look.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
