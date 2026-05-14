import { motion } from 'framer-motion';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export interface ProductData {
  id: number;
  name: string;
  detail: string;
  price: string;
  priceNum: number;
  image: string;
  description: string;
  specs: string[];
  sizes: string[];
  color: string;
  number: string;
}

export default function ProductPage({ product, onBack }: { product: ProductData; onBack: () => void }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      title: product.name,
      size: selectedSize,
      price: product.priceNum,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="th-bg min-h-screen pt-16">
      {/* Back */}
      <div className="px-5 md:px-10 lg:px-14 py-4">
        <button onClick={onBack} className="flex items-center gap-2 th-fg3 hover:opacity-80 transition-opacity tap">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m7-7l-7 7 7 7" /></svg>
          <span className="text-[9px] tracking-[0.3em] uppercase">Back</span>
        </button>
      </div>

      {/* Main layout */}
      <div className="px-5 md:px-10 lg:px-14 pb-20 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="aspect-[3/4] overflow-hidden" style={{ background: 'var(--c-bg3)' }}
          >
            <img src={product.image} alt={product.name}
              className="w-full h-full object-cover"
              style={{ filter: `brightness(var(--c-img))` }} />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="flex flex-col justify-center py-4 lg:py-8"
          >
            {/* Badge */}
            <p className="th-gold2 text-[8px] tracking-[0.4em] uppercase mb-4">{product.number}</p>

            {/* Name */}
            <h1 className="font-heading text-[28px] md:text-[34px] lg:text-[40px] font-light tracking-[-0.01em] th-fg leading-[1.1]">
              {product.name}
            </h1>

            {/* Price */}
            <p className="th-fg2 font-heading text-[18px] md:text-[20px] tracking-wider mt-3">{product.price}</p>

            {/* Divider */}
            <div className="h-[0.5px] my-6" style={{ background: 'var(--c-line)' }} />

            {/* Description */}
            <p className="th-fg2 text-[12px] md:text-[13px] font-light leading-[2]">{product.description}</p>

            {/* Color */}
            <div className="mt-6">
              <p className="th-gold2 text-[8px] tracking-[0.35em] uppercase mb-2">Color</p>
              <p className="th-fg2 text-[11px] tracking-wider">{product.color}</p>
            </div>

            {/* Size */}
            <div className="mt-6">
              <p className="th-gold2 text-[8px] tracking-[0.35em] uppercase mb-3">Size</p>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((size) => (
                  <button key={size} onClick={() => { setSelectedSize(size); setAdded(false); }}
                    className="px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase border tap"
                    style={{
                      borderColor: selectedSize === size ? 'var(--c-gold)' : 'var(--c-line)',
                      color: selectedSize === size ? 'var(--c-gold)' : 'var(--c-fg3)',
                      background: selectedSize === size ? 'var(--c-gold3)' : 'transparent',
                    }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag */}
            <button
              onClick={handleAdd}
              disabled={!selectedSize}
              className="w-full mt-8 py-4 border text-center tap-sm"
              style={{
                borderColor: added ? 'var(--c-gold)' : selectedSize ? 'var(--c-gold2)' : 'var(--c-line)',
                background: added ? 'var(--c-gold3)' : 'transparent',
                opacity: selectedSize ? 1 : 0.4,
                cursor: selectedSize ? 'pointer' : 'not-allowed',
              }}
            >
              <span className="text-[9px] tracking-[0.4em] uppercase font-light th-gold">
                {added ? 'Added ✓' : selectedSize ? `Add to Bag — ${selectedSize}` : 'Select Size'}
              </span>
            </button>

            {/* Specs */}
            <div className="mt-8">
              <p className="th-gold2 text-[8px] tracking-[0.35em] uppercase mb-3">Details</p>
              {product.specs.map((spec) => (
                <div key={spec} className="py-2.5 flex items-center gap-2 border-b" style={{ borderColor: 'var(--c-gold3)' }}>
                  <span className="w-1 h-1 rounded-full" style={{ background: 'var(--c-gold2)' }} />
                  <span className="th-fg2 text-[10px] tracking-wider font-light">{spec}</span>
                </div>
              ))}
            </div>

            <p className="th-fg4 text-[8px] tracking-[0.25em] uppercase mt-6">Free Worldwide Shipping</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
