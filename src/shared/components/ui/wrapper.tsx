import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const wrapperVariants = cva("", {
  variants: {
    variant: {
      default: "max-w-full w-[--content-page-width-with-margin] mx-auto",
      header: "sticky top-0 z-50 flex w-full items-center bg-background-100/80",
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
Wrapper.displayName = "Wrapper"

export { Wrapper, wrapperVariants }
