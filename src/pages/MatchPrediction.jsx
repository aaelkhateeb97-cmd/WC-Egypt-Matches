import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Clock, 
  TrendingUp,
  Users,
  Target,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import CountdownTimer from '../components/CountdownTimer'

export default function MatchPrediction() {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [prediction, setPrediction] = useState({ team1Score: '', team2Score: '' })
  const [filter, setFilter] = useState('all') // all, upcoming, live

  // Mock data
  const matches = [
    {
      id: 1,
      team1: { name: 'Brazil', flag: '🇧🇷', odds: 2.1 },
      team2: { name: 'Argentina', flag: '🇦🇷', odds: 3.2 },
      date: '2026-06-20T18:00:00',
      stage: 'Quarter Final',
      venue: 'MetLife Stadium',
      status: 'upcoming',
      predictions: 1247,
      predicted: false
    },
    {
      id: 2,
      team1: { name: 'Germany', flag: '🇩🇪', odds: 1.8 },
      team2: { name: 'France', flag: '🇫🇷', odds: 4.1 },
      date: '2026-06-21T20:00:00',
      stage: 'Quarter Final',
      venue: 'SoFi Stadium',
      status: 'upcoming',
      predictions: 1189,
      predicted: true,
      userPrediction: { team1Score: 2, team2Score: 1 }
    },
    {
      id: 3,
      team1: { name: 'Spain', flag: '🇪🇸', odds: 2.5 },
      team2: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', odds: 2.8 },
      date: '2026-06-19T16:00:00',
      stage: 'Quarter Final',
      venue: 'AT&T Stadium',
      status: 'live',
      currentScore: { team1: 1, team2: 1 },
      minute: 67,
      predictions: 1356
    }
  ]

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true
    return match.status === filter
  })

  const handlePredictionSubmit = () => {
    if (!prediction.team1Score || !prediction.team2Score) return
    
    // Submit prediction logic here
    alert(`Prediction submitted: ${prediction.team1Score} - ${prediction.team2Score}`)
    setSelectedMatch(null)
    setPrediction({ team1Score: '', team2Score: '' })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-ibm-blue" />
          <span>Match Predictions</span>
        </h1>
        <p className="text-gray-400">Make your predictions before kickoff to earn points</p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'All Matches', icon: Trophy },
          { value: 'upcoming', label: 'Upcoming', icon: Clock },
          { value: 'live', label: 'Live', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
              filter === tab.value
                ? 'bg-ibm-blue text-white shadow-neon'
                : 'bg-ibm-dark-lighter text-gray-400 hover:text-white hover:bg-ibm-dark-light'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Matches Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {filteredMatches.map((match, index) => (
          <GlassCard key={match.id} hover delay={index * 0.1}>
            <div className="p-6">
              {/* Match Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30">
                    {match.stage}
                  </span>
                  {match.status === 'live' && (
                    <span className="badge bg-accent-red/20 text-accent-red border border-accent-red/30 animate-pulse">
                      🔴 LIVE
                    </span>
                  )}
                </div>
                {match.predicted && (
                  <span className="badge bg-accent-green/20 text-accent-green border border-accent-green/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Predicted
                  </span>
                )}
              </div>

              {/* Teams */}
              <div className="space-y-4 mb-6">
                {/* Team 1 */}
                <div className="flex items-center justify-between p-4 bg-ibm-dark-lighter/50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <span className="text-5xl">{match.team1.flag}</span>
                    <div>
                      <div className="font-bold text-lg">{match.team1.name}</div>
                      <div className="text-sm text-gray-400">Odds: {match.team1.odds}</div>
                    </div>
                  </div>
                  {match.status === 'live' && (
                    <div className="text-3xl font-bold text-ibm-blue">
                      {match.currentScore.team1}
                    </div>
                  )}
                  {match.predicted && (
                    <div className="text-2xl font-bold text-gray-400">
                      {match.userPrediction.team1Score}
                    </div>
                  )}
                </div>

                {/* VS Divider */}
                <div className="flex items-center justify-center">
                  <div className="px-6 py-2 bg-ibm-dark-lighter rounded-lg font-bold text-gray-400">
                    VS
                  </div>
                </div>

                {/* Team 2 */}
                <div className="flex items-center justify-between p-4 bg-ibm-dark-lighter/50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <span className="text-5xl">{match.team2.flag}</span>
                    <div>
                      <div className="font-bold text-lg">{match.team2.name}</div>
                      <div className="text-sm text-gray-400">Odds: {match.team2.odds}</div>
                    </div>
                  </div>
                  {match.status === 'live' && (
                    <div className="text-3xl font-bold text-ibm-blue">
                      {match.currentScore.team2}
                    </div>
                  )}
                  {match.predicted && (
                    <div className="text-2xl font-bold text-gray-400">
                      {match.userPrediction.team2Score}
                    </div>
                  )}
                </div>
              </div>

              {/* Match Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Venue</span>
                  <span className="font-medium">{match.venue}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400 flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>Predictions</span>
                  </span>
                  <span className="font-medium">{match.predictions.toLocaleString()}</span>
                </div>
              </div>

              {/* Countdown or Status */}
              {match.status === 'upcoming' && (
                <div className="mb-6">
                  <CountdownTimer targetDate={match.date} />
                </div>
              )}

              {match.status === 'live' && (
                <div className="mb-6 p-4 bg-accent-red/10 border border-accent-red/30 rounded-xl">
                  <div className="flex items-center justify-center space-x-2 text-accent-red">
                    <Clock className="w-5 h-5" />
                    <span className="font-bold text-lg">{match.minute}'</span>
                  </div>
                </div>
              )}

              {/* Action Button */}
              {match.status === 'upcoming' && !match.predicted && (
                <button
                  onClick={() => setSelectedMatch(match)}
                  className="w-full btn-primary"
                >
                  Make Prediction
                </button>
              )}

              {match.status === 'upcoming' && match.predicted && (
                <button
                  onClick={() => setSelectedMatch(match)}
                  className="w-full btn-secondary"
                >
                  Edit Prediction
                </button>
              )}

              {match.status === 'live' && (
                <div className="p-4 bg-ibm-blue/10 border border-ibm-blue/30 rounded-xl text-center">
                  <AlertCircle className="w-5 h-5 text-ibm-blue mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Match in progress - Predictions locked</p>
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Prediction Modal */}
      <AnimatePresence>
        {selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMatch(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 max-w-2xl w-full"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Target className="w-6 h-6 text-ibm-blue" />
                <span>Make Your Prediction</span>
              </h2>

              {/* Teams Display */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-6xl">{selectedMatch.team1.flag}</span>
                    <div>
                      <div className="font-bold text-2xl">{selectedMatch.team1.name}</div>
                      <div className="text-gray-400">Home</div>
                    </div>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={prediction.team1Score}
                    onChange={(e) => setPrediction({ ...prediction, team1Score: e.target.value })}
                    className="w-20 h-20 text-4xl font-bold text-center bg-ibm-dark-lighter border-2 border-ibm-blue/30 rounded-xl focus:border-ibm-blue focus:outline-none"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-center justify-center">
                  <div className="px-8 py-3 bg-ibm-dark-lighter rounded-xl font-bold text-xl text-gray-400">
                    VS
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={prediction.team2Score}
                    onChange={(e) => setPrediction({ ...prediction, team2Score: e.target.value })}
                    className="w-20 h-20 text-4xl font-bold text-center bg-ibm-dark-lighter border-2 border-ibm-blue/30 rounded-xl focus:border-ibm-blue focus:outline-none"
                    placeholder="0"
                  />
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="font-bold text-2xl">{selectedMatch.team2.name}</div>
                      <div className="text-gray-400">Away</div>
                    </div>
                    <span className="text-6xl">{selectedMatch.team2.flag}</span>
                  </div>
                </div>
              </div>

              {/* Points Info */}
              <div className="bg-ibm-blue/10 border border-ibm-blue/30 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Correct Score</span>
                  <span className="font-bold text-accent-gold">+10 points</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-400">Correct Winner</span>
                  <span className="font-bold text-accent-gold">+5 points</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedMatch(null)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePredictionSubmit}
                  disabled={!prediction.team1Score || !prediction.team2Score}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Prediction
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Made with Bob
