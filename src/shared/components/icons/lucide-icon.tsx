import { icons, type LucideProps } from "lucide-react"

import { cn } from "@/shared/lib/utils"

interface LucideIconProps extends LucideProps {
  name: keyof typeof icons
}

function LucideIcon({ name, className, ...props }: LucideIconProps) {
  const Icon = icons[name]

  return (
    <Icon
      strokeWidth={1.5}
      className={cn("size-5", className)}
      aria-hidden="true"
      {...props}
    />
  )
}

export default LucideIcon
