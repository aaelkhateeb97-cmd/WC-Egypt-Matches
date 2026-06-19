# Troubleshooting Guide

## Common Issues and Solutions

### 1. "Cannot find package 'express'" Error

**Problem**: Backend dependencies not installed

**Solution**:
```bash
npm install express cors better-sqlite3 concurrently
```

Or install all dependencies:
```bash
npm install
```

### 2. Application Not Showing Matches

**Problem**: Backend server not running

**Solution**:
```bash
# Start backend server
npm run server

# Or start both frontend and backend
npm run dev:all
```

**Verify backend is running**:
- Open http://localhost:3001/api/health
- Should see: `{"status":"ok","timestamp":"..."}`

### 3. "Port 3001 already in use"

**Problem**: Another process is using port 3001

**Solution (Windows)**:
```bash
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

**Solution (Mac/Linux)**:
```bash
lsof -i :3001
kill -9 <PID>
```

### 4. Frontend Can't Connect to Backend

**Problem**: CORS or wrong API URL

**Check**:
1. Backend is running on port 3001
2. Frontend is using correct API_URL
3. Check browser console for errors

**Solution**:
```javascript
// In src/SimpleApp.jsx, verify line 5:
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
```

### 5. No Matches Displayed

**Problem**: Backend not returning matches or frontend not fetching

**Debug Steps**:

1. **Check backend directly**:
   ```bash
   curl http://localhost:3001/api/matches
   ```
   Should return 2 Egypt matches

2. **Check browser console**:
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

3. **Verify backend is running**:
   ```bash
   npm run server
   ```
   Should see: "🚀 Server running on http://localhost:3001"

### 6. Database Errors

**Problem**: SQLite database issues

**Solution**:
```bash
# Delete database and let it recreate
rm server/predictions.db
npm run server
```

### 7. Build Errors

**Problem**: Missing dependencies or configuration issues

**Solution**:
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### 8. "npm run dev:all" Not Working

**Problem**: Concurrently not installed

**Solution**:
```bash
npm install concurrently --save-dev
```

Or run separately:
```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev
```

### 9. Predictions Not Saving

**Problem**: Backend not receiving data or database error

**Debug**:
1. Check server logs in terminal
2. Verify POST request in browser Network tab
3. Check database file exists: `server/predictions.db`

**Solution**:
```bash
# Check if server directory exists
mkdir -p server

# Restart server
npm run server
```

### 10. Styling Issues

**Problem**: TailwindCSS not loading

**Solution**:
```bash
# Rebuild
npm run build
npm run dev
```

## Quick Diagnostic Checklist

Run these commands to verify everything:

```bash
# 1. Check Node version (should be 18+)
node --version

# 2. Install dependencies
npm install

# 3. Start backend
npm run server
# Should see: "🚀 Server running on http://localhost:3001"

# 4. Test backend (in new terminal)
curl http://localhost:3001/api/health
# Should return: {"status":"ok",...}

# 5. Test matches endpoint
curl http://localhost:3001/api/matches
# Should return: [{"id":1,...},{"id":2,...}]

# 6. Start frontend (in new terminal)
npm run dev
# Should see: "Local: http://localhost:5173"

# 7. Open browser
# Navigate to: http://localhost:5173
```

## Environment Check

### Required Files

Verify these files exist:
- ✅ `server/index.js` - Backend server
- ✅ `src/SimpleApp.jsx` - Frontend app
- ✅ `package.json` - Dependencies
- ✅ `railway.json` - Railway config

### Required Dependencies

Check `package.json` includes:
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "better-sqlite3": "^9.2.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "vite": "^5.0.8"
  }
}
```

## Still Having Issues?

### 1. Check Logs

**Backend logs**:
- Look at terminal where `npm run server` is running
- Check for error messages

**Frontend logs**:
- Open browser DevTools (F12)
- Check Console tab
- Check Network tab

### 2. Verify Ports

```bash
# Check what's running on ports
netstat -ano | findstr :3001
netstat -ano | findstr :5173
```

### 3. Test API Manually

```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test matches endpoint
curl http://localhost:3001/api/matches

# Test predictions endpoint
curl http://localhost:3001/api/predictions
```

### 4. Fresh Start

```bash
# Stop all servers (Ctrl+C in terminals)

# Clean everything
rm -rf node_modules package-lock.json server/predictions.db

# Reinstall
npm install

# Start fresh
npm run dev:all
```

## Getting Help

If you're still stuck:

1. **Check the error message** - Read it carefully
2. **Search the error** - Google the exact error message
3. **Check documentation**:
   - [`README_SIMPLE.md`](README_SIMPLE.md:1)
   - [`SETUP_GUIDE.md`](SETUP_GUIDE.md:1)
   - [`DEPLOYMENT.md`](DEPLOYMENT.md:1)

## Success Indicators

You know everything is working when:

✅ Backend starts without errors
✅ `http://localhost:3001/api/health` returns OK
✅ `http://localhost:3001/api/matches` returns 2 matches
✅ Frontend loads at `http://localhost:5173`
✅ You can see 2 match cards with score inputs
✅ You can submit a prediction
✅ Prediction appears in history

---

**Most Common Fix**: Just run `npm install` then `npm run dev:all` 🚀