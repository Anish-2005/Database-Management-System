import type { Metadata } from "next"
import type { ReactNode } from "react"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "Pricing",
  description:
    "Explore subscription plans, compare features, and choose the best QuantumDB package for your goals.",
  path: "/pricing",
})

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children
}

