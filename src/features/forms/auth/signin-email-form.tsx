"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignIn } from "@clerk/nextjs"
import { type EmailLinkFactor, type SignInFirstFactor } from "@clerk/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import {
  AuthHeading,
  CreateAccountLinkForMobiles,
  VerifyEmail,
} from "@/entities/auth"
import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { catchClerkError } from "@/shared/lib/utils"
import { checkEmailSchema } from "@/shared/lib/validations/auth"

type Inputs = z.infer<typeof checkEmailSchema>

function SignInEmailForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { isLoaded, signIn, setActive } = useSignIn()
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [isPending, startTransition] = React.useTransition()

  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(input: Inputs) {
    if (!isLoaded) return

    const { startEmailLinkFlow } = signIn.createEmailLinkFlow()

    startTransition(async () => {
      try {
        // Start the sign in flow, by collecting
        // the user's email address.
        const { supportedFirstFactors } = await signIn.create({
          identifier: input.email,
        })

        // Filter the returned array to find the 'email_link' entry
        const isEmailLinkFactor = (
          factor: SignInFirstFactor
        ): factor is EmailLinkFactor => {
          return factor.strategy === "email_link"
        }

        const emailLinkFactor = supportedFirstFactors?.find(isEmailLinkFactor)

        if (emailLinkFactor) setIsVerifying(true)

        // Start the magic link flow.
        // Pass your app URL that users will be navigated
        // res will hold the updated sign in object.
        const res = await startEmailLinkFlow({
          /* eslint-disable */
          emailAddressId: emailLinkFactor?.emailAddressId!,
          redirectUrl: `http://localhost:3000/verification?mode=signin`,
        })

        if (res.status === "complete") {
          // Sign in is complete, we have a session.
          // Navigate to the after sign in URL.
          const redirect = searchParams.get("redirect")

          setActive({
            session: res.createdSessionId,
            beforeEmit: () => router.push(redirect ?? "/"),
          })
          return
        }
      } catch (error) {
        setIsVerifying(false)
        catchClerkError(error)
      }
    })
  }

  if (isVerifying) {
    return (
      <div className="p-6 pb-32">
        <VerifyEmail email={form.getValues("email")} />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <div className="flex w-full max-w-[456px] flex-col items-center">
          <div className="flex w-full flex-col items-center gap-7">
            <AuthHeading>Log in to SoundWave</AuthHeading>

            <div className="flex w-full flex-col xs:max-w-[320px]">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-3">
                    <FormField
                      control={form.control}
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
                        <LucideIcon name="Loader" className="animate-spin" />
                      ) : (
                        <LucideIcon name="Mail" />
                      )}
                      Continue with Email
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="mt-6 flex flex-col items-center">
                <span className="link-hover text-link">
                  <Link
                    href={{
                      pathname: "/signin",
                      query: searchParams.toString(),
                    }}
                    className="flex items-center gap-1"
                  >
                    <LucideIcon name="MoveLeft" />
                    Other Login Options
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {!isVerifying && <CreateAccountLinkForMobiles />}
    </>
  )
}

export default SignInEmailForm
