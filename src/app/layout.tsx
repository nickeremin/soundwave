import React from "react"
import { type Metadata } from "next"
import { Inter } from "next/font/google"
import { enUS } from "@clerk/localizations"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import "./globals.css"

import { ClerkProvider } from "@clerk/nextjs"

import { PlayerContextProvider } from "@/features/player/player-context-provider"
import { Toaster } from "@/shared/components/ui/sonner"
import { TooltipProvider } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"
import TRPCReactQueryProvider from "@/shared/trpc/trpc-react-query-provider"

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
      <ClerkProvider localization={enUS}>
        <body
          className={cn(
            font.className,
            "relative min-h-screen max-w-[100vw] antialiased"
          )}
          suppressHydrationWarning
        >
          <TRPCReactQueryProvider>
            <PlayerContextProvider>
              <TooltipProvider delayDuration={300}>
                {children}
                <Toaster />
                {/* <ReactQueryDevtools
                buttonPosition="bottom-left"
                position="bottom"
                initialIsOpen={false}
              /> */}
              </TooltipProvider>
            </PlayerContextProvider>
          </TRPCReactQueryProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
