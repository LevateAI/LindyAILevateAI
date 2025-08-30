"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Clock,
  Star,
  Download,
  Grid3X3,
  List,
  Mail,
  Calendar,
  ShoppingCart,
  BarChart3,
  Database,
  MessageSquare,
  TrendingUp,
  FileText
} from "lucide-react"

interface Template {
  id: string
  title: string
  summary: string
  description: string
  category: string
  apps: string[]
  estimatedSetupMins: number
  difficulty: string
  usageCount: number
  rating: number
  isPopular?: boolean
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [filteredTemplates, setFilteredTemplates] = useState<Template[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: "all", name: "All Categories", icon: Grid3X3 },
    { id: "EMAIL_CRM", name: "Email & CRM", icon: Mail },
    { id: "CALENDAR", name: "Calendar", icon: Calendar },
    { id: "ECOMMERCE", name: "E-commerce", icon: ShoppingCart },
    { id: "OPERATIONS", name: "Operations", icon: BarChart3 },
    { id: "DATA_SYNC", name: "Data Sync", icon: Database },
    { id: "SOCIAL_MEDIA", name: "Social Media", icon: MessageSquare },
    { id: "ANALYTICS", name: "Analytics", icon: TrendingUp },
    { id: "AUTOMATION", name: "Automation", icon: FileText }
  ]

  // Fetch templates from API
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates')
        const data = await response.json()
        setTemplates(data)
        setFilteredTemplates(data)
      } catch (error) {
        console.error('Failed to fetch templates:', error)
        // Fallback to mock data
        const mockTemplates: Template[] = [
          {
            id: "1",
            title: "Auto-Reply Lead Capture",
            summary: "Automatically respond to inbound leads with personalized messages",
            description: "This template captures leads from your website forms and sends personalized auto-replies based on their inquiry type. Includes lead scoring and CRM integration.",
            category: "EMAIL_CRM",
            apps: ["Gmail", "HubSpot", "Slack"],
            estimatedSetupMins: 15,
            difficulty: "Beginner",
            usageCount: 1247,
            rating: 4.8,
            isPopular: true
          },
          {
            id: "2",
            title: "Meeting Scheduler & Prep",
            summary: "Schedule meetings and automatically prepare briefing documents",
            description: "Automatically schedule meetings based on calendar availability and prepare comprehensive briefing documents with participant research.",
            category: "CALENDAR",
            apps: ["Google Calendar", "LinkedIn", "Notion"],
            estimatedSetupMins: 20,
            difficulty: "Intermediate",
            usageCount: 892,
            rating: 4.6
          },
          {
            id: "3",
            title: "Order Status Chatbot",
            summary: "Handle customer order inquiries with AI-powered responses",
            description: "Intelligent chatbot that handles order status inquiries, shipping updates, and basic customer service questions.",
            category: "ECOMMERCE",
            apps: ["Shopify", "Discord", "Zendesk"],
            estimatedSetupMins: 25,
            difficulty: "Intermediate",
            usageCount: 634,
            rating: 4.7,
            isPopular: true
          },
          {
            id: "4",
            title: "Daily Operations Digest",
            summary: "Generate daily operational reports with key metrics and alerts",
            description: "Compile daily operational metrics, identify anomalies, and send comprehensive reports to your team via Slack.",
            category: "OPERATIONS",
            apps: ["Slack", "Google Analytics", "Stripe"],
            estimatedSetupMins: 30,
            difficulty: "Advanced",
            usageCount: 445,
            rating: 4.9
          },
          {
            id: "5",
            title: "Data Sync Pipeline",
            summary: "Sync data between multiple platforms with transformation",
            description: "Automatically sync and transform data between your CRM, marketing tools, and analytics platforms.",
            category: "DATA_SYNC",
            apps: ["Salesforce", "Mailchimp", "Google Sheets"],
            estimatedSetupMins: 45,
            difficulty: "Advanced",
            usageCount: 321,
            rating: 4.5
          },
          {
            id: "6",
            title: "Social Media Monitor",
            summary: "Monitor brand mentions and respond automatically",
            description: "Track brand mentions across social platforms and respond with appropriate actions or escalations.",
            category: "SOCIAL_MEDIA",
            apps: ["Twitter", "Instagram", "Slack"],
            estimatedSetupMins: 35,
            difficulty: "Intermediate",
            usageCount: 567,
            rating: 4.4
          }
        ]
        setTemplates(mockTemplates)
        setFilteredTemplates(mockTemplates)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  // Filter templates based on search and filters
  useEffect(() => {
    let filtered = templates

    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.apps.some(app => app.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(template => template.category === selectedCategory)
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(template => template.difficulty === selectedDifficulty)
    }

    setFilteredTemplates(filtered)
  }, [templates, searchQuery, selectedCategory, selectedDifficulty])

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.icon : Grid3X3
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleUseTemplate = async (templateId: string) => {
    // Simulate template installation
    console.log(`Installing template ${templateId}`)
    // In real app, this would clone the n8n workflow and redirect to workflow editor
    window.location.href = `/dashboard/workflows/new?template=${templateId}`
  }

  const renderTemplateCard = (template: Template) => (
    <Card key={template.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {React.createElement(getCategoryIcon(template.category), {
              className: "h-5 w-5 text-primary"
            })}
            <div className="flex items-center space-x-2">
              {template.isPopular && (
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
              <Badge className={getDifficultyColor(template.difficulty)}>
                {template.difficulty}
              </Badge>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{template.rating}</span>
          </div>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          {template.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {template.summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1">
          {template.apps.slice(0, 3).map((app) => (
            <Badge key={app} variant="outline" className="text-xs">
              {app}
            </Badge>
          ))}
          {template.apps.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{template.apps.length - 3} more
            </Badge>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{template.estimatedSetupMins} min setup</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{template.usageCount.toLocaleString()} uses</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            className="flex-1"
            onClick={() => handleUseTemplate(template.id)}
          >
            Use Template
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={`/dashboard/templates/${template.id}`}>
              Preview
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">Pre-built workflows to get you started quickly</p>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Templates</h1>
          <p className="text-muted-foreground">
            Pre-built workflows to get you started quickly
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Tabs */}
      <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Results */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {/* Templates Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTemplates.map(renderTemplateCard)}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your search criteria or browse all categories
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("")
              setSelectedCategory("all")
              setSelectedDifficulty("all")
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}
