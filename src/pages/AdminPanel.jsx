import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Settings, 
  Users, 
  Trophy,
  BarChart3,
  Calendar,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  AlertCircle
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview') // overview, matches, users, settings

  // Mock data
  const adminStats = {
    totalUsers: 523,
    activeUsers: 487,
    totalMatches: 64,
    completedMatches: 32,
    totalPredictions: 15680,
    avgPredictionsPerMatch: 245
  }

  const recentMatches = [
    {
      id: 1,
      team1: { name: 'Brazil', flag: '🇧🇷' },
      team2: { name: 'Argentina', flag: '🇦🇷' },
      date: '2026-06-20T18:00:00',
      stage: 'Quarter Final',
      status: 'scheduled',
      predictions: 487
    },
    {
      id: 2,
      team1: { name: 'Germany', flag: '🇩🇪' },
      team2: { name: 'France', flag: '🇫🇷' },
      date: '2026-06-21T20:00:00',
      stage: 'Quarter Final',
      status: 'scheduled',
      predictions: 456
    },
    {
      id: 3,
      team1: { name: 'Spain', flag: '🇪🇸' },
      team2: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      date: '2026-06-15T18:00:00',
      stage: 'Round of 16',
      status: 'completed',
      predictions: 512,
      result: { team1Score: 2, team2Score: 1 }
    }
  ]

  const topUsers = [
    { name: 'Sarah Johnson', email: 'sarah.j@ibm.com', points: 2450, predictions: 48, accuracy: 72 },
    { name: 'Mike Chen', email: 'mike.c@ibm.com', points: 2380, predictions: 52, accuracy: 70 },
    { name: 'Emma Davis', email: 'emma.d@ibm.com', points: 2310, predictions: 45, accuracy: 68 }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
          <Settings className="w-8 h-8 text-ibm-blue" />
          <span>Admin Panel</span>
        </h1>
        <p className="text-gray-400">Manage matches, users, and system settings</p>
      </motion.div>

      {/* Admin Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-ibm-blue/10 border border-ibm-blue/30 rounded-xl p-4 flex items-start space-x-3"
      >
        <AlertCircle className="w-5 h-5 text-ibm-blue flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-ibm-blue mb-1">Administrator Access</h3>
          <p className="text-sm text-gray-400">You have full access to manage the World Cup Predictor system. Use these tools responsibly.</p>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Users"
          value={adminStats.totalUsers}
          icon={Users}
          delay={0}
        />
        <StatCard
          title="Active Users"
          value={adminStats.activeUsers}
          icon={Users}
          trend="up"
          trendValue="+12"
          delay={0.1}
        />
        <StatCard
          title="Total Matches"
          value={adminStats.totalMatches}
          icon={Trophy}
          delay={0.2}
        />
        <StatCard
          title="Completed"
          value={adminStats.completedMatches}
          icon={Trophy}
          delay={0.3}
        />
        <StatCard
          title="Predictions"
          value={adminStats.totalPredictions.toLocaleString()}
          icon={BarChart3}
          delay={0.4}
        />
        <StatCard
          title="Avg/Match"
          value={adminStats.avgPredictionsPerMatch}
          icon={BarChart3}
          delay={0.5}
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { value: 'overview', label: 'Overview', icon: BarChart3 },
          { value: 'matches', label: 'Matches', icon: Trophy },
          { value: 'users', label: 'Users', icon: Users },
          { value: 'settings', label: 'Settings', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.value
                ? 'bg-ibm-blue text-white shadow-neon'
                : 'bg-ibm-dark-lighter text-gray-400 hover:text-white hover:bg-ibm-dark-light'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-ibm-blue" />
                <span>Recent Activity</span>
              </h2>
              <div className="space-y-3">
                {[
                  { text: 'New match added: Brazil vs Argentina', time: '5 minutes ago', type: 'match' },
                  { text: '487 predictions received for upcoming match', time: '1 hour ago', type: 'prediction' },
                  { text: 'Match result updated: Spain 2-1 England', time: '3 hours ago', type: 'result' },
                  { text: '12 new users registered', time: '5 hours ago', type: 'user' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-ibm-dark-lighter/50 rounded-lg">
                    <div className="w-2 h-2 bg-ibm-blue rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Top Performers */}
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-accent-gold" />
                <span>Top Performers</span>
              </h2>
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-ibm-dark-lighter/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        index === 0 ? 'bg-accent-gold text-black' :
                        index === 1 ? 'bg-accent-silver text-black' :
                        'bg-accent-bronze text-black'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{user.name}</div>
                        <div className="text-xs text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-accent-gold">{user.points}</div>
                      <div className="text-xs text-gray-400">{user.accuracy}% accuracy</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'matches' && (
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Match</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Import Matches</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Data</span>
            </button>
          </div>

          {/* Matches Table */}
          <GlassCard>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ibm-dark-lighter">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Match</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Stage</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Status</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Predictions</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMatches.map((match, index) => (
                    <tr key={match.id} className="border-b border-ibm-dark-lighter/50 hover:bg-ibm-dark-lighter/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{match.team1.flag}</span>
                          <span className="font-semibold">{match.team1.name}</span>
                          <span className="text-gray-400">vs</span>
                          <span className="font-semibold">{match.team2.name}</span>
                          <span className="text-2xl">{match.team2.flag}</span>
                        </div>
                        {match.result && (
                          <div className="text-sm text-gray-400 mt-1">
                            Result: {match.result.team1Score} - {match.result.team2Score}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30">
                          {match.stage}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(match.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`badge ${
                          match.status === 'completed' 
                            ? 'bg-accent-green/20 text-accent-green border-accent-green/30'
                            : 'bg-gray-500/20 text-gray-400 border-gray-500/30'
                        }`}>
                          {match.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
                        {match.predictions}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 hover:bg-ibm-dark-lighter rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-ibm-blue" />
                          </button>
                          <button className="p-2 hover:bg-ibm-dark-lighter rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-ibm-dark-lighter rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-accent-red" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button className="btn-primary flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add User</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export Users</span>
            </button>
          </div>

          {/* Users Table */}
          <GlassCard>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-ibm-dark-lighter">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">User</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Points</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Predictions</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Accuracy</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {topUsers.map((user, index) => (
                    <tr key={index} className="border-b border-ibm-dark-lighter/50 hover:bg-ibm-dark-lighter/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-semibold">{user.name}</div>
                          <div className="text-sm text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-bold text-accent-gold">
                        {user.points}
                      </td>
                      <td className="px-6 py-4 text-center font-semibold">
                        {user.predictions}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-ibm-blue">{user.accuracy}%</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center space-x-2">
                          <button className="p-2 hover:bg-ibm-dark-lighter rounded-lg transition-colors">
                            <Eye className="w-4 h-4 text-ibm-blue" />
                          </button>
                          <button className="p-2 hover:bg-ibm-dark-lighter rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid lg:grid-cols-2 gap-6">
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">General Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Application Name</label>
                  <input
                    type="text"
                    defaultValue="IBM CIC World Cup Predictor"
                    className="w-full px-4 py-2 bg-ibm-dark-lighter border border-ibm-dark-light rounded-lg focus:border-ibm-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Points for Exact Score</label>
                  <input
                    type="number"
                    defaultValue="10"
                    className="w-full px-4 py-2 bg-ibm-dark-lighter border border-ibm-dark-light rounded-lg focus:border-ibm-blue focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Points for Correct Winner</label>
                  <input
                    type="number"
                    defaultValue="5"
                    className="w-full px-4 py-2 bg-ibm-dark-lighter border border-ibm-dark-light rounded-lg focus:border-ibm-blue focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { label: 'Email notifications for new matches', checked: true },
                  { label: 'Email notifications for match results', checked: true },
                  { label: 'Daily leaderboard updates', checked: false },
                  { label: 'Achievement unlock notifications', checked: true }
                ].map((setting, index) => (
                  <label key={index} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={setting.checked}
                      className="w-5 h-5 rounded bg-ibm-dark-lighter border-ibm-dark-light focus:ring-ibm-blue"
                    />
                    <span className="text-sm">{setting.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </GlassCard>

          <div className="lg:col-span-2">
            <button className="btn-primary w-full">Save Settings</button>
          </div>
        </div>
      )}
    </div>
  )
}

// Made with Bob
