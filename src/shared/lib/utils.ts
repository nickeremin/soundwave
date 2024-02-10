import { isClerkAPIResponseError } from "@clerk/nextjs"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

import { Image } from "../types/image"
import { imageSchema } from "./validations/image"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(ms: number | undefined) {
  console.log(ms)
  return format(new Date(ms ?? 0), "m:ss")
}

export function getImageUrl(images: Image[] | undefined) {
  const fallbackUrl = ""
  const image = images?.[1]
  return image ? image.url : fallbackUrl
}

export function catchError(error: unknown) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (error instanceof Error) {
    return toast(error.message)
  } else {
    return toast("Что-то пошло не так. Пожалуйста, попробуйте еще раз.")
  }
}

export function catchClerkError(error: unknown) {
  const unknownError = "Что-то пошло не так. Пожалуйста, попробуйте еще раз."

  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => {
      return issue.message
    })
    return toast(errors.join("\n"))
  } else if (isClerkAPIResponseError(error)) {
    return toast.error(error.errors[0]?.longMessage ?? unknownError)
  } else {
    return toast.error(unknownError)
  }
}
