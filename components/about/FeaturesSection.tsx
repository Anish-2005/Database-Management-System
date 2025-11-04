import { AboutFeature } from "../../lib/aboutData"
import { FeatureCard } from "./FeatureCard"
import { SectionWrapper } from "../common/SectionWrapper"
import { SectionHeader } from "../common/SectionHeader"
import { CardGrid } from "../common/CardGrid"

interface FeaturesSectionProps {
  features: AboutFeature[]
  expandedFeature: string | null
  onToggleFeature: (featureId: string | null) => void
}

export const FeaturesSection = ({ features, expandedFeature, onToggleFeature }: FeaturesSectionProps) => {
  return (
    <SectionWrapper className="mb-16">
      <SectionHeader
        title="Platform Features"
        description="Discover what makes QuantumDB the most comprehensive database learning platform available"
      />

      <CardGrid columns={2} itemAnimation={false}>
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            isExpanded={expandedFeature === feature.id}
            onToggle={() => onToggleFeature(expandedFeature === feature.id ? null : feature.id)}
            index={index}
          />
        ))}
      </CardGrid>
    </SectionWrapper>
  )
}