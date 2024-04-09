"use client"

import React from "react"
import { CheckIcon } from "lucide-react"
import { useFormContext, useWatch } from "react-hook-form"

import { InitialInputs } from "@/shared/types/signup"
import { Button } from "@/shared/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group"
import { subscriptionPlans } from "@/shared/constants/auth"
import { cn } from "@/shared/lib/utils"

import { useSignUpContext } from "./signup-context-provider"

function SignUpInitialDataStep() {
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
    <div className="flex w-full max-w-[456px] flex-col items-center pt-12">
      <div className="flex w-full flex-col items-center gap-7">
        <h1 className="text-[32px] font-bold sm:text-[40px]">
          Create&nbsp;Your&nbsp;Account
        </h1>

        <div className="flex w-full flex-col">
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel className="text-sm text-tertiary">Plan Type</FormLabel>
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
                                <CheckIcon className="size-3 text-white" />
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

            <div className="flex flex-col gap-4 pt-6">
              {isSubscriptionPlanSelected && (
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm text-tertiary">
                        Your Name
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
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpInitialDataStep
