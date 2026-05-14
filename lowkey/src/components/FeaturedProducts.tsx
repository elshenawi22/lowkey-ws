import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { useState } from 'react';
import { featuredProducts, Product } from '../data/products';

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const { ref, isInView } = useInView(0.04);
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="block group cursor-pointer tap-sm" onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative aspect-[3/4] overflow-hidden" style={{ background: 'var(--c-bg3)' }}>
        <motion.img src={product.image} alt={product.name} className="w-full h-full object-cover will-change-transform"
          style={{ filter: `brightness(var(--c-img))` }}
          animate={{ scale: hovered ? 1.05 : 1, opacity: hovered ? 0.8 : 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }} />
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
          animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.4 }}>
          <span className="text-white/90 text-[10px] tracking-[0.4em] uppercase" style={{ transform: hovered ? 'none' : 'translateY(8px)', transition: 'transform 0.4s' }}>View Piece</span>
          <div className="w-8 h-[0.5px] origin-center" style={{ background: 'var(--c-inv-gold)', transform: hovered ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform 0.5s' }} />
        </motion.div>
      </div>
      <div className="mt-4 md:mt-5">
        <h3 className="font-heading text-[14px] md:text-[15px] font-medium tracking-[0.02em] th-inv-fg">{product.name}</h3>
        <p className="th-inv-fg2 text-[9px] tracking-[0.15em] mt-1">{product.detail}</p>
      </div>
    </motion.div>
  );
}

export default function FeaturedProducts({ onViewAll, onProductClick }: { onViewAll?: () => void; onProductClick?: (p: Product) => void }) {
  const { ref, isInView } = useInView(0.08);
  return (
    <section id="products" className="py-24 md:py-36 lg:py-44 th-inv-bg">
      <div ref={ref} className="px-5 md:px-10 lg:px-14 mb-12 md:mb-16">
        <div className="flex items-end justify-between">
          <div>
            <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8 }}
              className="th-inv-fg2 text-[9px] tracking-[0.5em] uppercase mb-3">Collection</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[30px] md:text-[38px] lg:text-[46px] font-light tracking-[-0.01em] th-inv-fg">Essentials</motion.h2>
          </div>
          <button onClick={onViewAll} className="hidden md:inline-flex items-center gap-3 group pb-1 tap">
            <span className="th-inv-fg2 text-[9px] tracking-[0.3em] uppercase group-hover:opacity-70 transition-opacity duration-500">View All</span>
            <span className="w-5 h-[0.5px] group-hover:w-9 transition-all duration-500" style={{ background: 'var(--c-inv-gold)' }} />
          </button>
        </div>
        <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.12, ease: [0.76, 0, 0.24, 1] }}
          className="mt-6 h-[0.5px] origin-left" style={{ background: `linear-gradient(to right, var(--c-inv-line), transparent)` }} />
      </div>
      <div className="px-5 md:px-10 lg:px-14">
        <div className="flex gap-4 overflow-x-auto scroll-hide pb-4 snap-x snap-mandatory md:hidden -mx-5 px-5">
          {featuredProducts.map((p, i) => (<div key={p.id} className="snap-start flex-shrink-0 w-[70vw]"><ProductCard product={p} index={i} onClick={() => onProductClick?.(p)} /></div>))}
        </div>
        <div className="hidden md:grid md:grid-cols-4 gap-5 lg:gap-7">
          {featuredProducts.map((p, i) => (<ProductCard key={p.id} product={p} index={i} onClick={() => onProductClick?.(p)} />))}
        </div>
      </div>
      <div className="md:hidden px-5 mt-8">
        <button onClick={onViewAll} className="w-full group flex items-center justify-center gap-3 py-4 border th-inv-line tap">
          <span className="th-inv-fg2 text-[9px] tracking-[0.35em] uppercase group-hover:opacity-70 transition-opacity duration-500">View All Pieces</span>
        </button>
      </div>
    </section>
  );
}
