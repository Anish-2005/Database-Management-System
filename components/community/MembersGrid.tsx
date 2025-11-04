import { CommunityMember } from "../../lib/communityData"
import { MemberCard } from "./MemberCard"

interface MembersGridProps {
  members: CommunityMember[]
  onMemberFollow: (memberId: number) => void
}

export const MembersGrid = ({ members, onMemberFollow }: MembersGridProps) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member, index) => (
        <MemberCard
          key={member.id}
          member={member}
          onFollow={onMemberFollow}
          index={index}
        />
      ))}
    </div>
  )
}