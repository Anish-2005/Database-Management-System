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
        { x: 0.1, y: 0.15 },   // particles1
        { x: -0.08, y: -0.12 }, // particles2
        { x: 0.05, y: 0.1 }    // particles3
      ]
      const speed = speeds[index] || { x: 0.1, y: 0.15 }
      particles.rotation.x = elapsedTime * speed.x
      particles.rotation.y = elapsedTime * speed.y
    })

    // Animate shapes
    shapesRef.current.forEach((shape, index) => {
      shape.rotation.x = elapsedTime * 0.2
      shape.rotation.y = elapsedTime * 0.3
      shape.position.y = Math.sin(elapsedTime + index) * 0.5
    })

    // Animate lines
    if (linesRef.current) {
      linesRef.current.rotation.z = elapsedTime * 0.1
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

    const particles1 = createParticles(2000, 0x6366f1, 0.1)
    const particles2 = createParticles(1500, 0x8b5cf6, 0.08)
    const particles3 = createParticles(1000, 0x06b6d4, 0.12)

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
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: 0.7,
        shininess: 100
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
      color: 0x6366f1,
      transparent: true,
      opacity: 0.5,
      linewidth: 2
    })

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    linesRef.current = lines
    scene.add(lines)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
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
        className="fixed inset-0 pointer-events-none opacity-60 z-0"
      />

      {/* Animated Gradient Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]"
          animate={isPlaying ? {
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 8,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px]"
          animate={isPlaying ? {
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1.2, 1, 1.2],
          } : {}}
          transition={{
            duration: 10,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-[100px]"
          animate={isPlaying ? {
            x: [0, 60, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 12,
            repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-10"
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