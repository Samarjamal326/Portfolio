'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ResumePage() {
  const iframeRef = useRef<HTMLDivElement>(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768)

    // Lazy load iframe using IntersectionObserver
    if (iframeRef.current && !isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !iframeLoaded) {
              setIframeLoaded(true)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(iframeRef.current)

      return () => {
        if (iframeRef.current) {
          observer.unobserve(iframeRef.current)
        }
      }
    }
  }, [iframeLoaded, isMobile])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = '/resume.pdf'
    link.download = 'Samar-Jamal-Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-12 md:py-24">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Resume</h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Full-stack AI/ML developer and computer science student
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center mb-8">
          <Button
            onClick={handleDownload}
            className="gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </Button>
        </div>

        {/* PDF Viewer */}
        {isMobile ? (
          <div className="bg-muted/50 border border-border rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Open on desktop for the best viewing experience, or tap below to download.
            </p>
            <Button
              onClick={handleDownload}
              variant="outline"
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        ) : (
          <div
            ref={iframeRef}
            className="w-full rounded-lg overflow-hidden border border-border shadow-lg"
            style={{ minHeight: '85vh' }}
          >
            {iframeLoaded && (
              <iframe
                src="/resume.pdf"
                className="w-full h-full"
                title="Resume"
              />
            )}
            {!iframeLoaded && (
              <div className="w-full h-full bg-muted/50 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Loading resume...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
