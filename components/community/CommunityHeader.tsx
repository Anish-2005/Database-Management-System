import { Users } from "lucide-react"
import { PageHeader } from "../common/PageHeader"

export const CommunityHeader = () => {
  return (
    <PageHeader
      badge={{
        icon: Users,
        text: "Global Database Community"
      }}
      title={{
        primary: "Join the",
        secondary: "Community"
      }}
      description="Connect with database professionals worldwide. Share knowledge, solve problems together, and stay updated with the latest in database technology."
    />
  )
}