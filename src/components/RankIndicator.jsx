import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function RankIndicator({ change, size = 'md' }) {
  if (change === 0) {
    return (
      <div className="flex items-center text-gray-400">
        <Minus className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      </div>
    )
  }

  const isUp = change > 0
  const Icon = isUp ? TrendingUp : TrendingDown
  const colorClass = isUp ? 'text-accent-green' : 'text-accent-red'
  const animationClass = isUp ? 'animate-rank-up' : 'animate-rank-down'

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`flex items-center space-x-1 ${colorClass} ${animationClass}`}
    >
      <Icon className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
      <span className={`font-bold ${size === 'sm' ? 'text-sm' : 'text-base'}`}>
        {Math.abs(change)}
      </span>
    </motion.div>
  )
}

// Made with Bob
