import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'exit' | 'done'>('loading');
  useEffect(() => { const i = setInterval(() => { setProgress((p) => { if (p >= 100) { clearInterval(i); return 100; } return Math.min(p + (p < 40 ? 2 : p < 80 ? 3 : 5), 100); }); }, 35); return () => clearInterval(i); }, []);
  useEffect(() => { if (progress === 100) { setTimeout(() => setPhase('exit'), 500); setTimeout(() => { setPhase('done'); onComplete(); }, 1300); } }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center th-bg"
          exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}>
          <div className="flex flex-col items-center">
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-[14px] md:text-[16px] font-semibold tracking-[0.5em] th-fg mb-4">LOWKEY</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className="th-gold text-[8px] tracking-[0.5em] uppercase mb-8" style={{ opacity: 0.4 }}>Not Made For All.</motion.p>
            <div className="w-28 md:w-36 h-[0.5px] relative overflow-hidden" style={{ background: 'var(--c-line)' }}>
              <motion.div className="h-full absolute left-0 top-0" style={{ width: `${progress}%`, background: `linear-gradient(to right, var(--c-gold2), var(--c-gold))` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
