import React from "react"
import Link from "next/link"

import { buttonVariants } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

function LogInSignUpButtons() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "lg",
            className: "rounded-full font-semibold",
          })
        )}
      >
        Log In
      </Link>
      <Link
        href="/signup"
        className={cn(
          buttonVariants({
            size: "lg",
            className: "rounded-full font-semibold",
          })
        )}
      >
        Sign Up
      </Link>
    </div>
  )
}

export default LogInSignUpButtons
