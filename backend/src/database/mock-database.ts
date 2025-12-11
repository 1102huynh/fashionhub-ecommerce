// Mock Database - In-memory storage for development
// Will be replaced with real database later

export interface MockUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  brand: string;
  images: any[];
  variants: any[];
  colors: any[];
  sizes: any[];
  stock: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface MockOrder {
  id: string;
  orderNumber: string;
  userId: string;
  items: any[];
  shippingAddress: any;
  paymentInfo: any;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  status: string;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage
class MockDatabase {
  private users: Map<string, MockUser> = new Map();
  private products: Map<string, MockProduct> = new Map();
  private orders: Map<string, MockOrder> = new Map();

  constructor() {
    this.seedData();
  }

  private seedData() {
    // Seed some initial data
    this.createInitialUsers();
    this.createInitialProducts();
  }

  private createInitialUsers() {
    const adminUser: MockUser = {
      id: 'user-admin-001',
      email: 'admin@fashionhub.com',
      password: '$2b$10$YQp5ZYJhH1xLK0hK0hK0hOqGqGqGqGqGqGqGqGqGqGqGqGqGqGqGq', // password: admin123
      firstName: 'Admin',
      lastName: 'User',
      phone: '1234567890',
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const customerUser: MockUser = {
      id: 'user-customer-001',
      email: 'customer@example.com',
      password: '$2b$10$YQp5ZYJhH1xLK0hK0hK0hOqGqGqGqGqGqGqGqGqGqGqGqGqGqGqGq', // password: customer123
      firstName: 'John',
      lastName: 'Doe',
      phone: '0987654321',
      role: 'customer',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.set(adminUser.id, adminUser);
    this.users.set(customerUser.id, customerUser);
  }

  private createInitialProducts() {
    const sampleProducts: MockProduct[] = [
      {
        id: 'prod-001',
        name: 'Classic White T-Shirt',
        description: 'Premium cotton t-shirt with a classic fit. Perfect for everyday wear.',
        price: 29.99,
        salePrice: 24.99,
        category: 'men',
        brand: 'FashionHub',
        images: [
          { url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'White', value: '#ffffff' }, { name: 'Black', value: '#000000' }],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 100,
        rating: 4.5,
        reviewCount: 45,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-002',
        name: 'Slim Fit Denim Jeans',
        description: 'Classic blue denim jeans with modern slim fit design.',
        price: 79.99,
        salePrice: 59.99,
        category: 'men',
        brand: 'FashionHub',
        images: [
          { url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Blue', value: '#1e40af' }, { name: 'Black', value: '#000000' }],
        sizes: ['28', '30', '32', '34', '36'],
        stock: 75,
        rating: 4.7,
        reviewCount: 89,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-003',
        name: 'Floral Summer Dress',
        description: 'Beautiful floral print summer dress. Light and comfortable.',
        price: 89.99,
        salePrice: 69.99,
        category: 'women',
        brand: 'Elegance',
        images: [
          { url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Floral', value: '#f472b6' }],
        sizes: ['XS', 'S', 'M', 'L'],
        stock: 50,
        rating: 4.8,
        reviewCount: 120,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-004',
        name: 'Leather Jacket',
        description: 'Premium genuine leather jacket. Timeless style for any occasion.',
        price: 299.99,
        salePrice: 249.99,
        category: 'men',
        brand: 'Urban Edge',
        images: [
          { url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Brown', value: '#78350f' }, { name: 'Black', value: '#000000' }],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 30,
        rating: 4.9,
        reviewCount: 67,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-005',
        name: 'Running Sneakers',
        description: 'Lightweight running sneakers with cushioned sole for maximum comfort.',
        price: 129.99,
        salePrice: 99.99,
        category: 'accessories',
        brand: 'SportFlex',
        images: [
          { url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Red', value: '#ef4444' }, { name: 'Blue', value: '#3b82f6' }],
        sizes: ['7', '8', '9', '10', '11', '12'],
        stock: 80,
        rating: 4.6,
        reviewCount: 156,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-006',
        name: 'Silk Blouse',
        description: 'Elegant silk blouse perfect for office or evening wear.',
        price: 119.99,
        category: 'women',
        brand: 'Elegance',
        images: [
          { url: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'White', value: '#ffffff' }, { name: 'Pink', value: '#ec4899' }],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        stock: 45,
        rating: 4.4,
        reviewCount: 38,
        featured: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-007',
        name: 'Kids Cartoon T-Shirt',
        description: 'Fun and colorful cartoon print t-shirt for kids.',
        price: 19.99,
        salePrice: 14.99,
        category: 'kids',
        brand: 'KidStyle',
        images: [
          { url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Blue', value: '#3b82f6' }, { name: 'Yellow', value: '#eab308' }],
        sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y'],
        stock: 120,
        rating: 4.7,
        reviewCount: 89,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-008',
        name: 'Wool Winter Coat',
        description: 'Warm wool coat for cold winter days. Classic design.',
        price: 249.99,
        salePrice: 199.99,
        category: 'women',
        brand: 'WinterStyle',
        images: [
          { url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Camel', value: '#d4a574' }, { name: 'Gray', value: '#6b7280' }],
        sizes: ['S', 'M', 'L', 'XL'],
        stock: 25,
        rating: 4.8,
        reviewCount: 54,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-009',
        name: 'Canvas Backpack',
        description: 'Durable canvas backpack with multiple compartments.',
        price: 59.99,
        category: 'accessories',
        brand: 'UrbanGear',
        images: [
          { url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Navy', value: '#1e3a8a' }, { name: 'Olive', value: '#65a30d' }],
        sizes: ['One Size'],
        stock: 60,
        rating: 4.5,
        reviewCount: 112,
        featured: false,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'prod-010',
        name: 'Polo Shirt',
        description: 'Classic polo shirt with embroidered logo. Smart casual style.',
        price: 49.99,
        salePrice: 39.99,
        category: 'men',
        brand: 'FashionHub',
        images: [
          { url: 'https://images.unsplash.com/photo-1625910513413-5fc45d8f3e6c?w=500', isPrimary: true },
        ],
        variants: [],
        colors: [{ name: 'Navy', value: '#1e3a8a' }, { name: 'White', value: '#ffffff' }, { name: 'Green', value: '#16a34a' }],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        stock: 90,
        rating: 4.6,
        reviewCount: 78,
        featured: true,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
    });
  }

  // Users methods
  getAllUsers(): MockUser[] {
    return Array.from(this.users.values());
  }

  getUserById(id: string): MockUser | undefined {
    return this.users.get(id);
  }

  getUserByEmail(email: string): MockUser | undefined {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  createUser(user: Omit<MockUser, 'id' | 'createdAt' | 'updatedAt'>): MockUser {
    const newUser: MockUser = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(newUser.id, newUser);
    return newUser;
  }

  updateUser(id: string, updates: Partial<MockUser>): MockUser | undefined {
    const user = this.users.get(id);
    if (!user) return undefined;

    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date(),
    };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  deleteUser(id: string): boolean {
    return this.users.delete(id);
  }

  // Products methods
  getAllProducts(): MockProduct[] {
    return Array.from(this.products.values());
  }

  getProductById(id: string): MockProduct | undefined {
    return this.products.get(id);
  }

  createProduct(product: Omit<MockProduct, 'id' | 'createdAt' | 'updatedAt'>): MockProduct {
    const newProduct: MockProduct = {
      ...product,
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.products.set(newProduct.id, newProduct);
    return newProduct;
  }

  updateProduct(id: string, updates: Partial<MockProduct>): MockProduct | undefined {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = {
      ...product,
      ...updates,
      updatedAt: new Date(),
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  deleteProduct(id: string): boolean {
    return this.products.delete(id);
  }

  // Orders methods
  getAllOrders(): MockOrder[] {
    return Array.from(this.orders.values());
  }

  getOrderById(id: string): MockOrder | undefined {
    return this.orders.get(id);
  }

  getOrdersByUserId(userId: string): MockOrder[] {
    return Array.from(this.orders.values()).filter(order => order.userId === userId);
  }

  createOrder(order: Omit<MockOrder, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): MockOrder {
    const newOrder: MockOrder = {
      ...order,
      id: `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.orders.set(newOrder.id, newOrder);
    return newOrder;
  }

  updateOrder(id: string, updates: Partial<MockOrder>): MockOrder | undefined {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder = {
      ...order,
      ...updates,
      updatedAt: new Date(),
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  deleteOrder(id: string): boolean {
    return this.orders.delete(id);
  }
}

// Export singleton instance
export const mockDB = new MockDatabase();

