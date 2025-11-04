import { CommunityDiscussion } from "../../lib/communityData"
import { DiscussionCard } from "./DiscussionCard"

interface DiscussionsListProps {
  discussions: CommunityDiscussion[]
  onDiscussionClick: (discussion: CommunityDiscussion) => void
}

export const DiscussionsList = ({ discussions, onDiscussionClick }: DiscussionsListProps) => {
  return (
    <div className="space-y-4">
      {discussions.map((discussion, index) => (
        <DiscussionCard
          key={discussion.id}
          discussion={discussion}
          onClick={onDiscussionClick}
          index={index}
        />
      ))}
    </div>
  )
}