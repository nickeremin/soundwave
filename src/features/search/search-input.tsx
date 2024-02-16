"use client"

import * as React from "react"
import { useDebounceValue } from "usehooks-ts"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

import { useSearchContext } from "./search-context"

function SearchInput({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const { search, setSearch } = useSearchContext()
  const [debouncedValue] = useDebounceValue(search, 500)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  return (
    <div
      data-shadcnui-input-wrapper
      className={cn(
        "flex h-12 w-[400px] items-center rounded-2xl bg-background",
        className
      )}
      {...props}
    >
      <div className="-mr-3 flex h-full shrink-0 flex-col items-center justify-center bg-transparent px-3 text-muted-foreground">
        {search !== debouncedValue ? (
          <LucideIcon name="Loader" className="size-6 animate-spin" />
        ) : (
          <LucideIcon name="Search" className="size-6" />
        )}
      </div>
      <input
        autoFocus
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        type="search"
        placeholder="What do you want to listen to?"
        value={search ?? ""}
        onChange={(e) => {
          setSearch(e.target.value)
        }}
        className="inline-flex size-full bg-transparent px-3 text-base placeholder:text-muted-foreground focus-visible:outline-none"
      />
      {search && search.length > 0 && (
        <span className="-ml-3 flex flex-col items-center justify-center pr-1">
          <Button
            variant="none"
            size="icon"
            type="reset"
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => {
              setSearch("")
              inputRef.current?.focus()
            }}
            className="size-7 shrink-0 rounded-full text-tertiary transition hover:text-secondary"
          >
            <LucideIcon name="XCircle" />
          </Button>
        </span>
      )}
    </div>
  )
}

export default SearchInput
