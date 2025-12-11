# 🚀 FashionHub Backend API

Backend API cho FashionHub eCommerce Platform được xây dựng với **NestJS**, **TypeScript**, **TypeORM**, và **PostgreSQL**.

---

## 📋 Features

### ✅ **Authentication & Authorization**
- JWT-based authentication
- Password hashing với bcrypt
- Role-based access control (Customer/Admin)
- Protected routes

### ✅ **User Management**
- User registration & login
- Profile management
- User listing với filters
- Admin user management

### ✅ **Product Management**
- CRUD operations
- Product search & filtering
- Category filtering
- Pagination support
- Featured products

### ✅ **Order Management**
- Create orders
- Order history
- Order status tracking
- User-specific orders
- Admin order management

### ✅ **Database**
- PostgreSQL với TypeORM
- Auto-sync entities (development)
- Migrations support
- Relations & joins

---

## 🛠️ Tech Stack

- **Framework**: NestJS 10
- **Language**: TypeScript 5
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT + Passport
- **Validation**: class-validator
- **Password**: bcrypt

---

## 📦 Installation

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Setup Database
```bash
# Install PostgreSQL
# Create database
createdb fashionhub

# Or using psql
psql -U postgres
CREATE DATABASE fashionhub;
```

### 3. Configure Environment
```bash
# Copy .env.example to .env
cp .env.example .env

# Update database credentials in .env
```

### 4. Run Development Server
```bash
npm run start:dev
```

Server sẽ chạy tại: **http://localhost:3001**

---

## 📡 API Endpoints

### **Authentication** (`/api/auth`)

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer {token}
```

---

### **Users** (`/api/users`)

#### Get All Users (Admin)
```http
GET /api/users?role=customer&search=john
Authorization: Bearer {token}
```

#### Get User by ID
```http
GET /api/users/:id
Authorization: Bearer {token}
```

#### Update User
```http
PATCH /api/users/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Delete User
```http
DELETE /api/users/:id
Authorization: Bearer {token}
```

---

### **Products** (`/api/products`)

#### Get All Products
```http
GET /api/products?category=men&search=shirt&page=1&limit=10
```

#### Get Product by ID
```http
GET /api/products/:id
```

#### Create Product (Admin)
```http
POST /api/products
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "category": "men",
  "brand": "Brand Name",
  "images": [],
  "variants": [],
  "stock": 100
}
```

#### Update Product (Admin)
```http
PATCH /api/products/:id
Authorization: Bearer {token}
Content-Type: application/json
```

#### Delete Product (Admin)
```http
DELETE /api/products/:id
Authorization: Bearer {token}
```

---

### **Orders** (`/api/orders`)

#### Create Order
```http
POST /api/orders
Authorization: Bearer {token}
Content-Type: application/json

{
  "items": [...],
  "shippingAddress": {...},
  "paymentInfo": {...},
  "subtotal": 100,
  "shippingCost": 10,
  "tax": 9,
  "total": 119
}
```

#### Get User Orders
```http
GET /api/orders
Authorization: Bearer {token}
```

#### Get All Orders (Admin)
```http
GET /api/orders?status=pending&page=1&limit=10
Authorization: Bearer {token}
```

#### Get Order by ID
```http
GET /api/orders/:id
Authorization: Bearer {token}
```

#### Update Order Status
```http
PATCH /api/orders/:id
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "shipped",
  "trackingNumber": "TRACK123"
}
```

---

## 🗄️ Database Schema

### **Users Table**
```sql
- id (UUID, PK)
- email (String, Unique)
- password (String, Hashed)
- firstName (String)
- lastName (String)
- phone (String, Nullable)
- role (Enum: customer, admin)
- isActive (Boolean)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

### **Products Table**
```sql
- id (UUID, PK)
- name (String)
- description (Text)
- price (Decimal)
- salePrice (Decimal, Nullable)
- category (String)
- brand (String)
- images (JSONB)
- variants (JSONB)
- colors (JSONB)
- sizes (JSONB)
- stock (Integer)
- rating (Decimal)
- reviewCount (Integer)
- featured (Boolean)
- isActive (Boolean)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

### **Orders Table**
```sql
- id (UUID, PK)
- orderNumber (String, Unique)
- userId (UUID, FK)
- items (JSONB)
- shippingAddress (JSONB)
- paymentInfo (JSONB)
- subtotal (Decimal)
- shippingCost (Decimal)
- tax (Decimal)
- total (Decimal)
- status (Enum)
- trackingNumber (String, Nullable)
- estimatedDelivery (Timestamp, Nullable)
- createdAt (Timestamp)
- updatedAt (Timestamp)
```

---

## 🔐 Authentication

### JWT Token Format
```json
{
  "sub": "user-id",
  "email": "user@example.com",
  "role": "customer",
  "iat": 1234567890,
  "exp": 1234567890
}
```

### Protected Routes
Thêm token vào header:
```
Authorization: Bearer {your-jwt-token}
```

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Run Production
```bash
npm run start:prod
```

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=3001
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=fashionhub
JWT_SECRET=your-secure-secret
JWT_EXPIRES_IN=7d
```

---

## 📂 Project Structure

```
backend/
├── src/
│   ├── auth/              # Authentication module
│   │   ├── guards/        # JWT guard
│   │   ├── strategies/    # JWT strategy
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── users/             # Users module
│   │   ├── entities/      # User entity
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   └── users.module.ts
│   ├── products/          # Products module
│   │   ├── entities/      # Product entity
│   │   ├── products.controller.ts
│   │   ├── products.service.ts
│   │   └── products.module.ts
│   ├── orders/            # Orders module
│   │   ├── entities/      # Order entity
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── orders.module.ts
│   ├── database/          # Database configuration
│   ├── common/            # Common utilities
│   ├── config/            # App configuration
│   ├── app.module.ts      # Root module
│   └── main.ts            # Entry point
├── .env                   # Environment variables
├── .env.example           # Example env file
├── nest-cli.json          # NestJS CLI config
├── tsconfig.json          # TypeScript config
└── package.json           # Dependencies
```

---

## 🎯 Development Tips

### Generate Module
```bash
cd backend
nest generate module products
nest generate controller products
nest generate service products
```

### Database Migrations
```bash
npm run migration:generate -- -n CreateUsersTable
npm run migration:run
```

### Watch Mode
```bash
npm run start:dev
```

---

## ✅ Status

```
✅ NestJS setup complete
✅ TypeORM configured
✅ Authentication implemented
✅ Users CRUD
✅ Products CRUD
✅ Orders CRUD
✅ JWT protection
✅ Role-based access
✅ CORS enabled
✅ Validation pipes
```

---

## 📝 Notes

- Database synchronize is enabled in development
- Change JWT_SECRET in production
- Configure proper CORS origins
- Add rate limiting for production
- Implement proper error handling
- Add logging service
- Set up migrations for production

---

**Backend API ready for FashionHub! 🎉**

