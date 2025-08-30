"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  DollarSign,
  Users,
  Workflow,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Play,
  Pause,
  MoreHorizontal
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      change: "+2 from last month",
      icon: Workflow,
      color: "text-blue-600"
    },
    {
      title: "Tasks Automated",
      value: "2,847",
      change: "+18% from last month",
      icon: Zap,
      color: "text-green-600"
    },
    {
      title: "Time Saved",
      value: "47.2h",
      change: "+12h from last month",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+0.3% from last month",
      icon: CheckCircle,
      color: "text-emerald-600"
    }
  ]

  const recentWorkflows = [
    {
      id: 1,
      name: "Email Lead Nurturing",
      status: "active",
      lastRun: "2 minutes ago",
      executions: 45,
      successRate: 100
    },
    {
      id: 2,
      name: "Social Media Scheduler",
      status: "active",
      lastRun: "1 hour ago",
      executions: 23,
      successRate: 96
    },
    {
      id: 3,
      name: "CRM Data Sync",
      status: "paused",
      lastRun: "3 hours ago",
      executions: 12,
      successRate: 100
    },
    {
      id: 4,
      name: "Invoice Processing",
      status: "error",
      lastRun: "5 hours ago",
      executions: 8,
      successRate: 87
    }
  ]

  const integrations = [
    { name: "Gmail", connected: true, icon: "📧" },
    { name: "Slack", connected: true, icon: "💬" },
    { name: "Google Calendar", connected: true, icon: "📅" },
    { name: "HubSpot", connected: false, icon: "🔗" },
    { name: "Stripe", connected: false, icon: "💳" },
    { name: "Twitter", connected: false, icon: "🐦" }
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/workflows">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Workflow
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Recent Workflows */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Workflows</CardTitle>
            <CardDescription>
              Your most recently active automation workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentWorkflows.map((workflow) => (
                <div key={workflow.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {workflow.status === 'active' && (
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      )}
                      {workflow.status === 'paused' && (
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      )}
                      {workflow.status === 'error' && (
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      )}
                      <Badge variant={
                        workflow.status === 'active' ? 'default' :
                        workflow.status === 'paused' ? 'secondary' : 'destructive'
                      }>
                        {workflow.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-medium">{workflow.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last run: {workflow.lastRun}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{workflow.executions} runs</p>
                      <p className="text-sm text-muted-foreground">
                        {workflow.successRate}% success
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Integrations */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Get started with common automation tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Link href="/dashboard/workflows">
                <Button variant="outline" className="w-full justify-start">
                  <Workflow className="mr-2 h-4 w-4" />
                  Create Email Automation
                </Button>
              </Link>
              <Link href="/dashboard/workflows">
                <Button variant="outline" className="w-full justify-start">
                  <Zap className="mr-2 h-4 w-4" />
                  Schedule Social Posts
                </Button>
              </Link>
              <Link href="/dashboard/integrations">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect New App
                </Button>
              </Link>
            </div>

            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3">Connected Integrations</h4>
              <div className="space-y-2">
                {integrations.slice(0, 4).map((integration, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{integration.icon}</span>
                      <span className="text-sm">{integration.name}</span>
                    </div>
                    <Badge variant={integration.connected ? "default" : "secondary"}>
                      {integration.connected ? "Connected" : "Available"}
                    </Badge>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/integrations">
                <Button variant="ghost" size="sm" className="w-full mt-3">
                  View All Integrations
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Overview</CardTitle>
          <CardDescription>
            Your automation usage for this month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Workflow Executions</span>
                <span className="text-sm text-muted-foreground">2,847 / 5,000</span>
              </div>
              <Progress value={57} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">API Calls</span>
                <span className="text-sm text-muted-foreground">12,450 / 25,000</span>
              </div>
              <Progress value={50} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Storage Used</span>
                <span className="text-sm text-muted-foreground">2.1 GB / 10 GB</span>
              </div>
              <Progress value={21} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
