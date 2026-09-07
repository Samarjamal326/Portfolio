"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

const technologies = [
  {
    category: "AI / ML & Deep Learning",
    skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Transformers", "Hugging Face", "RAG", "Reinforcement Learning", "EfficientNet", "YOLO", "CUDA AMP"],
  },
  {
    category: "Computer Vision & NLP",
    skills: ["OpenCV", "NLP", "Edge AI", "TTA"],
  },
  {
    category: "Languages",
    skills: ["Python", "C", "C++", "Java", "JavaScript"],
  },
  {
    category: "Web & Backend",
    skills: ["React", "TypeScript", "Node.js", "FastAPI", "Django", "REST APIs", "HTML", "CSS", "Supabase"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "SQL"],
  },
  {
    category: "Tools & Platforms",
    skills: ["Git", "Docker", "Vercel", "Jupyter", "Google Colab", "Google Cloud", "AWS"],
  },
]

export default function TechStack() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.category}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold mb-4">{tech.category}</h3>
            <div className="flex flex-wrap gap-2">
              {tech.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
