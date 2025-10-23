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
  const [isClicking, setIsClicking] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const trailRef = useRef<number>(0)
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
      
      // Add to trail
      setTrail(prev => [
        { x: e.clientX, y: e.clientY, id: trailRef.current++ },
        ...prev.slice(0, 12) // Keep last 12 positions
      ])
      
      if (!isVisible) setIsVisible(true)
    }

    const mouseEnter = () => setIsVisible(true)
    const mouseLeave = () => setIsVisible(false)
    const mouseDown = () => {
      setIsClicking(true)
      setCursorVariant("click")
    }
    const mouseUp = () => {
      setIsClicking(false)
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

  // Particle trail effect
  const ParticleTrail = () => (
    <>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          className="fixed pointer-events-none z-[9999]"
          initial={{
            x: point.x - 2,
            y: point.y - 2,
            scale: 1,
            opacity: 0.6
          }}
          animate={{
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: 0.6,
            delay: index * 0.03,
            ease: "easeOut"
          }}
          style={{
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${color}88, ${color}00)`,
            mixBlendMode: blendMode as any,
          }}
        />
      ))}
    </>
  )

  // Magnetic field effect dots
  const MagneticField = () => (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none z-[9998]"
          animate={{
            x: mousePosition.x + Math.cos((i / 6) * Math.PI * 2) * 25 - 1.5,
            y: mousePosition.y + Math.sin((i / 6) * Math.PI * 2) * 25 - 1.5,
            scale: [0.4, 0.8, 0.4],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: color,
            mixBlendMode: blendMode as any,
          }}
        />
      ))}
    </>
  )

  // Pulsing orb effect
  const PulsingOrb = () => (
    <motion.div
      className="fixed pointer-events-none z-[9997]"
      animate={{
        x: mousePosition.x - 40,
        y: mousePosition.y - 40,
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut"
      }}
      style={{
        width: 80,
        height: 80,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color}33, ${color}00)`,
        mixBlendMode: blendMode as any,
      }}
    />
  )

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Particle Trail */}
            <ParticleTrail />
            
            {/* Magnetic Field */}
            <MagneticField />
            
            {/* Pulsing Orb */}
            <PulsingOrb />
            
            {/* Outer Ring */}
            <motion.div
              className="fixed pointer-events-none z-[9999] rounded-full border-2 backdrop-blur-sm"
              variants={variants}
              animate={cursorVariant}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 400,
                mass: 0.5
              }}
              style={{
                width: size * 2,
                height: size * 2,
                borderColor: color,
                mixBlendMode: blendMode as any,
                boxShadow: `0 0 20px ${color}40, inset 0 0 10px ${color}20`
              }}
            >
              {/* Animated Ring Pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut"
                }}
                style={{
                  borderColor: color,
                }}
              />
            </motion.div>
            
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
            
            {/* Click Ripple Effect */}
            <AnimatePresence>
              {isClicking && (
                <motion.div
                  className="fixed pointer-events-none z-[9998] rounded-full border-2"
                  initial={{
                    x: mousePosition.x - 30,
                    y: mousePosition.y - 30,
                    scale: 0.5,
                    opacity: 0.8
                  }}
                  animate={{
                    scale: 2,
                    opacity: 0
                  }}
                  exit={{
                    opacity: 0
                  }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut"
                  }}
                  style={{
                    width: 60,
                    height: 60,
                    borderColor: color,
                    mixBlendMode: blendMode as any,
                  }}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </>
  )
}