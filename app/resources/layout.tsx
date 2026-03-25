import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Resources",
  description:
    "Access curated database resources, tools, references, and practical materials for fast learning.",
  path: "/resources",
})

export default function ResourcesLayout({ children }: { children: ReactNode }) {
  return children
}

