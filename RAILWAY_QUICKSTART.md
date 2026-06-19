# 🚀 Deploy to Railway in 5 Minutes

The fastest way to get your Egypt World Cup Predictor online!

## ✅ Prerequisites

- GitHub account
- Code pushed to GitHub repository

## 📝 Step-by-Step Deployment

### 1. Sign Up for Railway (30 seconds)

1. Go to https://railway.app
2. Click **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway

### 2. Deploy Your App (2 minutes)

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your repository
4. Railway will automatically:
   - Detect Node.js
   - Install dependencies
   - Start your server

### 3. Configure Environment (1 minute)

1. Click on your deployed service
2. Go to **"Variables"** tab
3. Add these variables:
   ```
   PORT=3001
   NODE_ENV=production
   ```

### 4. Generate Public URL (30 seconds)

1. Go to **"Settings"** tab
2. Click **"Generate Domain"**
3. Copy your URL (e.g., `https://egypt-wc.railway.app`)

### 5. Share with Team (30 seconds)

Send the URL to your coworkers - they can start predicting immediately!

## 🎯 That's It!

Your app is now live at: `https://your-app.railway.app`

## 💡 Quick Tips

### Update Your App
```bash
git add .
git commit -m "Update"
git push
# Railway auto-deploys!
```

### View Logs
1. Go to Railway dashboard
2. Click your service
3. Click **"Deployments"**
4. Click **"View Logs"**

### Download Database Backup
1. Railway dashboard
2. Your service
3. **"Data"** tab
4. Download `predictions.db`

## 🆓 Free Tier

Railway gives you:
- **$5 free credit/month**
- **500 hours execution**
- **100 GB bandwidth**

Perfect for this app! (~$3-4/month usage)

## 🐛 Troubleshooting

### Build Failed?
- Check logs in Railway dashboard
- Verify `package.json` has `"start": "node server/index.js"`
- Ensure all dependencies are in `package.json`

### App Not Loading?
- Check if service is running (green dot)
- Verify domain is generated
- Check browser console for errors

### Database Not Saving?
- Railway automatically persists SQLite
- Check logs for database errors
- Verify `server/` directory exists

## 📞 Need Help?

- Full guide: [`RAILWAY_DEPLOYMENT.md`](RAILWAY_DEPLOYMENT.md:1)
- Railway docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway

---

**Your app is live! Share the URL and start collecting predictions! 🇪🇬⚽🏆**