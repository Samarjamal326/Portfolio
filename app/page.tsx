import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter, ArrowUpRight, MapPin } from "lucide-react"
import Link from "next/link"
import ContactForm from "./components/contact-form"
import ProjectCard from "./components/project-card"
import { ThemeToggle } from "@/components/theme-toggle"

const projects = [
  { title: "PayBack", description: "AI-powered revenue recovery platform for turning missed revenue into actionable retention workflows.", image: "/projects/payback.png", link: "https://github.com/Samarjamal326/PayBack", tags: ["Python", "AI", "Revenue Recovery"] },
  { title: "MediScan AI", description: "Healthcare intelligence platform exploring personalized medical insights through AI-assisted workflows.", image: "/projects/mediscan.png", link: "https://github.com/Samarjamal326", tags: ["Python", "RAG", "Healthcare AI"] },
  { title: "AI Disaster Response Coordinator", description: "OpenEnv-compliant reinforcement learning environment for simulating disaster-response resource allocation.", image: "/projects/disaster-response.png", link: "https://github.com/Samarjamal326", tags: ["Python", "Reinforcement Learning", "OpenEnv"] },
  { title: "Scene Classification with EfficientNet-B2", description: "Large-scale SUN397 scene classification using transfer learning, AMP, and test-time augmentation.", image: "/projects/scene-classification.png", link: "https://github.com/Samarjamal326/Image-Classification-Efficientnet", tags: ["PyTorch", "EfficientNet-B2", "Computer Vision"] },
  { title: "SenseLink", description: "Assistive IoT platform combining computer vision, NLP, and real-time object understanding for accessibility.", image: "/projects/senselink.png", link: "https://github.com/Samarjamal326/Sense_Link", tags: ["YOLO", "OpenCV", "IoT"] },
  { title: "Medi Orchestrator", description: "Multi-agent healthcare AI system for coordinating disease prediction, drug recommendation, and support workflows.", image: "/projects/medi-orchestrator.png", link: "https://github.com/Samarjamal326/MediOrchesctrator-Agent", tags: ["TypeScript", "Next.js", "PostgreSQL"] },
]

const experiences = [
  { organization: "Flyrank", role: "Machine Learning Trainee", dates: "Jan 2026 – Present", location: "Remote", points: ["Selected through a competitive, multi-stage nationwide process.", "Training across applied machine learning, deep learning, reinforcement learning, large language models, and causal inference."] },
  { organization: "Amazon ML Summer School", role: "Machine Learning Trainee / Participant", dates: "Apr 2022 – Mar 2023", location: "Dehradun, India", points: ["Selected through a competitive nationwide process and trained by Amazon Applied Scientists and Engineers.", "Built foundations across deep learning, reinforcement learning, large language models, and causal inference."] },
  { organization: "ServiceNow", role: "Experience details from source", dates: "", location: "", points: ["ServiceNow is included as a professional experience entry; the current resume source does not provide additional factual role details."] },
]

const certifications = [
  ["Google Cloud Arcade Program", "Google Cloud", "Completed 100+ labs and skill badges spanning BigQuery and AI/ML workflows (2025)"],
  ["AWS Cloud Practitioner Essentials", "AWS", "Sep 2025"],
  ["Deep Learning and Reinforcement Learning", "IBM / Coursera", "Jan – Feb 2025"],
]

const achievements = [
  "Top 75 Coder in Amazon HackOn Season 6, selected among thousands of participants nationwide.",
  "Selected participant in Amazon ML Summer School.",
  "Completed 100+ Google Cloud Arcade labs and skill badges; earned top-university recognition.",
  "Participated in 10+ national-level hackathons, including Smart India Hackathon initiatives.",
  "Active problem solver on LeetCode.",
]

const techStack = [
  ["Programming Languages", ["Python", "C/C++", "Java", "JavaScript", "TypeScript"]],
  ["Machine Learning & Deep Learning", ["PyTorch", "TensorFlow", "Scikit-learn", "NumPy", "Pandas", "Matplotlib", "CUDA / AMP"]],
  ["Generative AI & LLMs", ["Transformers", "Hugging Face", "RAG", "Prompt Engineering", "LLM APIs", "LangChain", "LangGraph", "Pinecone"]],
  ["Computer Vision", ["YOLO", "OpenCV", "EfficientNet", "Edge AI"]],
  ["Backend & APIs", ["FastAPI", "Django", "Node.js", "REST APIs"]],
  ["Databases, Cloud & Tools", ["PostgreSQL", "SQL", "Supabase", "AWS", "Git", "Docker", "Vercel", "Jupyter", "Google Colab"]],
]

export default function Page() {
  return <div className="min-h-screen bg-background bg-grid">
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur">
      <div className="container flex min-h-14 items-center gap-6 px-4">
        <Link className="shrink-0 font-bold tracking-tight" href="/">Samar.dev</Link>
        <nav className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto text-xs font-medium lg:gap-5 lg:text-sm" aria-label="Primary navigation">
          {["about", "projects", "experience", "certifications", "achievements", "tech-stack", "contact"].map((item) => <Link key={item} href={`#${item}`} className="transition-colors hover:text-primary">{item.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase())}</Link>)}
        </nav>
        <div className="ml-auto flex items-center gap-2"><ThemeToggle /><Link href="/resume"><Button variant="outline" size="sm">Resume</Button></Link></div>
      </div>
    </header>

    <main className="container px-4 md:px-6">
      <section id="home" className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center py-20 text-center">
        <p className="mb-4 font-mono text-sm text-primary">AI / ML ENGINEER</p>
        <h1 className="max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Building practical intelligence for the real world.</h1>
        <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground">I&apos;m Samar, an AI/ML engineer building systems across machine learning, deep learning, computer vision, generative AI, RAG, and intelligent applications.</p>
        <div className="mt-8 flex items-center gap-3"><Link href="#projects"><Button>View projects <ArrowUpRight className="ml-2 h-4 w-4" /></Button></Link><Link href="#contact"><Button variant="outline">Get in touch</Button></Link></div>
        <div className="mt-10 flex items-center gap-2"><SocialLinks /></div>
      </section>

      <section id="about" className="section-space"><SectionHeading eyebrow="Profile" title="About" /><div className="grid gap-8 md:grid-cols-[1fr_1.4fr]"><p className="text-xl leading-8">I like working at the boundary between research ideas and useful software.</p><div className="space-y-4 leading-7 text-muted-foreground"><p>My work focuses on turning modern AI techniques into focused, understandable products. I enjoy the full path from data and model experimentation to APIs, interfaces, and deployment.</p><p>Current interests include vision systems, retrieval-augmented generation, agentic workflows, and applied reinforcement learning.</p></div></div></section>

      <section id="projects" className="section-space"><SectionHeading eyebrow="Selected work" title="Projects" /><div className="grid gap-6 md:grid-cols-2"><>{projects.map((project) => <ProjectCard key={project.title} {...project} />)}</></div></section>

      <section id="experience" className="section-space"><SectionHeading eyebrow="Where I&apos;ve learned" title="Experience" /><div className="space-y-4">{experiences.map((experience) => <article key={experience.organization} className="border-l-2 border-primary/40 pl-5"><div className="flex flex-col justify-between gap-2 sm:flex-row"><div><h3 className="text-xl font-semibold">{experience.organization}</h3><p className="text-muted-foreground">{experience.role}</p></div><div className="text-sm text-muted-foreground sm:text-right"><p>{experience.dates}</p>{experience.location && <p className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{experience.location}</p>}</div></div><ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-muted-foreground">{experience.points.map((point) => <li key={point}>{point}</li>)}</ul></article>)}</div></section>

      <section id="certifications" className="section-space"><SectionHeading eyebrow="Learning" title="Certifications" /><div className="grid gap-4 md:grid-cols-3">{certifications.map(([name, provider, detail]) => <article key={name} className="rounded-lg border bg-card/60 p-5"><p className="text-sm text-primary">{provider}</p><h3 className="mt-2 font-semibold">{name}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{detail}</p></article>)}</div></section>

      <section id="achievements" className="section-space"><SectionHeading eyebrow="Milestones" title="Achievements" /><div className="grid gap-x-10 gap-y-4 md:grid-cols-2">{achievements.map((achievement) => <p key={achievement} className="border-l border-border pl-4 text-sm leading-6 text-muted-foreground">{achievement}</p>)}</div></section>

      <section id="tech-stack" className="section-space"><SectionHeading eyebrow="Tools of the trade" title="Tech Stack" /><div className="grid gap-4 md:grid-cols-2">{techStack.map(([category, tools]) => <article key={category} className="rounded-lg border bg-card/60 p-5"><h3 className="font-semibold">{category}</h3><div className="mt-4 flex flex-wrap gap-2">{(tools as string[]).map((tool) => <span key={tool} className="rounded-md border bg-background/60 px-2.5 py-1 text-xs text-muted-foreground">{tool}</span>)}</div></article>)}</div></section>

      <section id="contact" className="section-space"><SectionHeading eyebrow="Let&apos;s connect" title="Contact" /><div className="mx-auto max-w-2xl"><p className="mb-8 text-center text-muted-foreground">Have a thoughtful AI/ML problem to explore? Send me a note.</p><ContactForm /></div></section>
    </main>

    <footer className="border-t"><div className="container flex flex-col gap-3 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Samar Jamal</p><div className="flex gap-4"><SocialLinks /><Link href="/resume" className="hover:text-foreground">Resume</Link></div></div></footer>
  </div>
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) { return <div className="mb-10"><p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">{eyebrow}</p><h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2></div> }
function SocialLinks() { return <div className="flex items-center gap-2"><Link href="https://github.com/Samarjamal326" target="_blank" rel="noreferrer" aria-label="GitHub"><Github className="h-4 w-4" /></Link><Link href="https://www.linkedin.com/in/samar-jamal-5134402aa/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></Link><Link href="https://x.com/samar_jama27633" target="_blank" rel="noreferrer" aria-label="X"><Twitter className="h-4 w-4" /></Link><Link href="mailto:samarjamal326@gmail.com" aria-label="Email"><Mail className="h-4 w-4" /></Link></div> }
