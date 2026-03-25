import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Login",
  description: "Sign in to QuantumDB to access your personalized tutorials, labs, and progress dashboard.",
  path: "/login",
  noIndex: true,
})

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children
}

