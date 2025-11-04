import { motion } from "framer-motion"
import { MapPin, Mail } from "lucide-react"
import { CommunityMember } from "../../lib/communityData"

interface MemberCardProps {
  member: CommunityMember
  onFollow: (memberId: number) => void
  index: number
}

export const MemberCard = ({ member, onFollow, index }: MemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all"
    >
      {/* Member Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
          {member.avatar}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">{member.name}</h3>
          <p className="text-sm text-slate-400 mb-1">{member.role}</p>
          <p className="text-xs text-slate-500">{member.company}</p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-sm text-slate-400 mb-4 line-clamp-3">{member.bio}</p>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{member.location}</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-slate-800/40 rounded-xl">
        <div className="text-center">
          <div className="text-lg font-bold text-purple-400">{member.posts}</div>
          <div className="text-xs text-slate-500">Posts</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-400">{member.answers}</div>
          <div className="text-xs text-slate-500">Answers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-400">{member.reputation}</div>
          <div className="text-xs text-slate-500">Rep</div>
        </div>
      </div>

      {/* Badges */}
      <div className="flex gap-2 flex-wrap mb-4">
        {member.badges.map((badge) => (
          <span key={badge} className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
            {badge}
          </span>
        ))}
      </div>

      {/* Skills */}
      <div className="flex gap-2 flex-wrap mb-4">
        {member.skills.slice(0, 3).map((skill) => (
          <span key={skill} className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
            {skill}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFollow(member.id)}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white text-sm"
        >
          Follow
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-slate-800/40 hover:bg-slate-700/40 rounded-xl border border-slate-700 text-slate-300"
        >
          <Mail className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}