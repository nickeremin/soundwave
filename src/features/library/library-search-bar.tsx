"use client"

import React from "react"
import { useBoundStore } from "@/providers/bound-store-provider"
import { motion, type Variants } from "framer-motion"
import { SearchIcon, XIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"
import { cn } from "@/shared/lib/utils"

const variants: Variants = {
  closed: {
    width: "32px",
    opacity: 0,
  },
  open: {
    width: "180px",
    opacity: 1,
  },
}

function LibrarySearchBar() {
  // const [sortBy, setSortBy] = React.useState("recents")
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const search = useBoundStore((state) => state.search)
  const setSearch = useBoundStore((state) => state.setSearch)

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
            variants={variants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            placeholder="Search in Your Library"
            className={cn(
              "test-input h-8 rounded bg-accent pl-8 text-[13px] font-medium leading-none text-secondary outline-none placeholder:text-tertiary",
              !isOpen && "pointer-events-none",
              search.length > 0 && "pr-8"
            )}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            onBlur={() => {
              if (search.length === 0) {
                setIsOpen(false)
              } else {
              }
            }}
            tabIndex={!isOpen ? -1 : undefined}
          />
          <Tooltip
            align="start"
            alignOffset={-16}
            content="Search in Your Library"
          >
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
              setSearch("")
              inputRef.current?.focus()
            }}
            className={cn(
              "absolute right-0 top-0.5 size-8 rounded text-tertiary transition hover:text-secondary",
              search.length > 0 ? "visible" : "invisible"
            )}
          >
            <XIcon className="size-4" />
          </Button>
        </div>

        {/* <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="shrink-1 min-w-0 truncate">
              <SelectValue placeholder="Recents" className="truncate" />
            </SelectTrigger>
            <SelectContent align="end" className="">
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                {sortTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className={cn(sortBy === type.value && "text-pink")}
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
      </div>
    </div>
  )
}

export default LibrarySearchBar
