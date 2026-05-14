import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { allProducts, Product } from '../data/products';

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const { ref, isInView } = useInView(0.04);

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group cursor-pointer tap-sm" onClick={onClick}>
      <div className="relative aspect-[3/4] overflow-hidden" style={{ background: 'var(--c-bg3)' }}>
        <img src={product.image} alt={product.name}
          className="w-full h-full object-cover group-hover:opacity-75 group-hover:scale-[1.04] transition-all duration-[1.2s]"
          style={{ filter: `brightness(var(--c-img))` }} />
        <div className="absolute top-4 left-4"><span className="th-gold2 text-[8px] tracking-[0.3em] uppercase font-mono">{String(index + 1).padStart(2, '0')}/08</span></div>
        <div className="absolute top-4 right-4"><span className="th-fg3 text-[8px] tracking-[0.25em] uppercase px-2.5 py-1" style={{ background: 'var(--c-bg)', opacity: 0.7 }}>{product.number}</span></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="th-fg text-[10px] tracking-[0.4em] uppercase" style={{ opacity: 0.8 }}>View</span>
        </div>
      </div>
      <div className="mt-4 md:mt-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-heading text-[14px] md:text-[16px] font-medium tracking-[0.02em] th-fg">{product.name}</h3>
            <p className="th-gold2 text-[9px] tracking-[0.15em] mt-1">{product.detail}</p>
          </div>
          <span className="th-fg2 text-[13px] font-light tracking-wider font-heading">{product.price}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function DropPage({ onBack, onProductClick }: { onBack: () => void; onProductClick: (p: Product) => void }) {
  const { ref: headerRef, isInView: headerVis } = useInView(0.1);
  const { ref: gridRef } = useInView(0.02);

  return (
    <div className="th-bg min-h-screen">
      {/* Hero */}
      <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <motion.img src="/images/drop001.jpg" alt="Drop 001" className="w-full h-full object-cover"
          style={{ filter: `brightness(var(--c-img))` }}
          initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--c-bg), transparent 50%, var(--c-bg) 100%)`, opacity: 0.6 }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}
            className="th-gold text-[9px] tracking-[0.5em] uppercase mb-4">Limited Collection</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light tracking-[-0.02em] th-fg">
            Drop <span className="th-gold">001</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }}
            className="mt-4 th-fg3 text-[10px] md:text-[11px] tracking-[0.35em] uppercase font-light">08 Pieces — 200 Units Each — SS25</motion.p>
        </div>
        <motion.button onClick={onBack} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="absolute top-20 left-5 md:left-10 lg:left-14 flex items-center gap-2 th-fg3 hover:opacity-80 transition-opacity duration-500 z-10 tap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" /></svg>
          <span className="text-[9px] tracking-[0.3em] uppercase">Back</span>
        </motion.button>
      </div>

      {/* Description */}
      <div ref={headerRef} className="px-5 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.div initial={{ scaleX: 0 }} animate={headerVis ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="w-8 h-[0.5px] mb-8 origin-left" style={{ background: `linear-gradient(to right, var(--c-gold2), transparent)` }} />
          <motion.p initial={{ opacity: 0, y: 15 }} animate={headerVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.1 }}
            className="th-fg2 text-[13px] md:text-[15px] font-light leading-[2.2] mb-6">
            The inaugural collection. Eight essential pieces designed to strip away excess and return to what matters — fit, fabric, and feeling.</motion.p>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={headerVis ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, delay: 0.2 }}
            className="th-fg3 text-[11px] md:text-[12px] font-light leading-[2]">
            Each garment is numbered and limited to 200 units per style. No restocks. No exceptions.</motion.p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 md:px-10 lg:px-14 pb-16 md:pb-20">
        <div className="grid grid-cols-4 gap-2 md:gap-3 max-w-2xl">
          {[{ n:'08', l:'Pieces' }, { n:'200', l:'Per Style' }, { n:'400', l:'GSM' }, { n:'01', l:'Drop' }].map((s) => (
            <div key={s.l} className="text-center py-4 md:py-5 border" style={{ borderColor: 'var(--c-gold3)' }}>
              <span className="font-heading text-[18px] md:text-[22px] font-light th-gold block mb-1 tracking-tight">{s.n}</span>
              <span className="th-fg4 text-[7px] tracking-[0.35em] uppercase">{s.l}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-5 md:mx-10 lg:mx-14 h-[0.5px]" style={{ background: `linear-gradient(to right, var(--c-gold3), transparent)` }} />

      {/* Products header */}
      <div className="px-5 md:px-10 lg:px-14 pt-16 md:pt-24 pb-10 md:pb-14">
        <p className="th-gold2 text-[9px] tracking-[0.5em] uppercase mb-3">All Pieces</p>
        <h2 className="font-heading text-[26px] md:text-[34px] lg:text-[40px] font-light tracking-[-0.01em] th-fg">The Collection</h2>
      </div>

      {/* Product grid — each card clickable → opens product page */}
      <div ref={gridRef} className="px-5 md:px-10 lg:px-14 pb-24 md:pb-36">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
          {allProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onClick={() => onProductClick(p)} />
          ))}
        </div>
      </div>

      {/* Bottom quote */}
      <div className="px-5 md:px-10 lg:px-14 pb-20 md:pb-28">
        <div className="max-w-md mx-auto text-center">
          <div className="w-6 h-[0.5px] mx-auto mb-8" style={{ background: `linear-gradient(to right, transparent, var(--c-gold2), transparent)` }} />
          <p className="th-fg3 text-[12px] md:text-[14px] font-heading font-light leading-[1.9] tracking-wide italic">"Less noise. More intention."</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className="w-3 h-[0.5px]" style={{ background: 'var(--c-gold3)' }} />
            <span className="th-gold2 text-[8px] tracking-[0.4em] uppercase">LOWKEY</span>
            <span className="w-3 h-[0.5px]" style={{ background: 'var(--c-gold3)' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
