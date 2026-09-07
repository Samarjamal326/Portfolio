'use client'

import { Button } from '@/components/ui/button'
import { FileText, PlayCircle } from 'lucide-react'
import { useState } from 'react'

export default function PESE600Page() {
  const [showVideoAlert, setShowVideoAlert] = useState(false)

  const handleViewEssay = () => {
    window.open('/pese-600-essay.pdf', '_blank')
  }

  const handlePlayVideo = () => {
    setShowVideoAlert(true)
    setTimeout(() => setShowVideoAlert(false), 3000)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container px-4 md:px-6 py-12 md:py-24">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">PESE 600</h1>
          <h2 className="text-xl md:text-2xl text-gray-500 dark:text-gray-400 mb-4">
            Practical Enhancement of Skills & Employability
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            My submissions for the PESE 600 course — a professional development course focused on communication, career readiness, and skill building.
          </p>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Hand-Written Essay */}
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 border-b border-border p-6">
              <h3 className="text-2xl font-bold mb-2">Hand-Written Essay</h3>
              <p className="text-gray-500 dark:text-gray-400">Personal Reflection & Academic Work</p>
            </div>

            {/* Card Body */}
            <div className="p-8 flex-grow flex flex-col items-center justify-center">
              <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                My hand-written essay showcasing personal thoughts, reflections, and academic excellence.
              </p>
              <div className="mb-6 p-8 bg-muted/50 rounded-lg flex flex-col items-center justify-center border border-border">
                <FileText className="h-16 w-16 text-purple-600/60 mb-4" />
                <p className="font-semibold text-center mb-2">Essay Preview</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Click button below to view the full essay
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-card border-t border-border p-6">
              <Button
                onClick={handleViewEssay}
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold py-6"
              >
                View Essay
              </Button>
            </div>
          </div>

          {/* Card 2: 1-Minute Self Intro Video */}
          <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-teal-600/20 to-cyan-600/20 border-b border-border p-6">
              <h3 className="text-2xl font-bold mb-2">1-Minute Self Intro</h3>
              <p className="text-gray-500 dark:text-gray-400">Professional Introduction Video</p>
            </div>

            {/* Card Body */}
            <div className="p-8 flex-grow flex flex-col items-center justify-center">
              <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
                A concise and compelling 1-minute video introduction of myself, highlighting my journey, skills, and aspirations.
              </p>

              {/* Video Placeholder with Loading Shimmer */}
              <div className="w-full mb-6">
                <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {/* Shimmer Loading Effect */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800"
                    style={{
                      animation: 'shimmer 2s infinite',
                      backgroundSize: '200% 100%',
                    }}
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/30 rounded-full blur-lg" />
                      <PlayCircle className="h-20 w-20 text-white/80 relative z-10" />
                    </div>
                  </div>
                </div>
                <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-3">
                  Video loading...
                </p>
              </div>
            </div>

            {/* Card Footer */}
            <div className="bg-card border-t border-border p-6">
              <Button
                onClick={handlePlayVideo}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-6"
              >
                Play Video
              </Button>
            </div>

            {/* Toast Alert */}
            {showVideoAlert && (
              <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
                Video will be available soon!
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
