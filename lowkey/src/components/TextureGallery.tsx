import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';

export default function TextureGallery() {
  const { ref, isInView } = useInView(0.05);
  const { ref: ref2, isInView: vis2 } = useInView(0.05);
  const { ref: ref3, isInView: vis3 } = useInView(0.08);

  return (
    <section className="th-bg overflow-hidden">
      <div ref={ref} className="relative overflow-hidden">
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 1.5 }}
          className="aspect-[16/7] md:aspect-[21/9] overflow-hidden">
          <img src="/images/texture.jpg" alt="Fabric" className="w-full h-full object-cover animate-slow-drift" style={{ filter: `brightness(var(--c-img))` }} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--c-bg), transparent 50%, var(--c-bg) 100%)`, opacity: 0.5 }} />
        <div className="absolute bottom-6 left-5 md:bottom-10 md:left-10 lg:left-14">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
            className="th-gold text-[9px] tracking-[0.4em] uppercase">400gsm Heavyweight Cotton</motion.p>
        </div>
      </div>

      <div className="px-5 md:px-10 lg:px-14 pt-16 md:pt-24 pb-12 md:pb-16">
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading text-[28px] md:text-[36px] lg:text-[44px] font-light tracking-[-0.01em] th-fg">Built to Last.</motion.h2>
      </div>

      <div ref={ref2} className="px-5 md:px-10 lg:px-14 pb-8 md:pb-12">
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {[{ src: '/images/texture.jpg', label: 'Weave', scale: '1.6', pos: '30% 60%' },
            { src: '/images/product1.jpg', label: 'Fold', scale: '1.8', pos: '40% 35%' },
            { src: '/images/product2.jpg', label: 'Rib', scale: '2', pos: '50% 70%' },
          ].map((shot, i) => (
            <motion.div key={shot.label} initial={{ opacity: 0, y: 25 }} animate={vis2 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-square overflow-hidden group" style={{ background: 'var(--c-bg3)' }}>
              <img src={shot.src} alt={shot.label}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-[1.5s]"
                style={{ transform: `scale(${shot.scale})`, objectPosition: shot.pos, filter: `brightness(var(--c-img))` }} />
              <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                <p className="th-gold2 text-[8px] tracking-[0.3em] uppercase">{shot.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div ref={ref3} className="px-5 md:px-10 lg:px-14 pb-24 md:pb-36 pt-4">
        <motion.div initial={{ opacity: 0 }} animate={vis3 ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4">
          {[{ k: 'Weight', v: '400gsm' }, { k: 'Process', v: 'Garment-Dyed' }, { k: 'Origin', v: 'Designed in Port Said' }, { k: 'Fit', v: 'Relaxed Oversized' }].map((s, i) => (
            <motion.div key={s.k} initial={{ opacity: 0, y: 12 }} animate={vis3 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.07 }}
              className="py-5 md:py-6 border-t px-1 group hover:opacity-80 transition-all duration-700" style={{ borderColor: 'var(--c-gold3)' }}>
              <p className="th-gold2 text-[8px] tracking-[0.35em] uppercase mb-2">{s.k}</p>
              <p className="th-fg2 text-[11px] font-light tracking-wider">{s.v}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
