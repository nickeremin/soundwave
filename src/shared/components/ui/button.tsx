import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
  `inline-flex items-center justify-center font-medium transition-all select-none outline-none 
  disabled:bg-muted disabled:ring-1 disabled:ring-themed-border disabled:text-muted-foreground disabled:cursor-not-allowed`,
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "ring-1 ring-themed-border hover:ring-themed-border-hover bg-background-100 hover:bg-accent text-primary",
        secondary: "bg-accent text-accent-foreground hover:bg-muted",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive: "bg-red text-gray-light hover:bg-red/80",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-blue text-gray-light hover:bg-blue/80 ",
        empty: "",
      },
      size: {
        default: "h-9 px-4 rounded-md text-sm",
        sm: "h-8 rounded-md px-2 text-xs",
        lg: "h-12 rounded-lg px-6 text-base",
        xl: "h-14 rounded-2xl px-8 text-base",
        icon: "size-9 rounded-md",
        empty: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        data-shadcnui-button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
