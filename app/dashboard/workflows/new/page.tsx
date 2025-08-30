"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import {
  ArrowLeft,
  Save,
  Play,
  Webhook,
  Calendar,
  Zap,
  Plus,
  X,
  Settings,
  Code,
  Eye,
  Mail,
  MessageSquare,
  Database,
  Chrome
} from "lucide-react"

interface Template {
  id: string
  title: string
  summary: string
  description: string
  category: string
  apps: string[]
  templateConfig: any
}

export default function NewWorkflowPage() {
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  
  const [workflowData, setWorkflowData] = useState({
    name: "",
    description: "",
    triggerType: "WEBHOOK",
    tags: [] as string[],
    isActive: false
  })
  const [currentTag, setCurrentTag] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  // Load template if specified
  useEffect(() => {
    if (templateId) {
      // In real app, fetch template from API
      const mockTemplate: Template = {
        id: templateId,
        title: "Auto-Reply Lead Capture",
        summary: "Automatically respond to inbound leads with personalized messages",
        description: "This template captures leads from your website forms and sends personalized auto-replies based on their inquiry type. Includes lead scoring and CRM integration.",
        category: "EMAIL_CRM",
        apps: ["Gmail", "HubSpot", "Slack"],
        templateConfig: {
          trigger: {
            type: "WEBHOOK",
            config: {
              method: "POST",
              path: "/webhook/lead-capture"
            }
          },
          nodes: [
            {
              id: "trigger",
              type: "webhook",
              name: "Lead Form Webhook"
            },
            {
              id: "process",
              type: "function",
              name: "Process Lead Data"
            },
            {
              id: "email",
              type: "gmail",
              name: "Send Auto-Reply"
            },
            {
              id: "crm",
              type: "hubspot",
              name: "Create Contact"
            }
          ]
        }
      }
      
      setSelectedTemplate(mockTemplate)
      setWorkflowData(prev => ({
        ...prev,
        name: mockTemplate.title,
        description: mockTemplate.summary,
        tags: [mockTemplate.category.toLowerCase().replace('_', '-')]
      }))
    }
  }, [templateId])

  const handleInputChange = (field: string, value: string | boolean) => {
    setWorkflowData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddTag = () => {
    if (currentTag && !workflowData.tags.includes(currentTag)) {
      setWorkflowData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag]
      }))
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setWorkflowData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSave = async (activate = false) => {
    if (!workflowData.name.trim()) {
      toast.error("Please enter a workflow name")
      return
    }

    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const finalData = {
        ...workflowData,
        isActive: activate,
        templateId: selectedTemplate?.id
      }
      
      console.log("Creating workflow:", finalData)
      
      toast.success(activate ? "Workflow created and activated!" : "Workflow saved as draft")
      
      // Redirect to workflows page
      window.location.href = "/dashboard/workflows"
    } catch (error) {
      toast.error("Failed to create workflow")
    } finally {
      setIsLoading(false)
    }
  }

  const getTriggerIcon = (triggerType: string) => {
    switch (triggerType) {
      case "WEBHOOK":
        return <Webhook className="h-4 w-4" />
      case "SCHEDULE":
        return <Calendar className="h-4 w-4" />
      case "EVENT":
        return <Zap className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  const getAppIcon = (app: string) => {
    switch (app.toLowerCase()) {
      case "gmail":
        return <Mail className="h-4 w-4" />
      case "slack":
        return <MessageSquare className="h-4 w-4" />
      case "hubspot":
        return <Database className="h-4 w-4" />
      case "google":
      case "google calendar":
        return <Chrome className="h-4 w-4" />
      default:
        return <Settings className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/workflows">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Workflows
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {selectedTemplate ? `Create from Template` : "Create New Workflow"}
            </h1>
            <p className="text-muted-foreground">
              {selectedTemplate 
                ? `Using template: ${selectedTemplate.title}`
                : "Build a custom automation workflow"
              }
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => handleSave(false)}
            disabled={isLoading}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            onClick={() => handleSave(true)}
            disabled={isLoading}
          >
            <Play className="mr-2 h-4 w-4" />
            {isLoading ? "Creating..." : "Create & Activate"}
          </Button>
        </div>
      </div>

      {/* Template Preview */}
      {selectedTemplate && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                    Template
                  </Badge>
                  <span>{selectedTemplate.title}</span>
                </CardTitle>
                <CardDescription className="mt-2">
                  {selectedTemplate.description}
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/workflows/new">
                  <X className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Apps:</span>
                <div className="flex space-x-1">
                  {selectedTemplate.apps.map((app) => (
                    <div key={app} className="flex items-center space-x-1 bg-white rounded px-2 py-1">
                      {getAppIcon(app)}
                      <span className="text-xs">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Form */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="trigger">Trigger</TabsTrigger>
              <TabsTrigger value="workflow" disabled={!selectedTemplate}>
                Workflow
              </TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Configure the basic settings for your workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Workflow Name *</Label>
                    <Input
                      id="name"
                      placeholder="Enter workflow name"
                      value={workflowData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what this workflow does"
                      value={workflowData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Add a tag"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleAddTag}
                        disabled={!currentTag}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    {workflowData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {workflowData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                            <span>{tag}</span>
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 hover:text-red-500"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trigger" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trigger Configuration</CardTitle>
                  <CardDescription>
                    Choose how this workflow will be triggered
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Trigger Type</Label>
                    <Select
                      value={workflowData.triggerType}
                      onValueChange={(value) => handleInputChange("triggerType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WEBHOOK">
                          <div className="flex items-center space-x-2">
                            <Webhook className="h-4 w-4" />
                            <span>Webhook</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="SCHEDULE">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Schedule</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="EVENT">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4" />
                            <span>Event</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {workflowData.triggerType === "WEBHOOK" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Webhook Configuration</h4>
                      <div className="space-y-2">
                        <Label>Webhook URL</Label>
                        <div className="flex space-x-2">
                          <Input
                            value="https://api.levateai.com/webhook/your-workflow-id"
                            readOnly
                            className="bg-white"
                          />
                          <Button variant="outline" size="sm">
                            Copy
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          This URL will be generated after creating the workflow
                        </p>
                      </div>
                    </div>
                  )}

                  {workflowData.triggerType === "SCHEDULE" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Schedule Configuration</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Frequency</Label>
                          <Select defaultValue="daily">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="daily">Daily</SelectItem>
                              <SelectItem value="weekly">Weekly</SelectItem>
                              <SelectItem value="monthly">Monthly</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Time</Label>
                          <Input type="time" defaultValue="09:00" />
                        </div>
                      </div>
                    </div>
                  )}

                  {workflowData.triggerType === "EVENT" && (
                    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium">Event Configuration</h4>
                      <div className="space-y-2">
                        <Label>Event Source</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gmail">Gmail - New Email</SelectItem>
                            <SelectItem value="calendar">Calendar - New Event</SelectItem>
                            <SelectItem value="form">Form - New Submission</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              {selectedTemplate && (
                <Card>
                  <CardHeader>
                    <CardTitle>Workflow Preview</CardTitle>
                    <CardDescription>
                      Preview of the workflow that will be created from the template
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedTemplate.templateConfig.nodes?.map((node: any, index: number) => (
                        <div key={node.id} className="flex items-center space-x-4 p-3 border rounded-lg">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{node.name}</div>
                            <div className="text-sm text-muted-foreground">{node.type}</div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {getTriggerIcon(workflowData.triggerType)}
                <span>Workflow Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-muted-foreground">Name</div>
                <div className="text-sm">{workflowData.name || "Untitled Workflow"}</div>
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">Trigger</div>
                <div className="text-sm">{workflowData.triggerType}</div>
              </div>
              {workflowData.tags.length > 0 && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground mb-1">Tags</div>
                  <div className="flex flex-wrap gap-1">
                    {workflowData.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {selectedTemplate && (
            <Card>
              <CardHeader>
                <CardTitle>Template Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Category</div>
                  <div className="text-sm">{selectedTemplate.category.replace('_', ' ')}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">Connected Apps</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedTemplate.apps.map((app) => (
                      <Badge key={app} variant="outline" className="text-xs">
                        {app}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="mr-2 h-4 w-4" />
                View Documentation
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
