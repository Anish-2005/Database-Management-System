import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Tutorials",
  description:
    "Browse structured database tutorials covering SQL, schema design, optimization, and advanced DBMS topics.",
  path: "/tutorials",
})

export default function TutorialsLayout({ children }: { children: ReactNode }) {
  return children
}

