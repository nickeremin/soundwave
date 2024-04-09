"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Tooltip } from "@/shared/components/ui/tooltip"

function BackForwardButtons() {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Tooltip side="bottom" content="Go back">
        <Button
          onClick={() => {
            router.back()
          }}
          variant="none"
          size="icon"
          className="rounded-full bg-black/70 text-secondary hover:bg-black hover:text-primary"
        >
          <ChevronLeftIcon className="mr-0.5 size-7" />
        </Button>
      </Tooltip>
      <Tooltip side="bottom" content="Go forward">
        <Button
          onClick={() => {
            router.forward()
          }}
          variant="none"
          size="icon"
          className="rounded-full bg-black/70 text-secondary hover:bg-black hover:text-primary"
        >
          <ChevronRightIcon className="ml-0.5 size-7" />
        </Button>
      </Tooltip>
    </div>
  )
}

export default BackForwardButtons
