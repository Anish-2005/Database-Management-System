import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Practice",
  description:
    "Sharpen your database skills with interactive challenges, quizzes, and performance-focused practice tracks.",
  path: "/practice",
})

export default function PracticeLayout({ children }: { children: ReactNode }) {
  return children
}

