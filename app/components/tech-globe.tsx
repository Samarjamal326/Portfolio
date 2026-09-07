"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"

// Tech logos with their colors and experience levels
const technologies = [
  {
    name: "Python",
    color: "#3776AB",
    level: 90,
    icon: "https://img.icons8.com/?size=100&id=13441&format=png&color=000000",
    description: "My primary language for AI/ML development, data analysis, and automation.",
    category: "Languages",
  },
  {
    name: "TensorFlow",
    color: "#FF6F00",
    level: 85,
    icon: "https://img.icons8.com/?size=100&id=n3QRpDA7KZ7P&format=png&color=000000",
    description: "Used for building and training deep learning models for computer vision and NLP tasks.",
    category: "ML/AI",
  },
  {
    name: "Java",
    color: "#EE4C2C",
    level: 80,
    icon: "https://img.icons8.com/?size=100&id=13679&format=png&color=000000",
    description: "My preferred framework for research and implementing custom neural network architectures.",
    category: "Languages",
  },
  {
    name: "OpenCV",
    color: "#5C3EE8",
    level: 75,
    icon: "https://img.icons8.com/?size=100&id=bpip0gGiBLT1&format=png&color=000000",
    description: "Essential for my computer vision projects, including the gesture-controlled mouse.",
    category: "ML/AI",
  },
  {
    name: "Git",
    color: "#F05032",
    level: 85,
    icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
    description: "Essential for version control and collaboration on all my projects.",
    category: "Tools",
  },
  {
    name: "NumPy",
    color: "#013243",
    level: 85,
    icon: "https://img.icons8.com/?size=100&id=aR9CXyMagKIS&format=png&color=000000",
    description: "The foundation of my data processing pipeline for numerical computations.",
    category: "ML/AI",
  },
  {
    name: "Pandas",
    color: "#150458",
    level: 85,
    icon: "https://img.icons8.com/?size=100&id=xSkewUSqtErH&format=png&color=000000",
    description: "My primary tool for data manipulation and analysis in Python.",
    category: "ML/AI",
  },
  {
    name: "Scikit-learn",
    color: "#F7931E",
    level: 80,
    icon: "/icons/scikit.png",
    description: "Used for implementing machine learning algorithms and data preprocessing.",
    category: "ML/AI",
  },
  {
    name: "Matplotlib",
    color: "#11557C",
    level: 75,
    icon: "/icons/matplotlib.png",
    description: "My go-to library for creating static, animated, and interactive visualizations.",
    category: "ML/AI",
  },
  {
    name: "Jupyter",
    color: "#F37626",
    level: 80,
    icon: "https://img.icons8.com/?size=100&id=J0SgMWzAxqFj&format=png&color=000000",
    description: "Essential for my data exploration, experimentation, and documentation workflow.",
    category: "Tools",
  },
  {
    name: "Github",
    color: "#2496ED",
    level: 70,
    icon: "https://img.icons8.com/?size=100&id=106567&format=png&color=000000",
    description: "Used for containerizing applications and ensuring consistent deployment environments.",
    category: "Tools",
  },
]

// Group technologies by category
const techByCategory = technologies.reduce(
  (acc, tech) => {
    if (!acc[tech.category]) {
      acc[tech.category] = []
    }
    acc[tech.category].push(tech)
    return acc
  },
  {} as Record<string, typeof technologies>,
)

// Function to distribute points evenly on a sphere using fibonacci sequence
function fibonacciSphere(samples = 20, radius = 150) {
  const points = []
  const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

  for (let i = 0; i < samples; i++) {
    const y = 1 - (i / (samples - 1)) * 2 // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y) // Radius at y
    const theta = phi * i // Golden angle increment

    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY

    points.push({
      position: [x * radius, y * radius, z * radius],
      technology: technologies[i % technologies.length],
    })
  }

  return points
}

// Generate wireframe grid points for the globe
function generateWireframe(radius = 150, segments = 12) {
  const horizontalCircles = []
  const verticalCircles = []

  // Horizontal circles (latitude)
  for (let i = 1; i < segments; i++) {
    const circle = []
    const y = (i / segments) * 2 - 1
    const radiusAtY = Math.sqrt(1 - y * y) * radius

    for (let j = 0; j <= segments * 2; j++) {
      const theta = (j / (segments * 2)) * Math.PI * 2
      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      circle.push([x, y * radius, z])
    }
    horizontalCircles.push(circle)
  }

  // Vertical circles (longitude)
  for (let i = 0; i < segments; i++) {
    const circle = []
    const theta = (i / segments) * Math.PI

    for (let j = 0; j <= segments * 2; j++) {
      const phi = (j / (segments * 2)) * Math.PI * 2
      const x = Math.sin(phi) * Math.cos(theta) * radius
      const y = Math.cos(phi) * radius
      const z = Math.sin(phi) * Math.sin(theta) * radius
      circle.push([x, y, z])
    }
    verticalCircles.push(circle)
  }

  return { horizontalCircles, verticalCircles }
}

// Tech details modal
function TechDetailsModal({ tech, onClose }: { tech: any; onClose: () => void }) {
  if (!tech) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <motion.div
        className="relative bg-card border border-primary/20 rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
      >
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center p-2 border-2"
            style={{ borderColor: tech.color }}
          >
            <div className="relative w-10 h-10">
              <Image
                src={tech.icon || "/placeholder.svg"}
                alt={tech.name}
                fill
                sizes="40px"
                className="object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  const target = e.target as HTMLImageElement
                  target.src = "/placeholder.svg?height=40&width=40"
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold">{tech.name}</h3>
            <div className="text-sm text-muted-foreground">Experience Level</div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-muted/30 h-3 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-blue-400" style={{ width: `${tech.level}%` }} />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>Beginner</span>
            <span>{tech.level}%</span>
            <span>Expert</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">{tech.description}</p>

        <div className="flex justify-end">
          <Button onClick={onClose} variant="outline" size="sm" className="gap-1">
            <X className="h-4 w-4" /> Close
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Interactive Tech Node component
function TechNode({ tech, position, onClick, index, visible }: any) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Calculate 3D position from the sphere coordinates
  const x = position[0]
  const y = position[1]
  const z = position[2]

  // Convert 3D position to 2D screen position with perspective
  const scale = 400 / (400 - z) // Perspective scale
  const screenX = x * scale
  const screenY = y * scale

  // Determine visibility based on z position (items behind the sphere are less visible)
  const opacity = (z + 150) / 300
  const zIndex = Math.round(z + 150)

  if (!visible) return null

  return (
    <motion.div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{
        left: `calc(50% + ${screenX}px)`,
        top: `calc(50% + ${screenY}px)`,
        zIndex,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: opacity,
        scale: scale * 0.6,
        transition: { delay: index * 0.05, duration: 0.5 },
      }}
      whileHover={{ scale: scale * 0.8 }}
      onClick={() => onClick(tech)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex items-center justify-center w-14 h-14 rounded-full ${
          isDark ? "bg-gray-800/90" : "bg-white/90"
        } shadow-lg border-2 p-2`}
        style={{ borderColor: tech.color }}
      >
        <div className="relative w-10 h-10">
          {!imageError ? (
            <Image
              src={tech.icon || "/placeholder.svg"}
              alt={tech.name}
              fill
              sizes="40px"
              className="object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl">{tech.name.charAt(0)}</div>
          )}
        </div>
      </div>

      {isHovered && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1.5 bg-card/95 border border-primary/20 rounded text-sm font-medium shadow-lg whitespace-nowrap z-50">
          {tech.name}
        </div>
      )}
    </motion.div>
  )
}

// Wireframe line component
function WireframeLine({ points, rotation, index, total }: any) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  // Calculate gradient color based on position
  const gradientPosition = index / total
  let strokeColor

  if (isDark) {
    // Dark mode gradient: primary (purple) to blue
    strokeColor = `rgba(${147 - gradientPosition * 50}, ${51 + gradientPosition * 100}, ${234 - gradientPosition * 50}, ${0.3 + gradientPosition * 0.2})`
  } else {
    // Light mode gradient: primary (purple) to blue
    strokeColor = `rgba(${147 - gradientPosition * 50}, ${51 + gradientPosition * 100}, ${234 - gradientPosition * 50}, ${0.2 + gradientPosition * 0.1})`
  }

  // Apply rotation to each point
  const rotatedPoints = points.map((point: number[]) => {
    // Convert to radians
    const xRad = (rotation.x * Math.PI) / 180
    const yRad = (rotation.y * Math.PI) / 180

    // Original position
    let x = point[0]
    let y = point[1]
    let z = point[2]

    // Rotate around Y axis
    const tempX = x * Math.cos(yRad) - z * Math.sin(yRad)
    const tempZ = x * Math.sin(yRad) + z * Math.cos(yRad)
    x = tempX
    z = tempZ

    // Rotate around X axis
    const tempY = y * Math.cos(xRad) + z * Math.sin(xRad)
    const newZ = -y * Math.sin(xRad) + z * Math.cos(xRad)
    y = tempY
    z = newZ

    return [x, y, z]
  })

  // Create SVG path
  let path = ""
  rotatedPoints.forEach((point: number[], index: number) => {
    // Convert 3D to 2D with perspective
    const scale = 400 / (400 - point[2])
    const screenX = point[0] * scale
    const screenY = point[1] * scale

    if (index === 0) {
      path += `M ${screenX + 300} ${screenY + 300} `
    } else {
      path += `L ${screenX + 300} ${screenY + 300} `
    }
  })

  return <path d={path} fill="none" stroke={strokeColor} strokeWidth="1" />
}

// Tech Stack Card component
function TechStackCard({ category, techs }: { category: string; techs: typeof technologies }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 h-full">
        <h3 className="text-lg font-semibold mb-4">{category}</h3>
        <div className="flex flex-wrap gap-2">
          {techs.map((tech) => (
            <div
              key={tech.name}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1.5 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
            >
              <div className="relative w-4 h-4">
                <Image
                  src={tech.icon || "/placeholder.svg"}
                  alt={tech.name}
                  fill
                  sizes="16px"
                  className="object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=16&width=16"
                  }}
                />
              </div>
              {tech.name}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}

export default function TechGlobe() {
  const [selectedTech, setSelectedTech] = useState<any>(null)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [autoRotate, setAutoRotate] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const globeRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const lastFrameTimeRef = useRef<number>(0)
  const animationFrameRef = useRef<number | null>(null)

  // Check if mobile and set up IntersectionObserver
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    // IntersectionObserver for lazy initialization
    if (globeRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting)
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(globeRef.current)

      return () => {
        if (globeRef.current) {
          observer.unobserve(globeRef.current)
        }
      }
    }
  }, [])

  // Generate points on the sphere (reduced for mobile)
  const points = fibonacciSphere(isMobile ? 8 : technologies.length)

  // Generate wireframe with reduced segments for performance
  const wireframe = generateWireframe(150, isMobile ? 8 : 12)

  // Auto-rotation effect with frame rate capping (30fps)
  useEffect(() => {
    if (!autoRotate || isMobile || !isVisible) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      return
    }

    const targetFrameTime = 1000 / 30 // 30fps

    const animate = (currentTime: number) => {
      if (lastFrameTimeRef.current && currentTime - lastFrameTimeRef.current >= targetFrameTime) {
        setRotation((prev) => ({
          x: prev.x,
          y: prev.y + 0.5,
        }))
        lastFrameTimeRef.current = currentTime
      } else if (!lastFrameTimeRef.current) {
        lastFrameTimeRef.current = currentTime
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [autoRotate, isMobile, isVisible])

  // Handle manual rotation with mouse drag
  useEffect(() => {
    if (!containerRef.current) return

    let isDragging = false
    let previousX = 0
    let previousY = 0

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      previousX = e.clientX
      previousY = e.clientY
      setAutoRotate(false)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return

      const deltaX = e.clientX - previousX
      const deltaY = e.clientY - previousY

      setRotation((prev) => ({
        x: prev.x + deltaY * 0.5,
        y: prev.y + deltaX * 0.5,
      }))

      previousX = e.clientX
      previousY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    const element = containerRef.current
    element.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      element.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  // Apply rotation to each point
  const rotatedPoints = points.map((point) => {
    // Convert to radians
    const xRad = (rotation.x * Math.PI) / 180
    const yRad = (rotation.y * Math.PI) / 180

    // Original position
    let x = point.position[0]
    let y = point.position[1]
    let z = point.position[2]

    // Rotate around Y axis
    const tempX = x * Math.cos(yRad) - z * Math.sin(yRad)
    const tempZ = x * Math.sin(yRad) + z * Math.cos(yRad)
    x = tempX
    z = tempZ

    // Rotate around X axis
    const tempY = y * Math.cos(xRad) + z * Math.sin(xRad)
    const newZ = -y * Math.sin(xRad) + z * Math.cos(xRad)
    y = tempY
    z = newZ

    return {
      ...point,
      position: [x, y, z],
      visible: z < 100, // Only show points that are on the front half of the sphere
    }
  })

  // Sort points by z-index for proper rendering (back to front)
  const sortedPoints = [...rotatedPoints].sort((a, b) => a.position[2] - b.position[2])

  const handleTechClick = (tech: any) => {
    setSelectedTech(tech)
    setAutoRotate(false)
  }

  return (
    <div className="w-full" ref={globeRef}>
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mb-8">
          My technology toolkit for building AI/ML solutions and web applications.
        </p>
      </div>

      {isMobile ? (
        // Mobile: Show flat grid of technology tags
        <div className="space-y-6">
          {Object.entries(techByCategory).map(([category, techs]) => (
            <TechStackCard key={category} category={category} techs={techs} />
          ))}
        </div>
      ) : (
        // Desktop: Show globe with cards
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Tech Stack Cards */}
          <div className="space-y-6">
            {Object.entries(techByCategory).map(([category, techs]) => (
              <TechStackCard key={category} category={category} techs={techs} />
            ))}
          </div>

          {/* Right side: Interactive Globe */}
          <Card
            className={`relative w-full h-[500px] rounded-xl overflow-hidden border border-primary/20 ${
              isDark ? "bg-gray-900/70" : "bg-gray-50/70"
            } backdrop-blur-sm`}
            ref={containerRef}
            style={{ willChange: 'transform' }}
          >
          {/* Globe background with gradient */}
          <div
            className="absolute inset-0 rounded-full opacity-20"
            style={{
              background: `radial-gradient(circle, ${
                isDark ? "rgba(147, 51, 234, 0.3)" : "rgba(147, 51, 234, 0.15)"
              } 0%, transparent 70%)`,
              width: "100%",
              height: "100%",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />

          {/* Wireframe */}
          <svg width="600" height="600" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {wireframe.horizontalCircles.map((circle, i) => (
              <WireframeLine
                key={`h-${i}`}
                points={circle}
                rotation={rotation}
                index={i}
                total={wireframe.horizontalCircles.length}
              />
            ))}
            {wireframe.verticalCircles.map((circle, i) => (
              <WireframeLine
                key={`v-${i}`}
                points={circle}
                rotation={rotation}
                index={i}
                total={wireframe.verticalCircles.length}
              />
            ))}
          </svg>

          {/* Tech nodes */}
          {sortedPoints.map((point, index) => (
            <TechNode
              key={`${point.technology.name}-${index}`}
              tech={point.technology}
              position={point.position}
              onClick={handleTechClick}
              index={index}
              visible={point.visible}
            />
          ))}

          {/* Instructions */}
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-muted-foreground">
            Drag to rotate • Click on any technology to see details
          </div>

          {/* Auto-rotate toggle */}
          <Button
            variant="outline"
            size="sm"
            className="absolute top-4 right-4"
            onClick={() => setAutoRotate(!autoRotate)}
          >
            {autoRotate ? "Pause Rotation" : "Auto Rotate"}
          </Button>
        </Card>
      </div>

            {/* Tech details modal */}
            <AnimatePresence>
              {selectedTech && <TechDetailsModal tech={selectedTech} onClose={() => setSelectedTech(null)} />}
            </AnimatePresence>
          </Card>
        </div>
      )}
    </div>
  )
}
