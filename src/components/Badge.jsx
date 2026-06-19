import { motion } from 'framer-motion'
import { Trophy, Award, Star, Zap, Target, Crown } from 'lucide-react'

const badgeIcons = {
  trophy: Trophy,
  award: Award,
  star: Star,
  zap: Zap,
  target: Target,
  crown: Crown,
}

export default function Badge({ 
  type = 'gold', 
  icon = 'trophy', 
  label, 
  size = 'md',
  animated = true 
}) {
  const Icon = badgeIcons[icon] || Trophy
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  }

  const typeClasses = {
    gold: 'bg-gradient-to-br from-accent-gold to-yellow-600 shadow-[0_0_20px_rgba(255,215,0,0.5)]',
    silver: 'bg-gradient-to-br from-accent-silver to-gray-400 shadow-[0_0_20px_rgba(192,192,192,0.5)]',
    bronze: 'bg-gradient-to-br from-accent-bronze to-orange-700 shadow-[0_0_20px_rgba(205,127,50,0.5)]',
    blue: 'bg-gradient-to-br from-ibm-blue to-ibm-blue-light shadow-neon',
    green: 'bg-gradient-to-br from-accent-green to-green-600 shadow-[0_0_20px_rgba(36,161,72,0.5)]',
  }

  const BadgeContent = () => (
    <div className="flex flex-col items-center space-y-2">
      <div className={`${sizeClasses[size]} ${typeClasses[type]} rounded-full flex items-center justify-center`}>
        <Icon className={`${iconSizes[size]} text-white`} />
      </div>
      {label && (
        <span className="text-xs font-semibold text-gray-300">{label}</span>
      )}
    </div>
  )

  if (!animated) {
    return <BadgeContent />
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20 
      }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      className="cursor-pointer"
    >
      <BadgeContent />
    </motion.div>
  )
}

// Made with Bob
