import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Documentation",
  description:
    "Read complete platform documentation with guides, API references, setup walkthroughs, and best practices.",
  path: "/documentation",
})

export default function DocumentationLayout({ children }: { children: ReactNode }) {
  return children
}

