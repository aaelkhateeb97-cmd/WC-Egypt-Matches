import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target, 
  Award, 
  Zap,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Trophy,
      title: 'Predict & Win',
      description: 'Make predictions on World Cup matches and compete for the top spot'
    },
    {
      icon: TrendingUp,
      title: 'Live Leaderboard',
      description: 'Track your rank in real-time with dynamic position updates'
    },
    {
      icon: Users,
      title: 'Team Competition',
      description: 'Compete with colleagues and climb the corporate ladder'
    },
    {
      icon: Award,
      title: 'Earn Badges',
      description: 'Unlock achievements and showcase your prediction prowess'
    },
    {
      icon: Target,
      title: 'Accuracy Tracking',
      description: 'Monitor your prediction accuracy with detailed analytics'
    },
    {
      icon: Zap,
      title: 'Instant Updates',
      description: 'Get real-time match updates and score notifications'
    }
  ]

  const stats = [
    { value: '500+', label: 'Active Players' },
    { value: '2,500+', label: 'Predictions Made' },
    { value: '64', label: 'Matches Covered' },
    { value: '$5,000', label: 'Prize Pool' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-ibm-blue/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-ibm-blue-light/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-ibm-blue to-ibm-blue-light rounded-3xl shadow-neon mb-8"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">IBM CIC</span>
              <br />
              <span className="text-white">World Cup Predictor</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
            >
              Predict match outcomes, compete with colleagues, and climb the leaderboard. 
              The ultimate fantasy football experience for IBM CIC employees.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/dashboard" className="btn-primary flex items-center space-x-2 text-lg">
                <span>Start Predicting</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/leaderboard" className="btn-secondary flex items-center space-x-2 text-lg">
                <TrendingUp className="w-5 h-5" />
                <span>View Leaderboard</span>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
            >
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-6">
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-ibm-blue rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-ibm-blue rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Why Join?</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the thrill of prediction gaming with enterprise-grade features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card-hover p-8"
              >
                <div className="w-14 h-14 bg-ibm-blue/20 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-ibm-blue" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-ibm-dark-light/30">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">How It Works</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Sign In', description: 'Access with your IBM credentials' },
              { step: '02', title: 'Make Predictions', description: 'Predict match outcomes before kickoff' },
              { step: '03', title: 'Earn Points', description: 'Climb the leaderboard and win prizes' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="glass-card p-8 text-center">
                  <div className="text-6xl font-bold gradient-text mb-4">{item.step}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                  <CheckCircle2 className="w-8 h-8 text-accent-green mx-auto mt-6" />
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-ibm-blue" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card p-12 text-center"
        >
          <Trophy className="w-16 h-16 text-ibm-blue mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Compete?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join hundreds of IBM CIC employees in the ultimate prediction challenge
          </p>
          <Link to="/dashboard" className="btn-primary inline-flex items-center space-x-2 text-lg">
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  )
}

// Made with Bob
