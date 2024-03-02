import * as React from "react"

import { cn } from "@/shared/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        data-shadcnui-input-wrapper
        className={cn(
          "flex min-h-[80px] items-center rounded bg-background-100",
          className
        )}
      >
        <textarea
          className={cn(
            "flex size-full rounded-[inherit] bg-inherit px-3 py-2 outline-none placeholder:text-muted-foreground",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
