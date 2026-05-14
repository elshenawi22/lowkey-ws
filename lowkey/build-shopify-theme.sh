#!/bin/bash
# ============================================
# LOWKEY — Build Shopify Theme Zip
# ============================================
# Run this script to create a ready-to-upload zip file

echo "🖤 Building LOWKEY Shopify Theme..."
echo ""

# Copy images to theme assets
echo "📸 Copying images to theme assets..."
cp public/images/hero.jpg shopify-theme/assets/hero.jpg
cp public/images/hero2.jpg shopify-theme/assets/hero2.jpg
cp public/images/product1.jpg shopify-theme/assets/product1.jpg
cp public/images/product2.jpg shopify-theme/assets/product2.jpg
cp public/images/product3.jpg shopify-theme/assets/product3.jpg
cp public/images/product4.jpg shopify-theme/assets/product4.jpg
cp public/images/texture.jpg shopify-theme/assets/texture.jpg
cp public/images/lookbook1.jpg shopify-theme/assets/lookbook1.jpg
cp public/images/lookbook2.jpg shopify-theme/assets/lookbook2.jpg
cp public/images/drop001.jpg shopify-theme/assets/drop001.jpg
echo "✅ Images copied"

# Create zip
echo ""
echo "📦 Creating zip file..."
cd shopify-theme
zip -r ../LOWKEY-shopify-theme.zip layout/ templates/ sections/ assets/ config/ -x "*.DS_Store"
cd ..

echo ""
echo "✅ Done! Upload LOWKEY-shopify-theme.zip to Shopify:"
echo "   Shopify Admin → Online Store → Themes → Add theme → Upload zip"
echo ""
