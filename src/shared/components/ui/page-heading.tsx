import { cva, VariantProps } from "class-variance-authority"

// import { Balancer } from "react-wrap-balancer"

import { cn } from "@/shared/lib/utils"

const headingVariants = cva("!tracking-tighter !leading-tight", {
  variants: {
    variant: {
      gradient:
        "text-transparent bg-clip-text bg-gradient-to-b from-primary/85 to-primary",
    },
    size: {
      default: "text-[32px]",
      logo: "text-[24px] leading-none",
      xs: "text-[32px] sm:text-[36px]",
      sm: "text-[36px] sm:text-[40px] ",
      md: "text-[32px] sm:text-[52px] ",
      lg: "text-[32px] sm:text-[60px] ",
      xl: "text-[32px] sm:text-[56px] lg:text-[72px]",
      xxl: "text-[40px] sm:text-[64px] lg:text-[80px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface PageHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

function PageHeading({
  className,
  variant,
  size,
  as: Comp = "h1",
  ...props
}: PageHeadingProps) {
  return (
    <Comp
      className={cn(headingVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { PageHeading }
