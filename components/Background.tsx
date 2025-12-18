"use client"

import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import * as THREE from "three"

interface BackgroundProps {
  isPlaying?: boolean
}

export default function Background({ isPlaying = true }: BackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const clockRef = useRef<THREE.Clock | null>(null)
  const particlesRef = useRef<THREE.Points[]>([])
  const shapesRef = useRef<THREE.Mesh[]>([])
  const linesRef = useRef<THREE.LineSegments | null>(null)
  const isPlayingRef = useRef<boolean>(isPlaying)

  // Animation loop function
  const animate = useCallback(() => {
    if (!isPlayingRef.current || !sceneRef.current || !rendererRef.current || !cameraRef.current || !clockRef.current) {
      animationIdRef.current = null
      return
    }

    animationIdRef.current = requestAnimationFrame(animate)
    const elapsedTime = clockRef.current.getElapsedTime()

    // Animate particles
    particlesRef.current.forEach((particles, index) => {
      const speeds = [
        { x: 0.02, y: 0.03 },
        { x: -0.015, y: -0.025 },
        { x: 0.01, y: 0.02 }
      ]
      const speed = speeds[index] || { x: 0.02, y: 0.03 }
      particles.rotation.x = elapsedTime * speed.x
      particles.rotation.y = elapsedTime * speed.y
    })

    // Animate shapes
    shapesRef.current.forEach((shape, index) => {
      shape.rotation.x = elapsedTime * 0.05
      shape.rotation.y = elapsedTime * 0.08
      shape.position.y = Math.sin(elapsedTime * 0.5 + index) * 0.25
    })

    // Animate lines
    if (linesRef.current) {
      linesRef.current.rotation.z = elapsedTime * 0.02
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current)
  }, [])

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 15

    // Store references
    sceneRef.current = scene
    rendererRef.current = renderer
    cameraRef.current = camera
    clockRef.current = new THREE.Clock()

    // Enhanced particle system
    const createParticles = (count: number, color: number, size: number) => {
      const geometry = new THREE.BufferGeometry()
      const positions = new Float32Array(count * 3)
      const colors = new Float32Array(count * 3)

      for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 50
        positions[i + 1] = (Math.random() - 0.5) * 50
        positions[i + 2] = (Math.random() - 0.5) * 50

        colors[i] = (color >> 16 & 255) / 255
        colors[i + 1] = (color >> 8 & 255) / 255
        colors[i + 2] = (color & 255) / 255
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

      const material = new THREE.PointsMaterial({
        size: size,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      })

      return new THREE.Points(geometry, material)
    }

    const particles1 = createParticles(900, 0x6366f1, 0.08)
    const particles2 = createParticles(700, 0x8b5cf6, 0.07)
    const particles3 = createParticles(500, 0x06b6d4, 0.09)

    particlesRef.current = [particles1, particles2, particles3]
    scene.add(particles1)
    scene.add(particles2)
    scene.add(particles3)

    // Create geometric shapes
    const createDatabaseShape = (type: string, position: [number, number, number]) => {
      let geometry
      switch (type) {
        case 'cylinder':
          geometry = new THREE.CylinderGeometry(1, 1, 2, 8)
          break
        case 'cube':
          geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
          break
        case 'sphere':
          geometry = new THREE.SphereGeometry(1, 8, 6)
          break
        default:
          geometry = new THREE.ConeGeometry(1, 2, 6)
      }

      const material = new THREE.MeshPhongMaterial({
        color: 0x7c8db5,
        transparent: true,
        opacity: 0.45,
        shininess: 20
      })

      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      return mesh
    }

    const shapes = [
      createDatabaseShape('cylinder', [-4, 0, 0]),
      createDatabaseShape('cube', [0, 0, 0]),
      createDatabaseShape('sphere', [4, 0, 0]),
    ]

    shapesRef.current = shapes
    shapes.forEach(shape => scene.add(shape))

    // Connection lines
    const lineGeometry = new THREE.BufferGeometry()
    const linePositions = new Float32Array([
      -4, 0, 0,  0, 0, 0,
      0, 0, 0,    4, 0, 0,
      -4, 0, 0,   4, 0, 0
    ])
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6b7280,
      transparent: true,
      opacity: 0.25,
      linewidth: 1
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    linesRef.current = lines
    scene.add(lines)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      renderer.dispose()
    }
  }, [])

  // Update isPlaying ref when prop changes
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // Handle animation start/stop when isPlaying changes
  useEffect(() => {
    if (isPlaying && !animationIdRef.current) {
      animate()
    } else if (!isPlaying && animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }
  }, [isPlaying, animate])

  return (
    <>
      {/* Advanced Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 pointer-events-none opacity-30 z-0"
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-500/12 rounded-full blur-[110px]"
          animate={isPlaying ? {
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 18,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-500/12 rounded-full blur-[110px]"
          animate={isPlaying ? {
            x: [0, -35, 0],
            y: [0, 40, 0],
            scale: [1.05, 1, 1.05],
          } : {}}
          transition={{
            duration: 20,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-[110px]"
          animate={isPlaying ? {
            x: [0, 30, 0],
            y: [0, -45, 0],
            scale: [1, 1.04, 1],
          } : {}}
          transition={{
            duration: 24,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-6"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </>
  )
}