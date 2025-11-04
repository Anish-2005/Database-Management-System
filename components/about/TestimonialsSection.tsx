import { AboutTestimonial } from "../../lib/aboutData"
import { TestimonialCard } from "./TestimonialCard"
import { SectionWrapper } from "../common/SectionWrapper"
import { SectionHeader } from "../common/SectionHeader"
import { CardGrid } from "../common/CardGrid"

interface TestimonialsSectionProps {
  testimonials: AboutTestimonial[]
}

export const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  return (
    <SectionWrapper className="mb-16">
      <SectionHeader
        title="What Our Learners Say"
        description="Real feedback from real learners who have transformed their careers with QuantumDB"
      />

      <CardGrid columns={3}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </CardGrid>
    </SectionWrapper>
  )
}