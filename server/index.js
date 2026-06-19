import express from 'express';
import cors from 'cors';
import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, 'http://localhost:5173']
  : '*';

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// Initialize SQLite database with sql.js
let db;
const dbPath = join(__dirname, 'predictions.db');

async function initDatabase() {
  const SQL = await initSqlJs();
  
  // Load existing database or create new one
  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      match_id INTEGER NOT NULL,
      home_score INTEGER NOT NULL,
      away_score INTEGER NOT NULL,
      submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(email, match_id)
    )
  `);

  // Save database to file
  saveDatabase();
}

function saveDatabase() {
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

// Egypt matches data
const EGYPT_MATCHES = [
  {
    id: 1,
    homeTeam: { name: 'New Zealand', code: 'NZL', flag: '🇳🇿' },
    awayTeam: { name: 'Egypt', code: 'EGY', flag: '🇪🇬' },
    date: '2026-06-22T01:00:00Z', // 4:00 AM Cairo time
    venue: 'TBD'
  },
  {
    id: 2,
    homeTeam: { name: 'Egypt', code: 'EGY', flag: '🇪🇬' },
    awayTeam: { name: 'Iran', code: 'IRN', flag: '🇮🇷' },
    date: '2026-06-27T03:00:00Z', // 6:00 AM Cairo time
    venue: 'TBD'
  }
];

// API Routes

// Get all matches
app.get('/api/matches', (req, res) => {
  res.json(EGYPT_MATCHES);
});

// Submit prediction
app.post('/api/predictions', (req, res) => {
  const { name, email, predictions } = req.body;

  // Validation
  if (!name || !email || !predictions || Object.keys(predictions).length === 0) {
    return res.status(400).json({ 
      error: 'Name, email, and at least one prediction are required' 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if email already has predictions for these matches
    const stmt = db.prepare('SELECT match_id FROM predictions WHERE email = ?');
    stmt.bind([email]);
    const existingPredictions = [];
    while (stmt.step()) {
      existingPredictions.push(stmt.getAsObject());
    }
    stmt.free();

    const existingMatchIds = existingPredictions.map(p => p.match_id);
    const newMatchIds = Object.keys(predictions).map(id => parseInt(id));
    const duplicates = newMatchIds.filter(id => existingMatchIds.includes(id));

    if (duplicates.length > 0) {
      return res.status(400).json({ 
        error: 'You have already submitted predictions for one or more of these matches' 
      });
    }

    // Insert predictions
    for (const [matchId, scores] of Object.entries(predictions)) {
      const homeScore = parseInt(scores.homeScore);
      const awayScore = parseInt(scores.awayScore);

      // Validate scores
      if (isNaN(homeScore) || isNaN(awayScore) || homeScore < 0 || awayScore < 0) {
        throw new Error('Scores must be non-negative numbers');
      }

      db.run(
        'INSERT INTO predictions (name, email, match_id, home_score, away_score) VALUES (?, ?, ?, ?, ?)',
        [name, email, parseInt(matchId), homeScore, awayScore]
      );
    }

    // Save database after inserts
    saveDatabase();

    res.status(201).json({ 
      message: 'Predictions submitted successfully',
      count: Object.keys(predictions).length
    });

  } catch (error) {
    console.error('Error submitting predictions:', error);
    res.status(500).json({ error: error.message || 'Failed to submit predictions' });
  }
});

// Get all predictions (for history)
app.get('/api/predictions', (req, res) => {
  try {
    const stmt = db.prepare(`
      SELECT
        name,
        email,
        match_id,
        home_score,
        away_score,
        submitted_at
      FROM predictions
      ORDER BY submitted_at DESC
    `);

    const predictions = [];
    while (stmt.step()) {
      predictions.push(stmt.getAsObject());
    }
    stmt.free();

    // Group predictions by user
    const grouped = predictions.reduce((acc, pred) => {
      const key = pred.email;
      if (!acc[key]) {
        acc[key] = {
          name: pred.name,
          email: pred.email,
          submittedAt: pred.submitted_at,
          predictions: {}
        };
      }
      acc[key].predictions[pred.match_id] = {
        homeScore: pred.home_score,
        awayScore: pred.away_score
      };
      return acc;
    }, {});

    res.json(Object.values(grouped));
  } catch (error) {
    console.error('Error fetching predictions:', error);
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Database: ${dbPath}`);
    console.log(`✅ Using sql.js (no build tools required)`);
  });
});

// Graceful shutdown
process.on('SIGINT', () => {
  if (db) {
    saveDatabase();
    db.close();
  }
  process.exit(0);
});

// Made with Bob
