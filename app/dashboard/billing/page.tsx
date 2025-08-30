"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Download,
  Calendar,
  Check,
  Zap,
  Users,
  Shield,
  ArrowUpRight,
  AlertCircle,
  Star
} from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function BillingPage() {
  const [currentPlan, setCurrentPlan] = useState("pro")
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for individuals getting started with automation",
      monthlyPrice: 29,
      yearlyPrice: 290,
      features: [
        "5 Active Workflows",
        "1,000 Tasks/month",
        "Basic Integrations",
        "Email Support",
        "7-day History"
      ],
      limits: {
        workflows: 5,
        tasks: 1000,
        integrations: "Basic",
        support: "Email"
      }
    },
    {
      id: "pro",
      name: "Pro",
      description: "For growing teams that need more power and flexibility",
      monthlyPrice: 99,
      yearlyPrice: 990,
      popular: true,
      features: [
        "25 Active Workflows",
        "10,000 Tasks/month",
        "All Integrations",
        "Priority Support",
        "30-day History",
        "Advanced Analytics",
        "Team Collaboration"
      ],
      limits: {
        workflows: 25,
        tasks: 10000,
        integrations: "All",
        support: "Priority"
      }
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For large organizations with advanced needs",
      monthlyPrice: 299,
      yearlyPrice: 2990,
      features: [
        "Unlimited Workflows",
        "100,000 Tasks/month",
        "All Integrations",
        "24/7 Phone Support",
        "Unlimited History",
        "Advanced Analytics",
        "Team Collaboration",
        "Custom Integrations",
        "SLA Guarantee",
        "Dedicated Account Manager"
      ],
      limits: {
        workflows: "Unlimited",
        tasks: 100000,
        integrations: "All + Custom",
        support: "24/7 Phone"
      }
    }
  ]

  const currentPlanData = plans.find(plan => plan.id === currentPlan)
  const currentUsage = {
    workflows: 12,
    tasks: 2847,
    integrations: 6
  }

  const invoices = [
    {
      id: "INV-001",
      date: "2024-01-01",
      amount: 99,
      status: "paid",
      description: "Pro Plan - January 2024"
    },
    {
      id: "INV-002",
      date: "2023-12-01",
      amount: 99,
      status: "paid",
      description: "Pro Plan - December 2023"
    },
    {
      id: "INV-003",
      date: "2023-11-01",
      amount: 99,
      status: "paid",
      description: "Pro Plan - November 2023"
    }
  ]

  const handleUpgrade = (planId: string) => {
    // This would integrate with Stripe
    console.log(`Upgrading to ${planId}`)
    // Redirect to Stripe Checkout or open payment modal
  }

  const handleDowngrade = (planId: string) => {
    // This would handle plan downgrade
    console.log(`Downgrading to ${planId}`)
  }

  const getUsagePercentage = (used: number, limit: number | string) => {
    if (typeof limit === 'string') return 0
    return Math.min((used / limit) * 100, 100)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Billing & Usage</h2>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Invoice
        </Button>
      </div>

      {/* Current Plan Overview */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Current Plan
              <Badge variant="default" className="ml-2">
                {currentPlanData?.name}
              </Badge>
            </CardTitle>
            <CardDescription>
              Your current subscription and usage details
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                ${billingCycle === 'monthly' ? currentPlanData?.monthlyPrice : currentPlanData?.yearlyPrice}
              </span>
              <span className="text-muted-foreground">
                /{billingCycle === 'monthly' ? 'month' : 'year'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Next billing date</span>
                <span>February 1, 2024</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Payment method</span>
                <span>•••• •••• •••• 4242</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage This Month</CardTitle>
            <CardDescription>
              Track your current usage against plan limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Active Workflows</span>
                <span>{currentUsage.workflows} / {currentPlanData?.limits.workflows}</span>
              </div>
              <Progress 
                value={getUsagePercentage(currentUsage.workflows, currentPlanData?.limits.workflows as number)} 
                className="h-2" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Tasks Executed</span>
                <span>{currentUsage.tasks.toLocaleString()} / {(currentPlanData?.limits.tasks as number)?.toLocaleString()}</span>
              </div>
              <Progress 
                value={getUsagePercentage(currentUsage.tasks, currentPlanData?.limits.tasks as number)} 
                className="h-2" 
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Connected Integrations</span>
                <span>{currentUsage.integrations} / {currentPlanData?.limits.integrations}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Alert */}
      {getUsagePercentage(currentUsage.tasks, currentPlanData?.limits.tasks as number) > 80 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You've used {Math.round(getUsagePercentage(currentUsage.tasks, currentPlanData?.limits.tasks as number))}% of your monthly task limit. 
            Consider upgrading your plan to avoid service interruption.
          </AlertDescription>
        </Alert>
      )}

      {/* Billing Cycle Toggle */}
      <Card>
        <CardHeader>
          <CardTitle>Available Plans</CardTitle>
          <CardDescription>
            Choose the plan that best fits your automation needs
          </CardDescription>
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <Badge variant="secondary" className="ml-2">Save 20%</Badge>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {plan.name}
                    {currentPlan === plan.id && (
                      <Badge variant="secondary">Current</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-bold">
                      ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="text-muted-foreground">
                      /{billingCycle === 'monthly' ? 'month' : 'year'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {currentPlan === plan.id ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button 
                      className="w-full" 
                      onClick={() => handleUpgrade(plan.id)}
                      variant={plan.id === 'enterprise' ? 'default' : 'outline'}
                    >
                      {plans.findIndex(p => p.id === currentPlan) < plans.findIndex(p => p.id === plan.id) 
                        ? 'Upgrade' : 'Downgrade'} to {plan.name}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>
            View and download your past invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(invoice.date).toLocaleDateString()} • {invoice.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-medium">${invoice.amount}</p>
                    <Badge variant={invoice.status === 'paid' ? 'default' : 'secondary'}>
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
