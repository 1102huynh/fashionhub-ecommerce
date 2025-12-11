# 🛍️ FashionHub - Modern eCommerce Platform

<div align="center">

![FashionHub](https://img.shields.io/badge/FashionHub-eCommerce-6366f1?style=for-the-badge)
![Astro](https://img.shields.io/badge/Astro-5.x-ff5d01?style=for-the-badge&logo=astro)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A professional, feature-rich eCommerce platform built with Astro and TypeScript**

[Live Demo](#) • [Documentation](./README-ECOMMERCE.md) • [Features](#features) • [Getting Started](#getting-started)

</div>

---

## ✨ Features

### 🛒 **Customer Features**
- 🏪 **Product Catalog** - Browse products with advanced filtering
- 🔍 **Search Functionality** - Real-time product search
- 💝 **Wishlist System** - Save favorite products
- 🛒 **Shopping Cart** - Modern sidebar cart with live updates
- 👤 **User Authentication** - Login, register, and account management
- 📦 **Order Management** - Complete order history and tracking
- 💳 **Checkout Flow** - 3-step checkout process
- 👁️ **Recently Viewed** - Track browsing history
- 🔔 **Toast Notifications** - Beautiful feedback system

### 🎛️ **Admin Features**
- 📊 **Dashboard** - Overview with key metrics and statistics
- 📦 **Orders Management** - View, update, and track all orders
- 🏷️ **Products Management** - Complete product CRUD operations
- 👥 **Users Management** - User administration and analytics
- 📈 **Analytics** - Sales reports and performance metrics
- ⚙️ **Settings** - Store configuration and preferences

### 🎨 **Modern UI/UX**
- ✨ **Glassmorphism Design** - Frosted glass effects
- 🌈 **Gradient System** - Beautiful color transitions
- 🎭 **Micro-interactions** - Delightful hover effects
- 📱 **Fully Responsive** - Mobile-first design
- ⚡ **Smooth Animations** - Polished user experience
- 🎯 **Modern Typography** - Clear visual hierarchy

### 🔧 **Technical Features**
- 📡 **REST API** - 15+ endpoints for all operations
- 🗄️ **State Management** - Efficient client-side stores
- 💾 **localStorage** - Persistent data (demo mode)
- 🔐 **Authentication** - JWT-based auth system
- 🎨 **Modern CSS** - Variables, Grid, Flexbox
- ♿ **Accessible** - WCAG compliant

---

## 🚀 Tech Stack

### **Frontend**
- **Framework**: [Astro 5.x](https://astro.build) - Fast, modern static site builder
- **Language**: TypeScript - Type-safe development
- **Styling**: Modern CSS with design system
- **Icons**: SVG icons for performance

### **Backend (API)**
- **Runtime**: Node.js with Astro API routes
- **Adapter**: @astrojs/node for server-side rendering
- **Data**: Mock data with localStorage (production-ready for database)

### **State Management**
- Custom stores for cart, wishlist, orders, auth
- Event-driven updates across components
- localStorage persistence

---

## 📸 Screenshots

### Homepage with Modern Hero
![Homepage](https://via.placeholder.com/800x400/6366f1/ffffff?text=Modern+Hero+Section)

### Product Catalog
![Products](https://via.placeholder.com/800x400/10b981/ffffff?text=Product+Catalog)

### Admin Dashboard
![Admin](https://via.placeholder.com/800x400/f59e0b/ffffff?text=Admin+Dashboard)

---

## 🎯 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/1102huynh/fashionhub-ecommerce.git
cd fashionhub-ecommerce
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open browser**
```
http://localhost:4321
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
fashionhub-ecommerce/
├── src/
│   ├── components/          # Reusable components
│   │   ├── ecommerce/       # Product cards, cart, etc.
│   │   └── ToastNotification.astro
│   ├── layouts/             # Page layouts
│   │   ├── EcommerceLayout.astro
│   │   └── AdminLayout.astro
│   ├── pages/               # All pages (routes)
│   │   ├── admin/           # Admin panel pages
│   │   ├── api/             # API endpoints
│   │   ├── products/        # Product pages
│   │   ├── index.astro      # Homepage
│   │   ├── login.astro
│   │   ├── checkout.astro
│   │   └── ...
│   ├── stores/              # State management
│   │   ├── cart.ts
│   │   ├── wishlist.ts
│   │   ├── auth.ts
│   │   └── orders.ts
│   ├── types/               # TypeScript types
│   └── utils/               # Utilities & mock data
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
└── package.json
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/login       # User login
POST   /api/auth/register    # User registration
POST   /api/auth/logout      # User logout
GET    /api/auth/me          # Get current user
```

### Orders
```
GET    /api/orders           # Get all orders
POST   /api/orders           # Create new order
GET    /api/orders/[id]      # Get order details
PUT    /api/orders/[id]      # Update order
DELETE /api/orders/[id]      # Cancel order
```

### Users (Admin)
```
GET    /api/users            # Get all users
GET    /api/users/[id]       # Get user details
PUT    /api/users/[id]       # Update user
DELETE /api/users/[id]       # Delete user
```

### Products
```
GET    /api/products         # Get all products
GET    /api/products/[id]    # Get product details
```

### Cart
```
GET    /api/cart             # Get cart
POST   /api/cart             # Add to cart
PUT    /api/cart             # Update cart
DELETE /api/cart             # Clear cart
```

---

## 🎨 Design System

### Colors
```css
Primary:   #6366f1  (Indigo)
Success:   #10b981  (Emerald)
Warning:   #f59e0b  (Amber)
Error:     #ef4444  (Red)
```

### Shadows
- `shadow-sm`: Subtle elevation
- `shadow-md`: Card elevation
- `shadow-lg`: Modal elevation
- `shadow-xl`: Popup elevation
- `shadow-2xl`: Maximum elevation

### Border Radius
- `radius-sm`: 0.375rem
- `radius-md`: 0.5rem
- `radius-lg`: 0.75rem
- `radius-xl`: 1rem
- `radius-2xl`: 1.5rem

---

## 🧪 Testing

### Test Shopping Flow
```
1. Browse products → /products
2. View product details → /products/[id]
3. Add to cart
4. Proceed to checkout → /checkout
5. Complete purchase
6. View order → /account
```

### Test Admin Panel
```
1. Login → /login
2. Access admin → /admin
3. View dashboard
4. Manage orders → /admin/orders
5. Manage products → /admin/products
6. View analytics → /admin/analytics
```

---

## 📚 Documentation

- **[Complete Feature List](./README-ECOMMERCE.md)** - Detailed features documentation
- **[API Documentation](./API-ADMIN-COMPLETE.md)** - All API endpoints
- **[UI/UX Guide](./UI-UX-UPGRADE-COMPLETE.md)** - Design system & components
- **[Project Review](./FINAL-PROJECT-REVIEW.md)** - Development summary

---

## 🚀 Deployment

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to Node.js Server
```bash
npm run build
node dist/server/entry.mjs
```

---

## 🔧 Configuration

### Environment Variables (Production)
```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
STRIPE_KEY=your_stripe_key
EMAIL_SERVICE=your_email_service
```

---

## 🎯 Roadmap

### Phase 1: Foundation ✅
- [x] Product catalog
- [x] Shopping cart
- [x] User authentication
- [x] Checkout flow
- [x] Order management

### Phase 2: Enhanced Features ✅
- [x] Admin panel
- [x] REST API
- [x] Wishlist system
- [x] Search functionality
- [x] Toast notifications

### Phase 3: Production (Future)
- [ ] Real database integration
- [ ] Payment gateway (Stripe)
- [ ] Email notifications
- [ ] Product reviews
- [ ] Advanced analytics
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👏 Acknowledgments

- Built with [Astro](https://astro.build)
- Design inspired by modern eCommerce platforms
- Icons from SVG collections
- Images from Unsplash

---

## 📞 Contact

**Project Link**: [https://github.com/1102huynh/fashionhub-ecommerce](https://github.com/1102huynh/fashionhub-ecommerce)

**Author**: 1102huynh

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ using Astro & TypeScript

</div>

