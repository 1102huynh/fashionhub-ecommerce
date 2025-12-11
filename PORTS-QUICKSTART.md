# 🚀 QUICK START - FIXED PORTS

## Ports đã được fix cứng:

```
Frontend: http://localhost:4321  ✅ FIXED
Backend:  http://localhost:3001  ✅ FIXED
```

---

## Start Development:

### Frontend only:
```bash
npm run dev
```

### Backend only:
```bash
npm run dev:backend
```

### Both (requires concurrently):
```bash
npm install -g concurrently
npm run dev:all
```

---

## ⚠️ Nếu Port bị chiếm:

### Port 4321 (Frontend):
```bash
netstat -ano | findstr :4321
taskkill /PID <PID> /F
```

### Port 3001 (Backend):
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

---

## 📖 Chi tiết:
- `PORT-CONFIGURATION.md` - Full documentation
- `PORT-FIX-SUMMARY.md` - Summary

---

**Không còn random ports nữa! 🎯**

