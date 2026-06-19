import { motion } from 'framer-motion'
import { 
  User, 
  Trophy, 
  Target, 
  TrendingUp,
  Award,
  Calendar,
  Mail,
  Briefcase,
  MapPin,
  Edit,
  Share2,
  Flame
} from 'lucide-react'
import GlassCard from '../components/GlassCard'
import Badge from '../components/Badge'
import StatCard from '../components/StatCard'

export default function EmployeeProfile() {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john.doe@ibm.com',
    department: 'Engineering',
    location: 'New York, USA',
    joinDate: '2024-01-15',
    avatar: 'JD',
    rank: 42,
    points: 1250,
    accuracy: 68,
    predictions: 45,
    streak: 7,
    bestStreak: 12
  }

  const achievements = [
    { type: 'gold', icon: 'trophy', label: 'Perfect Week', description: 'Got all predictions correct in a week', date: '2026-06-10', unlocked: true },
    { type: 'blue', icon: 'target', label: 'Accuracy King', description: 'Maintained 70%+ accuracy for a month', date: '2026-06-05', unlocked: true },
    { type: 'green', icon: 'zap', label: 'Quick Predictor', description: 'Made 10 predictions within 1 hour', date: '2026-06-01', unlocked: true },
    { type: 'silver', icon: 'star', label: 'Top 50', description: 'Reached top 50 in leaderboard', date: '2026-05-28', unlocked: true },
    { type: 'bronze', icon: 'award', label: 'Century Club', description: 'Earned 100+ points', date: '2026-05-20', unlocked: true },
    { type: 'blue', icon: 'crown', label: 'Streak Master', description: 'Achieved 10+ correct predictions streak', date: '2026-05-15', unlocked: true },
    { type: 'gold', icon: 'trophy', label: 'Champion', description: 'Reach #1 on leaderboard', date: null, unlocked: false },
    { type: 'gold', icon: 'star', label: 'Legend', description: 'Earn 5000+ total points', date: null, unlocked: false },
  ]

  const recentActivity = [
    { type: 'prediction', text: 'Predicted Brazil vs Argentina', time: '2 hours ago', icon: Trophy },
    { type: 'achievement', text: 'Unlocked "Perfect Week" badge', time: '1 day ago', icon: Award },
    { type: 'rank', text: 'Moved up 5 positions to #42', time: '2 days ago', icon: TrendingUp },
    { type: 'points', text: 'Earned 10 points from correct prediction', time: '3 days ago', icon: Target }
  ]

  const stats = [
    { label: 'Win Rate', value: `${user.accuracy}%`, change: '+3%', trend: 'up' },
    { label: 'Avg Points/Match', value: '7.2', change: '+0.5', trend: 'up' },
    { label: 'Best Rank', value: '#38', change: null, trend: null },
    { label: 'Days Active', value: '156', change: null, trend: null }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center space-x-3">
          <User className="w-8 h-8 text-ibm-blue" />
          <span>Profile</span>
        </h1>
        <p className="text-gray-400">Manage your profile and view your achievements</p>
      </motion.div>

      {/* Profile Header Card */}
      <GlassCard>
        <div className="p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="relative"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-3xl flex items-center justify-center shadow-neon">
                <span className="text-5xl font-bold text-white">{user.avatar}</span>
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-ibm-blue rounded-full flex items-center justify-center hover:bg-ibm-blue-light transition-colors shadow-lg">
                <Edit className="w-5 h-5 text-white" />
              </button>
            </motion.div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{user.name}</h2>
              <div className="space-y-2 mb-6">
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                  <Briefcase className="w-4 h-4" />
                  <span>{user.department}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <button className="btn-primary flex items-center space-x-2">
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
                <button className="btn-secondary flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share Profile</span>
                </button>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold gradient-text mb-1">#{user.rank}</div>
                <div className="text-xs text-gray-400">Rank</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-accent-gold mb-1">{user.points}</div>
                <div className="text-xs text-gray-400">Points</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-ibm-blue mb-1">{user.accuracy}%</div>
                <div className="text-xs text-gray-400">Accuracy</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="text-3xl font-bold text-orange-500 mb-1 flex items-center justify-center space-x-1">
                  <Flame className="w-6 h-6" />
                  <span>{user.streak}</span>
                </div>
                <div className="text-xs text-gray-400">Streak</div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <GlassCard key={index} delay={index * 0.1}>
            <div className="p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              {stat.change && (
                <div className={`text-xs font-semibold ${stat.trend === 'up' ? 'text-accent-green' : 'text-accent-red'}`}>
                  {stat.change}
                </div>
              )}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Achievements */}
        <div className="lg:col-span-2">
          <GlassCard>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                <Award className="w-6 h-6 text-accent-gold" />
                <span>Achievements</span>
                <span className="text-sm text-gray-400 ml-auto">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </span>
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-ibm-dark-lighter/50 border-ibm-blue/30 hover:border-ibm-blue/50'
                        : 'bg-ibm-dark-lighter/20 border-gray-700/30 opacity-50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <Badge
                        type={achievement.type}
                        icon={achievement.icon}
                        size="md"
                        animated={achievement.unlocked}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold mb-1">{achievement.label}</h3>
                        <p className="text-xs text-gray-400 mb-2">{achievement.description}</p>
                        {achievement.unlocked && achievement.date && (
                          <div className="flex items-center space-x-1 text-xs text-ibm-blue">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(achievement.date).toLocaleDateString()}</span>
                          </div>
                        )}
                        {!achievement.unlocked && (
                          <span className="text-xs text-gray-500">🔒 Locked</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Recent Activity */}
        <div>
          <GlassCard>
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-ibm-blue" />
                <span>Recent Activity</span>
              </h2>

              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-ibm-dark-lighter/50 rounded-lg hover:bg-ibm-dark-lighter transition-colors"
                  >
                    <div className="w-10 h-10 bg-ibm-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-ibm-blue" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">{activity.text}</p>
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Performance Chart Placeholder */}
          <GlassCard className="mt-6">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center space-x-2">
                <Target className="w-5 h-5 text-ibm-blue" />
                <span>Performance</span>
              </h2>
              <div className="h-48 flex items-center justify-center bg-ibm-dark-lighter/50 rounded-xl">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">Performance chart coming soon</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
