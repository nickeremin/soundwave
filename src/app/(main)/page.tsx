import React from "react"
import { type Metadata } from "next"

import MainHeader from "@/widgets/layout/headers/main-header"

export const metadata: Metadata = {
  title: "Home | Soundwave",
}

function HomePage() {
  return (
    <div>
      <MainHeader />
    </div>
  )
}

export default HomePage
