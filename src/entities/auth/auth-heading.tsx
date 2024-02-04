import React from "react"

import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"

interface AuthHeadingProps {
  children: React.ReactNode
  className?: string
}

function AuthHeading({ children, className }: AuthHeadingProps) {
  return (
    <PageHeading
      className={cn("text-center font-bold", className)}
      variant="gradient"
      size="sm"
    >
      {children}
    </PageHeading>
  )
}

export default AuthHeading
