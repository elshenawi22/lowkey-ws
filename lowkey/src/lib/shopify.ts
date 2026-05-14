import Client from 'shopify-buy';

/*
 * ============================================
 * SHOPIFY CONFIGURATION
 * ============================================
 * 
 * To connect this site to your Shopify store:
 * 
 * 1. Go to your Shopify Admin → Settings → Apps and sales channels
 * 2. Click "Develop apps" → "Create an app"
 * 3. Configure Storefront API scopes:
 *    - unauthenticated_read_product_listings
 *    - unauthenticated_read_product_inventory
 *    - unauthenticated_read_checkouts
 *    - unauthenticated_write_checkouts
 * 4. Install the app and copy:
 *    - Storefront API access token
 *    - Your store domain (e.g., your-store.myshopify.com)
 * 
 * 5. Replace the values below with your credentials
 */

const SHOPIFY_DOMAIN = 'your-store.myshopify.com'; // ← Replace with your store
const SHOPIFY_STOREFRONT_TOKEN = 'your-storefront-access-token'; // ← Replace with your token

// Initialize Shopify client
export const shopifyClient = Client.buildClient({
  domain: SHOPIFY_DOMAIN,
  storefrontAccessToken: SHOPIFY_STOREFRONT_TOKEN,
  apiVersion: '2024-01',
});

// Types
export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { src: string }[];
  variants: { id: string; price: { amount: string; currencyCode: string } }[];
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  variant: {
    id: string;
    price: { amount: string; currencyCode: string };
    image: { src: string };
  };
}

// Fetch all products
export async function fetchProducts(): Promise<ShopifyProduct[]> {
  try {
    const products = await shopifyClient.product.fetchAll();
    return products as unknown as ShopifyProduct[];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch single product by handle
export async function fetchProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const product = await shopifyClient.product.fetchByHandle(handle);
    return product as unknown as ShopifyProduct;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Create checkout
export async function createCheckout() {
  try {
    const checkout = await shopifyClient.checkout.create();
    return checkout;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
}

// Add item to checkout
export async function addToCheckout(checkoutId: string, variantId: string, quantity: number = 1) {
  try {
    const lineItemsToAdd = [{ variantId, quantity }];
    const checkout = await shopifyClient.checkout.addLineItems(checkoutId, lineItemsToAdd);
    return checkout;
  } catch (error) {
    console.error('Error adding to checkout:', error);
    return null;
  }
}

// Remove item from checkout
export async function removeFromCheckout(checkoutId: string, lineItemId: string) {
  try {
    const checkout = await shopifyClient.checkout.removeLineItems(checkoutId, [lineItemId]);
    return checkout;
  } catch (error) {
    console.error('Error removing from checkout:', error);
    return null;
  }
}

// Update item quantity
export async function updateCheckoutItem(checkoutId: string, lineItemId: string, quantity: number) {
  try {
    const lineItemsToUpdate = [{ id: lineItemId, quantity }];
    const checkout = await shopifyClient.checkout.updateLineItems(checkoutId, lineItemsToUpdate);
    return checkout;
  } catch (error) {
    console.error('Error updating checkout:', error);
    return null;
  }
}

// Get checkout URL (redirects to Shopify checkout)
export function getCheckoutUrl(checkout: any): string {
  return checkout?.webUrl || '';
}
