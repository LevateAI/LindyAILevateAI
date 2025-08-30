"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Send, 
  Sparkles, 
  Zap, 
  Shield, 
  Users, 
  ArrowRight,
  MessageSquare,
  Bot,
  User,
  Play,
  CheckCircle,
  Star
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
}

export default function HomePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you create powerful automations and workflows. What would you like to automate today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('email') || input.includes('gmail') || input.includes('outlook')) {
      return "Great! I can help you automate email workflows. I can set up automations to:\n\n• Send personalized emails based on triggers\n• Auto-respond to specific types of emails\n• Forward emails to team members\n• Create email sequences\n\nTo get started, you'll need to connect your email account. Would you like me to guide you through creating an email automation?"
    }
    
    if (input.includes('calendar') || input.includes('meeting') || input.includes('schedule')) {
      return "Perfect! I can help you automate calendar and scheduling tasks:\n\n• Auto-schedule meetings based on availability\n• Send meeting reminders\n• Create calendar events from emails\n• Sync calendars across platforms\n\nWould you like to create a calendar automation? I'll help you connect your calendar and set it up step by step."
    }
    
    if (input.includes('slack') || input.includes('teams') || input.includes('discord')) {
      return "Excellent! I can help you automate team communication:\n\n• Send automated notifications to channels\n• Create daily/weekly reports\n• Forward important messages\n• Set up approval workflows\n\nWhich communication platform would you like to automate? I'll guide you through the setup process."
    }
    
    if (input.includes('crm') || input.includes('salesforce') || input.includes('hubspot')) {
      return "Great choice! CRM automation can save you hours every week:\n\n• Auto-update contact information\n• Create leads from form submissions\n• Send follow-up sequences\n• Generate reports and analytics\n\nWhich CRM are you using? I'll help you create a powerful automation workflow."
    }
    
    if (input.includes('social') || input.includes('twitter') || input.includes('linkedin') || input.includes('facebook')) {
      return "Social media automation is a game-changer! I can help you:\n\n• Schedule posts across platforms\n• Auto-respond to mentions and comments\n• Cross-post content automatically\n• Track engagement and analytics\n\nWhich social platforms do you want to automate? Let's create your social media workflow!"
    }
    
    return "That sounds like a great automation opportunity! I can help you create workflows for almost any task. Here are some popular options:\n\n• Email & Communication\n• Calendar & Scheduling\n• Social Media Management\n• CRM & Sales Automation\n• Data Processing\n• File Management\n\nTell me more about what you'd like to automate, and I'll create a custom workflow for you!"
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const quickActions = [
    "Automate my email responses",
    "Schedule social media posts",
    "Create a CRM workflow",
    "Set up meeting reminders"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-xl font-semibold">LevateAI</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sign-in">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Hero Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI-Powered Automation
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Automate Your Work with{" "}
                  <span className="text-primary">AI</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Create powerful automations in minutes, not hours. Connect your favorite apps and let AI handle the repetitive tasks.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link href="/sign-up">
                  <Button size="lg" className="text-lg px-8">
                    Start Automating
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">No Code Required</h3>
                    <p className="text-sm text-gray-600">Visual workflow builder</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Lightning Fast</h3>
                    <p className="text-sm text-gray-600">Setup in minutes</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Enterprise Secure</h3>
                    <p className="text-sm text-gray-600">SOC 2 compliant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Team Friendly</h3>
                    <p className="text-sm text-gray-600">Collaborate easily</p>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src="/api/placeholder/40/40" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-700 mb-2">
                        "LevateAI saved me 10+ hours per week. The AI setup is incredibly intuitive - I had my first automation running in under 5 minutes!"
                      </p>
                      <p className="text-sm text-gray-500">
                        <strong>John Doe</strong> - Marketing Director
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Side - AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:sticky lg:top-24"
          >
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                {/* Chat Header */}
                <div className="p-4 border-b bg-gradient-to-r from-primary to-purple-600 text-white rounded-t-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-sm opacity-90">Ready to help you automate</p>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <Avatar className="w-8 h-8">
                          {message.sender === 'user' ? (
                            <AvatarFallback className="bg-primary text-white">
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          ) : (
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              <Bot className="w-4 h-4" />
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.sender === 'user'
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          <p className="text-sm whitespace-pre-line">{message.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-purple-100 text-purple-600">
                            <Bot className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="bg-gray-100 rounded-lg p-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setInputValue(action)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Ask me anything about automation..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send • Try asking about email, calendar, or social media automation
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
