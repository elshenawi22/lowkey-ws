# 🚀 LOWKEY — Deployment Guide

---

## Quick Deploy to Vercel (Recommended)

1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Click Deploy

**That's it!** Your site will be live at `your-project.vercel.app`

---

## Deploy to Netlify

1. Run `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag & drop the `dist` folder
4. Done!

---

## Connect to Shopify

After deploying, edit `src/lib/shopify.ts`:

```typescript
const SHOPIFY_DOMAIN = 'your-store.myshopify.com';
const SHOPIFY_STOREFRONT_TOKEN = 'your-storefront-access-token';
```

See `SHOPIFY_SETUP.md` for detailed instructions.

---

## Custom Domain

Both Vercel and Netlify support custom domains. Point your domain to your deployment and you're live.

---

## 📁 What's Included

- ✅ Premium streetwear website design
- ✅ Shopify Buy SDK integration
- ✅ Cart drawer functionality
- ✅ Checkout redirect to Shopify
- ✅ Mobile-first responsive design
- ✅ Smooth animations (Framer Motion)
- ✅ Image gallery with parallax
- ✅ Film grain texture overlay

---

## Need a Zip File?

Run:
```bash
npm run build
```

Then zip the `dist` folder and upload to any static host.
