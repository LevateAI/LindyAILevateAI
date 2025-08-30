"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Users,
  FileText,
  Zap,
  Shield,
  Rocket,
  Chrome
} from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Welcome to LevateAI",
    description: "Let's get you set up with AI-powered automation",
    icon: Sparkles
  },
  {
    id: 2,
    title: "Connect Your Accounts",
    description: "Link your accounts to start automating",
    icon: Zap
  },
  {
    id: 3,
    title: "You're All Set!",
    description: "Ready to create your first AI workflow",
    icon: Rocket
  }
]

const integrations = [
  {
    name: "Google Account",
    description: "Access Gmail, Calendar, Drive, and more Google services",
    icon: Chrome,
    color: "bg-blue-500",
    connected: false
  },
  {
    name: "Slack",
    description: "Post messages and manage channels",
    icon: MessageSquare,
    color: "bg-purple-500",
    connected: false
  },
  {
    name: "Microsoft 365",
    description: "Access Outlook, Teams, and Office apps",
    icon: FileText,
    color: "bg-orange-500",
    connected: false
  }
]

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const progress = (currentStep / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      router.push('/dashboard')
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  const handleConnectGoogle = async () => {
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=/onboarding`,
          scopes: 'email profile https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/drive.file'
        }
      })

      if (error) {
        console.error('Google OAuth error:', error)
        setIsLoading(false)
      }
      // If successful, user will be redirected to Google OAuth
    } catch (error) {
      console.error('Connection error:', error)
      setIsLoading(false)
    }
  }

  const handleConnectIntegration = async (integrationName: string) => {
    if (integrationName === "Google Account") {
      await handleConnectGoogle()
      return
    }

    setIsLoading(true)
    // Simulate connection process for other integrations
    await new Promise(resolve => setTimeout(resolve, 1500))
    setConnectedIntegrations(prev => [...prev, integrationName])
    setIsLoading(false)
  }

  const StepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
              >
                <Sparkles className="w-12 h-12 text-white" />
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome to LevateAI! 🎉
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                You're about to unlock the power of AI automation. Let's get you set up in just a few steps.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg"
              >
                <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Secure</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg"
              >
                <Zap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-700">Fast</p>
              </motion.div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900">
                Connect Your Accounts
              </h2>
              <p className="text-gray-600">
                Link your accounts to start automating workflows
              </p>
            </div>

            <div className="grid gap-4 max-w-2xl mx-auto">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${integration.color} rounded-lg flex items-center justify-center`}>
                          <integration.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {connectedIntegrations.includes(integration.name) ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-2"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <Badge variant="secondary" className="bg-green-100 text-green-700">
                              Connected
                            </Badge>
                          </motion.div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleConnectIntegration(integration.name)}
                            disabled={isLoading}
                            className="flex items-center space-x-2"
                          >
                            <Chrome className="w-4 h-4" />
                            <span>{isLoading ? "Connecting..." : "Connect"}</span>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-500">
                You can always connect more integrations later in Settings
              </p>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 10
              }}
              className="relative"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-12 h-12 text-white" />
              </div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity
                }}
                className="absolute inset-0 w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mx-auto opacity-20"
              />
            </motion.div>
            
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">
                You're All Set! 🚀
              </h2>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                Welcome to the future of automation. Ready to create your first AI workflow?
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <Users className="w-8 h-8 text-purple-600" />
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Join 10,000+ users</p>
                  <p className="text-sm text-gray-600">automating their workflows</p>
                </div>
              </div>
              <div className="flex justify-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 bg-purple-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">LevateAI</span>
          </div>
          <Button variant="ghost" onClick={handleSkip}>
            Skip for now
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="flex flex-col items-center space-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                ${currentStep >= step.id 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-gray-200 text-gray-400'
                }
              `}>
                {currentStep > step.id ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <step.icon className="w-6 h-6" />
                )}
              </div>
              <span className={`text-xs font-medium ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
              }`}>
                {step.title}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                <StepContent />
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Button 
            onClick={handleNext}
            size="lg"
            className="px-8"
            disabled={isLoading}
          >
            {currentStep === steps.length ? "Go to Dashboard" : "Continue"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
