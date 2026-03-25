"use client"

import { useId } from "react"

type LogoSize = "sm" | "md" | "lg"

interface BrandLogoProps {
  size?: LogoSize
  withWordmark?: boolean
  subtitle?: string
  className?: string
}

function BrandMark({ size = "md" }: { size?: LogoSize }) {
  const gradientId = useId().replace(/:/g, "")
  const glowId = useId().replace(/:/g, "")
  const dimensions = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  }

  return (
    <svg
      viewBox="0 0 64 64"
      className={dimensions[size]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7F2C7C" />
          <stop offset="60%" stopColor="#5E2750" />
          <stop offset="100%" stopColor="#2C001E" />
        </linearGradient>
        <radialGradient id={glowId} cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(23 20) rotate(42) scale(34 27)">
          <stop stopColor="#CBA6EC" stopOpacity="0.35" />
          <stop offset="1" stopColor="#CBA6EC" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect x="6" y="6" width="52" height="52" rx="14" fill={`url(#${gradientId})`} stroke="#B98BDA" strokeWidth="1.5" />
      <rect x="6" y="6" width="52" height="52" rx="14" fill={`url(#${glowId})`} />

      <circle cx="32" cy="32" r="12.5" stroke="#F5EAFF" strokeWidth="5" />
      <path d="M39.5 39.5L46.2 46.2" stroke="#F5EAFF" strokeWidth="5" strokeLinecap="round" />
      <circle cx="46.5" cy="17.5" r="2.8" fill="#E95420" />
    </svg>
  )
}

export default function BrandLogo({
  size = "md",
  withWordmark = true,
  subtitle,
  className = "",
}: BrandLogoProps) {
  const titleSize = {
    sm: "text-sm",
    md: "text-[15px]",
    lg: "text-xl",
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <BrandMark size={size} />
      {withWordmark && (
        <div className="leading-tight">
          <p className={`font-semibold tracking-[0.015em] text-slate-100 ${titleSize[size]}`}>QuantumDB</p>
          {subtitle && <p className="text-xs text-slate-200/80">{subtitle}</p>}
        </div>
      )}
    </div>
  )
}
