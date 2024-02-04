import React from "react"
import { type Metadata } from "next"
import { Inter } from "next/font/google"
import { ruRU } from "@clerk/localizations"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs"

import {
  ThemeProvider,
  TRPCReactQueryProvider,
} from "@/shared/components/providers"
import { Toaster } from "@/shared/components/ui/sonner"
import { cn } from "@/shared/lib/utils"

const font = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["cyrillic", "latin"],
})

export const metadata: Metadata = {
  title: "Tablebuilder",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ClerkProvider localization={ruRU}>
        <body
          className={cn(
            font.className,
            "relative min-h-screen max-w-[100vw] antialiased"
          )}
          suppressHydrationWarning
        >
          <TRPCReactQueryProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
              <Toaster />
            </ThemeProvider>
            <ReactQueryDevtools
              buttonPosition="bottom-left"
              position="bottom"
              initialIsOpen={false}
            />
          </TRPCReactQueryProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
