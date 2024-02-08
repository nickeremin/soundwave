import React from "react"

import { cn } from "@/shared/lib/utils"

type GradientType = {
  [key: string]: {
    animation: string
    reverseAnimation: string
    startColor: string
    endColor: string
  }
}

const gradientTypes: GradientType = {
  start: {
    animation: "animated-gradient-text-fade-blue",
    reverseAnimation: "animated-gradient-text-fade-blue-reverse",
    startColor: "#007cf0",
    endColor: "#00dfd8",
  },
  center: {
    animation: "animated-gradient-text-fade-purple",
    reverseAnimation: "animated-gradient-text-fade-purple-reverse",
    startColor: "#7928ca",
    endColor: "#ff0080",
  },
  end: {
    animation: "animated-gradient-text-fade-orange",
    reverseAnimation: "animated-gradient-text-fade-orange-reverse",
    startColor: "#ff4d4d",
    endColor: "#f9cb28",
  },
}

interface GradientTextProps {
  type: "start" | "center" | "end"
  text: string
}

function GradientText({ type, text }: GradientTextProps) {
  const gradient = gradientTypes[type]

  return (
    <span className="relative block select-none">
      <span
        className={cn(
          "absolute inset-0 z-0 bg-gradient-to-b from-primary/80 to-primary bg-clip-text px-[0.05em] text-transparent",
          gradient?.reverseAnimation
        )}
      >
        {text}
      </span>
      <span
        className={cn(
          "relative z-10 block bg-clip-text px-[0.05em] text-transparent",
          gradient?.animation
        )}
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradient?.startColor}, ${gradient?.endColor})`,
        }}
      >
        {text}
      </span>
    </span>
  )
}

export { GradientText }
