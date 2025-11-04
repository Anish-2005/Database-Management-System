import { motion } from "framer-motion"
import { Calendar, Clock, User, MapPin } from "lucide-react"
import { CommunityEvent } from "../../lib/communityData"

interface EventCardProps {
  event: CommunityEvent
  onRegister: (eventId: number) => void
  index: number
}

export const EventCard = ({ event, onRegister, index }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all"
    >
      {/* Event Header */}
      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${event.gradient} flex items-center justify-center mb-4`}>
        <Calendar className="w-6 h-6 text-white" />
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{event.title}</h3>
      <p className="text-sm text-slate-400 mb-4 line-clamp-2">{event.description}</p>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Calendar className="w-4 h-4 text-purple-400" />
          <span>{event.date} • {event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>{event.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <User className="w-4 h-4 text-green-400" />
          <span>Hosted by {event.host}</span>
        </div>
        {!event.isOnline && (
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <MapPin className="w-4 h-4 text-red-400" />
            <span>{event.location}</span>
          </div>
        )}
      </div>

      {/* Attendance */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-2">
          <span>{event.attendees} / {event.maxAttendees} attendees</span>
          <span>{Math.round((event.attendees / event.maxAttendees) * 100)}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            className={`bg-gradient-to-r ${event.gradient} h-2 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${(event.attendees / event.maxAttendees) * 100}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 flex-wrap mb-4">
        <span className={`px-2 py-1 bg-gradient-to-r ${event.gradient} bg-opacity-20 border border-purple-500/30 rounded-full text-xs text-white`}>
          {event.type}
        </span>
        {event.isOnline && (
          <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
            Online
          </span>
        )}
      </div>

      {/* Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onRegister(event.id)}
        className={`w-full px-4 py-2 bg-gradient-to-r ${event.gradient} rounded-xl text-white text-sm`}
      >
        Register Now
      </motion.button>
    </motion.div>
  )
}