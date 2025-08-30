"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { 
  Plus, 
  Search, 
  Filter,
  Play,
  Pause,
  Settings,
  MoreHorizontal,
  Bot,
  Mail,
  MessageSquare,
  Calendar,
  Users,
  FileText,
  Zap,
  Brain,
  Target,
  Headphones,
  Video,
  X
} from "lucide-react"

const workflowTemplates = [
  {
    id: 1,
    name: "Personal Computer Assistant",
    description: "Help with computer tasks and automation",
    icon: Bot,
    color: "bg-blue-500",
    category: "Assistant"
  },
  {
    id: 2,
    name: "Lead Generator",
    description: "Find and organize new leads automatically",
    icon: Target,
    color: "bg-green-500",
    category: "Sales"
  },
  {
    id: 3,
    name: "Lead Outreacher",
    description: "Automated outreach and follow-up",
    icon: Mail,
    color: "bg-orange-500",
    category: "Sales"
  },
  {
    id: 4,
    name: "Support Chatbot",
    description: "Answer customer questions automatically",
    icon: Headphones,
    color: "bg-purple-500",
    category: "Support"
  },
  {
    id: 5,
    name: "Email Responder",
    description: "Smart email responses and management",
    icon: Mail,
    color: "bg-red-500",
    category: "Communication"
  },
  {
    id: 6,
    name: "Meeting Recorder",
    description: "Record and summarize meetings",
    icon: Video,
    color: "bg-indigo-500",
    category: "Productivity"
  },
  {
    id: 7,
    name: "Content Creator",
    description: "Generate content for social media",
    icon: FileText,
    color: "bg-pink-500",
    category: "Marketing"
  },
  {
    id: 8,
    name: "Data Analyzer",
    description: "Analyze and report on data trends",
    icon: Brain,
    color: "bg-teal-500",
    category: "Analytics"
  }
]

const existingWorkflows = [
  {
    id: 1,
    name: "Email Campaign Manager",
    description: "Automated email marketing campaigns",
    status: "active",
    lastRun: "2 hours ago",
    executions: 1247,
    successRate: 98.5
  },
  {
    id: 2,
    name: "Lead Qualification Bot",
    description: "Qualify leads from website forms",
    status: "paused",
    lastRun: "1 day ago",
    executions: 856,
    successRate: 94.2
  },
  {
    id: 3,
    name: "Social Media Scheduler",
    description: "Schedule posts across platforms",
    status: "active",
    lastRun: "30 minutes ago",
    executions: 2341,
    successRate: 99.1
  }
]

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)

  const filteredTemplates = workflowTemplates.filter(template =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreateWorkflow = (templateId: number) => {
    setSelectedTemplate(templateId)
    setIsCreateModalOpen(false)
    // Here you would navigate to the workflow builder with the selected template
    console.log("Creating workflow with template:", templateId)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflows</h1>
          <p className="text-gray-600 mt-1">Create and manage your AI-powered automations</p>
        </div>
        
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="px-6">
              <Plus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl">What would you like to automate?</DialogTitle>
                  <DialogDescription className="text-base mt-2">
                    Choose from our templates or start from scratch
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Template Grid */}
              <div className="grid grid-cols-2 gap-4">
                {filteredTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/20"
                      onClick={() => handleCreateWorkflow(template.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`w-10 h-10 ${template.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                            <template.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-sm mb-1">
                              {template.name}
                            </h3>
                            <p className="text-xs text-gray-600 line-clamp-2">
                              {template.description}
                            </p>
                            <Badge variant="secondary" className="mt-2 text-xs">
                              {template.category}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Start from Scratch Option */}
              <div className="border-t pt-4">
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Card 
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/20"
                    onClick={() => handleCreateWorkflow(0)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Start from scratch</h3>
                          <p className="text-sm text-gray-600">Build a custom workflow from the ground up</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Workflows</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Executions</p>
                <p className="text-2xl font-bold text-gray-900">4,444</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold text-gray-900">97.2%</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Existing Workflows */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Your Workflows</h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {existingWorkflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{workflow.name}</h3>
                        <p className="text-sm text-gray-600">{workflow.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className={getStatusColor(workflow.status)}>
                            {workflow.status}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            Last run: {workflow.lastRun}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {workflow.executions.toLocaleString()} executions
                        </p>
                        <p className="text-xs text-gray-600">
                          {workflow.successRate}% success rate
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          {workflow.status === "active" ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
