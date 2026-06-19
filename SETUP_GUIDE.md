# Egypt World Cup 2026 Score Predictor - Setup Guide

## 🎯 What You've Built

A complete full-stack web application where coworkers can:
- Submit score predictions for Egypt's 2 World Cup matches
- View all submitted predictions in real-time
- See countdown timers to match kickoff
- Prevent duplicate submissions per email

## 📦 What's Included

### Backend (Node.js + Express + SQLite)
- ✅ RESTful API with 4 endpoints
- ✅ SQLite database for data persistence
- ✅ Email validation and duplicate prevention
- ✅ CORS enabled for frontend communication
- ✅ Automatic database creation

### Frontend (React + Vite + TailwindCSS)
- ✅ Clean, modern UI with Egypt theme
- ✅ Real-time countdown timers
- ✅ Form validation
- ✅ Prediction history viewer
- ✅ Fully responsive design
- ✅ Smooth animations

## 🚀 Getting Started (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

This installs all required packages for both frontend and backend.

### Step 2: Start the Application
```bash
npm run dev:all
```

This starts:
- **Backend server** on http://localhost:3001
- **Frontend app** on http://localhost:5173

### Step 3: Open in Browser
Navigate to **http://localhost:5173** and you're ready!

## 📁 Key Files

```
WC/
├── server/
│   ├── index.js              # Backend API server
│   └── predictions.db        # SQLite database (auto-created)
│
├── src/
│   ├── SimpleApp.jsx         # Main application
│   ├── main.jsx              # Entry point
│   └── index.css             # Styles
│
├── package.json              # Dependencies & scripts
├── README_SIMPLE.md          # User documentation
├── DEPLOYMENT.md             # Deployment guide
├── SETUP_GUIDE.md            # This file
└── test-api.js               # API testing script
```

## 🧪 Testing the Application

### Test the Backend API
```bash
# Start the backend server first
npm run server

# In another terminal, run the test
node test-api.js
```

This will test all API endpoints and verify everything is working.

### Manual Testing Checklist

1. **Submit a Prediction**
   - Enter name and email
   - Enter scores for both matches
   - Click "Submit Predictions"
   - Verify success message appears

2. **View History**
   - Click "History" button
   - Verify your prediction appears
   - Check email is masked for privacy

3. **Test Duplicate Prevention**
   - Try submitting again with same email
   - Verify error message appears

4. **Test Validation**
   - Try submitting without name/email
   - Try submitting with invalid scores
   - Verify appropriate error messages

## 🌐 Sharing with Coworkers

### Option 1: Local Network (Easiest for Office)

1. **Find Your Computer's IP Address**
   ```bash
   # Windows
   ipconfig
   # Look for "IPv4 Address" (e.g., 192.168.1.100)
   
   # Mac/Linux
   ifconfig | grep "inet "
   # Look for your local IP (e.g., 192.168.1.100)
   ```

2. **Update the Frontend API URL**
   
   Edit `src/SimpleApp.jsx`, line 6:
   ```javascript
   const API_URL = 'http://YOUR_IP_ADDRESS:3001/api'
   // Example: const API_URL = 'http://192.168.1.100:3001/api'
   ```

3. **Start the Application**
   ```bash
   npm run dev:all
   ```

4. **Share the URL**
   
   Tell coworkers to visit: `http://YOUR_IP_ADDRESS:5173`
   
   ⚠️ **Important**: 
   - Your computer must stay on
   - Coworkers must be on the same network
   - Keep both servers running

### Option 2: Cloud Hosting (Best for Remote Teams)

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions on:
- **Railway** (Recommended - Free tier)
- **Render** (Free tier with 750 hours/month)
- **Heroku** (Easy deployment)
- **DigitalOcean** ($5/month)

## 📊 Database Management

### View All Predictions
```bash
# Install SQLite CLI (if not installed)
npm install -g sqlite3

# Open database
sqlite3 server/predictions.db

# View all predictions
SELECT * FROM predictions;

# Count predictions per match
SELECT match_id, COUNT(*) FROM predictions GROUP BY match_id;

# Exit
.exit
```

### Reset Database
```bash
# Delete database file
rm server/predictions.db

# Restart server (it will recreate the database)
npm run server
```

## 🎨 Customization

### Change Match Times/Teams

Edit `server/index.js`, lines 23-42:
```javascript
const EGYPT_MATCHES = [
  {
    id: 1,
    homeTeam: { name: 'New Zealand', code: 'NZL', flag: '🇳🇿' },
    awayTeam: { name: 'Egypt', code: 'EGY', flag: '🇪🇬' },
    date: '2026-06-22T01:00:00Z', // Change date/time here
    venue: 'Stadium Name'
  },
  // ... match 2
]
```

### Change Colors

Edit `tailwind.config.js` to customize the color scheme.

### Add More Matches

1. Add match to `EGYPT_MATCHES` array in `server/index.js`
2. Restart the server
3. Frontend will automatically show the new match

## 🔧 Troubleshooting

### "Port 3001 already in use"
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3001
kill -9 <PID>
```

### "Cannot connect to backend"
1. Check backend is running: `npm run server`
2. Verify it's on port 3001
3. Check browser console for errors
4. Verify API_URL in `src/SimpleApp.jsx`

### "npm install fails"
```bash
# Clear cache and try again
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Database errors
```bash
# Delete and recreate
rm server/predictions.db
npm run server
```

## 📱 Mobile Access

The app works perfectly on mobile devices:
- Responsive design adapts to screen size
- Touch-friendly buttons and inputs
- Works on iOS and Android browsers

## 🔒 Security Notes

### Already Implemented
- ✅ Email format validation
- ✅ Score range validation (0-20)
- ✅ Duplicate prevention per match
- ✅ SQL injection protection
- ✅ Input sanitization
- ✅ CORS configuration

### For Production
- Consider adding rate limiting
- Use HTTPS (automatic with cloud hosting)
- Restrict CORS to your domain
- Add authentication if needed

## 📈 Monitoring

### Check Server Status
```bash
curl http://localhost:3001/api/health
```

### View Logs
Server logs appear in the terminal where you ran `npm run server`

### Check Predictions Count
```bash
curl http://localhost:3001/api/predictions | json_pp
```

## 🎯 Next Steps

1. **Test Locally**: Make sure everything works on your machine
2. **Share with Team**: Use local network or deploy to cloud
3. **Monitor Usage**: Check predictions are being saved
4. **Enjoy**: Watch the predictions roll in!

## 📞 Support

If you encounter issues:
1. Check this guide
2. Review [README_SIMPLE.md](README_SIMPLE.md)
3. Check [DEPLOYMENT.md](DEPLOYMENT.md) for hosting help
4. Review error messages in browser console
5. Check server logs in terminal

## 🎉 Success Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Backend starts without errors (`npm run server`)
- [ ] Frontend loads in browser (`npm run dev`)
- [ ] Can submit a prediction
- [ ] Prediction appears in history
- [ ] Duplicate prevention works
- [ ] Countdown timers are working
- [ ] Ready to share with coworkers!

---

## 🏆 You're All Set!

Your Egypt World Cup 2026 Score Predictor is ready to use!

**Quick Start Command:**
```bash
npm run dev:all
```

**Access at:** http://localhost:5173

Good luck with the predictions! 🇪🇬⚽🏆