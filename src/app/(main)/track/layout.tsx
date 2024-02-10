import React from "react"
import axios, { AxiosRequestConfig } from "axios"

import MainHeader from "@/widgets/layout/headers/main-header"
import { env } from "@/shared/components/env.mjs"

interface TrackLayoutProps {
  children: React.ReactNode
}

async function TrackLayout({ children }: TrackLayoutProps) {
  return (
    <div className="">
      <MainHeader />
      <main className="relative">{children}</main>
    </div>
  )
}

export default TrackLayout
