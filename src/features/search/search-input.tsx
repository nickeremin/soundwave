"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LoaderIcon, SearchIcon, XCircleIcon } from "lucide-react"
import { useDebounceValue } from "usehooks-ts"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function SearchInput({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLDivElement>) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [search, setSearch] = React.useState("")
  const [debouncedValue] = useDebounceValue(search, 500)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  React.useEffect(() => {
    const query = searchParams.get("query")
    if (query) setSearch(query)
  }, [])

  React.useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    if (search) newSearchParams.set("query", search)
    else newSearchParams.delete("query")
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }, [debouncedValue])

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
          <LoaderIcon className="size-6 animate-spin" />
        ) : (
          <SearchIcon className="size-6" />
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
            <XCircleIcon className="size-5" />
          </Button>
        </span>
      )}
    </div>
  )
}

export default SearchInput
