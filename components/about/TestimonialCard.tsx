import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { AboutTestimonial } from "../../lib/aboutData"

interface TestimonialCardProps {
  testimonial: AboutTestimonial
  index: number
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl"
    >
      <div className="flex items-center gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>

      <p className="text-slate-300 mb-6 italic">"{testimonial.content}"</p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="text-white font-semibold">{testimonial.name}</div>
          <div className="text-sm text-slate-400">{testimonial.role} at {testimonial.company}</div>
        </div>
      </div>
    </motion.div>
  )
}