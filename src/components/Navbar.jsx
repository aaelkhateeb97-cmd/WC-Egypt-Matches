import { Link } from 'react-router-dom'
import { Menu, Trophy, User, Bell } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Navbar({ onMenuClick }) {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-ibm-blue/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-ibm-dark-lighter transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/dashboard" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-lg flex items-center justify-center shadow-neon">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold gradient-text">IBM CIC</h1>
                <p className="text-xs text-gray-400">World Cup Predictor</p>
              </div>
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-ibm-dark-lighter transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent-red rounded-full"></span>
            </button>

            {/* User Profile */}
            <Link 
              to="/profile"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-ibm-dark-lighter transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">John Doe</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}

// Made with Bob
