import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock, CheckCircle2, AlertCircle, History, Calendar } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function SimpleApp() {
  const [matches, setMatches] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    predictions: {}
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [allPredictions, setAllPredictions] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch matches on mount
  useEffect(() => {
    fetchMatches()
    fetchPredictions()
  }, [])

  const fetchMatches = async () => {
    try {
      const response = await fetch(`${API_URL}/matches`)
      const data = await response.json()
      setMatches(data)
    } catch (error) {
      console.error('Error fetching matches:', error)
      setError('Failed to load matches. Please refresh the page.')
    }
  }

  const fetchPredictions = async () => {
    try {
      const response = await fetch(`${API_URL}/predictions`)
      const data = await response.json()
      setAllPredictions(data)
    } catch (error) {
      console.error('Error fetching predictions:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validate name and email
    if (!formData.name.trim() || !formData.email.trim()) {
      setError('Please enter your name and email.')
      setLoading(false)
      return
    }

    // Validate at least one prediction
    if (Object.keys(formData.predictions).length === 0) {
      setError('Please make at least one match prediction.')
      setLoading(false)
      return
    }

    // Validate all predictions have both scores
    const invalidPredictions = Object.values(formData.predictions).some(
      pred => pred.homeScore === '' || pred.awayScore === '' || 
              isNaN(pred.homeScore) || isNaN(pred.awayScore) ||
              parseInt(pred.homeScore) < 0 || parseInt(pred.awayScore) < 0
    )
    if (invalidPredictions) {
      setError('Please enter valid scores (0 or above) for all your predictions.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_URL}/predictions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit predictions')
      }

      setSubmitted(true)
      fetchPredictions() // Refresh predictions list
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleScoreChange = (matchId, team, value) => {
    setFormData({
      ...formData,
      predictions: {
        ...formData.predictions,
        [matchId]: {
          ...formData.predictions[matchId],
          [team]: value
        }
      }
    })
  }

  const isMatchLocked = (matchDate) => {
    return new Date() > new Date(matchDate)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Cairo'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-ibm-dark via-ibm-dark-light to-ibm-dark">
      {/* Header */}
      <header className="glass-card border-b border-ibm-blue/20 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-xl flex items-center justify-center shadow-neon">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">Egypt World Cup 2026</h1>
                <p className="text-xs text-gray-400">Score Prediction Challenge</p>
              </div>
            </div>
            {!submitted && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="btn-secondary flex items-center space-x-2 text-sm"
              >
                <History className="w-4 h-4" />
                <span>{showHistory ? 'Predict' : 'History'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {!showHistory ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {!submitted ? (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-2xl shadow-neon mb-4"
                    >
                      <span className="text-4xl">🇪🇬</span>
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      Predict Egypt's Matches
                    </h2>
                    <p className="text-gray-400">
                      Submit your score predictions for Egypt's 2026 World Cup matches
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Info Card */}
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                        <span>Your Information</span>
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Ahmed Hassan"
                            className="w-full px-4 py-3 bg-ibm-dark-lighter border border-ibm-dark-light rounded-xl focus:border-ibm-blue focus:outline-none text-white placeholder-gray-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ahmed@example.com"
                            className="w-full px-4 py-3 bg-ibm-dark-lighter border border-ibm-dark-light rounded-xl focus:border-ibm-blue focus:outline-none text-white placeholder-gray-500"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        ⚠️ Each email can only submit predictions once per match
                      </p>
                    </div>

                    {/* Match Cards */}
                    <div className="space-y-6">
                      {matches.map((match, index) => {
                        const locked = isMatchLocked(match.date)
                        const prediction = formData.predictions[match.id] || { homeScore: '', awayScore: '' }
                        
                        return (
                          <MatchCard
                            key={match.id}
                            match={match}
                            prediction={prediction}
                            onScoreChange={(team, value) => handleScoreChange(match.id, team, value)}
                            locked={locked}
                            delay={index * 0.1}
                            formatDate={formatDate}
                            formatTime={formatTime}
                          />
                        )
                      })}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-accent-red/10 border border-accent-red/30 rounded-xl p-4 flex items-start space-x-3"
                      >
                        <AlertCircle className="w-5 h-5 text-accent-red flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-accent-red">{error}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <div className="glass-card p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">Ready to submit?</h4>
                          <p className="text-sm text-gray-400">
                            You've predicted {Object.keys(formData.predictions).length} match(es)
                          </p>
                        </div>
                        <button
                          type="submit"
                          disabled={loading}
                          className="btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'Submitting...' : 'Submit Predictions'}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              ) : (
                <SuccessScreen 
                  formData={formData} 
                  matches={matches}
                  onViewHistory={() => setShowHistory(true)} 
                />
              )}
            </motion.div>
          ) : (
            <HistoryBoard 
              matches={matches}
              predictions={allPredictions}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-ibm-dark-lighter py-6 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>Egypt World Cup 2026 Score Predictor • Good luck! 🇪🇬⚽</p>
        </div>
      </footer>
    </div>
  )
}

function MatchCard({ match, prediction, onScoreChange, locked, delay, formatDate, formatTime }) {
  const isPredicted = prediction.homeScore !== '' && prediction.awayScore !== ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`glass-card p-6 ${isPredicted ? 'border-2 border-ibm-blue/50' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-ibm-blue" />
          <span className="text-sm text-gray-400">
            {formatDate(match.date)}
          </span>
        </div>
        {locked && (
          <span className="badge bg-accent-red/20 text-accent-red border-accent-red/30 text-xs">
            🔒 Locked
          </span>
        )}
        {isPredicted && !locked && (
          <span className="badge bg-accent-green/20 text-accent-green border-accent-green/30 text-xs">
            ✓ Predicted
          </span>
        )}
      </div>

      <div className="text-center mb-4">
        <div className="text-lg font-bold text-ibm-blue mb-1">
          {formatTime(match.date)} Cairo Time (UTC+3)
        </div>
        <CountdownTimer targetDate={match.date} />
      </div>

      <div className="space-y-4">
        {/* Teams Display */}
        <div className="grid grid-cols-3 gap-4 items-center">
          {/* Home Team */}
          <div className="text-center">
            <div className="text-5xl mb-2">{match.homeTeam.flag}</div>
            <div className="font-bold text-sm">{match.homeTeam.name}</div>
          </div>

          {/* VS */}
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-400">VS</div>
          </div>

          {/* Away Team */}
          <div className="text-center">
            <div className="text-5xl mb-2">{match.awayTeam.flag}</div>
            <div className="font-bold text-sm">{match.awayTeam.name}</div>
          </div>
        </div>

        {/* Score Inputs */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <input
            type="number"
            min="0"
            max="20"
            disabled={locked}
            value={prediction.homeScore}
            onChange={(e) => onScoreChange('homeScore', e.target.value)}
            className="w-full px-4 py-3 text-2xl font-bold text-center bg-ibm-dark-lighter border-2 border-ibm-blue/30 rounded-xl focus:border-ibm-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-white"
            placeholder="0"
          />

          <div className="text-center text-2xl font-bold text-gray-400">-</div>

          <input
            type="number"
            min="0"
            max="20"
            disabled={locked}
            value={prediction.awayScore}
            onChange={(e) => onScoreChange('awayScore', e.target.value)}
            className="w-full px-4 py-3 text-2xl font-bold text-center bg-ibm-dark-lighter border-2 border-ibm-blue/30 rounded-xl focus:border-ibm-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed text-white"
            placeholder="0"
          />
        </div>
      </div>
    </motion.div>
  )
}

function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return null
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) {
    return (
      <div className="flex items-center justify-center space-x-2 text-accent-green bg-accent-green/10 border border-accent-green/30 rounded-xl p-2">
        <Clock className="w-4 h-4" />
        <span className="text-xs font-semibold">MATCH STARTED / FINISHED</span>
      </div>
    )
  }

  return (
    <div className="flex justify-center space-x-2">
      {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="Days" />}
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  )
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-ibm-dark-lighter rounded-lg px-3 py-2 min-w-[3.5rem]">
      <span className="font-bold text-ibm-blue text-xl">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}

function SuccessScreen({ formData, matches, onViewHistory }) {
  const predictedMatches = Object.keys(formData.predictions).map(matchId => {
    const match = matches.find(m => m.id === parseInt(matchId))
    const prediction = formData.predictions[matchId]
    return { match, prediction }
  })

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass-card p-12 text-center max-w-3xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-green to-green-600 rounded-full shadow-lg mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-4">Predictions Submitted Successfully!</h2>
      <p className="text-xl text-gray-400 mb-2">
        Thank you, <span className="text-ibm-blue font-bold">{formData.name}</span>!
      </p>
      <p className="text-gray-400 mb-8">
        You predicted {predictedMatches.length} match(es). Good luck! 🇪🇬⚽
      </p>
      
      <div className="space-y-4 mb-8">
        {predictedMatches.map(({ match, prediction }, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <span className="text-3xl">{match.homeTeam.flag}</span>
              <span className="text-2xl font-bold text-ibm-blue">{prediction.homeScore}</span>
              <span className="text-xl text-gray-400">-</span>
              <span className="text-2xl font-bold text-ibm-blue">{prediction.awayScore}</span>
              <span className="text-3xl">{match.awayTeam.flag}</span>
            </div>
            <div className="text-sm text-gray-400">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={onViewHistory} className="btn-primary">
        View All Predictions
      </button>
    </motion.div>
  )
}

function HistoryBoard({ matches, predictions }) {
  const maskEmail = (email) => {
    const [username, domain] = email.split('@')
    return `${username.charAt(0)}***@${domain}`
  }

  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center space-x-3">
          <History className="w-8 h-8 text-ibm-blue" />
          <span>All Predictions</span>
        </h2>
        <p className="text-gray-400">
          {predictions.length} submission(s) • Updated in real-time
        </p>
      </div>

      {predictions.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No Predictions Yet</h3>
          <p className="text-gray-400">Be the first to submit your predictions!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {predictions.map((pred, predIndex) => (
            <motion.div
              key={predIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: predIndex * 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-ibm-dark-lighter">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{pred.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold text-lg">{pred.name}</div>
                    <div className="text-sm text-gray-400">{maskEmail(pred.email)}</div>
                  </div>
                </div>
                <div className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30">
                  {Object.keys(pred.predictions).length} prediction(s)
                </div>
              </div>

              <div className="grid gap-4">
                {Object.entries(pred.predictions).map(([matchId, prediction]) => {
                  const match = matches.find(m => m.id === parseInt(matchId))
                  if (!match) return null
                  
                  return (
                    <div key={matchId} className="bg-ibm-dark-lighter/50 rounded-xl p-4">
                      <div className="flex items-center justify-center space-x-4">
                        <div className="text-center">
                          <div className="text-3xl mb-1">{match.homeTeam.flag}</div>
                          <div className="text-xs text-gray-400">{match.homeTeam.name}</div>
                        </div>
                        <div className="text-2xl font-bold text-ibm-blue">{prediction.homeScore}</div>
                        <div className="text-xl text-gray-400">-</div>
                        <div className="text-2xl font-bold text-ibm-blue">{prediction.awayScore}</div>
                        <div className="text-center">
                          <div className="text-3xl mb-1">{match.awayTeam.flag}</div>
                          <div className="text-xs text-gray-400">{match.awayTeam.name}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  )
}

export default SimpleApp

// Made with Bob
