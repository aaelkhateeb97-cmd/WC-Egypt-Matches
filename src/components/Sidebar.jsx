import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Trophy, 
  TrendingUp, 
  History, 
  User, 
  Settings,
  X 
} from 'lucide-react'

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/predict', icon: Trophy, label: 'Predict Matches' },
  { path: '/leaderboard', icon: TrendingUp, label: 'Leaderboard' },
  { path: '/history', icon: History, label: 'My Predictions' },
  { path: '/profile', icon: User, label: 'Profile' },
  { path: '/admin', icon: Settings, label: 'Admin Panel' },
]

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation()

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed top-16 left-0 bottom-0 w-64 glass-card border-r border-ibm-blue/20 z-40
          lg:translate-x-0 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close Button (Mobile) */}
          <button
            onClick={onClose}
            className="lg:hidden self-end p-2 rounded-lg hover:bg-ibm-dark-lighter mb-4"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Menu Items */}
          <nav className="flex-1 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${isActive 
                      ? 'bg-ibm-blue text-white shadow-neon' 
                      : 'hover:bg-ibm-dark-lighter text-gray-300 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer Stats */}
          <div className="pt-4 border-t border-ibm-dark-lighter">
            <div className="glass-card p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Your Rank</span>
                <span className="font-bold text-ibm-blue">#42</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Points</span>
                <span className="font-bold text-accent-gold">1,250</span>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

// Made with Bob
