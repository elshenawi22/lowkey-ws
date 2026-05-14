import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function Philosophy() {
  const { ref, isInView } = useInView(0.15);
  return (
    <section id="philosophy" className="py-32 md:py-44 lg:py-56 th-inv-bg">
      <div ref={ref} className="px-5 md:px-10 lg:px-14 max-w-xl mx-auto text-center">
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className="w-8 h-[0.5px] mx-auto mb-16 md:mb-20 origin-center" style={{ background: `linear-gradient(to right, transparent, var(--c-inv-gold), transparent)` }} />
        <motion.p initial={{ opacity: 0, y: 16 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[20px] md:text-[26px] lg:text-[32px] font-light leading-[1.8] tracking-[0.02em] th-inv-fg" style={{ opacity: 0.65 }}>
          LOWKEY is built around quiet identity and understated presence.
        </motion.p>
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="w-8 h-[0.5px] mx-auto mt-16 md:mt-20 origin-center" style={{ background: `linear-gradient(to right, transparent, var(--c-inv-gold), transparent)` }} />
      </div>
    </section>
  );
}
