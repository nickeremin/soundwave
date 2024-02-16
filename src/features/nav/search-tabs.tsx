"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"

import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

type Tab = {
  title: string
  href: string
}

const tabs: Tab[] = [
  {
    title: "All",
    href: "",
  },
  // {
  //   title: "Audiobooks",
  //   href: "/search/books",
  // },
  {
    title: "Songs",
    href: "/tracks",
  },
  {
    title: "Artists",
    href: "/artists",
  },
  // {
  //   title: "Playlists",
  //   href: "/search/playlists",
  // },
  {
    title: "Albums",
    href: "/albums",
  },
]

function SearchTabs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const tabId = React.useId()
  const [activeTab, setActiveTab] = React.useState(pathname)

  return (
    <div className="flex items-center gap-4">
      {tabs.map((tab, i) => (
        <Link
          data-shadcnui-button
          key={i}
          href={{
            pathname: `/search${tab.href}`,
            query: searchParams.toString(),
          }}
          className={cn(
            buttonVariants({
              variant: "none",
              size: "none",
              className: "group h-8 rounded-full px-3 text-sm leading-none",
            })
          )}
          onClick={() => {
            setActiveTab(`/search${tab.href}`)
          }}
        >
          {activeTab === `/search${tab.href}` && (
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
        </Link>
      ))}
    </div>
  )
}

export default SearchTabs
