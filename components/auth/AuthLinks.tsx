interface AuthLinksProps {
  mode: 'login' | 'signup'
  onForgotPassword: () => void
  onSwitchMode: () => void
}

export function AuthLinks({ mode, onForgotPassword, onSwitchMode }: AuthLinksProps) {
  return (
    <div className="mt-6 space-y-2 text-center">
      {mode === 'login' && (
        <button
          onClick={onForgotPassword}
          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Forgot your password?
        </button>
      )}
      <div className="text-sm text-slate-400">
        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
        <button
          onClick={onSwitchMode}
          className="ml-1 text-purple-400 hover:text-purple-300 transition-colors font-medium"
        >
          {mode === 'login' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </div>
  )
}