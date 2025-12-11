// Order management store - Uses Backend API
import type { CartItem } from '../types/ecommerce.js';

const API_BASE_URL = 'http://localhost:3001/api';

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
  billingAddress?: ShippingAddress;
  paymentInfo: PaymentInfo;
  shippingMethod?: 'standard' | 'express' | 'overnight';
  shippingCost: number;
  subtotal: number;
  tax: number;
  total: number;
  promoCode?: string;
  discount?: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  estimatedDelivery?: Date;
  trackingNumber?: string;
}

class OrderManager {
  private readonly STORAGE_KEY = 'fashionhub_orders';

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  // Get all orders for current user from backend
  async fetchUserOrders(): Promise<Order[]> {
    try {
      const token = this.getToken();
      if (!token) {
        return this.getLocalOrders();
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data.orders || [];
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    }

    // Fallback to local storage
    return this.getLocalOrders();
  }

  // Get orders from local storage (fallback)
  getLocalOrders(): Order[] {
    if (typeof window === 'undefined') return [];

    try {
      const ordersData = localStorage.getItem(this.STORAGE_KEY);
      if (ordersData) {
        const allOrders = JSON.parse(ordersData);
        return allOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
        }));
      }
    } catch (error) {
      console.error('Error reading orders:', error);
    }

    return [];
  }

  // Synchronous method for backward compatibility
  getUserOrders(userId: string): Order[] {
    const orders = this.getLocalOrders();
    return orders.filter(o => o.userId === userId || o.userId === 'local-user');
  }

  // Get order statistics
  getOrderStats(userId: string): { total: number; pending: number; completed: number; totalSpent: number } {
    const orders = this.getUserOrders(userId);
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending' || o.status === 'processing').length,
      completed: orders.filter(o => o.status === 'delivered').length,
      totalSpent: orders.reduce((sum, o) => sum + o.total, 0),
    };
  }

  // Get single order by ID
  async getOrderById(orderId: string): Promise<Order | null> {
    try {
      const token = this.getToken();
      if (token) {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          return await response.json();
        }
      }
    } catch (error) {
      console.error('Fetch order error:', error);
    }

    // Fallback to local storage
    const orders = this.getLocalOrders();
    return orders.find(o => o.id === orderId) || null;
  }

  // Create new order
  async createOrder(orderData: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentInfo: PaymentInfo;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
  }): Promise<{ success: boolean; order?: Order; error?: string }> {
    try {
      const token = this.getToken();

      if (token) {
        const response = await fetch(`${API_BASE_URL}/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(orderData)
        });

        if (response.ok) {
          const order = await response.json();
          this.saveOrderLocally(order);
          this.dispatchOrderEvent();
          return { success: true, order };
        } else {
          const error = await response.json();
          return { success: false, error: error.message || 'Failed to create order' };
        }
      }
    } catch (error) {
      console.error('Create order API error:', error);
    }

    // Fallback: create locally
    return this.createLocalOrder(orderData);
  }

  // Create order locally (fallback)
  private createLocalOrder(orderData: {
    items: CartItem[];
    shippingAddress: ShippingAddress;
    paymentInfo: PaymentInfo;
    subtotal: number;
    shippingCost: number;
    tax: number;
    total: number;
  }): { success: boolean; order?: Order; error?: string } {
    const order: Order = {
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: 'local-user',
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentInfo: orderData.paymentInfo,
      shippingCost: orderData.shippingCost,
      subtotal: orderData.subtotal,
      tax: orderData.tax,
      total: orderData.total,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    };

    this.saveOrderLocally(order);
    this.dispatchOrderEvent();
    return { success: true, order };
  }

  // Save order to local storage
  private saveOrderLocally(order: Order): void {
    if (typeof window === 'undefined') return;

    try {
      const orders = this.getLocalOrders();
      const existingIndex = orders.findIndex(o => o.id === order.id);

      if (existingIndex >= 0) {
        orders[existingIndex] = order;
      } else {
        orders.unshift(order);
      }

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving order:', error);
    }
  }

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    try {
      const token = this.getToken();
      if (token) {
        const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status })
        });

        if (response.ok) {
          const updatedOrder = await response.json();
          this.saveOrderLocally(updatedOrder);
          this.dispatchOrderEvent();
          return true;
        }
      }
    } catch (error) {
      console.error('Update order error:', error);
    }

    // Fallback: update locally
    const orders = this.getLocalOrders();
    const index = orders.findIndex(o => o.id === orderId);
    if (index >= 0) {
      orders[index].status = status;
      orders[index].updatedAt = new Date();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(orders));
      this.dispatchOrderEvent();
      return true;
    }

    return false;
  }

  private dispatchOrderEvent(): void {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('orders-updated'));
    }
  }
}

export const orderManager = new OrderManager();

