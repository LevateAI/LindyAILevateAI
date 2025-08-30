"use client"

import { Fragment } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dialog, Transition } from "@headlessui/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Workflow,
  FileText,
  Activity,
  Plug,
  MessageSquare,
  CreditCard,
  Users,
  Settings,
  X,
  Zap,
  Plus
} from "lucide-react"

const navigation = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "My Workflows", href: "/dashboard/workflows", icon: Workflow, badge: "12" },
  { name: "Templates", href: "/dashboard/templates", icon: FileText },
  { name: "Runs & Logs", href: "/dashboard/runs", icon: Activity },
  { name: "Connections", href: "/dashboard/connections", icon: Plug },
  { name: "Requests", href: "/dashboard/requests", icon: MessageSquare, badge: "3" },
  { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">L</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">LevateAI</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 border-b border-gray-200">
        <Button className="w-full justify-start" size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Create Workflow
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                )}
              />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <Badge
                  variant={isActive ? "secondary" : "outline"}
                  className={cn(
                    "ml-auto text-xs",
                    isActive ? "bg-white/20 text-white border-white/20" : ""
                  )}
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Upgrade Banner */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg p-4 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-medium">Upgrade to Pro</span>
          </div>
          <p className="text-xs opacity-90 mb-3">
            Unlock unlimited workflows and advanced features
          </p>
          <Button size="sm" variant="secondary" className="w-full text-xs">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <X className="h-6 w-6 text-white" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white">
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200">
          <SidebarContent />
        </div>
      </div>
    </>
  )
}
