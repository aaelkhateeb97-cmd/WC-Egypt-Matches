import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  History, 
  CheckCircle2, 
  XCircle, 
  Clock,
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react'
import GlassCard from '../components/GlassCard'

export default function PredictionHistory() {
  const [filter, setFilter] = useState('all') // all, correct, incorrect, pending

  // Mock data
  const predictions = [
    {
      id: 1,
      match: {
        team1: { name: 'Brazil', flag: '🇧🇷' },
        team2: { name: 'Croatia', flag: '🇭🇷' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 2, team2Score: 1 },
      actualScore: { team1Score: 2, team2Score: 1 },
      date: '2026-06-15T18:00:00',
      status: 'correct',
      points: 10,
      accuracy: 'exact'
    },
    {
      id: 2,
      match: {
        team1: { name: 'Argentina', flag: '🇦🇷' },
        team2: { name: 'Netherlands', flag: '🇳🇱' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 3, team2Score: 1 },
      actualScore: { team1Score: 2, team2Score: 2 },
      date: '2026-06-14T20:00:00',
      status: 'incorrect',
      points: 0,
      accuracy: 'wrong'
    },
    {
      id: 3,
      match: {
        team1: { name: 'France', flag: '🇫🇷' },
        team2: { name: 'Poland', flag: '🇵🇱' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 3, team2Score: 1 },
      actualScore: { team1Score: 3, team2Score: 1 },
      date: '2026-06-13T16:00:00',
      status: 'correct',
      points: 10,
      accuracy: 'exact'
    },
    {
      id: 4,
      match: {
        team1: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
        team2: { name: 'Senegal', flag: '🇸🇳' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 2, team2Score: 0 },
      actualScore: { team1Score: 3, team2Score: 0 },
      date: '2026-06-12T18:00:00',
      status: 'correct',
      points: 5,
      accuracy: 'winner'
    },
    {
      id: 5,
      match: {
        team1: { name: 'Spain', flag: '🇪🇸' },
        team2: { name: 'Morocco', flag: '🇲🇦' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 2, team2Score: 1 },
      actualScore: null,
      date: '2026-06-22T18:00:00',
      status: 'pending',
      points: 0,
      accuracy: null
    },
    {
      id: 6,
      match: {
        team1: { name: 'Portugal', flag: '🇵🇹' },
        team2: { name: 'Switzerland', flag: '🇨🇭' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 3, team2Score: 2 },
      actualScore: { team1Score: 6, team2Score: 1 },
      date: '2026-06-11T20:00:00',
      status: 'correct',
      points: 5,
      accuracy: 'winner'
    },
    {
      id: 7,
      match: {
        team1: { name: 'Japan', flag: '🇯🇵' },
        team2: { name: 'Croatia', flag: '🇭🇷' },
        stage: 'Round of 16'
      },
      prediction: { team1Score: 2, team2Score: 1 },
      actualScore: { team1Score: 1, team2Score: 1 },
      date: '2026-06-10T16:00:00',
      status: 'incorrect',
      points: 0,
      accuracy: 'wrong'
    }
  ]

  const filteredPredictions = predictions.filter(pred => {
    if (filter === 'all') return true
    return pred.status === filter
  })

  const stats = {
    total: predictions.length,
    correct: predictions.filter(p => p.status === 'correct').length,
    incorrect: predictions.filter(p => p.status === 'incorrect').length,
    pending: predictions.filter(p => p.status === 'pending').length,
    totalPoints: predictions.reduce((sum, p) => sum + p.points, 0),
    accuracy: Math.round((predictions.filter(p => p.status === 'correct').length / predictions.filter(p => p.status !== 'pending').length) * 100)
  }

  const getStatusIcon = (status) => {
    if (status === 'correct') return <CheckCircle2 className="w-5 h-5 text-accent-green" />
    if (status === 'incorrect') return <XCircle className="w-5 h-5 text-accent-red" />
    return <Clock className="w-5 h-5 text-gray-400" />
  }

  const getStatusBadge = (status, accuracy) => {
    if (status === 'correct') {
      return (
        <span className={`badge ${accuracy === 'exact' ? 'bg-accent-green/20 text-accent-green border-accent-green/30' : 'bg-ibm-blue/20 text-ibm-blue border-ibm-blue/30'}`}>
          {accuracy === 'exact' ? '✓ Exact Score' : '✓ Correct Winner'}
        </span>
      )
    }
    if (status === 'incorrect') {
      return <span className="badge bg-accent-red/20 text-accent-red border-accent-red/30">✗ Incorrect</span>
    }
    return <span className="badge bg-gray-500/20 text-gray-400 border-gray-500/30">⏳ Pending</span>
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
          <History className="w-8 h-8 text-ibm-blue" />
          <span>Prediction History</span>
        </h1>
        <p className="text-gray-400">Track your prediction performance over time</p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold gradient-text mb-1">{stats.total}</div>
          <div className="text-xs text-gray-400">Total</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-accent-green mb-1">{stats.correct}</div>
          <div className="text-xs text-gray-400">Correct</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-accent-red mb-1">{stats.incorrect}</div>
          <div className="text-xs text-gray-400">Incorrect</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-400 mb-1">{stats.pending}</div>
          <div className="text-xs text-gray-400">Pending</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-ibm-blue mb-1">{stats.accuracy}%</div>
          <div className="text-xs text-gray-400">Accuracy</div>
        </GlassCard>
        <GlassCard className="p-4 text-center">
          <div className="text-2xl font-bold text-accent-gold mb-1">{stats.totalPoints}</div>
          <div className="text-xs text-gray-400">Points</div>
        </GlassCard>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
        {[
          { value: 'all', label: 'All', count: stats.total },
          { value: 'correct', label: 'Correct', count: stats.correct },
          { value: 'incorrect', label: 'Incorrect', count: stats.incorrect },
          { value: 'pending', label: 'Pending', count: stats.pending }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap ${
              filter === tab.value
                ? 'bg-ibm-blue text-white shadow-neon'
                : 'bg-ibm-dark-lighter text-gray-400 hover:text-white hover:bg-ibm-dark-light'
            }`}
          >
            <span>{tab.label}</span>
            <span className="text-xs opacity-70">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-ibm-dark-lighter hidden md:block"></div>

        {/* Predictions */}
        <div className="space-y-6">
          {filteredPredictions.map((pred, index) => (
            <motion.div
              key={pred.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 top-6 w-5 h-5 rounded-full bg-ibm-blue border-4 border-ibm-dark hidden md:block z-10"></div>

              <GlassCard hover className="md:ml-20">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div className="flex items-center space-x-3 mb-2 md:mb-0">
                      {getStatusIcon(pred.status)}
                      <span className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30">
                        {pred.match.stage}
                      </span>
                      {getStatusBadge(pred.status, pred.accuracy)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(pred.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Match Info */}
                    <div>
                      <h3 className="text-sm text-gray-400 mb-3">Match</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-ibm-dark-lighter/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{pred.match.team1.flag}</span>
                            <span className="font-semibold">{pred.match.team1.name}</span>
                          </div>
                          {pred.actualScore && (
                            <span className="text-2xl font-bold text-ibm-blue">
                              {pred.actualScore.team1Score}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between p-3 bg-ibm-dark-lighter/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-3xl">{pred.match.team2.flag}</span>
                            <span className="font-semibold">{pred.match.team2.name}</span>
                          </div>
                          {pred.actualScore && (
                            <span className="text-2xl font-bold text-ibm-blue">
                              {pred.actualScore.team2Score}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Prediction */}
                    <div>
                      <h3 className="text-sm text-gray-400 mb-3">Your Prediction</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-ibm-dark-lighter/50 rounded-lg border-2 border-dashed border-ibm-blue/30">
                          <span className="font-semibold">{pred.match.team1.name}</span>
                          <span className="text-2xl font-bold text-gray-300">
                            {pred.prediction.team1Score}
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-ibm-dark-lighter/50 rounded-lg border-2 border-dashed border-ibm-blue/30">
                          <span className="font-semibold">{pred.match.team2.name}</span>
                          <span className="text-2xl font-bold text-gray-300">
                            {pred.prediction.team2Score}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Points Earned */}
                  {pred.status !== 'pending' && (
                    <div className="mt-4 pt-4 border-t border-ibm-dark-lighter flex items-center justify-between">
                      <span className="text-sm text-gray-400">Points Earned</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-4 h-4 ${pred.points > 0 ? 'text-accent-green' : 'text-accent-red'}`} />
                        <span className={`text-xl font-bold ${pred.points > 0 ? 'text-accent-gold' : 'text-accent-red'}`}>
                          {pred.points > 0 ? '+' : ''}{pred.points}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {filteredPredictions.length === 0 && (
        <GlassCard className="p-12 text-center">
          <History className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">No predictions found</h3>
          <p className="text-gray-400">Try adjusting your filters or make some predictions!</p>
        </GlassCard>
      )}
    </div>
  )
}

// Made with Bob
