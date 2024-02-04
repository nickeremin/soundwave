import React from "react"
import { ClerkLoaded as Loaded, ClerkLoading as Loading } from "@clerk/nextjs"

interface ClerkLoadedProps {
  children?: React.ReactNode
  fallbackComponent?: React.ReactNode
}

function ClerkLoaded({ children, fallbackComponent }: ClerkLoadedProps) {
  return (
    <>
      <Loading>{fallbackComponent}</Loading>
      <Loaded>{children}</Loaded>
    </>
  )
}

export default ClerkLoaded
