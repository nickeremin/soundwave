import React from "react"
import Link from "next/link"

function CreateAccountLinkForMobiles() {
  return (
    <div className="flex h-[100px] items-center justify-center border-t bg-background p-8 lg:hidden">
      <Link href="/signup" className="link-hover whitespace-nowrap text-link">
        Don&apos;t have an account? Sign Up
      </Link>
    </div>
  )
}

export default CreateAccountLinkForMobiles
