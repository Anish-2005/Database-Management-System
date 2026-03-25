import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Community",
  description:
    "Join the QuantumDB community for discussions, events, peer learning, and database engineering collaboration.",
  path: "/community",
})

export default function CommunityLayout({ children }: { children: ReactNode }) {
  return children
}

