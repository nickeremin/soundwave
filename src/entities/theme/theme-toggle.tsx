"use client"

import React from "react"
import { useTheme } from "next-themes"

import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"

function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      aria-label="Переключить тему сайта"
      variant="ghost"
      size="icon"
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light")
      }}
    >
      <LucideIcon
        name="Sun"
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <LucideIcon
        name="Moon"
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
    </Button>
  )
}

export default ThemeToggle
