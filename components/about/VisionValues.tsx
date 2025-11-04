import {
  Lightbulb,
  Heart,
  Shield,
  Users
} from "lucide-react"
import { AboutValue } from "../../lib/aboutData"
import { SectionWrapper } from "../common/SectionWrapper"
import { SectionHeader } from "../common/SectionHeader"
import { CardGrid } from "../common/CardGrid"

const iconMap = {
  Lightbulb,
  Heart,
  Shield,
  Users
} as const

interface VisionValuesProps {
  values: AboutValue[]
}

export const VisionValues = ({ values }: VisionValuesProps) => {
  const valueCards = values.map((value, index) => {
    const IconComponent = iconMap[value.iconName as keyof typeof iconMap]

    return (
      <div className="p-6 bg-slate-900/30 backdrop-blur-sm border border-slate-700 rounded-3xl text-center">
        <div className={`w-12 h-12 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
        <p className="text-sm text-slate-400">{value.description}</p>
      </div>
    )
  })

  return (
    <SectionWrapper className="mb-16">
      <SectionHeader
        title="Our Vision & Values"
        description="The principles that guide everything we do at QuantumDB"
      />

      <CardGrid columns={4}>
        {valueCards}
      </CardGrid>
    </SectionWrapper>
  )
}