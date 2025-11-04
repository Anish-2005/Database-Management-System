import { motion } from "framer-motion"
import { ThumbsUp, MessageCircle, Eye, Star } from "lucide-react"
import { CommunityDiscussion } from "../../lib/communityData"

interface DiscussionCardProps {
  discussion: CommunityDiscussion
  onClick: (discussion: CommunityDiscussion) => void
  index: number
}

export const DiscussionCard = ({ discussion, onClick, index }: DiscussionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer"
      onClick={() => onClick(discussion)}
    >
      <div className="flex items-start gap-4">
        {/* Author Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold flex-shrink-0">
          {discussion.author.avatar}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                  {discussion.title}
                </h3>
                {discussion.isPinned && (
                  <span className="px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
                    Pinned
                  </span>
                )}
                {discussion.hasAcceptedAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                )}
              </div>
              <p className="text-slate-400 text-sm line-clamp-2 mb-3">{discussion.content}</p>

              {/* Author Info */}
              <div className="flex items-center gap-3 text-sm text-slate-500 mb-3">
                <span className="text-slate-300">{discussion.author.name}</span>
                <span>•</span>
                <span>{discussion.author.role}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  {discussion.author.reputation}
                </span>
                <span>•</span>
                <span>{discussion.timestamp}</span>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap mb-3">
                <span className="px-2 py-1 bg-slate-800/50 border border-slate-700 rounded-full text-xs text-slate-300">
                  {discussion.category}
                </span>
                {discussion.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs text-purple-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-4 h-4" />
              <span>{discussion.likes}</span>
            </div>
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              <span>{discussion.comments} comments</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{discussion.views} views</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// CheckCircle component
const CheckCircle = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)