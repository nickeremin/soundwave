import { isClerkAPIResponseError } from "@clerk/nextjs"
import { isAxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { FastAverageColor } from "fast-average-color"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import * as z from "zod"

import { Image } from "../types/image"
import { imageSchema } from "./validations/image"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeDuration(ms: number | undefined) {
  return format(new Date(ms ?? 0), "m:ss")
}

export function getImageUrl(images: Image[] | undefined) {
  const fallbackUrl = "/"
  const image = images?.[1]
  return image?.url
}

export function getAverageColor(image: HTMLImageElement) {
  const fac = new FastAverageColor()
  const color = fac.getColor(image)
  return color
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

export function catchAxiosError(error: unknown) {
  if (isAxiosError(error)) {
    console.log({
      message: error.message,
      status: error.response?.status,
    })
  } else if (error instanceof z.ZodError) {
    console.log(error)
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
