import React from "react"
import { cookies } from "next/headers"

import Timer from "@/features/timer"

function page() {
  const cookieStore = cookies()
  const value = Number(cookieStore.get("seconds")?.value)
  return (
    <div className="flex min-h-screen max-w-[100wv] flex-col items-center justify-center">
      <Timer value={value} />
    </div>
  )
}

export default page
