import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue,
  delay = 0 
}) {
  const isPositive = trend === 'up'
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="stat-card"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-ibm-blue/20 rounded-xl">
          <Icon className="w-6 h-6 text-ibm-blue" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-accent-green' : 'text-accent-red'}`}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-sm font-semibold">{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-3xl font-bold mb-2">{value}</h3>
      <p className="text-gray-400 text-sm">{title}</p>
    </motion.div>
  )
}

// Made with Bob
