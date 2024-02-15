import React from "react"

import MainHeader from "@/widgets/layout/headers/main-header"

interface TrackLayoutProps {
  children: React.ReactNode
}

async function TrackLayout({ children }: TrackLayoutProps) {
  return (
    <div className="">
      <MainHeader />
      {children}
    </div>
  )
}

export default TrackLayout
