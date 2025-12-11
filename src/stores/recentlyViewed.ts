// Recently viewed products store
import type { Product } from '../types/ecommerce.js';

class RecentlyViewedManager {
  private readonly STORAGE_KEY = 'fashionhub_recently_viewed';
  private readonly MAX_ITEMS = 10;

  // Get recently viewed products
  getRecentlyViewed(): Product[] {
    if (typeof window === 'undefined') return [];

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('Error reading recently viewed:', error);
    }

    return [];
  }

  // Add product to recently viewed
  addToRecentlyViewed(product: Product): void {
    try {
      let items = this.getRecentlyViewed();

      // Remove if already exists
      items = items.filter(item => item.id !== product.id);

      // Add to beginning
      items.unshift(product);

      // Keep only MAX_ITEMS
      if (items.length > this.MAX_ITEMS) {
        items = items.slice(0, this.MAX_ITEMS);
      }

      // Save to storage
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));

      // Dispatch event
      this.dispatchEvent();
    } catch (error) {
      console.error('Error adding to recently viewed:', error);
    }
  }

  // Clear recently viewed
  clearRecentlyViewed(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.dispatchEvent();
  }

  // Dispatch event
  private dispatchEvent(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('recently-viewed-updated'));
    }
  }
}

// Export singleton instance
export const recentlyViewedManager = new RecentlyViewedManager();

