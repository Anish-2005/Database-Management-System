import { StatsGrid, StatItem } from "../common/StatsGrid"
import { AboutStat } from "../../lib/aboutData"

interface PlatformStatsProps {
  stats: AboutStat[]
}

export const PlatformStats = ({ stats }: PlatformStatsProps) => {
  // Convert AboutStat to StatItem format
  const statItems: StatItem[] = stats.map(stat => ({
    label: stat.label,
    value: stat.value,
    iconName: stat.iconName,
    color: stat.color
  }))

  return (
    <StatsGrid
      stats={statItems}
      columns={3}
      className="mb-16"
      valueSize="text-3xl"
    />
  )
}