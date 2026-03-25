import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { User as FirebaseUser } from 'firebase/auth'
import { useMemo, useState } from 'react'

interface ProfileHeaderProps {
  user: FirebaseUser
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [avatarError, setAvatarError] = useState(false)
  const photoURL = useMemo(
    () => user.photoURL || user.providerData?.find((p) => p.photoURL)?.photoURL,
    [user.photoURL, user.providerData]
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 mb-6 border border-purple-500/30 overflow-hidden">
        {photoURL && !avatarError ? (
          <img
            src={photoURL}
            alt="Profile picture"
            className="w-20 h-20 object-cover"
            referrerPolicy="no-referrer"
            onError={() => setAvatarError(true)}
          />
        ) : (
          <User className="w-10 h-10 text-purple-400" />
        )}
      </div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
        Your Profile
      </h1>
      <p className="text-xl text-slate-300">
        Welcome back, {user.displayName || user.email?.split('@')[0] || 'User'}!
      </p>
    </motion.div>
  )
}
