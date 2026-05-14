import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, cartCount, cartTotal, isCartOpen, closeCart, removeItem, updateQty } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart} className="fixed inset-0 z-[200]" style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[201] flex flex-col th-bg" style={{ borderLeft: '1px solid var(--c-line)' }}>
            
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: '1px solid var(--c-line)' }}>
              <h2 className="font-heading text-[14px] font-medium tracking-[0.2em] th-fg">BAG ({cartCount})</h2>
              <button onClick={closeCart} className="th-fg3 hover:opacity-80 transition-opacity tap-xs">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="th-fg3 text-[11px] tracking-[0.3em] uppercase mb-4">Your bag is empty</p>
                  <button onClick={closeCart} className="th-gold text-[10px] tracking-[0.3em] uppercase hover:opacity-80 transition-opacity tap">Continue Shopping</button>
                </div>
              ) : (
                <div className="space-y-5">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-[72px] h-[90px] overflow-hidden flex-shrink-0 th-bg2">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5">
                        <div>
                          <h3 className="font-heading text-[12px] th-fg tracking-[0.02em]">{item.title}</h3>
                          <p className="th-fg3 text-[9px] tracking-wider mt-0.5">Size: {item.size}</p>
                        </div>
                        <div className="flex items-end justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="th-fg3 text-[14px] leading-none tap hover:opacity-80 w-5 h-5 flex items-center justify-center">−</button>
                            <span className="th-fg2 text-[10px] tracking-wider w-4 text-center">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="th-fg3 text-[14px] leading-none tap hover:opacity-80 w-5 h-5 flex items-center justify-center">+</button>
                          </div>
                          <p className="th-fg2 text-[11px] font-light">€{(item.price * item.quantity).toFixed(0)}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="th-fg4 text-[8px] tracking-[0.2em] uppercase hover:opacity-80 transition-opacity tap mt-1 self-start">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: '1px solid var(--c-line)' }}>
                <div className="flex items-center justify-between mb-5">
                  <span className="th-fg3 text-[9px] tracking-[0.3em] uppercase">Total</span>
                  <span className="th-fg font-heading text-[15px] tracking-wider">€{cartTotal}</span>
                </div>
                <button className="w-full py-4 text-center th-inv-bg th-inv-fg hover:opacity-90 transition-opacity tap-sm">
                  <span className="text-[9px] tracking-[0.35em] uppercase font-medium">Checkout</span>
                </button>
                <p className="th-fg4 text-[8px] tracking-[0.2em] uppercase text-center mt-3">Free Worldwide Shipping</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
