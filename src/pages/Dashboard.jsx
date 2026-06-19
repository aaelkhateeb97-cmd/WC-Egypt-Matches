import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Trophy, 
  Target, 
  TrendingUp, 
  Award,
  Clock,
  ArrowRight,
  Flame,
  Star
} from 'lucide-react'
import StatCard from '../components/StatCard'
import GlassCard from '../components/GlassCard'
import CountdownTimer from '../components/CountdownTimer'
import Badge from '../components/Badge'

export default function Dashboard() {
  // Mock data
  const upcomingMatches = [
    {
      id: 1,
      team1: { name: 'Brazil', flag: '🇧🇷' },
      team2: { name: 'Argentina', flag: '🇦🇷' },
      date: '2026-06-20T18:00:00',
      stage: 'Quarter Final',
      predicted: false
    },
    {
      id: 2,
      team1: { name: 'Germany', flag: '🇩🇪' },
      team2: { name: 'France', flag: '🇫🇷' },
      date: '2026-06-21T20:00:00',
      stage: 'Quarter Final',
      predicted: true
    },
    {
      id: 3,
      team1: { name: 'Spain', flag: '🇪🇸' },
      team2: { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
      date: '2026-06-22T18:00:00',
      stage: 'Quarter Final',
      predicted: false
    }
  ]

  const recentAchievements = [
    { type: 'gold', icon: 'trophy', label: 'Perfect Week' },
    { type: 'blue', icon: 'target', label: 'Accuracy King' },
    { type: 'green', icon: 'zap', label: 'Quick Predictor' }
  ]

  const leaderboardPreview = [
    { rank: 1, name: 'Sarah Johnson', points: 2450, change: 2 },
    { rank: 2, name: 'Mike Chen', points: 2380, change: -1 },
    { rank: 3, name: 'Emma Davis', points: 2310, change: 1 },
    { rank: 42, name: 'You', points: 1250, change: 5, isCurrentUser: true }
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Welcome back, <span className="gradient-text">John</span>! 👋
          </h1>
          <p className="text-gray-400">Ready to make some winning predictions?</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link to="/predict" className="btn-primary inline-flex items-center space-x-2">
            <Trophy className="w-5 h-5" />
            <span>Predict Now</span>
          </Link>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Your Rank"
          value="#42"
          icon={TrendingUp}
          trend="up"
          trendValue="+5"
          delay={0}
        />
        <StatCard
          title="Total Points"
          value="1,250"
          icon={Trophy}
          trend="up"
          trendValue="+120"
          delay={0.1}
        />
        <StatCard
          title="Accuracy"
          value="68%"
          icon={Target}
          trend="up"
          trendValue="+3%"
          delay={0.2}
        />
        <StatCard
          title="Predictions"
          value="45"
          icon={Award}
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Upcoming Matches */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <Clock className="w-6 h-6 text-ibm-blue" />
              <span>Upcoming Matches</span>
            </h2>
            <Link to="/predict" className="text-ibm-blue hover:text-ibm-blue-light flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingMatches.map((match, index) => (
              <GlassCard key={match.id} hover delay={index * 0.1}>
                <Link to={`/predict?match=${match.id}`} className="block p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge bg-ibm-blue/20 text-ibm-blue border border-ibm-blue/30">
                      {match.stage}
                    </span>
                    {match.predicted ? (
                      <span className="badge bg-accent-green/20 text-accent-green border border-accent-green/30">
                        ✓ Predicted
                      </span>
                    ) : (
                      <span className="badge bg-accent-red/20 text-accent-red border border-accent-red/30">
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-4xl">{match.team1.flag}</span>
                      <span className="font-bold text-lg">{match.team1.name}</span>
                    </div>
                    <div className="px-4 py-2 bg-ibm-dark-lighter rounded-lg font-bold text-gray-400">
                      VS
                    </div>
                    <div className="flex items-center space-x-3 flex-1 justify-end">
                      <span className="font-bold text-lg">{match.team2.name}</span>
                      <span className="text-4xl">{match.team2.flag}</span>
                    </div>
                  </div>

                  <CountdownTimer targetDate={match.date} />
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Current Streak */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Current Streak</h3>
                <Flame className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-center py-6">
                <div className="text-6xl font-bold gradient-text mb-2">7</div>
                <p className="text-gray-400">Correct Predictions</p>
              </div>
              <div className="pt-4 border-t border-ibm-dark-lighter">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Best Streak</span>
                  <span className="font-bold text-accent-gold">12</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Recent Achievements */}
          <GlassCard>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <Star className="w-5 h-5 text-accent-gold" />
                <span>Recent Achievements</span>
              </h3>
              <div className="flex justify-around py-4">
                {recentAchievements.map((achievement, index) => (
                  <Badge
                    key={index}
                    type={achievement.type}
                    icon={achievement.icon}
                    label={achievement.label}
                    size="md"
                  />
                ))}
              </div>
              <Link 
                to="/profile" 
                className="block text-center text-ibm-blue hover:text-ibm-blue-light mt-4 text-sm font-semibold"
              >
                View All Achievements →
              </Link>
            </div>
          </GlassCard>

          {/* Leaderboard Preview */}
          <GlassCard>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Leaderboard</h3>
                <Link to="/leaderboard" className="text-ibm-blue hover:text-ibm-blue-light text-sm">
                  View All →
                </Link>
              </div>
              <div className="space-y-3">
                {leaderboardPreview.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.isCurrentUser 
                        ? 'bg-ibm-blue/20 border border-ibm-blue/30' 
                        : 'bg-ibm-dark-lighter/50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        player.rank === 1 ? 'bg-accent-gold text-black' :
                        player.rank === 2 ? 'bg-accent-silver text-black' :
                        player.rank === 3 ? 'bg-accent-bronze text-black' :
                        'bg-ibm-dark-lighter text-gray-400'
                      }`}>
                        {player.rank}
                      </div>
                      <span className={`font-medium ${player.isCurrentUser ? 'text-ibm-blue' : ''}`}>
                        {player.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{player.points}</div>
                      <div className={`text-xs ${player.change > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                        {player.change > 0 ? '+' : ''}{player.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

// Made with Bob
