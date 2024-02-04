"use client"

import React from "react"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { motion, type Variants } from "framer-motion"

import { cn } from "@/shared/lib/utils"

import { AuthorizedMenuContent, UnauthorizedMenuContent } from "./menu-content"

interface MenuContextData {
  isOpen: boolean
  toggleOpen: () => void
}

export const MenuContext = React.createContext<MenuContextData>({
  isOpen: false,
  toggleOpen: () => {},
})

const menuVariants: Variants = {
  closed: {
    visibility: "hidden",
    transition: {
      visibility: {
        duration: 0,
        delay: 0.56,
      },
    },
  },
  open: {
    visibility: "visible",
    transition: {
      visibility: {
        duration: 0,
      },
    },
  },
}

interface MobileMenuHeaderWrapperProps extends MenuContextData {
  backgroundColor: string
  scrollTop?: boolean
  className?: string
  children?: React.ReactNode
}

function MobileMenuHeaderWrapper({
  isOpen,
  toggleOpen,
  backgroundColor,
  scrollTop,
  className,
  children,
}: MobileMenuHeaderWrapperProps) {
  const wrapperVariants = React.useMemo(
    () =>
      ({
        closed: {
          background: backgroundColor,
          height: "64px",
          transition: {
            background: {
              duration: 0.44,
              delay: 0.2,
              ease: [0.52, 0.16, 0.24, 1],
            },
            height: {
              duration: 0.56,
              ease: [0.52, 0.16, 0.24, 1],
            },
          },
        },
        open: {
          background: "var(--gray-color-600-hsl)",
          height: "100vh",
          transition: {
            background: {
              duration: 0.36,
              ease: [0.32, 0.08, 0.24, 1],
            },
            height: {
              duration: 0.56,
              ease: [0.52, 0.16, 0.24, 1],
            },
          },
        },
      }) satisfies Variants,
    [backgroundColor]
  )

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  React.useEffect(() => {
    if (isOpen && scrollTop) {
      window.scrollTo({ top: 0 })
    }
  }, [isOpen, scrollTop])

  return (
    <MenuContext.Provider value={{ isOpen, toggleOpen }}>
      <motion.div
        variants={wrapperVariants}
        initial={"closed"}
        animate={isOpen ? "open" : "closed"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex overflow-hidden shadow-border-b",
          className
        )}
      >
        {children}
        <motion.nav
          variants={menuVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          className="absolute top-16 w-full px-6"
        >
          <SignedIn>
            <AuthorizedMenuContent />
          </SignedIn>
          <SignedOut>
            <UnauthorizedMenuContent />
          </SignedOut>
        </motion.nav>
      </motion.div>
    </MenuContext.Provider>
  )
}

export default MobileMenuHeaderWrapper
