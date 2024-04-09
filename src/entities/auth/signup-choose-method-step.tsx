"use client"

import React from "react"
import { MailIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { InitialInputs } from "@/shared/types/signup"
import { OAuthSignUpButtons } from "@/features/auth/oauth"
import { Button } from "@/shared/components/ui/button"

import { useSignUpContext } from "../../providers/signup-context-provider"
import ContinueAuthWith from "./continue-auth-with"

function SignUpChooseMethodStep() {
  const { setStep } = useSignUpContext()

  const initialForm = useFormContext<InitialInputs>()

  return (
    <div className="flex w-full max-w-[456px] flex-col items-center pt-28">
      <div className="flex w-full flex-col items-center gap-7">
        <h1 className="text-[32px] font-bold sm:text-[40px]">
          Connect Your Provider
        </h1>

        <div className="flex w-full flex-col xs:max-w-[320px]">
          <OAuthSignUpButtons {...initialForm.getValues()} />

          <ContinueAuthWith />

          <Button
            variant="outline"
            className="w-full gap-2"
            size="xl"
            onClick={() => {
              setStep("email_signup")
            }}
          >
            <MailIcon />
            Continue with Email
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SignUpChooseMethodStep
