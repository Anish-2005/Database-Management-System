import { motion } from "framer-motion"
import { CommunityTab } from "../../lib/communityData"

interface CommunityTabsProps {
  activeTab: CommunityTab
  onTabChange: (tab: CommunityTab) => void
}

export const CommunityTabs = ({ activeTab, onTabChange }: CommunityTabsProps) => {
  const tabs: CommunityTab[] = ['discussions', 'members', 'events']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center justify-center gap-4 mb-8"
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onTabChange(tab)}
          className={`px-6 py-3 rounded-xl font-medium transition-all capitalize ${
            activeTab === tab
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
              : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/40 border border-slate-700'
          }`}
        >
          {tab}
        </motion.button>
      ))}
    </motion.div>
  )
}