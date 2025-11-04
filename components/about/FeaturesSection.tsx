import { motion } from "framer-motion"
import { AboutFeature } from "../../lib/aboutData"
import { FeatureCard } from "./FeatureCard"

interface FeaturesSectionProps {
  features: AboutFeature[]
  expandedFeature: string | null
  onToggleFeature: (featureId: string | null) => void
}

export const FeaturesSection = ({ features, expandedFeature, onToggleFeature }: FeaturesSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Platform Features</h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Discover what makes QuantumDB the most comprehensive database learning platform available
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isExpanded={expandedFeature === feature.id}
            onToggle={() => onToggleFeature(expandedFeature === feature.id ? null : feature.id)}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  )
}