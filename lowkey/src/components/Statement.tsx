import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function Statement() {
  const { ref, isInView } = useInView(0.2);
  return (
    <section className="py-32 md:py-44 lg:py-56 th-bg2">
      <div ref={ref} className="px-5 md:px-10 lg:px-14 text-center">
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="w-6 h-[0.5px] mx-auto mb-10 md:mb-12 origin-center" style={{ background: `linear-gradient(to right, transparent, var(--c-gold2), transparent)` }} />
        <motion.p initial={{ opacity: 0, y: 12 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[14px] md:text-[16px] font-semibold tracking-[0.5em] th-fg">LOWKEY</motion.p>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 th-gold text-[10px] md:text-[11px] tracking-[0.5em] uppercase font-light">Not Made For All.</motion.p>
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
          className="w-6 h-[0.5px] mx-auto mt-10 md:mt-12 origin-center" style={{ background: `linear-gradient(to right, transparent, var(--c-gold2), transparent)` }} />
      </div>
    </section>
  );
}
