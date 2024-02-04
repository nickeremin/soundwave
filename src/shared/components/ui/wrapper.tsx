import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const wrapperVariants = cva("mx-auto px-6", {
  variants: {
    variant: {
      default: "max-w-full w-[--content-page-width-with-margin]",
      header: "w-[--page-width-with-margin] flex items-center h-16",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface WrapperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wrapperVariants> {
  as?: React.ElementType
}

const Wrapper = React.forwardRef<HTMLDivElement, WrapperProps>(
  ({ className, variant, as: Comp = "div", ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(wrapperVariants({ variant }), className)}
        {...props}
      />
    )
  }
)
Wrapper.displayName = "Shell"

export { Wrapper, wrapperVariants }
