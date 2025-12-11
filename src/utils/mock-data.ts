// Mock data for eCommerce store development and testing
import type { Product, Category, Size, Color, User, ProductVariant } from '../types/ecommerce.js';

// Mock Categories
export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Men',
    slug: 'men',
    description: 'Men\'s clothing and accessories',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 'cat-2',
    name: 'Women',
    slug: 'women',
    description: 'Women\'s clothing and accessories',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 'cat-3',
    name: 'T-Shirts',
    slug: 'men-tshirts',
    description: 'Comfortable and stylish t-shirts',
    parentId: 'cat-1',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 'cat-4',
    name: 'Dresses',
    slug: 'women-dresses',
    description: 'Beautiful dresses for every occasion',
    parentId: 'cat-2',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 'cat-5',
    name: 'Jeans',
    slug: 'jeans',
    description: 'Premium denim for all',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 'cat-6',
    name: 'Knitwear',
    slug: 'knitwear',
    description: 'Cozy sweaters and cardigans',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: 'cat-7',
    name: 'Activewear',
    slug: 'activewear',
    description: 'Performance clothing for active lifestyle',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center',
  }
];

// Mock Sizes
export const mockSizes: Size[] = [
  { id: 'size-1', name: 'XS', value: 'XS', order: 1 },
  { id: 'size-2', name: 'S', value: 'S', order: 2 },
  { id: 'size-3', name: 'M', value: 'M', order: 3 },
  { id: 'size-4', name: 'L', value: 'L', order: 4 },
  { id: 'size-5', name: 'XL', value: 'XL', order: 5 },
  { id: 'size-6', name: 'XXL', value: 'XXL', order: 6 },
];

// Mock Colors
export const mockColors: Color[] = [
  { id: 'color-1', name: 'Black', value: '#000000' },
  { id: 'color-2', name: 'White', value: '#FFFFFF' },
  { id: 'color-3', name: 'Navy', value: '#000080' },
  { id: 'color-4', name: 'Gray', value: '#808080' },
  { id: 'color-5', name: 'Red', value: '#FF0000' },
  { id: 'color-6', name: 'Blue', value: '#0000FF' },
  { id: 'color-7', name: 'Green', value: '#008000' },
  { id: 'color-8', name: 'Pink', value: '#FFC0CB' },
];

// Mock Product Variants
export const mockVariants: ProductVariant[] = [
  // Classic Cotton T-Shirt variants
  { id: 'var-1', productId: 'prod-1', size: 'S', color: 'Black', sku: 'CCTS-S-BLK', stock: 15, price: 29.99 },
  { id: 'var-2', productId: 'prod-1', size: 'M', color: 'Black', sku: 'CCTS-M-BLK', stock: 20, price: 29.99 },
  { id: 'var-3', productId: 'prod-1', size: 'L', color: 'Black', sku: 'CCTS-L-BLK', stock: 18, price: 29.99 },
  { id: 'var-4', productId: 'prod-1', size: 'S', color: 'White', sku: 'CCTS-S-WHT', stock: 12, price: 29.99 },
  { id: 'var-5', productId: 'prod-1', size: 'M', color: 'White', sku: 'CCTS-M-WHT', stock: 25, price: 29.99 },
  { id: 'var-6', productId: 'prod-1', size: 'L', color: 'White', sku: 'CCTS-L-WHT', stock: 10, price: 29.99 },

  // Premium Denim Jeans variants
  { id: 'var-7', productId: 'prod-2', size: 'S', color: 'Navy', sku: 'PDJ-S-NVY', stock: 8, price: 89.99 },
  { id: 'var-8', productId: 'prod-2', size: 'M', color: 'Navy', sku: 'PDJ-M-NVY', stock: 12, price: 89.99 },
  { id: 'var-9', productId: 'prod-2', size: 'L', color: 'Navy', sku: 'PDJ-L-NVY', stock: 15, price: 89.99 },
  { id: 'var-10', productId: 'prod-2', size: 'S', color: 'Black', sku: 'PDJ-S-BLK', stock: 6, price: 89.99 },

  // Summer Floral Dress variants
  { id: 'var-11', productId: 'prod-3', size: 'XS', color: 'Pink', sku: 'SFD-XS-PNK', stock: 5, price: 79.99 },
  { id: 'var-12', productId: 'prod-3', size: 'S', color: 'Pink', sku: 'SFD-S-PNK', stock: 8, price: 79.99 },
  { id: 'var-13', productId: 'prod-3', size: 'M', color: 'Pink', sku: 'SFD-M-PNK', stock: 10, price: 79.99 },
  { id: 'var-14', productId: 'prod-3', size: 'L', color: 'Pink', sku: 'SFD-L-PNK', stock: 7, price: 79.99 },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Classic Cotton T-Shirt',
    description: 'A comfortable and versatile cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a relaxed fit.',
    price: 29.99,
    images: [
      {
        id: 'img-1',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop&crop=center',
        alt: 'Classic Cotton T-Shirt in Black - Front View',
        isPrimary: true,
        colorVariant: 'Black'
      },
      {
        id: 'img-2',
        url: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=800&h=800&fit=crop&crop=center',
        alt: 'Classic Cotton T-Shirt in White - Front View',
        isPrimary: false,
        colorVariant: 'White'
      },
      {
        id: 'img-3',
        url: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&h=800&fit=crop&crop=center',
        alt: 'Classic Cotton T-Shirt - Back View',
        isPrimary: false,
        colorVariant: 'Black'
      }
    ],
    category: mockCategories[2], // T-Shirts
    brand: 'ComfortWear',
    sizes: [mockSizes[1], mockSizes[2], mockSizes[3]], // S, M, L
    colors: [mockColors[0], mockColors[1]], // Black, White
    variants: mockVariants.filter(v => v.productId === 'prod-1'),
    stock: 100,
    featured: true,
    createdAt: new Date('2025-11-01'),
    updatedAt: new Date('2025-11-15'),
    tags: ['cotton', 'casual', 'everyday', 'organic'],
    material: '100% Organic Cotton',
    careInstructions: 'Machine wash cold, tumble dry low',
    rating: 4.5,
    reviewCount: 128
  },
  {
    id: 'prod-2',
    name: 'Premium Denim Jeans',
    description: 'High-quality denim jeans with a modern slim fit. Crafted from premium stretch denim for comfort and style.',
    price: 89.99,
    salePrice: 69.99,
    images: [
      {
        id: 'img-4',
        url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=800&fit=crop&crop=center',
        alt: 'Premium Denim Jeans in Navy - Front View',
        isPrimary: true,
        colorVariant: 'Navy'
      },
      {
        id: 'img-5',
        url: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&h=800&fit=crop&crop=center',
        alt: 'Premium Denim Jeans in Black - Front View',
        isPrimary: false,
        colorVariant: 'Black'
      },
      {
        id: 'img-6',
        url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=800&fit=crop&crop=center',
        alt: 'Premium Denim Jeans - Detail View',
        isPrimary: false,
        colorVariant: 'Navy'
      }
    ],
    category: mockCategories[4], // Jeans
    brand: 'DenimCraft',
    sizes: [mockSizes[1], mockSizes[2], mockSizes[3]], // S, M, L
    colors: [mockColors[2], mockColors[0]], // Navy, Black
    variants: mockVariants.filter(v => v.productId === 'prod-2'),
    stock: 50,
    featured: true,
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-11-20'),
    tags: ['denim', 'premium', 'slim-fit', 'stretch'],
    material: '98% Cotton, 2% Elastane',
    careInstructions: 'Machine wash inside out, hang dry',
    rating: 4.7,
    reviewCount: 89
  },
  {
    id: 'prod-3',
    name: 'Summer Floral Dress',
    description: 'A beautiful floral dress perfect for summer occasions. Features a flattering A-line silhouette and breathable fabric.',
    price: 79.99,
    images: [
      {
        id: 'img-7',
        url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=800&fit=crop&crop=center',
        alt: 'Summer Floral Dress in Pink - Full View',
        isPrimary: true,
        colorVariant: 'Pink'
      },
      {
        id: 'img-8',
        url: 'https://images.unsplash.com/photo-1566479179817-c15ed3a15c20?w=800&h=800&fit=crop&crop=center',
        alt: 'Summer Floral Dress - Side View',
        isPrimary: false,
        colorVariant: 'Pink'
      },
      {
        id: 'img-9',
        url: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&h=800&fit=crop&crop=center',
        alt: 'Summer Floral Dress - Detail View',
        isPrimary: false,
        colorVariant: 'Pink'
      }
    ],
    category: mockCategories[3], // Dresses
    brand: 'FloralFashion',
    sizes: [mockSizes[0], mockSizes[1], mockSizes[2], mockSizes[3]], // XS, S, M, L
    colors: [mockColors[7]], // Pink
    variants: mockVariants.filter(v => v.productId === 'prod-3'),
    stock: 30,
    featured: false,
    createdAt: new Date('2025-09-20'),
    updatedAt: new Date('2025-10-05'),
    tags: ['floral', 'summer', 'dress', 'a-line'],
    material: '100% Viscose',
    careInstructions: 'Hand wash cold, line dry',
    rating: 4.3,
    reviewCount: 45
  },
  {
    id: 'prod-4',
    name: 'Casual Button-Up Shirt',
    description: 'A versatile button-up shirt suitable for both casual and semi-formal occasions. Made from wrinkle-resistant fabric.',
    price: 49.99,
    images: [
      {
        id: 'img-10',
        url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&h=800&fit=crop&crop=center',
        alt: 'Casual Button-Up Shirt in Blue - Front View',
        isPrimary: true,
        colorVariant: 'Blue'
      },
      {
        id: 'img-11',
        url: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=800&h=800&fit=crop&crop=center',
        alt: 'Casual Button-Up Shirt - Styled View',
        isPrimary: false,
        colorVariant: 'Blue'
      }
    ],
    category: mockCategories[0], // Men
    brand: 'SharpStyle',
    sizes: [mockSizes[1], mockSizes[2], mockSizes[3], mockSizes[4]], // S, M, L, XL
    colors: [mockColors[5]], // Blue
    variants: [],
    stock: 25,
    featured: false,
    createdAt: new Date('2025-11-10'),
    updatedAt: new Date('2025-11-10'),
    tags: ['button-up', 'casual', 'wrinkle-resistant'],
    material: '65% Cotton, 35% Polyester',
    careInstructions: 'Machine wash warm, tumble dry medium',
    rating: 4.1,
    reviewCount: 23
  },
  {
    id: 'prod-5',
    name: 'Luxury Cashmere Sweater',
    description: 'Premium cashmere sweater with a timeless design. Perfect for layering or wearing alone in sophisticated settings.',
    price: 159.99,
    salePrice: 119.99,
    images: [
      {
        id: 'img-12',
        url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop&crop=center',
        alt: 'Luxury Cashmere Sweater in Cream - Front View',
        isPrimary: true,
        colorVariant: 'Cream'
      },
      {
        id: 'img-13',
        url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=800&fit=crop&crop=center',
        alt: 'Luxury Cashmere Sweater - Detail View',
        isPrimary: false,
        colorVariant: 'Cream'
      }
    ],
    category: mockCategories[1], // Women
    brand: 'LuxeKnits',
    sizes: [mockSizes[0], mockSizes[1], mockSizes[2], mockSizes[3]], // XS, S, M, L
    colors: [mockColors[1], mockColors[4]], // White/Cream, Gray
    variants: [],
    stock: 15,
    featured: true,
    createdAt: new Date('2025-11-05'),
    updatedAt: new Date('2025-11-20'),
    tags: ['cashmere', 'luxury', 'sweater', 'premium'],
    material: '100% Cashmere',
    careInstructions: 'Dry clean only',
    rating: 4.8,
    reviewCount: 67
  },
  {
    id: 'prod-6',
    name: 'Athletic Performance Shorts',
    description: 'High-performance shorts designed for workouts and active lifestyle. Moisture-wicking fabric with four-way stretch.',
    price: 39.99,
    images: [
      {
        id: 'img-14',
        url: 'https://images.unsplash.com/photo-1552902875-9da1fa122107?w=800&h=800&fit=crop&crop=center',
        alt: 'Athletic Performance Shorts in Black - Front View',
        isPrimary: true,
        colorVariant: 'Black'
      },
      {
        id: 'img-15',
        url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=800&fit=crop&crop=center',
        alt: 'Athletic Performance Shorts - Action View',
        isPrimary: false,
        colorVariant: 'Black'
      }
    ],
    category: mockCategories[0], // Men
    brand: 'ActiveLife',
    sizes: [mockSizes[1], mockSizes[2], mockSizes[3], mockSizes[4]], // S, M, L, XL
    colors: [mockColors[0], mockColors[2]], // Black, Navy
    variants: [],
    stock: 40,
    featured: false,
    createdAt: new Date('2025-10-20'),
    updatedAt: new Date('2025-11-15'),
    tags: ['athletic', 'performance', 'shorts', 'moisture-wicking'],
    material: '88% Polyester, 12% Spandex',
    careInstructions: 'Machine wash cold, tumble dry low',
    rating: 4.4,
    reviewCount: 156
  }
];

// Mock User (commented out to avoid unused warning)
/*
export const mockUser: User = {
  id: 'user-1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1-555-0123',
  dateOfBirth: new Date('1990-05-15'),
  createdAt: new Date('2025-01-15'),
  updatedAt: new Date('2025-11-20'),
  isEmailVerified: true,
  addresses: [
    {
      id: 'addr-1',
      userId: 'user-1',
      type: 'shipping',
      firstName: 'John',
      lastName: 'Doe',
      address1: '123 Main Street',
      address2: 'Apt 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'US',
      phone: '+1-555-0123',
      isDefault: true
    }
  ],
  orders: []
};
*/

// Mock Orders (commented out to avoid unused warning - can be uncommented when needed)
/*
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    userId: 'user-1',
    email: 'john.doe@example.com',
    status: 'delivered',
    items: [
      {
        id: 'orderitem-1',
        orderId: 'order-1',
        productId: 'prod-1',
        variantId: 'var-2',
        quantity: 2,
        price: 29.99,
        product: mockProducts[0],
        variant: mockVariants[1]
      }
    ],
    shippingAddress: mockUser.addresses[0],
    billingAddress: mockUser.addresses[0],
    paymentMethod: {
      type: 'card',
      last4: '4242',
      brand: 'visa',
      expiryMonth: 12,
      expiryYear: 2026
    },
    subtotal: 59.98,
    tax: 5.40,
    shipping: 9.99,
    discount: 0,
    total: 75.37,
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-20'),
    shippedAt: new Date('2025-10-16'),
    deliveredAt: new Date('2025-10-18'),
    trackingNumber: 'TRK123456789'
  }
];
*/

// Utility functions for mock data
export const getProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

// Commented out unused functions - can be uncommented when needed
/*
export const getProductsByCategory = (categoryId: string): Product[] => {
  return mockProducts.filter(product => product.category.id === categoryId);
};
*/

export const getFeaturedProducts = (): Product[] => {
  return mockProducts.filter(product => product.featured);
};

/*
export const getProductVariants = (productId: string): ProductVariant[] => {
  return mockVariants.filter(variant => variant.productId === productId);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const getProductsByPriceRange = (min: number, max: number): Product[] => {
  return mockProducts.filter(product => {
    const price = product.salePrice || product.price;
    return price >= min && price <= max;
  });
};
*/
