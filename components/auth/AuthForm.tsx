import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { GoogleSignInButton } from './GoogleSignInButton'
import { FormField } from './FormField'
import { PasswordField } from './PasswordField'
import { ErrorMessage } from './ErrorMessage'
import { AuthLinks } from './AuthLinks'
import { Mail } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'signup'
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  displayName: string
  setDisplayName: (displayName: string) => void
  error: string
  isLoading: boolean
  onSubmit: (e: React.FormEvent) => void
  onGoogleSignIn: () => void
  onForgotPassword: () => void
  onSwitchMode: () => void
}

export function AuthForm({
  mode,
  email,
  setEmail,
  password,
  setPassword,
  displayName,
  setDisplayName,
  error,
  isLoading,
  onSubmit,
  onGoogleSignIn,
  onForgotPassword,
  onSwitchMode
}: AuthFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl"
    >
      {/* Google Sign In */}
      <GoogleSignInButton onClick={onGoogleSignIn} isLoading={isLoading} />

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-slate-900 text-slate-400">or</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={onSubmit} className="space-y-4">
        {mode === 'signup' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FormField
              label="Display Name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your display name"
              required
            />
          </motion.div>
        )}

        <FormField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          icon={Mail}
          required
        />

        <PasswordField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <ErrorMessage message={error} />

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl text-white font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
            </div>
          ) : (
            mode === 'login' ? 'Sign In' : 'Create Account'
          )}
        </motion.button>
      </form>

      <AuthLinks
        mode={mode}
        onForgotPassword={onForgotPassword}
        onSwitchMode={onSwitchMode}
      />
    </motion.div>
  )
}