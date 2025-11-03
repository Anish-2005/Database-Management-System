import { motion } from "framer-motion"
import { PlayCircle, Terminal, MessageSquare } from "lucide-react"

export const QuickLinks = () => {
  const links = [
    {
      title: "Video Tutorials",
      desc: "Watch step-by-step video guides",
      icon: PlayCircle,
      color: "from-red-500 to-pink-500"
    },
    {
      title: "API Playground",
      desc: "Test APIs in interactive environment",
      icon: Terminal,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Community Forum",
      desc: "Get help from the community",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 grid md:grid-cols-3 gap-6"
    >
      {links.map((link, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer"
        >
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4`}>
            <link.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">{link.title}</h3>
          <p className="text-sm text-slate-400">{link.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}