import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Profile",
  description: "Manage your saved tutorials, bookmarked labs, and personal account activity in your profile.",
  path: "/profile",
  noIndex: true,
})

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return children
}

