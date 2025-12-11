# 🗄️ MOCK DATA CONFIGURATION

## ✅ MOCK DATA ĐÃ ĐƯỢC CẤU HÌNH!

Backend và Frontend đều sử dụng **mock data (test data)** - không cần database thật!

---

## 🎯 CONFIGURATION

### **Backend:**
```
Database:     Mock (In-memory)
File:         backend/src/database/mock-database.ts
TypeORM:      Disabled (commented out)
```

### **Frontend:**
```
Data Source:  Local mock-data.ts
File:         src/utils/mock-data.ts
```

---

## 📦 MOCK DATA INCLUDES

### **Users (2 accounts):**
```
Admin:
- Email: admin@fashionhub.com
- Password: admin123
- Role: admin

Customer:
- Email: customer@example.com  
- Password: customer123
- Role: customer
```

### **Products (10 items):**
```
1. Classic White T-Shirt    - $24.99 (was $29.99)
2. Slim Fit Denim Jeans     - $59.99 (was $79.99)
3. Floral Summer Dress      - $69.99 (was $89.99)
4. Leather Jacket           - $249.99 (was $299.99)
5. Running Sneakers         - $99.99 (was $129.99)
6. Silk Blouse              - $119.99
7. Kids Cartoon T-Shirt     - $14.99 (was $19.99)
8. Wool Winter Coat         - $199.99 (was $249.99)
9. Canvas Backpack          - $59.99
10. Polo Shirt              - $39.99 (was $49.99)
```

### **Categories:**
- Men
- Women
- Kids
- Accessories

### **Orders:**
- Created dynamically when users place orders
- Stored in memory during runtime

---

## 🚀 HOW TO USE

### **Start Backend:**
```bash
cd backend
npm run start:dev
```
Server runs at: http://localhost:3001

### **Start Frontend:**
```bash
npm run dev
```
Server runs at: http://localhost:4321

### **Test API:**
```bash
# Get all products
curl http://localhost:3001/api/products

# Get featured products
curl "http://localhost:3001/api/products?featured=true"

# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## 🔄 SWITCHING TO REAL DATABASE

### **When Ready:**

1. **Install PostgreSQL** or use Docker:
```bash
docker run --name postgres-fashionhub \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=fashionhub \
  -p 5432:5432 -d postgres
```

2. **Update .env:**
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=fashionhub
```

3. **Enable TypeORM in database.module.ts:**
```typescript
// Uncomment TypeORM configuration
```

4. **Enable TypeORM in modules:**
```typescript
// users.module.ts, products.module.ts, orders.module.ts
// Uncomment TypeOrmModule.forFeature([Entity])
```

5. **Update Services:**
```typescript
// Replace mockDB calls with TypeORM repository methods
```

---

## 📁 FILES CHANGED

### **Backend:**
```
✅ src/database/database.module.ts   - TypeORM disabled
✅ src/database/mock-database.ts     - NEW: Mock database
✅ src/users/users.module.ts         - TypeORM disabled
✅ src/users/users.service.ts        - Uses mock database
✅ src/products/products.module.ts   - TypeORM disabled
✅ src/products/products.service.ts  - Uses mock database
✅ src/orders/orders.module.ts       - TypeORM disabled
✅ src/orders/orders.service.ts      - Uses mock database
```

---

## ⚠️ IMPORTANT NOTES

### **Data Persistence:**
```
❌ Data is NOT persisted
❌ Data resets on server restart
✅ Perfect for development/testing
✅ No database setup required
```

### **For Production:**
```
✅ Switch to real database (PostgreSQL)
✅ Enable TypeORM
✅ Run migrations
✅ Seed production data
```

---

## 🎯 BENEFITS

### **Development:**
```
✅ No database setup required
✅ Instant startup
✅ Fast development
✅ Easy testing
✅ Predictable data
```

### **Testing:**
```
✅ Consistent test data
✅ No database dependencies
✅ Easy to reset state
✅ Fast test runs
```

---

## 📊 API RESPONSES

### **GET /api/products:**
```json
{
  "products": [
    {
      "id": "prod-001",
      "name": "Classic White T-Shirt",
      "price": 29.99,
      "salePrice": 24.99,
      "category": "men",
      "brand": "FashionHub",
      "images": [...],
      "colors": [...],
      "sizes": [...],
      "stock": 100,
      "rating": 4.5,
      "reviewCount": 45,
      "featured": true
    }
  ],
  "total": 10
}
```

### **POST /api/auth/register:**
```json
{
  "success": true,
  "user": {
    "id": "user-xxx",
    "email": "test@test.com",
    "firstName": "Test",
    "lastName": "User",
    "role": "customer"
  },
  "token": "jwt-token-here"
}
```

---

## ✅ STATUS

```
Mock Data:        ✅ Configured
Backend Build:    ✅ Success
API Working:      ✅ Tested
No Database:      ✅ Required
Git Committed:    ✅ Pushed
```

---

## 🎊 SUMMARY

**Mock data configuration complete:**

```
✅ Backend uses in-memory mock database
✅ 10 sample products with images
✅ 2 pre-configured user accounts
✅ All CRUD operations working
✅ No database required
✅ Ready to switch to real DB later
```

---

**Development made easy! No database setup needed! 🚀✨**

