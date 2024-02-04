import * as React from "react"

import { cn } from "@/shared/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div
        data-shadcnui-input-wrapper
        className={cn(
          "flex h-9 items-center rounded-md bg-background-100",
          className
        )}
      >
        <input
          data-shadcnui-input
          type={type}
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className={cn(
            "flex size-full rounded-[inherit] bg-inherit px-3 outline-none placeholder:text-muted-foreground",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
