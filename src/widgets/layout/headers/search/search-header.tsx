"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { motion } from "framer-motion"

import {
  BackForwardButtons,
  LogInSignUpButtons,
  SearchInput,
  UserNav,
} from "@/features/nav"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type Tab = {
  title: string
  href: string
}

const tabs: Tab[] = [
  {
    title: "All",
    href: "/search",
  },
  {
    title: "Audiobooks",
    href: "/search/books",
  },
  {
    title: "Songs",
    href: "/search/tracks",
  },
  {
    title: "Artists",
    href: "/search/artists",
  },
  {
    title: "Playlists",
    href: "/search/playlists",
  },
  {
    title: "Albums",
    href: "/search/albums",
  },
]

function SearchHeader() {
  const pathname = usePathname()

  const tabId = React.useId()
  const [activeTab, setActiveTab] = React.useState(pathname)

  return (
    <div className="flex w-full flex-col">
      <nav className="flex h-16 w-full items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <BackForwardButtons />
          <SearchInput />
        </div>
        <SignedIn>
          <UserNav />
        </SignedIn>
        <SignedOut>
          <LogInSignUpButtons />
        </SignedOut>
      </nav>
      <nav className="flex w-full items-center px-6 pb-3 pt-1">
        <div className="flex items-center gap-4">
          {tabs.map((tab, i) => (
            <Button
              variant="none"
              size="none"
              key={i}
              // href={tab.href}
              className={cn(
                "group relative inline-block h-8 select-none px-3 text-sm font-medium text-primary"
              )}
              onClick={() => {
                setActiveTab(tab.href)
              }}
            >
              {activeTab === tab.href && (
                <motion.div
                  style={{
                    borderRadius: "9999px",
                  }}
                  layoutId={tabId}
                  className="absolute inset-0 z-10 bg-primary mix-blend-difference"
                  transition={{ duration: 0.3 }}
                />
              )}
              {tab.title}
            </Button>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default SearchHeader
