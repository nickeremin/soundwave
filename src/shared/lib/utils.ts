import { isClerkAPIResponseError } from "@clerk/nextjs"
import { isAxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
import { FastAverageColor } from "fast-average-color"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"
import { v4 } from "uuid"
import * as z from "zod"

import { type AlbumObject } from "../types/album"
import { type ImageObject } from "../types/image"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAlbumType(type: string) {
  return type[0]?.toUpperCase() + type.slice(1).toLowerCase()
}

export function formatTimeDuration(ms: number | undefined) {
  return format(new Date(ms ?? 0), "m:ss")
}

export function formatReleaseDate(releaseDate: string) {
  return format(new Date(releaseDate ?? 0), "yyyy")
}

export function formatTrackDuration(duration: number) {
  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  const sDisplay =
    seconds > 0 ? (seconds < 10 ? `0${seconds}` : `${seconds}`) : ""
  const mDisplay = minutes > 0 ? `${minutes}:` : ""
  const hDisplay = hours > 0 ? `${hours}:` : ""

  return `${hDisplay}${mDisplay}${sDisplay}`
}

export function formatAlbumDuration(album: AlbumObject) {
  const duration = album.tracks.items.reduce(
    (prev, cur) => prev + cur.duration_ms,
    0
  )

  const seconds = Math.floor((duration / 1000) % 60)
  const minutes = Math.floor((duration / (1000 * 60)) % 60)
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

  if (hours > 0) {
    return `about ${hours} h ${minutes} min`
  } else {
    return `${minutes} min ${seconds} sec`
  }
}

export function getImageUrl(images: ImageObject[] | undefined) {
  const image = images?.[0]
  return image?.url
}

export function getAverageColor(image: HTMLImageElement) {
  const fac = new FastAverageColor()
  const color = fac.getColor(image)
  return color
}

export function generateId() {
  const id = v4()
  return id
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
    console.log({ ZodError: error.message })
  } else {
    return console.log(error)
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
