import { motion } from "framer-motion"
import { AboutTestimonial } from "../../lib/aboutData"
import { TestimonialCard } from "./TestimonialCard"

interface TestimonialsSectionProps {
  testimonials: AboutTestimonial[]
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">What Our Learners Say</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Real feedback from real learners who have transformed their careers with QuantumDB
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
}