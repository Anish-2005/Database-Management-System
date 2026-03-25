import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Labs",
  description:
    "Practice with real-world database labs focused on data modeling, indexing, performance tuning, and architecture.",
  path: "/labs",
})

export default function LabsLayout({ children }: { children: ReactNode }) {
  return children
}

