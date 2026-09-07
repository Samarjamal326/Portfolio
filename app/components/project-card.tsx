import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
  title: string
  description: string
  image: string
  link: string
  tags: string[]
}

export default function ProjectCard({ title, description, image, link, tags }: ProjectCardProps) {
  return <Card className="flex h-full flex-col overflow-hidden transition-colors hover:border-primary/50">
    <div className="relative aspect-video bg-muted"><Image src={image} alt={`${title} project thumbnail`} fill className="object-cover" /></div>
    <CardContent className="flex-grow p-5"><h3 className="text-xl font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p><div className="mt-4 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">{tag}</span>)}</div></CardContent>
    <CardFooter className="p-5 pt-0"><Link href={link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium hover:text-primary"><Github className="h-4 w-4" />View on GitHub</Link></CardFooter>
  </Card>
}
