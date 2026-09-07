import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import { ThemeToggle } from "@/components/theme-toggle"
import TypingAnimation from "./components/typing-animation"
import ProjectDashboard from "./components/project-dashboard"
import TechTimeline from "./components/tech-timeline"
import TechGlobe from "./components/tech-globe"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link className="mr-6 flex items-center space-x-2" href="/">
              <span className="hidden font-bold sm:inline-block">Samar.dev</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#about" className="transition-colors hover:text-foreground/80">
                About
              </Link>
              <Link href="#projects" className="transition-colors hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#dashboard" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link href="#timeline" className="transition-colors hover:text-foreground/80">
                Timeline
              </Link>
              <Link href="#globe" className="transition-colors hover:text-foreground/80">
                Tech Globe
              </Link>
              <Link href="/pese-400" className="transition-colors hover:text-foreground/80">
                PESE 400
              </Link>
              <Link href="/pese-600" className="transition-colors hover:text-foreground/80">
                PESE 600
              </Link>
              <Link href="#contact" className="transition-colors hover:text-foreground/80">
                Contact
              </Link>
            </nav>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
            <Link href="/resume">
              <Button variant="outline">Resume</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container px-4 md:px-6">
        <section id="home" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  <TypingAnimation text="AI DEVELOPER" className="inline-block" speed={80} />
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Hi! I'm Samar, a third-year CS + AI/ML student, obsessed with building real-world AI solutions that
                  go beyond just theory.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="https://github.com/samarcodesinpython" target="_blank">
                  <Button variant="outline" size="icon">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/samar-jamal-5134402aa/" target="_blank">
                  <Button variant="outline" size="icon">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="https://x.com/samar_jama27633" target="_blank">
                  <Button variant="outline" size="icon">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
                <Link href="mailto:samarjamal@326@gmail.com">
                  <Button variant="outline" size="icon">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">About Me</h2>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                I'm a third-year CS + AI/ML student. Obsessed with building real-world AI solutions that go beyond just
                theory. From gesture-controlled tech to donation platforms — I bring ideas to life using Python, C, and
                machine learning frameworks.
              </p>
              <p className="text-lg">
                Currently deep into LeetCode, vision-based AI, and project-based learning. I believe in learning by
                building and sharing knowledge with the community.
              </p>
            </div>
          </div>
        </section>

        <section id="dashboard" className="py-12 md:py-24 lg:py-32">
          <ProjectDashboard />
        </section>

        <section id="timeline" className="py-12 md:py-24 lg:py-32">
          <TechTimeline />
        </section>

        <section id="globe" className="py-12 md:py-24 lg:py-32">
          <TechGlobe />
        </section>

        <section id="projects" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">Projects</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Gesture-Controlled Mouse"
                description="Real-time hand gesture AI that controls the cursor and supports scroll, zoom, and media gestures."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com/your-username/gesture-mouse"
                tags={["Python", "OpenCV", "ML", "Computer Vision"]}
              />
              <ProjectCard
                title="Ni-Swarth Donation Platform"
                description="Connect donors, restaurants, and NGOs to reduce food waste and increase social impact."
                image="/placeholder.svg?height=400&width=600"
                link="https://github.com/your-username/ni-swarth"
                tags={["Python", "Web", "Social Impact"]}
              />
            </div>
          </div>
        </section>

        <section id="contact" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12 text-center">
                Get in Touch
              </h2>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="container flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Samar.dev. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
