// Cart state management for the eCommerce store
import type { CartItem } from '../types/ecommerce.js';
import { mockProducts, mockVariants } from '../utils/mock-data.js';

// Local interface for cart since the main one is commented out
interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  total: number;
  itemCount: number;
}

export class CartManager {
  private cartKey = 'ecommerce-cart';

  // Get cart from localStorage or create new empty cart
  getCart(): Cart {
    if (typeof window === 'undefined') {
      return this.createEmptyCart();
    }

    try {
      const cartData = localStorage.getItem(this.cartKey);
      if (cartData) {
        const cart = JSON.parse(cartData);
        // Ensure dates are properly parsed
        cart.createdAt = new Date(cart.createdAt);
        cart.updatedAt = new Date(cart.updatedAt);
        cart.items = cart.items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        return cart;
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }

    return this.createEmptyCart();
  }

  // Save cart to localStorage
  private saveCart(cart: Cart): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
    }
  }

  // Create empty cart
  private createEmptyCart(): Cart {
    return {
      id: 'cart-' + Date.now(),
      sessionId: 'session-' + Date.now(),
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      total: 0,
      itemCount: 0
    };
  }

  // Add item to cart
  addItem(productId: string, variantId: string, quantity: number = 1): Cart {
    const cart = this.getCart();
    const product = mockProducts.find(p => p.id === productId);
    const variant = mockVariants.find(v => v.id === variantId);

    if (!product || !variant) {
      throw new Error('Product or variant not found');
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.variantId === variantId
    );

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const newItem: CartItem = {
        id: 'cartitem-' + Date.now(),
        productId,
        variantId,
        quantity,
        product,
        variant,
        addedAt: new Date()
      };
      cart.items.push(newItem);
    }

    cart.updatedAt = new Date();
    this.updateCartTotals(cart);
    this.saveCart(cart);

    return cart;
  }

  // Update item quantity
  updateItemQuantity(variantId: string, quantity: number): Cart {
    const cart = this.getCart();
    const itemIndex = cart.items.findIndex(item => item.variantId === variantId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }

      cart.updatedAt = new Date();
      this.updateCartTotals(cart);
      this.saveCart(cart);
    }

    return cart;
  }

  // Remove item from cart
  removeItem(variantId: string): Cart {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.variantId !== variantId);

    cart.updatedAt = new Date();
    this.updateCartTotals(cart);
    this.saveCart(cart);

    return cart;
  }

  // Clear entire cart
  clearCart(): Cart {
    const emptyCart = this.createEmptyCart();
    this.saveCart(emptyCart);
    return emptyCart;
  }

  // Update cart totals
  private updateCartTotals(cart: Cart): void {
    cart.total = cart.items.reduce((sum, item) => {
      const price = item.variant.price || item.product.salePrice || item.product.price;
      return sum + (price * item.quantity);
    }, 0);

    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Calculate cart subtotal
  getSubtotal(cart: Cart): number {
    return cart.items.reduce((sum, item) => {
      const price = item.variant.price || item.product.salePrice || item.product.price;
      return sum + (price * item.quantity);
    }, 0);
  }

  // Calculate cart tax (mock 8.25% tax rate)
  getTax(cart: Cart): number {
    return this.getSubtotal(cart) * 0.0825;
  }

  // Calculate shipping (free over $50, otherwise $9.99)
  getShipping(cart: Cart): number {
    const subtotal = this.getSubtotal(cart);
    return subtotal >= 50 ? 0 : 9.99;
  }

  // Calculate final total
  getTotal(cart: Cart): number {
    const subtotal = this.getSubtotal(cart);
    const tax = this.getTax(cart);
    const shipping = this.getShipping(cart);
    return subtotal + tax + shipping;
  }
}

// Singleton instance
export const cartManager = new CartManager();
