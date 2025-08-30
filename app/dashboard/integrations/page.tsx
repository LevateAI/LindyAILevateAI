"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Plus,
  Check,
  Settings,
  Trash2,
  ExternalLink,
  Filter,
  Star,
  Zap,
  Shield
} from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  category: string
  icon: string
  connected: boolean
  popular: boolean
  premium: boolean
  actions: string[]
  triggers: string[]
}

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const integrations: Integration[] = [
    // Communication
    {
      id: "gmail",
      name: "Gmail",
      description: "Send emails, read messages, and manage your inbox automatically",
      category: "communication",
      icon: "📧",
      connected: true,
      popular: true,
      premium: false,
      actions: ["Send Email", "Create Draft", "Add Label", "Mark as Read"],
      triggers: ["New Email", "Email with Attachment", "Starred Email"]
    },
    {
      id: "slack",
      name: "Slack",
      description: "Send messages, create channels, and manage team communication",
      category: "communication",
      icon: "💬",
      connected: true,
      popular: true,
      premium: false,
      actions: ["Send Message", "Create Channel", "Add Reaction", "Set Status"],
      triggers: ["New Message", "Mention", "Channel Created"]
    },
    {
      id: "discord",
      name: "Discord",
      description: "Automate Discord server management and messaging",
      category: "communication",
      icon: "🎮",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Send Message", "Create Channel", "Manage Roles"],
      triggers: ["New Message", "User Joined", "Reaction Added"]
    },
    {
      id: "teams",
      name: "Microsoft Teams",
      description: "Collaborate and communicate with your Microsoft Teams workspace",
      category: "communication",
      icon: "👥",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Send Message", "Create Meeting", "Share File"],
      triggers: ["New Message", "Meeting Started", "File Shared"]
    },

    // Productivity
    {
      id: "google-calendar",
      name: "Google Calendar",
      description: "Create events, schedule meetings, and manage your calendar",
      category: "productivity",
      icon: "📅",
      connected: true,
      popular: true,
      premium: false,
      actions: ["Create Event", "Update Event", "Delete Event", "Add Attendee"],
      triggers: ["New Event", "Event Updated", "Event Starting Soon"]
    },
    {
      id: "notion",
      name: "Notion",
      description: "Create pages, update databases, and manage your workspace",
      category: "productivity",
      icon: "📝",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Create Page", "Update Database", "Add Block"],
      triggers: ["Page Created", "Database Updated", "Comment Added"]
    },
    {
      id: "trello",
      name: "Trello",
      description: "Manage boards, cards, and lists for project organization",
      category: "productivity",
      icon: "📋",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Create Card", "Move Card", "Add Comment", "Set Due Date"],
      triggers: ["Card Created", "Card Moved", "Due Date Approaching"]
    },
    {
      id: "asana",
      name: "Asana",
      description: "Track tasks, projects, and team collaboration",
      category: "productivity",
      icon: "✅",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Create Task", "Update Project", "Add Comment"],
      triggers: ["Task Completed", "Project Updated", "Due Date Changed"]
    },

    // CRM & Sales
    {
      id: "hubspot",
      name: "HubSpot",
      description: "Manage contacts, deals, and sales pipeline automation",
      category: "crm",
      icon: "🔗",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Create Contact", "Update Deal", "Send Email", "Add Note"],
      triggers: ["New Contact", "Deal Stage Changed", "Form Submitted"]
    },
    {
      id: "salesforce",
      name: "Salesforce",
      description: "Automate your Salesforce CRM workflows and data management",
      category: "crm",
      icon: "☁️",
      connected: false,
      popular: true,
      premium: true,
      actions: ["Create Lead", "Update Opportunity", "Add Activity"],
      triggers: ["New Lead", "Opportunity Closed", "Account Updated"]
    },
    {
      id: "pipedrive",
      name: "Pipedrive",
      description: "Manage your sales pipeline and customer relationships",
      category: "crm",
      icon: "🚀",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Create Deal", "Update Person", "Add Activity"],
      triggers: ["Deal Won", "Stage Changed", "Activity Completed"]
    },

    // Social Media
    {
      id: "twitter",
      name: "Twitter",
      description: "Post tweets, manage followers, and track mentions",
      category: "social",
      icon: "🐦",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Post Tweet", "Retweet", "Like Tweet", "Follow User"],
      triggers: ["New Mention", "New Follower", "Tweet Liked"]
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      description: "Share posts, connect with professionals, and manage your network",
      category: "social",
      icon: "💼",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Share Post", "Send Message", "Connect with User"],
      triggers: ["New Connection", "Post Engagement", "Message Received"]
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Post photos, stories, and manage your Instagram presence",
      category: "social",
      icon: "📸",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Post Photo", "Post Story", "Like Post", "Follow User"],
      triggers: ["New Follower", "Post Liked", "Comment Received"]
    },

    // Finance
    {
      id: "stripe",
      name: "Stripe",
      description: "Process payments, manage subscriptions, and handle billing",
      category: "finance",
      icon: "💳",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Create Payment", "Refund Payment", "Create Customer"],
      triggers: ["Payment Succeeded", "Subscription Created", "Invoice Paid"]
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "Send payments, request money, and manage transactions",
      category: "finance",
      icon: "💰",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Send Payment", "Request Money", "Create Invoice"],
      triggers: ["Payment Received", "Money Requested", "Dispute Opened"]
    },

    // Storage & Files
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Upload files, create folders, and manage cloud storage",
      category: "storage",
      icon: "📁",
      connected: false,
      popular: true,
      premium: false,
      actions: ["Upload File", "Create Folder", "Share File", "Move File"],
      triggers: ["New File", "File Shared", "Folder Created"]
    },
    {
      id: "dropbox",
      name: "Dropbox",
      description: "Sync files, share folders, and collaborate on documents",
      category: "storage",
      icon: "📦",
      connected: false,
      popular: false,
      premium: false,
      actions: ["Upload File", "Create Folder", "Share Link"],
      triggers: ["New File", "File Modified", "Folder Shared"]
    }
  ]

  const categories = [
    { id: "all", name: "All", count: integrations.length },
    { id: "communication", name: "Communication", count: integrations.filter(i => i.category === "communication").length },
    { id: "productivity", name: "Productivity", count: integrations.filter(i => i.category === "productivity").length },
    { id: "crm", name: "CRM & Sales", count: integrations.filter(i => i.category === "crm").length },
    { id: "social", name: "Social Media", count: integrations.filter(i => i.category === "social").length },
    { id: "finance", name: "Finance", count: integrations.filter(i => i.category === "finance").length },
    { id: "storage", name: "Storage", count: integrations.filter(i => i.category === "storage").length }
  ]

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || integration.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const connectedIntegrations = integrations.filter(i => i.connected)
  const popularIntegrations = integrations.filter(i => i.popular && !i.connected)

  const handleConnect = (integrationId: string) => {
    // This would handle the OAuth flow or API key setup
    console.log(`Connecting to ${integrationId}`)
    // Redirect to OAuth or open connection modal
  }

  const handleDisconnect = (integrationId: string) => {
    // This would handle disconnecting the integration
    console.log(`Disconnecting from ${integrationId}`)
  }

  const handleConfigure = (integrationId: string) => {
    // This would open configuration modal
    console.log(`Configuring ${integrationId}`)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Integrations</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Request Integration
        </Button>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <TabsList className="grid w-full max-w-4xl grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs">
                {category.name}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Connected Integrations */}
        {connectedIntegrations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                Connected Integrations
              </CardTitle>
              <CardDescription>
                Manage your active integrations and their settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {connectedIntegrations.map((integration) => (
                  <Card key={integration.id} className="border-green-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <Badge variant="default" className="text-xs">Connected</Badge>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        {integration.description}
                      </p>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleConfigure(integration.id)}
                        >
                          <Settings className="mr-1 h-3 w-3" />
                          Configure
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDisconnect(integration.id)}
                        >
                          <Trash2 className="mr-1 h-3 w-3" />
                          Disconnect
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Popular Integrations */}
        {popularIntegrations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Star className="mr-2 h-5 w-5 text-yellow-500" />
                Popular Integrations
              </CardTitle>
              <CardDescription>
                Most commonly used integrations by our users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {popularIntegrations.slice(0, 6).map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <div className="flex items-center space-x-1">
                              <Badge variant="secondary" className="text-xs">Popular</Badge>
                              {integration.premium && (
                                <Badge variant="default" className="text-xs">Premium</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4">
                        {integration.description}
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => handleConnect(integration.id)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Connect
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Integrations */}
        <TabsContent value={selectedCategory} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedCategory === "all" ? "All Integrations" : categories.find(c => c.id === selectedCategory)?.name}
              </CardTitle>
              <CardDescription>
                {filteredIntegrations.length} integrations available
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredIntegrations.map((integration) => (
                  <Card key={integration.id} className={integration.connected ? "border-green-200" : ""}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{integration.icon}</span>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <div className="flex items-center space-x-1">
                              {integration.connected && (
                                <Badge variant="default" className="text-xs">Connected</Badge>
                              )}
                              {integration.popular && !integration.connected && (
                                <Badge variant="secondary" className="text-xs">Popular</Badge>
                              )}
                              {integration.premium && (
                                <Badge variant="outline" className="text-xs">Premium</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        {integration.connected && (
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {integration.description}
                      </p>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Actions ({integration.actions.length})</p>
                          <div className="flex flex-wrap gap-1">
                            {integration.actions.slice(0, 3).map((action, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {action}
                              </Badge>
                            ))}
                            {integration.actions.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{integration.actions.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs font-medium text-muted-foreground mb-1">Triggers ({integration.triggers.length})</p>
                          <div className="flex flex-wrap gap-1">
                            {integration.triggers.slice(0, 2).map((trigger, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {trigger}
                              </Badge>
                            ))}
                            {integration.triggers.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{integration.triggers.length - 2} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {integration.connected ? (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleConfigure(integration.id)}
                          >
                            <Settings className="mr-1 h-3 w-3" />
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDisconnect(integration.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          className="w-full"
                          onClick={() => handleConnect(integration.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Connect
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
