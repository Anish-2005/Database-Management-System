import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Settings",
  description: "Configure app preferences, account options, and local learning data controls.",
  path: "/settings",
  noIndex: true,
})

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return children
}

