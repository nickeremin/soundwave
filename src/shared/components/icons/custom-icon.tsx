import { cn } from "@/shared/lib/utils"

import { Icons, type IconProps } from "./icons"

interface CustomIconProps extends IconProps {
  name: keyof typeof Icons
}

function CustomIcon({ name, className, ...props }: CustomIconProps) {
  const Icon = Icons[name]

  return (
    <Icon className={cn("size-5", className)} {...props} aria-hidden="true" />
  )
}

export default CustomIcon
