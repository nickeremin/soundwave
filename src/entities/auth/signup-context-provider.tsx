"use client"

import React from "react"

import { SignUpContextData, SignUpStep } from "@/shared/types/signup"

const SignUpContext = React.createContext<SignUpContextData | null>(null)

function useSignUpContext() {
  const context = React.useContext(SignUpContext)

  if (!context) {
    throw new Error("Use useSignUpContext in SingUpContextProvider boundary!")
  }

  return context
}

interface SignUpContextProviderProps {
  children: React.ReactNode
}

function SignUpContextProvider({ children }: SignUpContextProviderProps) {
  const [step, setStep] = React.useState<SignUpStep>("initial_data")
  const [isEmailVerifying, setIsEmailVerifying] = React.useState(false)

  return (
    <SignUpContext.Provider
      value={{ step, setStep, isEmailVerifying, setIsEmailVerifying }}
    >
      {children}
    </SignUpContext.Provider>
  )
}

export { SignUpContextProvider, useSignUpContext }
