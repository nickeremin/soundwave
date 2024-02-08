"use client"

import React from "react"
import { useRouter } from "next/navigation"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"

function BackForwardButtons() {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => {
          router.back()
        }}
        variant="none"
        size="icon"
        className="rounded-full bg-accent"
      >
        <LucideIcon
          name="ChevronLeft"
          className="mr-0.5 size-7 text-secondary"
        />
      </Button>
      <Button
        onClick={() => {
          router.forward()
        }}
        variant="none"
        size="icon"
        className="rounded-full bg-accent"
      >
        <LucideIcon
          name="ChevronRight"
          className="ml-0.5 size-7 text-secondary"
        />
      </Button>
    </div>
  )
}

export default BackForwardButtons
