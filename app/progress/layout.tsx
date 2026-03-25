import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Progress",
  description:
    "Track your learning performance, achievements, and growth insights across tutorials, labs, and practice.",
  path: "/progress",
})

export default function ProgressLayout({ children }: { children: ReactNode }) {
  return children
}

