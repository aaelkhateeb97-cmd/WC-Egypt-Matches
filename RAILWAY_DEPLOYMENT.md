# Deploy to Railway - Step-by-Step Guide

Railway is the recommended hosting platform for this application. It's free, easy to use, and perfect for small team applications.

## 🎯 Why Railway?

- ✅ **Free Tier**: $5 free credit per month (enough for this app)
- ✅ **Automatic HTTPS**: SSL certificates included
- ✅ **Easy Deployment**: Deploy in minutes
- ✅ **Database Persistence**: SQLite files are preserved
- ✅ **Auto-Deploy**: Push to GitHub and it deploys automatically
- ✅ **Environment Variables**: Easy configuration

## 📋 Prerequisites

- GitHub account
- Railway account (free)
- Your code pushed to GitHub

## 🚀 Deployment Steps

### Step 1: Prepare Your Code

1. **Add a start script** to `package.json`:

```json
{
  "scripts": {
    "start": "node server/index.js",
    "dev": "vite",
    "server": "node server/index.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

2. **Create a `railway.json` file** in the root directory:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

3. **Update CORS in `server/index.js`** to allow your Railway domain:

```javascript
// After deployment, update this with your Railway URL
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

4. **Commit and push to GitHub**:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### Step 2: Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"**
3. Sign up with GitHub (recommended)
4. Authorize Railway to access your repositories

### Step 3: Deploy Backend

1. **Create New Project**
   - Click **"New Project"**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository

2. **Configure Backend Service**
   - Railway will auto-detect Node.js
   - It will automatically run `npm install`
   - Start command: `node server/index.js`

3. **Add Environment Variables**
   - Click on your service
   - Go to **"Variables"** tab
   - Add:
     ```
     PORT=3001
     NODE_ENV=production
     ```

4. **Generate Domain**
   - Go to **"Settings"** tab
   - Click **"Generate Domain"**
   - Copy the URL (e.g., `https://your-app.railway.app`)

### Step 4: Deploy Frontend

**Option A: Deploy Frontend on Railway (Recommended)**

1. **Add Frontend Service**
   - In your project, click **"New"**
   - Select **"GitHub Repo"** (same repo)
   - This creates a second service

2. **Configure Frontend Build**
   - Add environment variable:
     ```
     VITE_API_URL=https://your-backend.railway.app/api
     ```
   - Build command: `npm run build`
   - Start command: `npx serve dist -p $PORT`

3. **Update Frontend Code**
   
   Edit `src/SimpleApp.jsx`:
   ```javascript
   const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'
   ```

4. **Generate Domain**
   - Generate domain for frontend service
   - This is the URL you'll share with coworkers

**Option B: Deploy Frontend on Netlify/Vercel (Alternative)**

If you prefer to separate frontend and backend:

1. **Build the frontend**:
   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder** to Netlify or Vercel

3. **Update API URL** in `src/SimpleApp.jsx` to point to Railway backend

### Step 5: Update CORS

Once you have your frontend URL, update `server/index.js`:

```javascript
app.use(cors({
  origin: [
    'https://your-frontend.railway.app',
    'http://localhost:5173' // Keep for local development
  ],
  credentials: true
}));
```

Commit and push - Railway will auto-deploy.

### Step 6: Test Your Deployment

1. **Visit your frontend URL**
2. **Submit a test prediction**
3. **Check the history** to verify it saved
4. **Try duplicate submission** to test validation

## 🔧 Configuration Files

### Create `railway.json`

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server/index.js",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

### Update `package.json`

Make sure you have:
```json
{
  "name": "egypt-wc-predictor",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server/index.js",
    "build": "vite build"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Create `.railwayignore` (optional)

```
node_modules/
.git/
*.log
.env
.vscode/
```

## 📊 Database Persistence

Railway automatically persists your SQLite database:

1. **Volume Mounting**: Railway mounts a persistent volume
2. **Database Location**: `server/predictions.db` is preserved across deploys
3. **Backups**: Download database from Railway dashboard if needed

### Download Database Backup

1. Go to Railway dashboard
2. Click on your service
3. Go to **"Data"** tab
4. Download `predictions.db`

## 🔒 Environment Variables

Set these in Railway dashboard:

```bash
# Required
PORT=3001
NODE_ENV=production

# Optional
FRONTEND_URL=https://your-frontend.railway.app
DB_PATH=/app/server/predictions.db
```

## 💰 Cost Estimation

Railway Free Tier:
- **$5 free credit/month**
- **500 hours execution time**
- **100 GB bandwidth**

For this small app:
- Backend: ~$2-3/month
- Frontend: ~$1-2/month
- **Total: ~$3-5/month** (covered by free tier!)

## 🔄 Continuous Deployment

Railway automatically deploys when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Railway automatically:
# 1. Detects the push
# 2. Builds the app
# 3. Deploys the new version
# 4. Zero downtime!
```

## 🐛 Troubleshooting

### Build Fails

**Check logs in Railway dashboard:**
1. Click on your service
2. Go to **"Deployments"** tab
3. Click on failed deployment
4. Review build logs

**Common issues:**
- Missing dependencies: Run `npm install` locally first
- Wrong Node version: Add `"engines"` to package.json
- Build command error: Check `railway.json`

### App Crashes

**Check runtime logs:**
1. Go to **"Deployments"** tab
2. Click **"View Logs"**
3. Look for error messages

**Common issues:**
- Port not set: Add `PORT` environment variable
- Database path: Ensure `server/` directory exists
- CORS errors: Update CORS configuration

### Database Not Persisting

**Solution:**
1. Ensure database is in `server/` directory
2. Check Railway volume is mounted
3. Verify `DB_PATH` environment variable

### CORS Errors

**Update `server/index.js`:**
```javascript
app.use(cors({
  origin: [
    process.env.FRONTEND_URL,
    'http://localhost:5173'
  ],
  credentials: true
}));
```

## 📱 Share with Coworkers

Once deployed, share the frontend URL:

```
https://your-app.railway.app
```

**Tips:**
- Send in team chat/email
- Add to company wiki
- Create a QR code for easy mobile access
- Pin in Slack/Teams channel

## 🔐 Security Best Practices

1. **Environment Variables**: Never commit secrets
2. **CORS**: Restrict to your domain only
3. **Rate Limiting**: Add if you expect high traffic
4. **HTTPS**: Automatic with Railway
5. **Database Backups**: Download weekly

## 📈 Monitoring

### Railway Dashboard

Monitor your app:
- **Metrics**: CPU, Memory, Network usage
- **Logs**: Real-time application logs
- **Deployments**: History of all deploys
- **Usage**: Track your free tier usage

### Set Up Alerts

1. Go to **"Settings"**
2. Add **"Webhooks"** for deployment notifications
3. Connect to Slack/Discord for alerts

## 🎯 Quick Reference

### Deploy Backend
```bash
git push origin main
# Railway auto-deploys
```

### View Logs
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# View logs
railway logs
```

### Update Environment Variables
```bash
railway variables set PORT=3001
railway variables set NODE_ENV=production
```

## ✅ Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables set
- [ ] CORS configured
- [ ] Domains generated
- [ ] Test prediction submitted
- [ ] Database persisting
- [ ] URL shared with team

## 🎉 You're Live!

Your Egypt World Cup Predictor is now live on Railway!

**Next Steps:**
1. Share the URL with your team
2. Monitor usage in Railway dashboard
3. Download database backups regularly
4. Enjoy the predictions!

---

**Need Help?**
- Railway Docs: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- This project's issues: GitHub Issues

Good luck with the predictions! 🇪🇬⚽🏆