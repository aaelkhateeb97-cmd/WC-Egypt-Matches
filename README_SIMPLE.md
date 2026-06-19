# Egypt World Cup 2026 Score Predictor ⚽🇪🇬

A simple, full-stack web application for coworkers to submit score predictions for Egypt's 2026 FIFA World Cup matches.

## ✨ Features

- 📝 **Simple Form**: Enter name, email, and score predictions
- 🔒 **Duplicate Prevention**: Each email can only submit once per match
- ⏱️ **Live Countdown**: Real-time countdown to match kickoff
- 🔐 **Auto-Lock**: Matches lock automatically after kickoff
- 📊 **Public History**: Everyone can view all predictions
- 💾 **Data Persistence**: SQLite database stores all predictions
- 🚫 **No Login Required**: Quick and easy access for everyone

## 🎯 Matches

### Match 1: New Zealand vs Egypt
- **Date**: Monday, June 22, 2026
- **Time**: 4:00 AM Cairo Time (UTC+3)

### Match 2: Egypt vs Iran
- **Date**: Saturday, June 27, 2026
- **Time**: 6:00 AM Cairo Time (UTC+3)

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Application
```bash
npm run dev:all
```

This starts both:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

### 3. Open in Browser
Navigate to http://localhost:5173 and start predicting!

## 📁 Project Structure

```
WC/
├── server/
│   ├── index.js           # Express backend server
│   └── predictions.db     # SQLite database (auto-created)
├── src/
│   ├── SimpleApp.jsx      # Main application component
│   ├── main.jsx           # Entry point
│   └── index.css          # Styles
├── package.json           # Dependencies and scripts
├── DEPLOYMENT.md          # Detailed deployment guide
└── README_SIMPLE.md       # This file
```

## 🛠️ Technology Stack

### Frontend
- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **TailwindCSS**: Styling
- **Framer Motion**: Animations
- **Lucide React**: Icons

### Backend
- **Express**: Web server
- **better-sqlite3**: Database
- **CORS**: Cross-origin requests

## 📊 How It Works

### User Flow
1. User enters name and email
2. User predicts scores for one or both matches
3. System validates:
   - Name and email are filled
   - Scores are valid numbers (0+)
   - Email hasn't already predicted this match
4. Prediction is saved to database
5. Success message shows submitted predictions
6. User can view all predictions in history

### Backend API

**GET /api/matches**
- Returns list of Egypt's 2 matches

**POST /api/predictions**
- Submits new predictions
- Body: `{ name, email, predictions: { matchId: { homeScore, awayScore } } }`
- Returns: Success message or error

**GET /api/predictions**
- Returns all predictions grouped by user

**GET /api/health**
- Health check endpoint

## 🌐 Deployment Options

### Recommended: Railway (Free & Easy)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Alternative: Render
1. Connect GitHub repository
2. Set build command: `npm install`
3. Set start command: `node server/index.js`

### Local Network (Office Use)
1. Find your IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. Update API_URL in `src/SimpleApp.jsx` to your IP
3. Share `http://YOUR_IP:5173` with coworkers

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🔧 Development

### Run Frontend Only
```bash
npm run dev
```

### Run Backend Only
```bash
npm run server
```

### Run Both Together
```bash
npm run dev:all
```

### Build for Production
```bash
npm run build
```

## 📝 Database Schema

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

## 🎨 Customization

### Change Match Data
Edit `server/index.js`:
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
Edit `tailwind.config.js` to customize the color scheme.

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3001
kill -9 <PID>
```

### Can't Connect to Backend
1. Verify backend is running on port 3001
2. Check browser console for errors
3. Ensure CORS is configured correctly

### Database Issues
```bash
# Delete and recreate database
rm server/predictions.db
npm run server
```

## 📱 Mobile Support

The application is fully responsive and works on:
- 📱 Mobile phones
- 💻 Tablets
- 🖥️ Desktop computers

## 🔒 Security Features

- ✅ Email format validation
- ✅ Score range validation (0-20)
- ✅ Duplicate submission prevention
- ✅ SQL injection protection (parameterized queries)
- ✅ Input sanitization
- ✅ CORS configuration

## 📈 Future Enhancements (Optional)

- [ ] Admin panel to enter actual results
- [ ] Automatic scoring and leaderboard
- [ ] Export predictions to CSV
- [ ] Email notifications
- [ ] Real-time updates with WebSocket
- [ ] User authentication
- [ ] Multiple tournament support

## 🤝 Contributing

This is a simple internal project. Feel free to:
- Report bugs
- Suggest features
- Submit improvements

## 📄 License

Internal use only.

---

## 🎯 Quick Commands Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Start frontend only |
| `npm run server` | Start backend only |
| `npm run dev:all` | Start both frontend and backend |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

**Built with ❤️ for Egypt World Cup 2026**

Good luck with your predictions! 🇪🇬⚽🏆