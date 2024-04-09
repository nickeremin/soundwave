"use client"

import React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderIcon, MailIcon, MoveLeftIcon } from "lucide-react"
import { Form, useForm, useFormContext } from "react-hook-form"

import { EmailInputs, InitialInputs } from "@/shared/types/signup"
import { Button } from "@/shared/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { catchClerkError } from "@/shared/lib/utils"
import { verifyEmailSchema } from "@/shared/lib/validations/auth"

import AuthVerifyEmailStep from "./auth-verify-email-step"
import { useSignUpContext } from "./signup-context-provider"

function SignUpEmailStep() {
  const { setStep, isEmailVerifying, setIsEmailVerifying } = useSignUpContext()

  const initialForm = useFormContext<InitialInputs>()
  const emailForm = useForm<EmailInputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleClick = () => {
    setStep("choose_signup_method")
    emailForm.resetField("email")
  }

  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = React.useTransition()
  const { isLoaded, signUp, setActive } = useSignUp()

  function onSubmit(input: EmailInputs) {
    if (!isLoaded) return

    const { startEmailLinkFlow } = signUp.createEmailLinkFlow()

    startTransition(async () => {
      try {
        // Start the sign up flow, by collecting the user's data
        await signUp.create({
          emailAddress: input.email,
          username: initialForm.getValues("username"),
          unsafeMetadata: {
            subscriptionPlan: initialForm.getValues("subscriptionPlan"),
          },
        })

        setIsEmailVerifying(true)

        const su = await startEmailLinkFlow({
          redirectUrl: `http://localhost:3000/verification?email=${input.email}&mode=signup`,
        })

        if (su.status === "complete") {
          // Sign up is complete, we have a session.
          // Navigate to the after sign up URL.
          const redirect = searchParams.get("redirect")

          setActive({
            session: su.createdSessionId,
            beforeEmit: () => router.push(redirect ?? "/"),
          })
          return
        }
      } catch (error) {
        setIsEmailVerifying(false)
        catchClerkError(error)
      }
    })
  }

  if (isEmailVerifying) {
    return (
      <div className="py-28">
        <AuthVerifyEmailStep email={emailForm.getValues("email")} />
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[456px] flex-col items-center pt-28">
      <div className="flex w-full flex-col items-center gap-7">
        <h1 className="text-[32px] font-bold sm:text-[40px]">
          Sign up for SoundWave
        </h1>

        <div className="flex w-full flex-col xs:max-w-[320px]">
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-3">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          autoFocus
                          type="email"
                          placeholder="Email Address"
                          className="h-14 rounded-2xl"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  size="xl"
                  className="gap-2"
                >
                  {isPending ? (
                    <LoaderIcon className="animate-spin" />
                  ) : (
                    <MailIcon />
                  )}
                  Continue with Email
                </Button>
              </div>
            </form>
          </Form>

          <div className="mt-6 flex items-center justify-center">
            <span
              onClick={handleClick}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick()
                }
              }}
              className="link-hover flex cursor-pointer items-center gap-1 text-link"
              role="link"
              tabIndex={0}
            >
              <MoveLeftIcon />
              Other Sign Up Options
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpEmailStep
