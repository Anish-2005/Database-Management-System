import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'

interface LoginHeaderProps {
  mode: 'login' | 'signup'
}

export function LoginHeader({ mode }: LoginHeaderProps) {
  return (
    <div className="text-center mb-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-6 border border-purple-500/30"
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Lock className="w-6 h-6 text-white" />
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        {mode === 'login' ? 'Welcome Back' : 'Create Account'}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-slate-400"
      >
        {mode === 'login' ? 'Sign in to your account' : 'Join our community'}
      </motion.p>
    </div>
  )
}