import { motion } from 'framer-motion'

interface ErrorMessageProps {
  message: string
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
    >
      <p className="text-red-400 text-sm">{message}</p>
    </motion.div>
  )
}