// Wishlist management store
import { nanoid } from 'nanoid';
import type { Product } from '../types/ecommerce.js';

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: Date;
}

class WishlistManager {
  private readonly STORAGE_KEY = 'fashionhub_wishlist';

  // Get wishlist
  getWishlist(): WishlistItem[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const items = JSON.parse(data);
        return items.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
      }
    } catch (error) {
      console.error('Error reading wishlist:', error);
    }

    return [];
  }

  // Check if product is in wishlist
  isInWishlist(productId: string): boolean {
    const wishlist = this.getWishlist();
    return wishlist.some(item => item.product.id === productId);
  }

  // Add to wishlist
  addToWishlist(product: Product): { success: boolean; error?: string } {
    try {
      const wishlist = this.getWishlist();

      // Check if already in wishlist
      if (this.isInWishlist(product.id)) {
        return { success: false, error: 'Product already in wishlist' };
      }

      // Add item
      const item: WishlistItem = {
        id: nanoid(),
        product,
        addedAt: new Date()
      };

      wishlist.push(item);

      // Save to storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));

      // Dispatch event
      this.dispatchWishlistEvent();

      return { success: true };
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      return { success: false, error: 'Failed to add to wishlist' };
    }
  }

  // Remove from wishlist
  removeFromWishlist(productId: string): { success: boolean } {
    try {
      let wishlist = this.getWishlist();
      wishlist = wishlist.filter(item => item.product.id !== productId);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wishlist));
      this.dispatchWishlistEvent();

      return { success: true };
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      return { success: false };
    }
  }

  // Toggle wishlist
  toggleWishlist(product: Product): { success: boolean; added: boolean } {
    if (this.isInWishlist(product.id)) {
      this.removeFromWishlist(product.id);
      return { success: true, added: false };
    } else {
      this.addToWishlist(product);
      return { success: true, added: true };
    }
  }

  // Clear wishlist
  clearWishlist(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.dispatchWishlistEvent();
  }

  // Get wishlist count
  getWishlistCount(): number {
    return this.getWishlist().length;
  }

  // Dispatch wishlist update event
  private dispatchWishlistEvent(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('wishlist-updated'));
    }
  }
}

// Export singleton instance
export const wishlistManager = new WishlistManager();

