import { StatsGrid, StatItem } from "../common/StatsGrid"
import { COMMUNITY_STATS } from "../../lib/communityData"

export const CommunityStats = () => {
  // Convert COMMUNITY_STATS to StatItem format
  const statItems: StatItem[] = COMMUNITY_STATS.map(stat => ({
    label: stat.label,
    value: stat.value,
    iconName: stat.iconName,
    color: stat.color
  }))

  return (
    <StatsGrid
      stats={statItems}
      columns={4}
      className="mb-12"
      animationDelay={0.1}
    />
  )
}