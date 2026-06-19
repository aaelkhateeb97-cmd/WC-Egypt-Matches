import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Trophy, 
  Medal,
  Crown,
  Search,
  Filter,
  Award
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import RankIndicator from '../components/RankIndicator'
import Badge from '../components/Badge'

export default function Leaderboard() {
  const [filter, setFilter] = useState('overall') // overall, weekly, monthly
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data
  const leaderboardData = [
    {
      rank: 1,
      previousRank: 3,
      name: 'Sarah Johnson',
      department: 'Engineering',
      points: 2450,
      accuracy: 72,
      predictions: 48,
      streak: 12,
      badges: ['gold', 'blue', 'green']
    },
    {
      rank: 2,
      previousRank: 1,
      name: 'Mike Chen',
      department: 'Product',
      points: 2380,
      accuracy: 70,
      predictions: 52,
      streak: 8,
      badges: ['silver', 'blue']
    },
    {
      rank: 3,
      previousRank: 4,
      name: 'Emma Davis',
      department: 'Design',
      points: 2310,
      accuracy: 68,
      predictions: 45,
      streak: 15,
      badges: ['bronze', 'green', 'blue']
    },
    {
      rank: 4,
      previousRank: 2,
      name: 'James Wilson',
      department: 'Marketing',
      points: 2180,
      accuracy: 65,
      predictions: 50,
      streak: 5,
      badges: ['blue']
    },
    {
      rank: 5,
      previousRank: 5,
      name: 'Lisa Anderson',
      department: 'Sales',
      points: 2050,
      accuracy: 67,
      predictions: 47,
      streak: 9,
      badges: ['green', 'blue']
    },
    // Add more players
    ...Array.from({ length: 15 }, (_, i) => ({
      rank: i + 6,
      previousRank: i + 6,
      name: `Player ${i + 6}`,
      department: ['Engineering', 'Product', 'Design', 'Marketing', 'Sales'][i % 5],
      points: 2000 - (i * 50),
      accuracy: 65 - i,
      predictions: 45 - i,
      streak: Math.floor(Math.random() * 10),
      badges: []
    })),
    {
      rank: 42,
      previousRank: 47,
      name: 'John Doe (You)',
      department: 'Engineering',
      points: 1250,
      accuracy: 68,
      predictions: 45,
      streak: 7,
      badges: ['blue'],
      isCurrentUser: true
    }
  ]

  const filteredData = leaderboardData.filter(player =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    player.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'from-accent-gold to-yellow-600'
    if (rank === 2) return 'from-accent-silver to-gray-400'
    if (rank === 3) return 'from-accent-bronze to-orange-700'
    return 'from-ibm-dark-lighter to-ibm-dark-light'
  }

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown className="w-5 h-5" />
    if (rank === 2) return <Medal className="w-5 h-5" />
    if (rank === 3) return <Award className="w-5 h-5" />
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-ibm-blue" />
            <span>Leaderboard</span>
          </h1>
          <p className="text-gray-400">Compete with the best predictors in IBM CIC</p>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="md:order-1"
        >
          <GlassCard className="p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-silver to-gray-400"></div>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent-silver to-gray-400 rounded-full flex items-center justify-center shadow-lg">
              <Medal className="w-10 h-10 text-white" />
            </div>
            <div className="text-4xl font-bold text-accent-silver mb-2">#2</div>
            <h3 className="text-xl font-bold mb-1">{leaderboardData[1].name}</h3>
            <p className="text-sm text-gray-400 mb-4">{leaderboardData[1].department}</p>
            <div className="text-3xl font-bold gradient-text mb-2">{leaderboardData[1].points}</div>
            <p className="text-xs text-gray-400">points</p>
            <div className="mt-4 flex justify-center space-x-2">
              <RankIndicator change={leaderboardData[1].previousRank - leaderboardData[1].rank} size="sm" />
            </div>
          </GlassCard>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
          className="md:order-2 md:-mt-4"
        >
          <GlassCard className="p-8 text-center relative overflow-hidden border-2 border-accent-gold/50">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent-gold to-yellow-600"></div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-accent-gold to-yellow-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,215,0,0.6)]"
            >
              <Crown className="w-12 h-12 text-white" />
            </motion.div>
            <div className="text-5xl font-bold text-accent-gold mb-2">#1</div>
            <h3 className="text-2xl font-bold mb-1">{leaderboardData[0].name}</h3>
            <p className="text-sm text-gray-400 mb-4">{leaderboardData[0].department}</p>
            <div className="text-4xl font-bold gradient-text mb-2">{leaderboardData[0].points}</div>
            <p className="text-xs text-gray-400">points</p>
            <div className="mt-4 flex justify-center space-x-2">
              <RankIndicator change={leaderboardData[0].previousRank - leaderboardData[0].rank} size="sm" />
            </div>
            <div className="mt-4 flex justify-center space-x-2">
              {leaderboardData[0].badges.map((badge, i) => (
                <Badge key={i} type={badge} size="sm" animated={false} />
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:order-3"
        >
          <GlassCard className="p-6 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-bronze to-orange-700"></div>
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent-bronze to-orange-700 rounded-full flex items-center justify-center shadow-lg">
              <Award className="w-10 h-10 text-white" />
            </div>
            <div className="text-4xl font-bold text-accent-bronze mb-2">#3</div>
            <h3 className="text-xl font-bold mb-1">{leaderboardData[2].name}</h3>
            <p className="text-sm text-gray-400 mb-4">{leaderboardData[2].department}</p>
            <div className="text-3xl font-bold gradient-text mb-2">{leaderboardData[2].points}</div>
            <p className="text-xs text-gray-400">points</p>
            <div className="mt-4 flex justify-center space-x-2">
              <RankIndicator change={leaderboardData[2].previousRank - leaderboardData[2].rank} size="sm" />
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { value: 'overall', label: 'Overall' },
            { value: 'weekly', label: 'This Week' },
            { value: 'monthly', label: 'This Month' }
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                filter === tab.value
                  ? 'bg-ibm-blue text-white shadow-neon'
                  : 'bg-ibm-dark-lighter text-gray-400 hover:text-white hover:bg-ibm-dark-light'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search players or departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-ibm-dark-lighter border border-ibm-dark-light rounded-xl focus:border-ibm-blue focus:outline-none text-white placeholder-gray-500"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <GlassCard>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full">
            <thead>
              <tr className="border-b border-ibm-dark-lighter">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Player</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Department</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Points</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Accuracy</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Predictions</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Streak</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Change</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((player, index) => (
                <motion.tr
                  key={player.rank}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-b border-ibm-dark-lighter/50 hover:bg-ibm-dark-lighter/30 transition-colors ${
                    player.isCurrentUser ? 'bg-ibm-blue/10 border-ibm-blue/30' : ''
                  }`}
                >
                  {/* Rank */}
                  <td className="px-6 py-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRankBadgeColor(player.rank)} flex items-center justify-center font-bold text-white shadow-lg`}>
                      {getRankIcon(player.rank) || player.rank}
                    </div>
                  </td>

                  {/* Player */}
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">{player.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className={`font-semibold ${player.isCurrentUser ? 'text-ibm-blue' : ''}`}>
                          {player.name}
                        </div>
                        {player.badges.length > 0 && (
                          <div className="flex space-x-1 mt-1">
                            {player.badges.slice(0, 3).map((badge, i) => (
                              <div key={i} className={`w-4 h-4 rounded-full bg-gradient-to-br ${
                                badge === 'gold' ? 'from-accent-gold to-yellow-600' :
                                badge === 'silver' ? 'from-accent-silver to-gray-400' :
                                badge === 'bronze' ? 'from-accent-bronze to-orange-700' :
                                badge === 'blue' ? 'from-ibm-blue to-ibm-blue-light' :
                                'from-accent-green to-green-600'
                              }`}></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4">
                    <span className="badge bg-ibm-dark-lighter text-gray-300">
                      {player.department}
                    </span>
                  </td>

                  {/* Points */}
                  <td className="px-6 py-4 text-center">
                    <div className="font-bold text-lg gradient-text">{player.points}</div>
                  </td>

                  {/* Accuracy */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-16 bg-ibm-dark-lighter rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-ibm-blue to-ibm-blue-light h-2 rounded-full"
                          style={{ width: `${player.accuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-semibold">{player.accuracy}%</span>
                    </div>
                  </td>

                  {/* Predictions */}
                  <td className="px-6 py-4 text-center font-semibold">
                    {player.predictions}
                  </td>

                  {/* Streak */}
                  <td className="px-6 py-4 text-center">
                    <div className="inline-flex items-center space-x-1 px-3 py-1 bg-orange-500/20 text-orange-500 rounded-full">
                      <span className="text-lg">🔥</span>
                      <span className="font-bold">{player.streak}</span>
                    </div>
                  </td>

                  {/* Change */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <RankIndicator change={player.previousRank - player.rank} />
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}

// Made with Bob
