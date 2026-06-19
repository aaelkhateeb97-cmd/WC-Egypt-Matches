import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, Clock, CheckCircle2, AlertCircle, History, Search, Filter } from 'lucide-react'
import { matches, getFeaturedMatches, getMatchesByStage } from './data/matches'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    predictions: {} // Will store predictions by match ID
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [allPredictions, setAllPredictions] = useState([])
  const [stageFilter, setStageFilter] = useState('all')

  // Get unique stages
  const stages = ['all', ...new Set(matches.map(m => m.stage))]

  // Filter matches
  const filteredMatches = stageFilter === 'all' 
    ? matches 
    : matches.filter(m => m.stage === stageFilter)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    // Check if email already exists
    const emailExists = allPredictions.some(p => p.email === formData.email)
    if (emailExists) {
      setError('This email has already submitted predictions. Each email can only submit once.')
      return
    }

    // Validate at least one prediction
    if (Object.keys(formData.predictions).length === 0) {
      setError('Please make at least one match prediction.')
      return
    }

    // Validate all predictions have both scores
    const invalidPredictions = Object.values(formData.predictions).some(
      pred => !pred.homeScore || !pred.awayScore
    )
    if (invalidPredictions) {
      setError('Please enter both scores for all your predictions.')
      return
    }

    // Add prediction to the list
    const newPrediction = {
      name: formData.name,
      email: formData.email,
      predictions: formData.predictions,
      submittedAt: new Date().toISOString()
    }
    
    setAllPredictions([...allPredictions, newPrediction])
    
    // Here you would send data to backend
    console.log('Prediction submitted:', newPrediction)
    setSubmitted(true)
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

  const maskEmail = (email) => {
    const [username, domain] = email.split('@')
    return `${username.charAt(0)}***@${domain}`
  }

  const filteredPredictions = allPredictions.filter(pred =>
    pred.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pred.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="glass-card border-b border-ibm-blue/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-xl flex items-center justify-center shadow-neon">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">IBM CIC</h1>
                <p className="text-xs text-gray-400">World Cup Predictor 2026</p>
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
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
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
                      <Trophy className="w-10 h-10 text-white" />
                    </motion.div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      World Cup 2026 Predictor
                    </h2>
                    <p className="text-gray-400">
                      Predict match outcomes and compete with IBM CIC colleagues
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* User Info Card */}
                    <div className="glass-card p-6">
                      <h3 className="text-xl font-bold mb-4">Your Information</h3>
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
                            IBM Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="ahmed.hassan@ibm.com"
                            className="w-full px-4 py-3 bg-ibm-dark-lighter border border-ibm-dark-light rounded-xl focus:border-ibm-blue focus:outline-none text-white placeholder-gray-500"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">
                        Each email can only submit once • Predict as many matches as you like
                      </p>
                    </div>

                    {/* Stage Filter */}
                    <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                      <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      {stages.map((stage) => (
                        <button
                          key={stage}
                          type="button"
                          onClick={() => setStageFilter(stage)}
                          className={`px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap text-sm ${
                            stageFilter === stage
                              ? 'bg-ibm-blue text-white shadow-neon'
                              : 'bg-ibm-dark-lighter text-gray-400 hover:text-white hover:bg-ibm-dark-light'
                          }`}
                        >
                          {stage === 'all' ? 'All Matches' : stage}
                        </button>
                      ))}
                    </div>

                    {/* Match Cards Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {filteredMatches.map((match, index) => {
                        const locked = isMatchLocked(match.date)
                        const prediction = formData.predictions[match.id] || { homeScore: '', awayScore: '' }
                        
                        return (
                          <MatchCard
                            key={match.id}
                            match={match}
                            prediction={prediction}
                            onScoreChange={(team, value) => handleScoreChange(match.id, team, value)}
                            locked={locked}
                            delay={index * 0.05}
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
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-semibold">Ready to submit?</h4>
                          <p className="text-sm text-gray-400">
                            You've predicted {Object.keys(formData.predictions).length} match(es)
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="btn-primary px-8"
                        >
                          Submit Predictions
                        </button>
                      </div>
                      
                      <div className="pt-4 border-t border-ibm-dark-lighter">
                        <h4 className="font-semibold mb-2 text-sm">Scoring System:</h4>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-accent-gold font-bold text-lg">5</div>
                            <div className="text-gray-400 text-xs">Exact score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-accent-gold font-bold text-lg">3</div>
                            <div className="text-gray-400 text-xs">Correct result</div>
                          </div>
                          <div className="text-center">
                            <div className="text-accent-gold font-bold text-lg">+1</div>
                            <div className="text-gray-400 text-xs">Goal difference</div>
                          </div>
                        </div>
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
              predictions={filteredPredictions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              maskEmail={maskEmail}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-ibm-dark-lighter py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>IBM CIC World Cup Predictor 2026 • Good luck! 🏆⚽</p>
        </div>
      </footer>
    </div>
  )
}

function MatchCard({ match, prediction, onScoreChange, locked, delay }) {
  const isPredicted = prediction.homeScore && prediction.awayScore

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`glass-card p-6 ${isPredicted ? 'border-2 border-ibm-blue/50' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30 text-xs">
            {match.stage}
          </span>
          {match.group && (
            <span className="badge bg-ibm-dark-lighter text-gray-400 text-xs">
              Group {match.group}
            </span>
          )}
        </div>
        {locked && (
          <span className="badge bg-accent-red/20 text-accent-red border-accent-red/30 text-xs">
            Locked
          </span>
        )}
        {isPredicted && !locked && (
          <span className="badge bg-accent-green/20 text-accent-green border-accent-green/30 text-xs">
            ✓ Predicted
          </span>
        )}
      </div>

      <CountdownTimer targetDate={match.date} compact />

      <div className="mt-4 space-y-4">
        {/* Teams Display */}
        <div className="grid grid-cols-3 gap-3 items-center">
          {/* Home Team */}
          <div className="text-center">
            <div className="text-4xl mb-2">{match.homeTeam.flag}</div>
            <div className="font-semibold text-xs">{match.homeTeam.name}</div>
          </div>

          {/* VS */}
          <div className="text-center">
            <div className="text-lg font-bold text-gray-400">VS</div>
          </div>

          {/* Away Team */}
          <div className="text-center">
            <div className="text-4xl mb-2">{match.awayTeam.flag}</div>
            <div className="font-semibold text-xs">{match.awayTeam.name}</div>
          </div>
        </div>

        {/* Score Inputs */}
        <div className="grid grid-cols-3 gap-3 items-center">
          <input
            type="number"
            min="0"
            max="20"
            disabled={locked}
            value={prediction.homeScore}
            onChange={(e) => onScoreChange('homeScore', e.target.value)}
            className="w-full px-3 py-2 text-xl font-bold text-center bg-ibm-dark-lighter border-2 border-ibm-blue/30 rounded-xl focus:border-ibm-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="0"
          />

          <div className="text-center text-xl font-bold text-gray-400">-</div>

          <input
            type="number"
            min="0"
            max="20"
            disabled={locked}
            value={prediction.awayScore}
            onChange={(e) => onScoreChange('awayScore', e.target.value)}
            className="w-full px-3 py-2 text-xl font-bold text-center bg-ibm-dark-lighter border-2 border-ibm-blue/30 rounded-xl focus:border-ibm-blue focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            placeholder="0"
          />
        </div>
      </div>
    </motion.div>
  )
}

function CountdownTimer({ targetDate, compact = false }) {
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

  const matchDate = new Date(targetDate)
  const formattedDate = matchDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  })
  const formattedTime = matchDate.toLocaleTimeString('en-US', { 
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Africa/Cairo'
  })

  if (!timeLeft) {
    return (
      <div className="flex items-center justify-center space-x-2 text-accent-green bg-accent-green/10 border border-accent-green/30 rounded-xl p-2">
        <Clock className="w-4 h-4" />
        <span className="text-xs font-semibold">LIVE / FINISHED</span>
      </div>
    )
  }

  if (compact) {
    return (
      <div className="text-center">
        <div className="text-xs text-gray-400 mb-1">
          {formattedDate} • {formattedTime} Cairo
        </div>
        <div className="flex justify-center space-x-1">
          {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="D" small />}
          <TimeUnit value={timeLeft.hours} label="H" small />
          <TimeUnit value={timeLeft.minutes} label="M" small />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="text-center text-sm text-gray-400">
        {formattedDate} • {formattedTime} Cairo Time
      </div>
      <div className="flex justify-center space-x-2">
        {timeLeft.days > 0 && <TimeUnit value={timeLeft.days} label="Days" />}
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
      </div>
    </div>
  )
}

function TimeUnit({ value, label, small = false }) {
  return (
    <div className={`flex flex-col items-center bg-ibm-dark-lighter rounded-lg ${small ? 'px-2 py-1 min-w-[2rem]' : 'px-3 py-2 min-w-[3.5rem]'}`}>
      <span className={`font-bold text-ibm-blue ${small ? 'text-sm' : 'text-2xl'}`}>
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
      className="glass-card p-12 text-center max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-accent-green to-green-600 rounded-full shadow-lg mb-6"
      >
        <CheckCircle2 className="w-12 h-12 text-white" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-4">Predictions Submitted!</h2>
      <p className="text-xl text-gray-400 mb-2">
        Thank you, <span className="text-ibm-blue font-bold">{formData.name}</span>!
      </p>
      <p className="text-gray-400 mb-8">
        You predicted {predictedMatches.length} match(es). Good luck! 🏆
      </p>
      
      <div className="grid md:grid-cols-2 gap-4 mb-8 max-h-96 overflow-y-auto custom-scrollbar">
        {predictedMatches.map(({ match, prediction }, index) => (
          <div key={index} className="glass-card p-4 text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{match.homeTeam.flag}</span>
              <span className="text-xl font-bold">{prediction.homeScore}</span>
              <span className="text-gray-400">-</span>
              <span className="text-xl font-bold">{prediction.awayScore}</span>
              <span className="text-2xl">{match.awayTeam.flag}</span>
            </div>
            <div className="text-xs text-gray-400 text-center">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={onViewHistory} className="btn-primary">
        View Predictions History
      </button>
    </motion.div>
  )
}

function HistoryBoard({ matches, predictions, searchTerm, setSearchTerm, maskEmail }) {
  return (
    <motion.div
      key="history"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center space-x-3">
            <History className="w-8 h-8 text-ibm-blue" />
            <span>Predictions History</span>
          </h2>
          <p className="text-gray-400">
            View all employee predictions • {predictions.length} submission(s)
          </p>
        </div>
        
        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ibm-dark-lighter border border-ibm-dark-light rounded-xl focus:border-ibm-blue focus:outline-none text-white placeholder-gray-500 text-sm"
          />
        </div>
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
                  <div className="w-10 h-10 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{pred.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-bold">{pred.name}</div>
                    <div className="text-sm text-gray-400">{maskEmail(pred.email)}</div>
                  </div>
                </div>
                <div className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30">
                  {Object.keys(pred.predictions).length} predictions
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(pred.predictions).map(([matchId, prediction]) => {
                  const match = matches.find(m => m.id === parseInt(matchId))
                  if (!match) return null
                  
                  return (
                    <div key={matchId} className="bg-ibm-dark-lighter/50 rounded-xl p-4">
                      <div className="text-xs text-gray-400 mb-2">{match.stage}</div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{match.homeTeam.flag}</span>
                        <span className="text-xl font-bold text-ibm-blue">{prediction.homeScore}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-xl font-bold text-ibm-blue">{prediction.awayScore}</span>
                        <span className="text-2xl">{match.awayTeam.flag}</span>
                      </div>
                      <div className="text-xs text-gray-400 text-center">
                        {match.homeTeam.name} vs {match.awayTeam.name}
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

export default App

// Made with Bob
