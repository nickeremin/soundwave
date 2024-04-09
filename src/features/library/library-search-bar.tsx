"use client"

import React from "react"
import { useLibraryStore } from "@/providers/bound-store-provider"
import { motion } from "framer-motion"
import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { librarySearhInputVariants } from "@/shared/constants/library"
import { cn } from "@/shared/lib/utils"

function LibrarySearchBar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const librarySearch = useLibraryStore((state) => state.librarySearch)
  const setLibrarySearch = useLibraryStore((state) => state.setLibrarySearch)

  return (
    <div className="px-2 pt-0.5">
      <div className="flex items-center justify-between">
        <div className="relative flex h-9 items-center">
          <motion.input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            ref={inputRef}
            variants={librarySearhInputVariants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            placeholder="Search in Your Library"
            className={cn(
              "test-input h-8 w-full rounded bg-accent pl-8 text-[13px] font-medium leading-none text-secondary outline-none placeholder:text-tertiary",
              !isOpen && "pointer-events-none",
              librarySearch.length > 0 && "pr-8"
            )}
            value={librarySearch}
            onChange={(e) => {
              setLibrarySearch(e.target.value)
            }}
            onBlur={() => {
              if (librarySearch.length === 0) {
                setIsOpen(false)
              } else {
              }
            }}
            tabIndex={!isOpen ? -1 : undefined}
          />
          <Tooltip content="Search in Your Library">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-0.5 text-tertiary hover:text-primary",
                isOpen && "pointer-events-none"
              )}
              onClick={() => {
                setIsOpen(true)
                inputRef.current?.focus()
              }}
              tabIndex={isOpen ? -1 : undefined}
            >
              <SearchIcon className="size-5" />
            </Button>
          </Tooltip>
          <Button
            variant="none"
            size="icon"
            type="reset"
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => {
              setLibrarySearch("")
              inputRef.current?.focus()
            }}
            className={cn(
              "absolute right-0 top-0.5 size-8 rounded text-tertiary transition hover:text-secondary",
              librarySearch.length > 0 ? "visible" : "invisible"
            )}
          >
            <XIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LibrarySearchBar
