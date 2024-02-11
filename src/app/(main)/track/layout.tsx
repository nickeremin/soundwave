import React from "react"
import axios, { AxiosRequestConfig } from "axios"

import MainFooter from "@/widgets/layout/footers/main-footer"
import MainHeader from "@/widgets/layout/headers/main-header"
import TrackContextProvider from "@/widgets/track/track-context-provider"
import { env } from "@/shared/components/env.mjs"

interface TrackLayoutProps {
  children: React.ReactNode
}

async function TrackLayout({ children }: TrackLayoutProps) {
  return (
    <div className="">
      <MainHeader />
      <TrackContextProvider>
        <main className="relative">{children}</main>
        <MainFooter />
      </TrackContextProvider>
    </div>
  )
}

export default TrackLayout
