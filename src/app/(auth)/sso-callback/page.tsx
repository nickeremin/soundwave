import React from "react"
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs"

function SSOCallbackPage() {
  return <AuthenticateWithRedirectCallback />
}

export default SSOCallbackPage
