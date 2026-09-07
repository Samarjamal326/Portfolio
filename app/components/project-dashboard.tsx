"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Plus, Edit2, ChevronDown } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define project types and statuses
type ProjectStatus = "In Progress" | "Deployed" | "Coming Soon" | "Paused"
type ChartType = "bar" | "line"

interface Project {
  id: string
  name: string
  status: ProjectStatus
  description: string
  chartType: ChartType
  chartData: any[]
  chartLabel?: string
  link?: string
}

// Initial project data
const initialProjects: Project[] = [
  {
    id: "mediscan-ai",
    name: "MediScan AI",
    status: "Deployed",
    description: "Personalized Healthcare Intelligence Platform | React, TypeScript, Node.js, PostgreSQL, OpenAI API",
    chartType: "line",
    chartData: [
      { name: "Nov", accuracy: 70 },
      { name: "Dec", accuracy: 78 },
      { name: "Jan", accuracy: 85 },
    ],
    chartLabel: "Model Accuracy (%)",
    link: "https://github.com/samarcodesinpython/mediscan-ai",
  },
  {
    id: "scene-classification",
    name: "Scene Classification using EfficientNet-B2",
    status: "Deployed",
    description: "Computer Vision classifier on SUN397 dataset with 75% macro F1-score | PyTorch, CUDA AMP, TTA",
    chartType: "bar",
    chartData: [
      { name: "F1-Score", value: 75 },
      { name: "Accuracy", value: 73 },
    ],
    chartLabel: "Performance Metrics",
    link: "https://github.com/samarcodesinpython/scene-classification",
  },
  {
    id: "disaster-response",
    name: "AI Disaster Response Coordinator",
    status: "In Progress",
    description: "Reinforcement learning for crisis management | FastAPI, Docker, Multi-Agent LLMs",
    chartType: "line",
    chartData: [
      { name: "Week 1", value: 0.65 },
      { name: "Week 2", value: 0.72 },
      { name: "Week 3", value: 0.78 },
      { name: "Week 4", value: 0.884 },
    ],
    chartLabel: "Agent Performance",
    link: "https://github.com/samarcodesinpython/disaster-response",
  },
  {
    id: "senselink",
    name: "SenseLink - AI-Powered Assistive IoT Platform",
    status: "In Progress",
    description: "Real-time object detection & live captioning for visually/hearing-impaired | YOLO, Edge AI, ESP32",
    chartType: "bar",
    chartData: [
      { name: "Vision", value: 85 },
      { name: "Audio", value: 78 },
      { name: "Navigation", value: 88 },
    ],
    chartLabel: "Feature Accuracy (%)",
    link: "https://github.com/samarcodesinpython/senselink",
  },
  {
    id: "gesture-mouse",
    name: "Gesture-Controlled Mouse",
    status: "Deployed",
    description: "Hand gesture recognition for mouse control",
    chartType: "line",
    chartData: [
      { name: "Jan", accuracy: 78 },
      { name: "Feb", accuracy: 82 },
      { name: "Mar", accuracy: 87 },
      { name: "Apr", accuracy: 91 },
      { name: "May", accuracy: 94 },
    ],
    chartLabel: "Accuracy (%)",
    link: "https://github.com/samarcodesinpython/gesture-mouse",
  },
  {
    id: "donation-platform",
    name: "Ni-Swarth Donation Platform",
    status: "In Progress",
    description: "Connecting donors with NGOs",
    chartType: "bar",
    chartData: [
      { name: "Users", value: 120 },
      { name: "NGOs", value: 15 },
      { name: "Donations", value: 45 },
    ],
    chartLabel: "Current Stats",
    link: "https://github.com/samarcodesinpython/ni-swarth",
  },
  {
    id: "voice-clone",
    name: "Voice Cloning Project",
    status: "Coming Soon",
    description: "Deep learning for voice synthesis",
    chartType: "line",
    chartData: [
      { name: "Data", value: 60 },
      { name: "Model", value: 30 },
      { name: "UI", value: 10 },
    ],
    chartLabel: "Progress (%)",
  },
]

// Status badge component
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case "In Progress":
        return "bg-amber-500/20 text-amber-500 border-amber-500/30"
      case "Deployed":
        return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30"
      case "Coming Soon":
        return "bg-blue-500/20 text-blue-500 border-blue-500/30"
      case "Paused":
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-500 border-gray-500/30"
    }
  }

  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(status)}`}>{status}</span>
  )
}

// Chart component
const ProjectChart = ({ project }: { project: Project }) => {
  if (project.chartType === "bar") {
    return (
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" strokeOpacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} />
          <YAxis tick={{ fontSize: 10, fill: "#888" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(23, 23, 23, 0.8)",
              border: "1px solid #333",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <Bar dataKey="value" fill="rgba(147, 51, 234, 0.7)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    )
  } else {
    return (
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={project.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" strokeOpacity={0.2} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#888" }} />
          <YAxis tick={{ fontSize: 10, fill: "#888" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(23, 23, 23, 0.8)",
              border: "1px solid #333",
              borderRadius: "4px",
              color: "#fff",
            }}
          />
          <Line
            type="monotone"
            dataKey={project.chartData[0].accuracy !== undefined ? "accuracy" : "value"}
            stroke="rgba(147, 51, 234, 0.7)"
            strokeWidth={2}
            dot={{ fill: "rgba(147, 51, 234, 0.9)", r: 4 }}
            activeDot={{ r: 6, fill: "#9333ea" }}
          />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}

// Status selector dropdown
const StatusSelector = ({
  project,
  onStatusChange,
}: { project: Project; onStatusChange: (status: ProjectStatus) => void }) => {
  const [isOpen, setIsOpen] = useState(false)

  const statuses: ProjectStatus[] = ["In Progress", "Deployed", "Coming Soon", "Paused"]

  return (
    <div className="relative">
      <div className="flex items-center gap-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <StatusBadge status={project.status} />
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-10 w-32">
          {statuses.map((status) => (
            <div
              key={status}
              className="px-3 py-2 text-xs hover:bg-muted cursor-pointer"
              onClick={() => {
                onStatusChange(status)
                setIsOpen(false)
              }}
            >
              <StatusBadge status={status} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Project form for adding/editing projects
const ProjectForm = ({
  project,
  onSave,
  onCancel,
}: {
  project: Partial<Project>
  onSave: (project: Partial<Project>) => void
  onCancel: () => void
}) => {
  const [formData, setFormData] = useState<Partial<Project>>(project)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (status: string) => {
    setFormData((prev) => ({ ...prev, status: status as ProjectStatus }))
  }

  const handleChartTypeChange = (chartType: string) => {
    setFormData((prev) => ({ ...prev, chartType: chartType as ChartType }))
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Project Name</Label>
        <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description || ""} onChange={handleChange} />
      </div>

      <div>
        <Label htmlFor="link">GitHub Link (optional)</Label>
        <Input id="link" name="link" value={formData.link || ""} onChange={handleChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={handleStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Deployed">Deployed</SelectItem>
              <SelectItem value="Coming Soon">Coming Soon</SelectItem>
              <SelectItem value="Paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="chartType">Chart Type</Label>
          <Select value={formData.chartType} onValueChange={handleChartTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="chartLabel">Chart Label</Label>
        <Input id="chartLabel" name="chartLabel" value={formData.chartLabel || ""} onChange={handleChange} />
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(formData)}>Save Project</Button>
      </DialogFooter>
    </div>
  )
}

export default function ProjectDashboard() {
  const [filter, setFilter] = useState<ProjectStatus | "All">("All")
  const [projects, setProjects] = useState<Project[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({})

  // Load projects from localStorage on mount
  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio-projects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    } else {
      setProjects(initialProjects)
    }
  }, [])

  // Save projects to localStorage when they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem("portfolio-projects", JSON.stringify(projects))
    }
  }, [projects])

  const filteredProjects = filter === "All" ? projects : projects.filter((p) => p.status === filter)

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return { ...project, status: newStatus }
        }
        return project
      }),
    )
  }

  const handleAddProject = () => {
    setCurrentProject({
      id: `project-${Date.now()}`,
      status: "In Progress",
      chartType: "line",
      chartData: [
        { name: "Start", value: 0 },
        { name: "Current", value: 50 },
      ],
    })
    setIsAddDialogOpen(true)
  }

  const handleEditProject = (project: Project) => {
    setCurrentProject(project)
    setIsEditDialogOpen(true)
  }

  const handleSaveNewProject = (project: Partial<Project>) => {
    if (project.name && project.description && project.status && project.chartType) {
      const newProject = {
        id: project.id || `project-${Date.now()}`,
        name: project.name,
        description: project.description,
        status: project.status,
        chartType: project.chartType,
        chartData: project.chartData || [
          { name: "Start", value: 0 },
          { name: "Current", value: 50 },
        ],
        chartLabel: project.chartLabel || "Progress",
        link: project.link,
      } as Project

      setProjects([...projects, newProject])
      setIsAddDialogOpen(false)
    }
  }

  const handleUpdateProject = (project: Partial<Project>) => {
    if (project.id && project.name && project.description && project.status && project.chartType) {
      setProjects(
        projects.map((p) => {
          if (p.id === project.id) {
            return { ...p, ...project } as Project
          }
          return p
        }),
      )
      setIsEditDialogOpen(false)
    }
  }

  return (
    <div className="w-full">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
          AI/ML Project Dashboard
        </h2>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {["All", "In Progress", "Deployed", "Coming Soon", "Paused"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as ProjectStatus | "All")}
              className={`px-4 py-1.5 text-sm rounded-full transition-all ${
                filter === status ? "bg-primary text-white" : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <Button onClick={handleAddProject} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden backdrop-blur-sm bg-card/50 border border-primary/10 hover:border-primary/30 transition-all">
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <StatusSelector
                      project={project}
                      onStatusChange={(status) => handleStatusChange(project.id, status)}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="mt-4">
                    <p className="text-xs text-muted-foreground mb-1">{project.chartLabel}</p>
                    <ProjectChart project={project} />
                  </div>
                  <div className="mt-4 pt-3 border-t border-border flex justify-between items-center">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View on GitHub
                      </a>
                    ) : (
                      <span className="text-xs text-muted-foreground">No repository link</span>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditProject(project)}
                    >
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={currentProject}
            onSave={handleSaveNewProject}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={currentProject}
            onSave={handleUpdateProject}
            onCancel={() => setIsEditDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
