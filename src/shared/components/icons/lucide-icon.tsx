import dynamic from "next/dynamic"
import { type LucideProps } from "lucide-react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

import { cn } from "@/shared/lib/utils"

interface LucideIconProps extends LucideProps {
  name: keyof typeof dynamicIconImports
}

function LucideIcon({ name, className, ...props }: LucideIconProps) {
  const Icon = dynamic(dynamicIconImports[name])

  return (
    <Icon className={cn("size-5", className)} aria-hidden="true" {...props} />
  )
}

export default LucideIcon
