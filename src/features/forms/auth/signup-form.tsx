"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, MotionConfig } from "framer-motion"
import { useForm, useFormContext, useWatch } from "react-hook-form"

import {
  EmailInputs,
  InitialInputs,
  SignUpContextData,
  SignUpStep,
} from "@/shared/types/signup"
import { SubscriptionPlan } from "@/shared/types/user"
import {
  AuthHeading,
  ContinueAuthWith,
  PrivacyAndTermsLinks,
  SignUpContextProvider,
  useSignUpContext,
  VerifyEmail,
} from "@/entities/auth"
import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { catchClerkError, cn } from "@/shared/lib/utils"
import {
  initialSignUpDataSchema,
  verifyEmailSchema,
} from "@/shared/lib/validations/auth"

import { OAuthSignUpButtons } from "./oauth"

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
        className="flex min-h-[85vh] flex-col justify-between gap-8 px-6"
      >
        <Form {...initialForm}>
          <div className="flex flex-col items-center">
            {step === "initial_data" && <InitialDataStep />}
            {step === "choose_signup_method" && <ChooseSignUpMethodStep />}
            {step === "email_signup" && <EmailSignUpStep />}
          </div>
        </Form>

        {!isEmailVerifying && <PrivacyAndTermsLinks />}
      </motion.div>
    </MotionConfig>
  )
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    title: "Хобби",
    description: "Я работаю над личными проектами.",
    value: "hobby",
  },
  {
    title: "Про",
    description: "Я работаю над коммерческими проектами.",
    value: "pro",
  },
]

function InitialDataStep() {
  const { setStep } = useSignUpContext()

  const form = useFormContext<InitialInputs>()

  const { subscriptionPlan } = useWatch({
    control: form.control,
  })

  const isSubscriptionPlanSelected = !!subscriptionPlan

  function onSubmit() {
    setStep("choose_signup_method")
  }

  return (
    <div className="flex w-full max-w-[456px] flex-col items-center pt-28">
      <div className="flex w-full flex-col items-center gap-7">
        <AuthHeading>Создайте Аккаунт Timebuilder</AuthHeading>

        <div className="flex w-full flex-col">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel className="text-sm text-tertiary">
                План подписки
              </FormLabel>
              <FormField
                control={form.control}
                name="subscriptionPlan"
                render={({ field }) => (
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-3"
                    >
                      {subscriptionPlans.map((plan, i) => (
                        <div key={i}>
                          <RadioGroupItem
                            value={plan.value}
                            id={plan.value}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={plan.value}
                            className={cn(
                              "flex items-center justify-between rounded-md border p-3 transition hover:cursor-pointer hover:bg-muted",
                              field.value === plan.value &&
                                "border-blue/30 bg-blue/10 hover:bg-blue/10"
                            )}
                          >
                            <div className="flex flex-col gap-1 text-sm">
                              <p className="font-medium">{plan.title}</p>
                              <p className="text-tertiary">
                                {plan.description}
                              </p>
                            </div>
                            <span
                              className={cn(
                                "flex size-4 items-center justify-center rounded-full ring-1 transition",
                                field.value === plan.value
                                  ? "bg-blue ring-blue"
                                  : "ring-border"
                              )}
                            >
                              {field.value === plan.value && (
                                <LucideIcon
                                  name="Check"
                                  strokeWidth={2}
                                  className="size-3 text-white"
                                />
                              )}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </FormItem>

            <div className="flex flex-col gap-4 pt-10">
              {isSubscriptionPlanSelected && (
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-tertiary">
                        Имя пользователя
                      </FormLabel>
                      <FormControl>
                        <Input
                          autoFocus
                          type="text"
                          maxLength={32}
                          className="h-14 rounded-2xl"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              )}

              <Button
                type="submit"
                disabled={!form.formState.isValid}
                size="xl"
              >
                Продолжить
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function ChooseSignUpMethodStep() {
  const { setStep } = useSignUpContext()

  const initialForm = useFormContext<InitialInputs>()

  return (
    <div className="flex w-full max-w-[456px] flex-col items-center pt-28">
      <div className="flex w-full flex-col items-center gap-7">
        <AuthHeading>Выберите Способ Создать&nbsp;Аккаунт</AuthHeading>

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
            <LucideIcon name="Mail" />
            Продолжить по Почте
          </Button>
        </div>
      </div>
    </div>
  )
}

function EmailSignUpStep() {
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
        <VerifyEmail email={emailForm.getValues("email")} />
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-[456px] flex-col items-center pt-28">
      <div className="flex w-full flex-col items-center gap-7">
        <AuthHeading>Зарегистрируйтесь в&nbsp;Timebuilder</AuthHeading>

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
                          placeholder="Электронная Почта"
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
                  Продолжить по Почте
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
              <LucideIcon name="MoveLeft" />
              Другие варианты регистрации
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
