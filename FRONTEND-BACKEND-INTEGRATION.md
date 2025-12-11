# 🔗 FRONTEND-BACKEND API INTEGRATION

## ✅ FRONTEND ĐÃ ĐƯỢC CẬP NHẬT ĐỂ GỌI BACKEND API!

---

## 🎯 TỔNG QUAN

Frontend đã được cập nhật để:
1. **Gọi Backend API** tại `http://localhost:3001/api`
2. **Fallback tự động** về mock data nếu backend không chạy
3. **Hoạt động offline** với dữ liệu local

---

## 📁 FILES ĐÃ CẬP NHẬT

### **1. API Configuration**
```
✅ src/utils/api.ts (NEW)
   - API_BASE_URL = 'http://localhost:3001/api'
   - Helper functions for all API calls
   - Token management
   - Error handling
```

### **2. Auth Store**
```
✅ src/stores/auth.ts
   - Login calls: POST /api/auth/login
   - Register calls: POST /api/auth/register
   - Profile calls: GET /api/auth/me
   - Fallback to mock login if backend unavailable
```

### **3. Orders Store**
```
✅ src/stores/orders.ts
   - Fetch orders: GET /api/orders
   - Create order: POST /api/orders
   - Update order: PATCH /api/orders/:id
   - Fallback to localStorage
```

### **4. Admin Products**
```
✅ src/pages/admin/products.astro
   - Fetch products: GET /api/products
   - Delete product: DELETE /api/products/:id
   - Fallback to mockProducts
```

### **5. Admin Orders**
```
✅ src/pages/admin/orders.astro
   - Fetch orders: GET /api/orders
   - Fallback to local orders
```

### **6. Admin Users**
```
✅ src/pages/admin/users.astro
   - Fetch users: GET /api/users
   - Delete user: DELETE /api/users/:id
   - Fallback to mock users
```

---

## 🔌 API ENDPOINTS ĐƯỢC GỌI

### **Authentication:**
```
POST   /api/auth/register    ← Register
POST   /api/auth/login       ← Login
GET    /api/auth/me          ← Get current user
POST   /api/auth/logout      ← Logout
```

### **Products:**
```
GET    /api/products         ← List products
GET    /api/products/:id     ← Get product detail
DELETE /api/products/:id     ← Delete product (Admin)
```

### **Orders:**
```
GET    /api/orders           ← List orders
POST   /api/orders           ← Create order
PATCH  /api/orders/:id       ← Update order status
```

### **Users:**
```
GET    /api/users            ← List users (Admin)
DELETE /api/users/:id        ← Delete user (Admin)
PATCH  /api/users/:id        ← Update user
```

---

## 🔐 AUTHENTICATION FLOW

### **Login:**
```typescript
// 1. User submits login form
// 2. Frontend calls POST /api/auth/login
// 3. Backend returns { user, token }
// 4. Frontend stores token in localStorage
// 5. Token used for subsequent API calls

const response = await fetch('http://localhost:3001/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});

const { user, token } = await response.json();
localStorage.setItem('auth_token', token);
```

### **Protected Requests:**
```typescript
const token = localStorage.getItem('auth_token');
const response = await fetch('http://localhost:3001/api/orders', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🔄 FALLBACK MECHANISM

### **Khi Backend CHẠY:**
```
Frontend → Backend API → Database (mock)
         ↓
    Response: Real data from API
```

### **Khi Backend KHÔNG CHẠY:**
```
Frontend → Backend API (fails)
         ↓
    Fallback → Mock data / localStorage
         ↓
    Response: Local data
```

### **Code Example:**
```typescript
async function loadProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (response.ok) {
      products = await response.json();
      console.log('Loaded from API');
    }
  } catch (error) {
    console.log('Backend not available, using mock data');
    products = mockProducts; // Fallback
  }
}
```

---

## 🚀 HOW TO TEST

### **1. Start Backend:**
```bash
cd backend
npm run start:dev
# Runs at http://localhost:3001
```

### **2. Start Frontend:**
```bash
npm run dev
# Runs at http://localhost:4321
```

### **3. Test Login:**
```
Email: admin@fashionhub.com
Password: admin123
```

### **4. Test API Calls:**
```bash
# Check products from API
curl http://localhost:3001/api/products

# Check frontend console for:
# - "Loaded from backend API" ← Backend running
# - "Backend not available, using mock data" ← Backend not running
```

---

## 📊 TEST SCENARIOS

### **Scenario 1: Both Running**
```
Frontend (4321) ←→ Backend (3001)
                      ↓
                 Mock Database
                      ↓
              Real API responses
```

### **Scenario 2: Frontend Only**
```
Frontend (4321) → Backend (fail)
                      ↓
              Fallback to mock data
                      ↓
              Still works perfectly!
```

### **Scenario 3: Production**
```
Frontend → Real Backend → Real Database
```

---

## ✅ FEATURES WORKING

### **With Backend:**
- ✅ User registration (saved to backend)
- ✅ User login (JWT token)
- ✅ Fetch products from API
- ✅ Create orders (saved to backend)
- ✅ Admin: View users from API
- ✅ Admin: Delete products/users

### **Without Backend (Fallback):**
- ✅ Mock login (any email/password)
- ✅ Products from mockProducts
- ✅ Orders saved to localStorage
- ✅ All pages work normally

---

## 🎯 PORTS FIXED

```
Frontend:   http://localhost:4321  ✅
Backend:    http://localhost:3001  ✅
API:        http://localhost:3001/api  ✅
```

---

## 📝 NOTES

### **Token Storage:**
- Key: `auth_token`
- Location: localStorage
- Format: JWT string

### **User Storage:**
- Key: `fashionhub_auth`
- Location: localStorage
- Format: JSON user object

### **Orders Storage:**
- Key: `fashionhub_orders`
- Location: localStorage
- Format: JSON array

---

## 🎊 SUMMARY

**Frontend đã được cập nhật để:**

```
✅ Gọi Backend API tại localhost:3001
✅ Tự động fallback nếu backend không chạy
✅ Authentication với JWT
✅ Protected routes với Bearer token
✅ CRUD operations đầy đủ
✅ Admin functions hoạt động
✅ Build thành công
✅ Pushed to GitHub
```

**Bạn có thể chạy:**
- **Frontend only** → Dùng mock data
- **Frontend + Backend** → Dùng real API

---

## 🔗 FILES CHANGED

```
src/
├── utils/
│   └── api.ts              ← NEW: API configuration
├── stores/
│   ├── auth.ts             ← Updated: API calls
│   └── orders.ts           ← Updated: API calls
└── pages/
    └── admin/
        ├── products.astro  ← Updated: API calls
        ├── orders.astro    ← Updated: API calls
        └── users.astro     ← Updated: API calls
```

---

**Frontend-Backend integration complete! 🚀✨**

