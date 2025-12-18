"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorProps {
  variant?: "default" | "hover" | "click"
  color?: string
  size?: number
  blendMode?: "normal" | "multiply" | "screen" | "overlay"
}

export default function CursorAnimation({ 
  variant = "default", 
  color = "#8b5cf6",
  size = 24,
  blendMode = "screen"
}: CursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      return window.matchMedia("(pointer: coarse)").matches
    }
    
    setIsMobile(checkMobile())
    
    if (checkMobile()) return // Disable custom cursor on mobile

    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
      
      if (!isVisible) setIsVisible(true)
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)
    const mouseDown = () => {
      setCursorVariant("click")
    }
    const mouseUp = () => {
      setCursorVariant("default")
    }

    // Handle hover states for interactive elements
    const handleLinkHover = () => setCursorVariant("hover")
    const handleLinkLeave = () => setCursorVariant("default")

    // Add event listeners
    window.addEventListener("mousemove", mouseMove)
    window.addEventListener("mouseenter", mouseEnter)
    window.addEventListener("mouseleave", mouseLeave)
    window.addEventListener("mousedown", mouseDown)
    window.addEventListener("mouseup", mouseUp)

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], [tabindex]:not([tabindex='-1'])"
    )
    
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", handleLinkHover)
      el.addEventListener("mouseleave", handleLinkLeave)
    })

    // Handle window resize for mobile detection
    const handleResize = () => setIsMobile(checkMobile())
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", mouseMove)
      window.removeEventListener("mouseenter", mouseEnter)
      window.removeEventListener("mouseleave", mouseLeave)
      window.removeEventListener("mousedown", mouseDown)
      window.removeEventListener("mouseup", mouseUp)
      window.removeEventListener("resize", handleResize)
      
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleLinkHover)
        el.removeEventListener("mouseleave", handleLinkLeave)
      })
    }
  }, [isVisible])

  // Don't render on mobile devices
  if (isMobile) {
    return null
  }

  // Variants for different cursor states
  const variants = {
    default: {
      x: mousePosition.x - size / 2,
      y: mousePosition.y - size / 2,
      scale: 1,
      mixBlendMode: blendMode as any,
    },
    hover: {
      x: mousePosition.x - (size * 1.3) / 2,
      y: mousePosition.y - (size * 1.3) / 2,
      scale: 1.3,
      mixBlendMode: blendMode as any,
    },
    click: {
      x: mousePosition.x - (size * 0.8) / 2,
      y: mousePosition.y - (size * 0.8) / 2,
      scale: 0.8,
      mixBlendMode: blendMode as any,
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Inner Dot */}
            <motion.div
              className="fixed pointer-events-none z-[10000] rounded-full"
              variants={variants}
              animate={cursorVariant}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 500,
                mass: 0.3
              }}
              style={{
                width: size / 2,
                height: size / 2,
                background: `radial-gradient(circle, ${color}, ${color}dd)`,
                mixBlendMode: blendMode as any,
                boxShadow: `0 0 15px ${color}80, 0 0 30px ${color}40`
              }}
            >
              {/* Inner Dot Pulse */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.7, 0.3, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
                style={{
                  background: color,
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}