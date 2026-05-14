import { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CartDrawer from './components/CartDrawer';
import Hero from './components/Hero';
import Statement from './components/Statement';
import FeaturedProducts from './components/FeaturedProducts';
import TextureGallery from './components/TextureGallery';
import Lookbook from './components/Lookbook';
import Philosophy from './components/Philosophy';
import Drop001 from './components/Drop001';
import Marquee from './components/Marquee';
import Footer from './components/Footer';
import DropPage from './pages/DropPage';
import ProductPage from './pages/ProductPage';
import { Product } from './data/products';

type Page = { type: 'home' } | { type: 'drop' } | { type: 'product'; product: Product };

export default function App() {
  const [ready, setReady] = useState(false);
  const [page, setPage] = useState<Page>({ type: 'home' });
  const onComplete = useCallback(() => setReady(true), []);

  const go = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (p.type !== 'home') window.history.pushState({}, '', p.type === 'drop' ? '#drop-001' : `#product-${(p as any).product.id}`);
  }, []);

  const goHome = useCallback(() => {
    setPage({ type: 'home' });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    if (window.location.hash) window.history.pushState({}, '', '/');
  }, []);

  useEffect(() => {
    const h = () => { if (page.type !== 'home') setPage({ type: 'home' }); };
    window.addEventListener('popstate', h);
    return () => window.removeEventListener('popstate', h);
  }, [page]);

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="grain th-bg min-h-screen">
          <Preloader onComplete={onComplete} />
          <Navbar ready={ready} />
          <CartDrawer />

          {page.type === 'home' && (
            <>
              <Hero ready={ready} />
              <Statement />
              <FeaturedProducts onViewAll={() => go({ type: 'drop' })} onProductClick={(p) => go({ type: 'product', product: p })} />
              <TextureGallery />
              <Lookbook />
              <Philosophy />
              <Drop001 onEnter={() => go({ type: 'drop' })} />
              <Marquee />
              <Footer />
            </>
          )}

          {page.type === 'drop' && (
            <>
              <DropPage onBack={goHome} onProductClick={(p) => go({ type: 'product', product: p })} />
              <Footer />
            </>
          )}

          {page.type === 'product' && (
            <>
              <ProductPage product={page.product} onBack={() => window.history.back()} />
              <Footer />
            </>
          )}
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
