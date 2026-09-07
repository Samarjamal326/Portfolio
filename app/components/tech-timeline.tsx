"use client"

import { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react"
import Image from "next/image"

interface TimelineItem {
  id: string
  month: string
  year: string
  tech: string
  description: string
  icon: string
  projects?: string[]
}

const timelineData: TimelineItem[] = [
  {
    id: "jan-2023",
    month: "Jan",
    year: "2023",
    tech: "Python Basics",
    description: "Started with Python fundamentals, data structures, and algorithms",
    icon: "/icons/python.png",
    projects: ["Simple CLI Tools", "Data Structures Implementation"],
  },
  {
    id: "feb-2023",
    month: "Feb",
    year: "2023",
    tech: "NumPy & Pandas",
    description: "Learned data manipulation and analysis with NumPy and Pandas",
    icon: "/icons/numpy.png",
    projects: ["Data Cleaning Pipeline", "Financial Analysis Tool"],
  },
  {
    id: "mar-2023",
    month: "Mar",
    year: "2023",
    tech: "Matplotlib & Seaborn",
    description: "Mastered data visualization techniques with Matplotlib and Seaborn",
    icon: "/icons/matplotlib.png",
    projects: ["COVID Data Visualization", "Stock Market Trends"],
  },
  {
    id: "apr-2023",
    month: "Apr",
    year: "2023",
    tech: "Scikit-Learn",
    description: "Explored machine learning algorithms with Scikit-Learn",
    icon: "/icons/scikit.png",
    projects: ["Housing Price Predictor", "Customer Segmentation"],
  },
  {
    id: "may-2023",
    month: "May",
    year: "2023",
    tech: "TensorFlow",
    description: "Built neural networks and deep learning models with TensorFlow",
    icon: "/icons/tensorflow.png",
    projects: ["Image Classifier", "Sentiment Analysis"],
  },
  {
    id: "jun-2023",
    month: "Jun",
    year: "2023",
    tech: "PyTorch",
    description: "Implemented advanced deep learning architectures with PyTorch",
    icon: "/icons/pytorch.png",
    projects: ["GAN for Image Generation", "Transfer Learning"],
  },
  {
    id: "jul-2023",
    month: "Jul",
    year: "2023",
    tech: "Computer Vision",
    description: "Worked on image recognition and object detection with OpenCV",
    icon: "/icons/opencv.png",
    projects: ["Face Recognition", "Object Tracking"],
  },
  {
    id: "aug-2023",
    month: "Aug",
    year: "2023",
    tech: "NLP",
    description: "Built text processing and language models with NLTK and Transformers",
    icon: "/icons/python.png",
    projects: ["Text Summarizer", "Chatbot Prototype"],
  },
  {
    id: "sep-2023",
    month: "Sep",
    year: "2023",
    tech: "Web Development",
    description: "Created web applications with HTML, CSS, and JavaScript",
    icon: "/icons/javascript.png",
    projects: ["Personal Portfolio", "Weather App"],
  },
  {
    id: "oct-2023",
    month: "Oct",
    year: "2023",
    tech: "React & Next.js",
    description: "Built interactive UIs with React and Next.js",
    icon: "/icons/react.png",
    projects: ["Dashboard UI", "E-commerce Frontend"],
  },
  {
    id: "nov-2023",
    month: "Nov",
    year: "2023",
    tech: "Tailwind CSS",
    description: "Styled applications with Tailwind CSS utility-first approach",
    icon: "/icons/tailwind.png",
    projects: ["UI Component Library", "Responsive Layouts"],
  },
  {
    id: "dec-2023",
    month: "Dec",
    year: "2023",
    tech: "Deployment",
    description: "Deployed applications with Vercel, AWS, and Docker",
    icon: "/icons/docker.png",
    projects: ["CI/CD Pipeline", "Serverless Functions"],
  },
]

export default function TechTimeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.2 })
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null)
  const [activeItemId, setActiveItemId] = useState<string | null>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = direction === "left" ? -300 : 300
      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Add horizontal scroll with mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current && e.deltaY !== 0) {
        e.preventDefault()
        scrollContainerRef.current.scrollLeft += e.deltaY
      }
    }

    const currentRef = scrollContainerRef.current
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel)
      }
    }
  }, [])

  const handleItemClick = (item: TimelineItem) => {
    setSelectedItem(item)
    setActiveItemId(item.id)
  }

  return (
    <div className="w-full" ref={containerRef}>
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          Tech Stack Timeline
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mb-8">
          A chronological journey through my technical learning path. Click on any month to see details about projects
          and skills acquired.
        </p>
      </div>

      <div className="relative">
        <Button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm rounded-full shadow-lg border border-primary/10 hover:bg-primary/10 transition-all"
          size="icon"
          variant="ghost"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-[60px] left-0 right-0 h-1.5 bg-gradient-to-r from-primary/30 via-primary/50 to-blue-400/30 z-0 rounded-full" />

          {/* Timeline container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-12 pt-4 px-4 snap-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex space-x-12 px-8">
              {timelineData.map((item, index) => (
                <div key={item.id} className="relative snap-center" style={{ minWidth: "120px" }}>
                  {/* Timeline dot */}
                  <motion.div
                    className={`absolute top-[54px] left-1/2 -translate-x-1/2 w-6 h-6 rounded-full z-10 cursor-pointer ${
                      activeItemId === item.id ? "bg-primary shadow-[0_0_15px_rgba(147,51,234,0.5)]" : "bg-primary/50"
                    }`}
                    whileHover={{ scale: 1.2 }}
                    onClick={() => handleItemClick(item)}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div
                      className="absolute inset-0 rounded-full bg-primary/30 animate-ping"
                      style={{ animationDuration: "3s" }}
                    ></div>
                  </motion.div>

                  {/* Month label */}
                  <motion.div
                    className="flex flex-col items-center mt-16 cursor-pointer"
                    onClick={() => handleItemClick(item)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="text-sm font-medium">{item.month}</div>
                    <div className="text-xs text-muted-foreground">{item.year}</div>
                    <div className="mt-3 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center p-1.5 mb-2 border border-primary/20">
                        <div className="relative w-full h-full">
                          <Image
                            src={item.icon || "/placeholder.svg"}
                            alt={item.tech}
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
                      <div className="font-medium text-sm text-center">{item.tech}</div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/80 backdrop-blur-sm rounded-full shadow-lg border border-primary/10 hover:bg-primary/10 transition-all"
          size="icon"
          variant="ghost"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Selected item details */}
      <AnimatePresence mode="wait">
        {selectedItem && (
          <motion.div
            key={selectedItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            <Card className="p-6 backdrop-blur-sm bg-card/50 border border-primary/10">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center p-2 border-2 border-primary/20">
                  <div className="relative w-10 h-10">
                    <Image
                      src={selectedItem.icon || "/placeholder.svg"}
                      alt={selectedItem.tech}
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
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {selectedItem.month} {selectedItem.year}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{selectedItem.tech}</h3>
                  <p className="text-muted-foreground mb-4">{selectedItem.description}</p>

                  {selectedItem.projects && selectedItem.projects.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                        <Clock className="h-4 w-4" /> Projects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedItem.projects.map((project) => (
                          <span
                            key={project}
                            className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>


    </div>
  )
}
