"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronUp,
  Home,
  Upload,
  X,
  ImageIcon,
  FileText,
  Video,
  Mic,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

interface WeekUpload {
  type: "image" | "pdf" | "video" | "audio" | "text"
  label: string
  file?: string
  text?: string
  required?: boolean
}

interface WeekEntry {
  week: number
  title: string
  summary: string
  content: string
  expanded?: boolean
  uploads: { [key: string]: WeekUpload }
}

export default function PESE400Page() {
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({})
  const [weeks, setWeeks] = useState<WeekEntry[]>([
    {
      week: 1,
      title: "Self Profiling",
      summary: "Understanding strengths, weaknesses, and goals to build a personal brand.",
      content:
        "This week gave me a chance to really understand myself. I worked through a profiling exercise that helped me pinpoint my strengths, weaknesses, and goals. The in-class feedback made me rethink how I present myself, and I now feel more confident about what I want to pursue and how I describe it.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
        profilingSheet: { type: "pdf", label: "Self Profiling Sheet (PDF)", required: true },
        coverLetter: { type: "pdf", label: "Cover Letter (PDF)", required: true },
        introVideo: { type: "video", label: "1-min Self Intro Video", required: true },
      },
    },
    {
      week: 2,
      title: "Podcast Creation",
      summary: "Creating a podcast reflecting core values and thoughts on self-growth.",
      content:
        "I created a podcast that reflected my core values and thoughts on self-growth. It was exciting to hear my own voice conveying something meaningful. Recording and editing the podcast helped me improve my communication clarity and think creatively.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
        speechRecording: { type: "audio", label: "1-min Speech Recording", required: true },
      },
    },
    {
      week: 3,
      title: "Presentation Skills – II",
      summary: "Formal presentation with feedback on delivery techniques.",
      content:
        "I gave a formal presentation on a current topic of my choice and received constructive feedback. We revisited effective presentation techniques, and I learned how small changes in body language and tone can completely transform delivery.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
        movieReview: { type: "text", label: "Movie Review", required: true },
        movieQuestions: { type: "text", label: "3 Questions + Answers about the movie", required: true },
      },
    },
    {
      week: 4,
      title: "Effective Writing Skills – I",
      summary: "Refining professional writing for emails and cover letters.",
      content:
        "I worked on refining my writing, particularly professional emails and cover letters. We discussed dos and don'ts, and I realized how important it is to write with purpose and keep things concise. It made me more aware of how I sound in writing.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
      },
    },
    {
      week: 5,
      title: "Public Speaking – II",
      summary: "Speaking on trending topics and participating in JAM sessions.",
      content:
        "I got to speak in front of the class on trending topics and participated in JAM (Just A Minute) sessions. It pushed me out of my comfort zone and helped me control my nerves. The feedback was super valuable for real-world speaking scenarios.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
      },
    },
    {
      week: 6,
      title: "Reflective Writing",
      summary: "Reflecting on the learning journey across previous weeks.",
      content:
        "I reflected on my learning journey across all the previous weeks. Writing this made me realize how much I've grown — not just in skills, but in self-awareness. I could connect the dots and see how each activity added to my personal development.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
      },
    },
    {
      week: 7,
      title: "Group Discussion (GD)",
      summary: "Learning GD structure and participating in live simulations.",
      content:
        "We learned the structure of group discussions and did live simulations. I saw firsthand how communication, listening, and quick thinking all play a role. I also noticed where I need to improve — especially in speaking up and structuring my points.",
      expanded: false,
      uploads: {
        journalImage: { type: "image", label: "Journal Image" },
      },
    },
  ])

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedWeeks = localStorage.getItem("pese-400-weeks-v2")
    if (savedWeeks) {
      setWeeks(JSON.parse(savedWeeks))
    }
  }, [])

  // Save weeks data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pese-400-weeks-v2", JSON.stringify(weeks))
  }, [weeks])

  const toggleExpand = (index: number) => {
    setWeeks(
      weeks.map((week, i) => {
        if (i === index) {
          return { ...week, expanded: !week.expanded }
        }
        return week
      }),
    )
  }

  const handleFileUpload = (weekIndex: number, uploadKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const upload = weeks[weekIndex].uploads[uploadKey]

    // Validate file type
    if (upload.type === "image" && !file.type.match(/image\/(jpeg|jpg|png)/)) {
      alert("Only JPEG and PNG images are allowed")
      return
    }
    if (upload.type === "pdf" && file.type !== "application/pdf") {
      alert("Only PDF files are allowed")
      return
    }
    if (upload.type === "video" && !file.type.match(/video\/(mp4|webm)/)) {
      alert("Only MP4 and WebM videos are allowed")
      return
    }
    if (upload.type === "audio" && !file.type.match(/audio\/(mp3|wav|m4a)/)) {
      alert("Only MP3, WAV, and M4A audio files are allowed")
      return
    }

    // Check file size (limit to 50MB for videos, 10MB for others)
    const maxSize = upload.type === "video" ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      alert(`File size should be less than ${upload.type === "video" ? "50MB" : "10MB"}`)
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const fileData = e.target?.result as string
      setWeeks(
        weeks.map((week, i) => {
          if (i === weekIndex) {
            return {
              ...week,
              uploads: {
                ...week.uploads,
                [uploadKey]: { ...upload, file: fileData },
              },
            }
          }
          return week
        }),
      )
    }
    reader.readAsDataURL(file)
  }

  const handleTextChange = (weekIndex: number, uploadKey: string, value: string) => {
    setWeeks(
      weeks.map((week, i) => {
        if (i === weekIndex) {
          return {
            ...week,
            uploads: {
              ...week.uploads,
              [uploadKey]: { ...week.uploads[uploadKey], text: value },
            },
          }
        }
        return week
      }),
    )
  }

  const removeUpload = (weekIndex: number, uploadKey: string) => {
    setWeeks(
      weeks.map((week, i) => {
        if (i === weekIndex) {
          const upload = week.uploads[uploadKey]
          return {
            ...week,
            uploads: {
              ...week.uploads,
              [uploadKey]: { ...upload, file: undefined, text: undefined },
            },
          }
        }
        return week
      }),
    )

    // Reset the file input
    const inputKey = `${weekIndex}-${uploadKey}`
    if (fileInputRefs.current[inputKey]) {
      fileInputRefs.current[inputKey]!.value = ""
    }
  }

  const triggerFileInput = (weekIndex: number, uploadKey: string) => {
    const inputKey = `${weekIndex}-${uploadKey}`
    fileInputRefs.current[inputKey]?.click()
  }

  const getUploadIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="h-4 w-4" />
      case "pdf":
        return <FileText className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "audio":
        return <Mic className="h-4 w-4" />
      default:
        return <Upload className="h-4 w-4" />
    }
  }

  const getUploadStatus = (upload: WeekUpload) => {
    const hasContent = upload.file || upload.text
    if (hasContent) {
      return <CheckCircle className="h-4 w-4 text-green-500" />
    } else if (upload.required) {
      return <AlertCircle className="h-4 w-4 text-amber-500" />
    }
    return null
  }

  const renderUploadSection = (weekIndex: number, uploadKey: string, upload: WeekUpload) => {
    const inputKey = `${weekIndex}-${uploadKey}`
    const hasContent = upload.file || upload.text

    if (upload.type === "text") {
      return (
        <div key={uploadKey} className="space-y-2">
          <div className="flex items-center gap-2">
            <Label className="text-sm font-medium">{upload.label}</Label>
            {getUploadStatus(upload)}
            {upload.required && <span className="text-xs text-amber-500">*Required</span>}
          </div>
          <Textarea
            placeholder={`Enter your ${upload.label.toLowerCase()}...`}
            value={upload.text || ""}
            onChange={(e) => handleTextChange(weekIndex, uploadKey, e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      )
    }

    return (
      <div key={uploadKey} className="space-y-2">
        <div className="flex items-center gap-2">
          <Label className="text-sm font-medium">{upload.label}</Label>
          {getUploadStatus(upload)}
          {upload.required && <span className="text-xs text-amber-500">*Required</span>}
        </div>

        <div className="flex items-start gap-4">
          {upload.type === "image" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-[120px] h-[120px] rounded-lg overflow-hidden bg-muted/20 flex items-center justify-center border border-primary/10 shadow-sm"
            >
              {upload.file ? (
                <div className="relative w-full h-full">
                  <Image src={upload.file || "/placeholder.svg"} alt={upload.label} fill className="object-cover" />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full opacity-80 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeUpload(weekIndex, uploadKey)
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="text-center p-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground/40 mx-auto mb-1" />
                  <div className="text-muted-foreground text-xs">No image uploaded</div>
                </div>
              )}
            </motion.div>
          )}

          {upload.type !== "image" && hasContent && (
            <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-lg border border-primary/10">
              {getUploadIcon(upload.type)}
              <span className="text-sm text-muted-foreground">File uploaded</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => removeUpload(weekIndex, uploadKey)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          )}

          <div className="flex-1">
            <input
              type="file"
              accept={
                upload.type === "image"
                  ? "image/jpeg,image/png,image/jpg"
                  : upload.type === "pdf"
                    ? "application/pdf"
                    : upload.type === "video"
                      ? "video/mp4,video/webm"
                      : upload.type === "audio"
                        ? "audio/mp3,audio/wav,audio/m4a"
                        : "*"
              }
              className="hidden"
              onChange={(e) => handleFileUpload(weekIndex, uploadKey, e)}
              ref={(el) => (fileInputRefs.current[inputKey] = el)}
            />

            <Button
              variant="outline"
              size="sm"
              className="text-xs flex items-center gap-1 mb-2"
              onClick={(e) => {
                e.stopPropagation()
                triggerFileInput(weekIndex, uploadKey)
              }}
            >
              {getUploadIcon(upload.type)}
              {hasContent ? `Replace ${upload.label}` : `Upload ${upload.label}`}
            </Button>

            <p className="text-xs text-muted-foreground">
              {upload.type === "image" && "Formats: JPEG, PNG (max 10MB)"}
              {upload.type === "pdf" && "Format: PDF (max 10MB)"}
              {upload.type === "video" && "Formats: MP4, WebM (max 50MB)"}
              {upload.type === "audio" && "Formats: MP3, WAV, M4A (max 10MB)"}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-16 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        <Link href="/">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span className="hidden sm:inline">Home</span>
          </Button>
        </Link>
        <div className="hidden sm:flex items-center text-xs text-muted-foreground">
          <span className="mx-2">/</span>
          <span>PESE 400</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          PESE 400 Journal
        </h1>
        <p className="text-lg text-center text-muted-foreground mb-12">
          Practical for Employability Skill Enhancement - Weekly reflections and submissions
        </p>

        <div className="space-y-6">
          {weeks.map((week, index) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.15)",
                transition: { duration: 0.3, ease: "easeInOut" },
              }}
              className="transition-all duration-300 ease-in-out"
            >
              <Card className="overflow-hidden border border-primary/10 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg">
                <div
                  className="p-6 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-1">
                      Week {week.week}: {week.title}
                    </h2>
                    {!week.expanded && <p className="text-sm text-muted-foreground">{week.summary}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-muted-foreground">
                      {Object.values(week.uploads).filter((u) => u.file || u.text).length} /{" "}
                      {Object.keys(week.uploads).length} completed
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      {week.expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </Button>
                  </div>
                </div>

                <AnimatePresence>
                  {week.expanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-6"
                    >
                      <p className="text-muted-foreground mb-6">{week.content}</p>

                      {/* Uploads section */}
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Weekly Submissions</h3>
                        {Object.entries(week.uploads).map(([uploadKey, upload]) =>
                          renderUploadSection(index, uploadKey, upload),
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Fixed return to home button for mobile */}
      <div className="fixed bottom-4 right-4 sm:hidden">
        <Link href="/">
          <Button size="icon" className="rounded-full shadow-lg">
            <Home className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
