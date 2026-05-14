# LOWKEY × Shopify Integration Guide

This website is built with React and designed to work with Shopify as a **headless storefront**.

---

## 🚀 How It Works

1. **This site** handles the frontend (design, branding, product display)
2. **Shopify** handles the backend (inventory, payments, shipping, orders)
3. When a customer clicks "Checkout", they're redirected to Shopify's secure checkout

---

## 📦 Setup Instructions

### Step 1: Create Shopify Storefront Access

1. Go to your Shopify Admin → **Settings** → **Apps and sales channels**
2. Click **Develop apps** → **Create an app**
3. Name it "LOWKEY Headless Storefront"
4. Go to **Configuration** → **Storefront API scopes**
5. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_checkouts`
6. Click **Save** → **Install app**
7. Go to **API credentials** and copy:
   - **Storefront API access token**

### Step 2: Configure This Site

Open `src/lib/shopify.ts` and replace:

```typescript
const SHOPIFY_DOMAIN = 'your-store.myshopify.com';  // ← Your store URL
const SHOPIFY_STOREFRONT_TOKEN = 'your-token-here'; // ← Your token
```

### Step 3: Add Products to Shopify

In your Shopify admin, create products with these **handles** (URL slugs) to match the site:
- `essential-hoodie`
- `washed-tee`
- `cargo-pant`
- `bomber-jacket`

Or update `src/components/FeaturedProducts.tsx` to use your product handles.

### Step 4: Deploy the Site

**Option A: Vercel (Recommended)**
```bash
npm i -g vercel
vercel
```

**Option B: Netlify**
```bash
npm run build
# Upload the `dist` folder to Netlify
```

**Option C: Any Static Host**
```bash
npm run build
# Upload the `dist` folder
```

---

## 🛒 Connecting Products

To fetch real products from Shopify instead of static data:

```typescript
import { fetchProducts } from './lib/shopify';

// In your component:
const [products, setProducts] = useState([]);

useEffect(() => {
  fetchProducts().then(setProducts);
}, []);
```

---

## 💳 Checkout Flow

1. Customer adds item → Stored in Shopify Checkout
2. Customer clicks "Checkout" → Redirected to `checkout.shopify.com`
3. Customer completes payment on Shopify's secure page
4. Order appears in your Shopify admin

---

## 🔧 Environment Variables (Optional)

For production, use environment variables instead of hardcoding:

```bash
# .env
VITE_SHOPIFY_DOMAIN=your-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_TOKEN=your-token
```

```typescript
// src/lib/shopify.ts
const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN;
const SHOPIFY_STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;
```

---

## ❓ FAQ

**Q: Why not a traditional Shopify theme?**
A: Shopify themes use Liquid templating. This React site offers more design control and a premium user experience that's difficult to achieve with standard themes.

**Q: Is it secure?**
A: Yes. Payments are handled 100% by Shopify's checkout. This site never touches payment data.

**Q: Can I use my existing Shopify store?**
A: Yes! Just connect it using the Storefront API credentials.

---

## 📁 File Structure

```
src/
├── lib/
│   └── shopify.ts        # Shopify API client
├── context/
│   └── CartContext.tsx   # Cart state management
├── components/
│   ├── CartDrawer.tsx    # Slide-out cart
│   ├── Navbar.tsx        # Navigation with cart count
│   └── ...               # Other components
└── App.tsx               # Main app with CartProvider
```

---

## 🎨 Customization

- **Colors**: Edit `src/index.css` (Tailwind theme)
- **Products**: Edit `src/components/FeaturedProducts.tsx`
- **Copy**: Edit individual component files
- **Images**: Replace files in `public/images/`

---

## Need Help?

This is a headless Shopify setup. For Shopify-specific questions, refer to:
- [Shopify Storefront API Docs](https://shopify.dev/api/storefront)
- [Shopify Buy SDK](https://github.com/Shopify/js-buy-sdk)
