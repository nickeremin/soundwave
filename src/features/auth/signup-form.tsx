"use client"

import * as React from "react"
import { useSignUpContext } from "@/providers/signup-context-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, MotionConfig } from "framer-motion"
import { useForm } from "react-hook-form"

import { InitialInputs } from "@/shared/types/signup"
import PrivacyAndTermsLinks from "@/entities/auth/privacy-and-terms-links"
import SignUpChooseMethodStep from "@/entities/auth/signup-choose-method-step"
import SignUpEmailStep from "@/entities/auth/signup-email-step"
import SignUpInitialDataStep from "@/entities/auth/signup-initial-data-step"
import { Form } from "@/shared/components/ui/form"
import { initialSignUpDataSchema } from "@/shared/lib/validations/auth"

function SignUpForm() {
  const { step, isEmailVerifying } = useSignUpContext()

  const initialForm = useForm<InitialInputs>({
    resolver: zodResolver(initialSignUpDataSchema),
    defaultValues: {
      username: "",
      subscriptionPlan: undefined,
    },
  })

  return (
    <MotionConfig
      transition={{ duration: 0.5, ease: [0.52, 0.16, 0.52, 0.84] }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-screen flex-col justify-between px-6"
      >
        <Form {...initialForm}>
          <div className="flex flex-1 flex-col items-center justify-center">
            {step === "initial_data" && <SignUpInitialDataStep />}
            {step === "choose_signup_method" && <SignUpChooseMethodStep />}
            {step === "email_signup" && <SignUpEmailStep />}
          </div>
        </Form>

        {!isEmailVerifying && <PrivacyAndTermsLinks />}
      </motion.div>
    </MotionConfig>
  )
}

export default SignUpForm
