"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"

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

function SearchTabs() {
  const pathname = usePathname()

  const tabId = React.useId()
  const [activeTab, setActiveTab] = React.useState(pathname)

  return (
    <nav className="flex h-16 items-center">
      <div className="flex items-center">
        {tabs.map((tab, i) => (
          <Button
            variant="none"
            size="none"
            key={i}
            // href={tab.href}
            className={cn(
              "group relative inline-block h-10 select-none px-4 font-medium text-primary"
            )}
            onClick={() => {
              setActiveTab(tab.href)
            }}
          >
            {activeTab === tab.href && (
              <motion.div
                style={{
                  borderRadius: "16px",
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
  )
}

export default SearchTabs
