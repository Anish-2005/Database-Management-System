import { ReactNode } from "react"

interface SectionHeaderProps {
  title: string
  description: string
  className?: string
}

export const SectionHeader = ({
  title,
  description,
  className = "text-center mb-12"
}: SectionHeaderProps) => {
  return (
    <div className={className}>
      <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>
      <p className="text-slate-400 max-w-2xl mx-auto">{description}</p>
    </div>
  )
}