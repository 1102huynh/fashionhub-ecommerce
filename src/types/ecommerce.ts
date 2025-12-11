// Core eCommerce types for the clothing store

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: ProductImage[];
  category: Category;
  brand: string;
  sizes: Size[];
  colors: Color[];
  variants: ProductVariant[];
  stock: number;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  material?: string;
  careInstructions?: string;
  rating?: number;
  reviewCount?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  colorVariant?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
  price?: number; // Override product price if needed
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: Category[];
}

export interface Size {
  id: string;
  name: string;
  value: string;
  order: number;
}

export interface Color {
  id: string;
  name: string;
  value: string; // hex color code
  image?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
  addedAt: Date;
}

// Commented out unused interfaces - can be uncommented when needed
/*
export interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
  total: number;
  itemCount: number;
}
*/

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  isEmailVerified: boolean;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  userId: string;
  type: 'shipping' | 'billing';
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId?: string;
  email: string;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  trackingNumber?: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  variantId: string;
  quantity: number;
  price: number;
  product: Product;
  variant: ProductVariant;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface PaymentMethod {
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

/*
export interface ProductFilter {
  categories?: string[];
  sizes?: string[];
  colors?: string[];
  brands?: string[];
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  inStock?: boolean;
  featured?: boolean;
  search?: string;
  sortBy?: 'name' | 'price' | 'createdAt' | 'rating' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
  expiresAt: Date;
}

// Store state interfaces
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isLoading: boolean;
  error?: string;
}

export interface UserState {
  user?: User;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: string;
}
*/
