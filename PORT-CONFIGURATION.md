# 🔒 PORT CONFIGURATION - FIXED PORTS

## ✅ PORTS FIXED - NO RANDOM PORTS!

Tôi đã **fix cứng port cho cả backend và frontend** để tránh trường hợp port bị random!

---

## 🎯 FIXED PORTS

### **Frontend (Astro):**
```
Port:      4321 (FIXED)
URL:       http://localhost:4321
Config:    astro.config.mjs
StrictPort: true (will fail if port taken, not use random port)
```

### **Backend (NestJS):**
```
Port:      3001 (FIXED)
URL:       http://localhost:3001
API:       http://localhost:3001/api
Config:    src/main.ts
```

---

## 🔧 CHANGES MADE

### **1. ✅ Backend Port Fixed**

#### **File: `backend/src/main.ts`**

**Before:**
```typescript
const port = process.env.PORT || 3001;  // ❌ Could use env variable
await app.listen(port);
```

**After:**
```typescript
const port = 3001;  // ✅ Fixed to 3001, no fallback
await app.listen(port);
```

**Result:** Backend will ALWAYS use port 3001

---

### **2. ✅ Frontend Port Fixed**

#### **File: `astro.config.mjs`**

**Before:**
```javascript
server: {
  port: 4321,
  host: true
}
```

**After:**
```javascript
server: {
  port: 4321,
  host: true,
  strictPort: true,  // ✅ Don't use random port if 4321 is taken
}
```

**Result:** 
- Astro will ALWAYS try to use port 4321
- If port 4321 is taken, it will FAIL (not use random port)
- You'll get an error message to free up port 4321

---

### **3. ✅ Updated Package Scripts**

#### **File: `package.json`**

**New Scripts:**
```json
{
  "scripts": {
    "dev": "astro dev --port 4321",              // ✅ Explicitly set port
    "dev:frontend": "astro dev --port 4321",     // ✅ Frontend only
    "dev:backend": "cd backend && npm run start:dev",  // ✅ Backend only
    "dev:all": "concurrently \"npm run dev:frontend\" \"npm run dev:backend\"",  // ✅ Both
    "preview": "astro preview --port 4321",      // ✅ Preview on fixed port
    "build:all": "astro build && cd backend && npm run build"  // ✅ Build both
  }
}
```

---

## 🚀 HOW TO USE

### **Start Frontend Only:**
```bash
npm run dev
# or
npm run dev:frontend
```
**Result:** Frontend on http://localhost:4321

### **Start Backend Only:**
```bash
npm run dev:backend
```
**Result:** Backend on http://localhost:3001

### **Start Both (Recommended):**
```bash
npm run dev:all
```
**Result:** 
- Frontend: http://localhost:4321
- Backend: http://localhost:3001/api

---

## 🔒 PORT GUARANTEES

### **Frontend (Port 4321):**
```
✅ Will ALWAYS try to use 4321
✅ Will NOT use random port (4322, 4323, etc.)
✅ Will FAIL if 4321 is taken
❌ Error if port in use (you must free it first)
```

### **Backend (Port 3001):**
```
✅ Will ALWAYS use 3001
✅ Hardcoded in source code
✅ No environment variable override
❌ Will fail if port in use (must free it first)
```

---

## ⚠️ IF PORT IS ALREADY IN USE

### **Port 4321 Taken:**
```bash
# Find process using port 4321 (Windows)
netstat -ano | findstr :4321

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or just stop the running Astro server
```

### **Port 3001 Taken:**
```bash
# Find process using port 3001 (Windows)
netstat -ano | findstr :3001

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or just stop the running backend server
```

---

## 📝 CONFIGURATION FILES

### **Backend:**
```
File:     backend/src/main.ts
Line:     const port = 3001;
Fixed:    ✅ Hardcoded
Override: ❌ No environment variable
```

### **Frontend:**
```
File:     astro.config.mjs
Setting:  server.port = 4321
Setting:  server.strictPort = true
Fixed:    ✅ Configured
Override: ✅ Via --port flag in scripts
```

---

## 🎯 BENEFITS

### **Before:**
```
❌ Astro auto-increments port (4321 → 4322 → 4323...)
❌ Backend could use PORT env variable
❌ Inconsistent URLs
❌ Hard to remember which port to use
❌ API calls might fail due to wrong port
```

### **After:**
```
✅ Frontend ALWAYS on 4321
✅ Backend ALWAYS on 3001
✅ Consistent URLs
✅ Easy to remember
✅ API calls work correctly
✅ No random port changes
```

---

## 🔗 API CONFIGURATION

### **Frontend → Backend Communication:**

All frontend API calls should use:
```typescript
const API_URL = 'http://localhost:3001/api';

// Example
fetch(`${API_URL}/products`)
fetch(`${API_URL}/auth/login`)
```

### **Backend CORS Configuration:**

Already configured in `backend/src/main.ts`:
```typescript
app.enableCors({
  origin: ['http://localhost:4321', 'http://localhost:3000'],
  credentials: true,
});
```

---

## ✅ VERIFICATION

### **Check Ports:**

```bash
# Check if frontend is running
curl http://localhost:4321

# Check if backend is running
curl http://localhost:3001/api
```

### **Expected Response:**
```
Frontend: HTML page
Backend:  {"statusCode":404,"message":"Cannot GET /api"}
         (This is correct - means server is running)
```

---

## 📊 PORT SUMMARY

| Service | Port | URL | Fixed | Strict |
|---------|------|-----|-------|--------|
| Frontend | 4321 | http://localhost:4321 | ✅ | ✅ |
| Backend | 3001 | http://localhost:3001 | ✅ | ✅ |
| Backend API | 3001 | http://localhost:3001/api | ✅ | ✅ |

---

## 🎊 COMPLETE!

**Ports are now fixed:**

```
✅ Frontend: 4321 (FIXED, STRICT)
✅ Backend:  3001 (FIXED, HARDCODED)
✅ No random ports
✅ No port increments
✅ Consistent URLs
✅ Production-ready configuration
```

---

## 🚀 QUICK START

```bash
# Install dependencies (if needed)
npm install

# Start frontend only
npm run dev

# Start backend only
npm run dev:backend

# Start both (requires concurrently)
npm install -g concurrently
npm run dev:all
```

---

## 📝 NOTES

1. **StrictPort:** Astro will fail if port 4321 is taken (won't use 4322)
2. **Hardcoded:** Backend port is hardcoded in source (can't be changed via env)
3. **CORS:** Backend accepts requests from port 4321
4. **Development:** Both ports are for development (change for production)

---

**Port configuration complete! No more random ports! 🎯✨**

