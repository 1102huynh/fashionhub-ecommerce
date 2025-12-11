// Order management store
import { nanoid } from 'nanoid';
import type { CartItem } from '../types/ecommerce.js';

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PaymentInfo {
  method: 'card' | 'paypal' | 'apple';
  cardLast4?: string;
  cardBrand?: string;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  billingAddress: ShippingAddress;
  paymentInfo: PaymentInfo;
  shippingMethod: 'standard' | 'express' | 'overnight';
  shippingCost: number;
  subtotal: number;
  tax: number;
  total: number;
  promoCode?: string;
  discount?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery: Date;
  trackingNumber?: string;
}

class OrderManager {
  private readonly STORAGE_KEY = 'fashionhub_orders';

  // Get all orders for current user
  getUserOrders(userId: string): Order[] {
    if (typeof window === 'undefined') return [];

    try {
      const ordersData = localStorage.getItem(this.STORAGE_KEY);
      if (ordersData) {
        const allOrders = JSON.parse(ordersData);
        return allOrders
          .filter((order: any) => order.userId === userId)
          .map((order: any) => ({
            ...order,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt),
            estimatedDelivery: new Date(order.estimatedDelivery)
          }))
          .sort((a: Order, b: Order) => b.createdAt.getTime() - a.createdAt.getTime());
      }
    } catch (error) {
      console.error('Error reading orders:', error);
    }

    return [];
  }

  // Get single order by ID
  getOrder(orderId: string): Order | null {
    if (typeof window === 'undefined') return null;

    try {
      const ordersData = localStorage.getItem(this.STORAGE_KEY);
      if (ordersData) {
        const allOrders = JSON.parse(ordersData);
        const order = allOrders.find((o: any) => o.id === orderId);
        if (order) {
          return {
            ...order,
            createdAt: new Date(order.createdAt),
            updatedAt: new Date(order.updatedAt),
            estimatedDelivery: new Date(order.estimatedDelivery)
          };
        }
      }
    } catch (error) {
      console.error('Error reading order:', error);
    }

    return null;
  }

  // Create new order
  async createOrder(orderData: {
    userId: string;
    items: CartItem[];
    shippingAddress: ShippingAddress;
    billingAddress: ShippingAddress;
    paymentInfo: PaymentInfo;
    shippingMethod: 'standard' | 'express' | 'overnight';
    shippingCost: number;
    subtotal: number;
    tax: number;
    total: number;
    promoCode?: string;
    discount?: number;
  }): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Calculate estimated delivery
      const estimatedDelivery = new Date();
      switch (orderData.shippingMethod) {
        case 'overnight':
          estimatedDelivery.setDate(estimatedDelivery.getDate() + 1);
          break;
        case 'express':
          estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
          break;
        case 'standard':
        default:
          estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
          break;
      }

      // Create order object
      const order: Order = {
        id: nanoid(),
        orderNumber: 'ORD-' + Date.now().toString(36).toUpperCase(),
        userId: orderData.userId,
        items: orderData.items,
        shippingAddress: orderData.shippingAddress,
        billingAddress: orderData.billingAddress,
        paymentInfo: orderData.paymentInfo,
        shippingMethod: orderData.shippingMethod,
        shippingCost: orderData.shippingCost,
        subtotal: orderData.subtotal,
        tax: orderData.tax,
        total: orderData.total,
        promoCode: orderData.promoCode,
        discount: orderData.discount,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        estimatedDelivery: estimatedDelivery,
        trackingNumber: 'TRK' + nanoid(10).toUpperCase()
      };

      // Save order
      this.saveOrder(order);

      // Dispatch event
      this.dispatchOrderEvent();

      return { success: true, order };
    } catch (error) {
      console.error('Order creation error:', error);
      return { success: false, error: 'Failed to create order. Please try again.' };
    }
  }

  // Save order to storage
  private saveOrder(order: Order): void {
    try {
      const ordersData = localStorage.getItem(this.STORAGE_KEY);
      const orders = ordersData ? JSON.parse(ordersData) : [];
      orders.push(order);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  // Update order status
  updateOrderStatus(orderId: string, status: Order['status']): { success: boolean; error?: string } {
    try {
      const ordersData = localStorage.getItem(this.STORAGE_KEY);
      if (!ordersData) {
        return { success: false, error: 'Order not found' };
      }

      const orders = JSON.parse(ordersData);
      const orderIndex = orders.findIndex((o: any) => o.id === orderId);

      if (orderIndex === -1) {
        return { success: false, error: 'Order not found' };
      }

      orders[orderIndex].status = status;
      orders[orderIndex].updatedAt = new Date();

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
      this.dispatchOrderEvent();

      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { success: false, error: 'Failed to update order' };
    }
  }

  // Cancel order
  cancelOrder(orderId: string): { success: boolean; error?: string } {
    try {
      const order = this.getOrder(orderId);
      if (!order) {
        return { success: false, error: 'Order not found' };
      }

      if (order.status === 'shipped' || order.status === 'delivered') {
        return { success: false, error: 'Cannot cancel shipped or delivered orders' };
      }

      return this.updateOrderStatus(orderId, 'cancelled');
    } catch (error) {
      console.error('Error cancelling order:', error);
      return { success: false, error: 'Failed to cancel order' };
    }
  }

  // Get order statistics
  getOrderStats(userId: string): {
    totalOrders: number;
    totalSpent: number;
    pendingOrders: number;
    completedOrders: number;
  } {
    const orders = this.getUserOrders(userId);

    return {
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + order.total, 0),
      pendingOrders: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
      completedOrders: orders.filter(o => o.status === 'delivered').length
    };
  }

  // Dispatch order update event
  private dispatchOrderEvent(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('orders-updated'));
    }
  }
}

// Export singleton instance
export const orderManager = new OrderManager();

