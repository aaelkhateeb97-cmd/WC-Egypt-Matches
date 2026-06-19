import { motion } from 'framer-motion'

export default function GlassCard({ 
  children, 
  className = '', 
  hover = false,
  onClick,
  delay = 0 
}) {
  const baseClass = hover ? 'glass-card-hover' : 'glass-card'
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`${baseClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Made with Bob
