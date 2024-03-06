"use client"

import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"

import { cn } from "@/shared/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 8, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded bg-muted px-2 py-1 text-sm text-primary shadow-image-sm animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

interface TooltipProps
  extends Omit<TooltipPrimitive.TooltipContentProps, "content"> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  isVisible?: boolean
  content?: React.ReactNode
  children?: React.ReactNode
}

function Tooltip({
  open,
  onOpenChange,
  children,
  content,
  ...props
}: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      defaultOpen={false}
    >
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent {...props}>{content}</TooltipContent>
    </TooltipPrimitive.Root>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
