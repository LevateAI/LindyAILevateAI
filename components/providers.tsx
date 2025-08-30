"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { QueryProvider } from "@/components/query-provider"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <QueryProvider>
        {children}
      </QueryProvider>
    </ThemeProvider>
  )
}
