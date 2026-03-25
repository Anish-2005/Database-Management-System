import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "About",
  description:
    "Learn about QuantumDB, our mission, platform values, and the vision behind our database learning ecosystem.",
  path: "/about",
})

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children
}

