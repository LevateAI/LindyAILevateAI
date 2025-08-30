"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Users,
  Download,
  Calendar,
  Target,
  DollarSign
} from "lucide-react"

export default function AnalyticsPage() {
  const timeRanges = [
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" },
    { value: "90d", label: "Last 90 days" },
    { value: "1y", label: "Last year" }
  ]

  const overviewStats = [
    {
      title: "Total Executions",
      value: "12,847",
      change: "+18.2%",
      trend: "up",
      icon: Activity,
      color: "text-blue-600"
    },
    {
      title: "Success Rate",
      value: "98.5%",
      change: "+0.3%",
      trend: "up",
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Time Saved",
      value: "247.2h",
      change: "+32.1%",
      trend: "up",
      icon: Clock,
      color: "text-purple-600"
    },
    {
      title: "Cost Savings",
      value: "$8,420",
      change: "+24.7%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600"
    }
  ]

  const workflowPerformance = [
    {
      name: "Email Lead Nurturing",
      executions: 2847,
      successRate: 99.2,
      avgDuration: "2.3s",
      timeSaved: "47.2h",
      status: "excellent"
    },
    {
      name: "Social Media Scheduler",
      executions: 1923,
      successRate: 97.8,
      avgDuration: "1.8s",
      timeSaved: "32.1h",
      status: "good"
    },
    {
      name: "CRM Data Sync",
      executions: 1456,
      successRate: 100,
      avgDuration: "4.1s",
      timeSaved: "28.7h",
      status: "excellent"
    },
    {
      name: "Invoice Processing",
      executions: 892,
      successRate: 94.3,
      avgDuration: "3.2s",
      timeSaved: "19.4h",
      status: "warning"
    }
  ]

  const integrationUsage = [
    { name: "Gmail", usage: 85, executions: 3421, color: "bg-red-500" },
    { name: "Slack", usage: 72, executions: 2847, color: "bg-purple-500" },
    { name: "Google Calendar", usage: 68, executions: 2634, color: "bg-blue-500" },
    { name: "HubSpot", usage: 54, executions: 2156, color: "bg-orange-500" },
    { name: "Twitter", usage: 43, executions: 1723, color: "bg-cyan-500" },
    { name: "Stripe", usage: 31, executions: 1234, color: "bg-indigo-500" }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-green-100 text-green-800">Excellent</Badge>
      case 'good':
        return <Badge className="bg-blue-100 text-blue-800">Good</Badge>
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Attention</Badge>
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Critical</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <div className="flex items-center space-x-2">
          <Select defaultValue="30d">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                {getTrendIcon(stat.trend)}
                <span>{stat.change} from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="errors">Error Analysis</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Workflow Performance</CardTitle>
              <CardDescription>
                Detailed performance metrics for each workflow
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowPerformance.map((workflow, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="font-medium">{workflow.name}</h3>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-sm text-muted-foreground">
                            {workflow.executions.toLocaleString()} executions
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Avg: {workflow.avgDuration}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Saved: {workflow.timeSaved}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{workflow.successRate}% success</p>
                        <Progress value={workflow.successRate} className="w-20 h-2 mt-1" />
                      </div>
                      {getStatusBadge(workflow.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Integration Usage</CardTitle>
              <CardDescription>
                Most frequently used integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {integrationUsage.map((integration, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{integration.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {integration.executions.toLocaleString()} executions
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={integration.usage} className="flex-1 h-2" />
                    <span className="text-sm text-muted-foreground w-12">
                      {integration.usage}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Error Analysis Tab */}
        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Errors</CardTitle>
              <CardDescription>
                Latest workflow errors and their details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    workflow: "Invoice Processing",
                    error: "Rate Limit Exceeded",
                    time: "2 hours ago",
                    severity: "warning"
                  },
                  {
                    workflow: "Social Media Scheduler",
                    error: "Authentication Failed",
                    time: "4 hours ago",
                    severity: "error"
                  },
                  {
                    workflow: "CRM Data Sync",
                    error: "Network Timeout",
                    time: "6 hours ago",
                    severity: "warning"
                  }
                ].map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className={`h-4 w-4 ${error.severity === 'error' ? 'text-red-500' : 'text-yellow-500'}`} />
                      <div>
                        <p className="font-medium">{error.workflow}</p>
                        <p className="text-sm text-muted-foreground">{error.error}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={error.severity === 'error' ? 'destructive' : 'secondary'}>
                        {error.severity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {error.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
