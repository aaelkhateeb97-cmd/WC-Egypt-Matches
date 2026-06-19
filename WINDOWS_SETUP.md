# Windows Setup Guide - No Build Tools Required! ✅

This application now uses **sql.js** instead of better-sqlite3, so it works on Windows without Visual Studio build tools!

## ✨ What Changed

- ✅ Switched from `better-sqlite3` to `sql.js`
- ✅ No C++ compilation required
- ✅ No Visual Studio build tools needed
- ✅ Pure JavaScript - works on any Windows machine
- ✅ Same functionality, easier installation

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

This now installs cleanly on Windows without any build errors!

### Step 2: Start Backend
```bash
npm run server
```

You should see:
```
🚀 Server running on http://localhost:3001
📊 Database: C:\Users\Z\Downloads\WC\server\predictions.db
✅ Using sql.js (no build tools required)
```

### Step 3: Start Frontend (New Terminal)
```bash
npm run dev
```

You should see:
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 4: Open Browser
Navigate to **http://localhost:5173**

You'll see:
- 🇪🇬 Egypt World Cup 2026 header
- Form for name and email
- **2 match cards with score inputs**:
  - Match 1: New Zealand 🇳🇿 vs Egypt 🇪🇬 (June 22, 4:00 AM Cairo)
  - Match 2: Egypt 🇪🇬 vs Iran 🇮🇷 (June 27, 6:00 AM Cairo)

## ✅ Success Indicators

You know it's working when:

1. ✅ Backend starts without errors
2. ✅ Frontend loads at http://localhost:5173
3. ✅ You see 2 match cards with flags
4. ✅ Each match has 2 score input boxes
5. ✅ Countdown timers are running
6. ✅ You can enter scores and submit

## 🎯 Test the Application

1. **Enter your information**:
   - Name: Your Name
   - Email: your.email@example.com

2. **Make predictions**:
   - Match 1: Enter scores (e.g., 2 - 1)
   - Match 2: Enter scores (e.g., 3 - 2)

3. **Submit**:
   - Click "Submit Predictions"
   - See success message

4. **View History**:
   - Click "History" button
   - See your prediction listed

## 📊 Database

The database file is created at:
```
C:\Users\Z\Downloads\WC\server\predictions.db
```

It's a standard SQLite database that persists all predictions.

## 🔧 Troubleshooting

### "Cannot find module 'sql.js'"
```bash
npm install sql.js
```

### Port Already in Use
```bash
# Find process using port 3001
netstat -ano | findstr :3001

# Kill it
taskkill /PID <PID> /F
```

### Frontend Can't Connect
1. Verify backend is running on port 3001
2. Check browser console for errors
3. Ensure no firewall blocking localhost

### No Matches Showing
1. Check backend is running (Terminal 1)
2. Check frontend is running (Terminal 2)
3. Open browser DevTools (F12) and check Console
4. Verify http://localhost:3001/api/matches returns data

## 🎨 What You'll See

### Main Page
- Clean dark theme with IBM Blue accents
- Egypt flag (🇪🇬) in header
- Name and email input fields
- 2 match cards with:
  - Team flags
  - Team names
  - Date and time in Cairo timezone
  - Countdown timer
  - Score input boxes (0-20)
  - Submit button

### After Submission
- Success message with checkmark
- Your predictions displayed
- Button to view all predictions

### History Page
- All submitted predictions
- Grouped by user
- Email masked for privacy
- Match details with scores

## 💡 Tips

### Run Both Servers Together
Instead of opening 2 terminals, you can use:
```bash
npm run dev:all
```

This requires `concurrently` which is already in package.json.

### Stop Servers
Press `Ctrl+C` in each terminal window.

### Reset Database
```bash
# Delete database file
del server\predictions.db

# Restart server (it will recreate)
npm run server
```

## 🌐 Share with Coworkers

### Option 1: Local Network
1. Find your IP: `ipconfig` (look for IPv4 Address)
2. Update `src/SimpleApp.jsx` line 5:
   ```javascript
   const API_URL = 'http://YOUR_IP:3001/api'
   ```
3. Share: `http://YOUR_IP:5173`

### Option 2: Deploy to Railway
See [`RAILWAY_QUICKSTART.md`](RAILWAY_QUICKSTART.md:1) for deployment instructions.

## 📚 More Documentation

- [`README_SIMPLE.md`](README_SIMPLE.md:1) - User guide
- [`SETUP_GUIDE.md`](SETUP_GUIDE.md:1) - Detailed setup
- [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md:1) - Common issues
- [`RAILWAY_DEPLOYMENT.md`](RAILWAY_DEPLOYMENT.md:1) - Cloud deployment

## ✨ Key Advantages of sql.js

1. **No Build Tools**: Works on any Windows machine
2. **Pure JavaScript**: No C++ compilation
3. **Same Features**: Full SQLite functionality
4. **Easy Install**: `npm install` just works
5. **Portable**: Database file is standard SQLite

## 🎉 You're Ready!

Your Egypt World Cup 2026 Score Predictor is now running!

**Access it at**: http://localhost:5173

**The 2 Egypt matches are ready for predictions!** 🇪🇬⚽🏆

---

**No more build tool errors on Windows!** 🎊