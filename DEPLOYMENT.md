# Egypt World Cup 2026 Score Predictor - Deployment Guide

A simple full-stack web application for coworkers to submit score predictions for Egypt's 2026 FIFA World Cup matches.

## 🎯 Features

- ✅ Submit predictions for Egypt's 2 World Cup matches
- ✅ Form validation (name, email, scores)
- ✅ Duplicate email prevention per match
- ✅ Real-time countdown timers
- ✅ Prediction history visible to everyone
- ✅ SQLite database for data persistence
- ✅ No login required

## 📋 Prerequisites

- **Node.js** 18+ and npm
- Modern web browser

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies

```bash
npm install
```

This installs:
- Frontend: React, Vite, TailwindCSS, Framer Motion
- Backend: Express, better-sqlite3, cors

### 2. Start the Application

**Option A: Run both frontend and backend together (recommended)**
```bash
npm run dev:all
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend server
npm run server

# Terminal 2 - Frontend dev server
npm run dev
```

### 3. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

The database file `predictions.db` will be automatically created in the `server/` directory.

## 📊 Database Schema

```sql
CREATE TABLE predictions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  match_id INTEGER NOT NULL,
  home_score INTEGER NOT NULL,
  away_score INTEGER NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(email, match_id)
);
```

## 🎮 How to Use

### For Users

1. **Enter Information**: Full name and email address
2. **Make Predictions**: Enter scores for one or both Egypt matches
3. **Submit**: Click "Submit Predictions"
4. **View History**: Click "History" to see all predictions

### Match Details

**Match 1: New Zealand vs Egypt**
- Date: Monday, June 22, 2026
- Time: 4:00 AM Cairo Time (UTC+3)

**Match 2: Egypt vs Iran**
- Date: Saturday, June 27, 2026
- Time: 6:00 AM Cairo Time (UTC+3)

## 🌐 Deployment Options

### Option 1: Railway (Recommended - Easiest)

Railway provides free hosting with automatic deployments.

1. **Create Railway Account**: https://railway.app
2. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```
3. **Login and Deploy**:
   ```bash
   railway login
   railway init
   railway up
   ```
4. **Add Start Script** to package.json:
   ```json
   "scripts": {
     "start": "node server/index.js"
   }
   ```
5. **Set Environment Variables** in Railway dashboard:
   - `PORT`: 3001 (or Railway's assigned port)
6. **Deploy Frontend**: Build and serve static files
   ```bash
   npm run build
   ```
   Upload `dist/` folder to Railway or use a separate service

**Railway Advantages**:
- ✅ Free tier available
- ✅ Automatic HTTPS
- ✅ Easy database persistence
- ✅ Simple deployment process

### Option 2: Render

Render offers free web services with automatic deployments.

1. **Create Render Account**: https://render.com
2. **Create New Web Service**
3. **Connect GitHub Repository**
4. **Configure Build Settings**:
   - Build Command: `npm install`
   - Start Command: `node server/index.js`
5. **Deploy Frontend Separately**:
   - Create Static Site
   - Build Command: `npm run build`
   - Publish Directory: `dist`

**Render Advantages**:
- ✅ Free tier with 750 hours/month
- ✅ Automatic SSL
- ✅ GitHub integration
- ✅ Easy scaling

### Option 3: Heroku

1. **Create Heroku Account**: https://heroku.com
2. **Install Heroku CLI**:
   ```bash
   npm install -g heroku
   ```
3. **Create and Deploy**:
   ```bash
   heroku login
   heroku create egypt-wc-predictor
   git push heroku main
   ```
4. **Add Procfile**:
   ```
   web: node server/index.js
   ```

### Option 4: Local Network (For Office Use)

Perfect for sharing within the same office network.

1. **Find Your Local IP**:
   ```bash
   # Windows
   ipconfig
   
   # Mac/Linux
   ifconfig | grep "inet "
   ```

2. **Update Backend CORS** in `server/index.js`:
   ```javascript
   app.use(cors({
     origin: '*' // Allow all origins on local network
   }));
   ```

3. **Update Frontend API URL** in `src/SimpleApp.jsx`:
   ```javascript
   const API_URL = 'http://YOUR_LOCAL_IP:3001/api'
   ```

4. **Start Both Servers**:
   ```bash
   npm run dev:all
   ```

5. **Share URL with Coworkers**:
   - Frontend: `http://YOUR_LOCAL_IP:5173`
   - They must be on the same network

**Local Network Advantages**:
- ✅ No hosting costs
- ✅ Fast performance
- ✅ Full control
- ❌ Only works on same network
- ❌ Computer must stay on

### Option 5: DigitalOcean App Platform

1. **Create DigitalOcean Account**: https://digitalocean.com
2. **Create New App**
3. **Connect GitHub Repository**
4. **Configure Components**:
   - Backend: Node.js service
   - Frontend: Static site
5. **Deploy**

**DigitalOcean Advantages**:
- ✅ $5/month starter tier
- ✅ Reliable infrastructure
- ✅ Easy scaling
- ✅ Good documentation

## 🔧 Production Build

### Build Frontend for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

### Serve Production Build

```bash
npm run preview
```

Or use a static file server:
```bash
npx serve dist
```

## 🔒 Security Considerations

### For Production Deployment

1. **Environment Variables**: Store sensitive data in environment variables
   ```javascript
   const PORT = process.env.PORT || 3001
   const DB_PATH = process.env.DB_PATH || './predictions.db'
   ```

2. **CORS Configuration**: Restrict origins in production
   ```javascript
   app.use(cors({
     origin: 'https://your-frontend-domain.com'
   }));
   ```

3. **Rate Limiting**: Add rate limiting to prevent abuse
   ```bash
   npm install express-rate-limit
   ```
   ```javascript
   import rateLimit from 'express-rate-limit';
   
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100 // limit each IP to 100 requests per windowMs
   });
   
   app.use('/api/', limiter);
   ```

4. **Input Validation**: Already implemented in backend
   - Email format validation
   - Score range validation (0-20)
   - Duplicate prevention

5. **HTTPS**: Always use HTTPS in production (automatic with Railway/Render/Heroku)

## 📱 Mobile Access

The application is fully responsive and works on mobile devices. Users can:
- Access via mobile browser
- Add to home screen for app-like experience
- View and submit predictions on the go

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 3001 is in use
# Windows
netstat -ano | findstr :3001

# Mac/Linux
lsof -i :3001

# Kill the process or change port in server/index.js
```

### Frontend can't connect to backend
1. Check backend is running on http://localhost:3001
2. Check CORS settings in `server/index.js`
3. Verify API_URL in `src/SimpleApp.jsx`

### Database errors
```bash
# Delete and recreate database
rm server/predictions.db
# Restart server - it will recreate the database
```

### Build errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Monitoring

### View Database Contents

```bash
# Install SQLite CLI
npm install -g sqlite3

# Open database
sqlite3 server/predictions.db

# View all predictions
SELECT * FROM predictions;

# Count predictions per match
SELECT match_id, COUNT(*) as count FROM predictions GROUP BY match_id;

# Exit
.exit
```

### API Endpoints

- `GET /api/health` - Health check
- `GET /api/matches` - Get all matches
- `GET /api/predictions` - Get all predictions
- `POST /api/predictions` - Submit new prediction

## 🎨 Customization

### Change Match Data

Edit `server/index.js` to update match information:
```javascript
const EGYPT_MATCHES = [
  {
    id: 1,
    homeTeam: { name: 'New Zealand', code: 'NZL', flag: '🇳🇿' },
    awayTeam: { name: 'Egypt', code: 'EGY', flag: '🇪🇬' },
    date: '2026-06-22T01:00:00Z',
    venue: 'Stadium Name'
  }
]
```

### Change Colors

Edit `tailwind.config.js` to customize colors:
```javascript
colors: {
  'ibm-blue': '#0f62fe',
  // Add your custom colors
}
```

## 📈 Scaling

For larger teams (100+ users):
- Consider PostgreSQL instead of SQLite
- Add caching layer (Redis)
- Implement WebSocket for real-time updates
- Add authentication system

## 🤝 Support

For issues or questions:
1. Check this documentation
2. Review error messages in browser console
3. Check server logs
4. Verify all dependencies are installed

## 📄 License

Internal use only.

---

**Built for Egypt World Cup 2026 🇪🇬⚽**

Good luck with your predictions!