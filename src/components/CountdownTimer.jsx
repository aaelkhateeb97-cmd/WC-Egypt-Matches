import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

export default function CountdownTimer({ targetDate, label = "Match starts in" }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date()
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }
    return null
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) {
    return (
      <div className="flex items-center space-x-2 text-accent-green">
        <Clock className="w-4 h-4" />
        <span className="text-sm font-semibold">LIVE NOW</span>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2 text-gray-400 text-xs">
        <Clock className="w-3 h-3" />
        <span>{label}</span>
      </div>
      <div className="flex space-x-2">
        {timeLeft.days > 0 && (
          <TimeUnit value={timeLeft.days} label="D" />
        )}
        <TimeUnit value={timeLeft.hours} label="H" />
        <TimeUnit value={timeLeft.minutes} label="M" />
        <TimeUnit value={timeLeft.seconds} label="S" />
      </div>
    </div>
  )
}

function TimeUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center bg-ibm-dark-lighter rounded-lg px-3 py-2 min-w-[3rem]">
      <span className="text-xl font-bold text-ibm-blue">{String(value).padStart(2, '0')}</span>
      <span className="text-xs text-gray-400">{label}</span>
    </div>
  )
}

// Made with Bob
