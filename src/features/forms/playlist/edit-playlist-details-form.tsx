"use client"

import React from "react"
import { useParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  useDropzone,
  type FileRejection,
  type FileWithPath,
} from "react-dropzone"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useEditPlaylistDetailsContext } from "@/widgets/providers/edit-playlist-details-provider"
import { LucideIcon } from "@/shared/components/icons"
import { Button } from "@/shared/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { Textarea } from "@/shared/components/ui/textarea"
import { cn } from "@/shared/lib/utils"
import { editPlaylistDetailsSchema } from "@/shared/lib/validations/playlist"
import { trpc } from "@/shared/trpc/client"

// Constants for react-dropzone
const MAX_SIZE = 1024 * 1024 * 12
const MAX_FILES = 1

type Inputs = z.infer<typeof editPlaylistDetailsSchema>

function EditPlaylistDetailsForm({ playlistId }: { playlistId: string }) {
  // const { playlistId } = useEditPlaylistDetailsContext()

  const { data: playlist } = trpc.playlistRouter.getPlaylist.useQuery({
    playlistId,
  })
  const { mutateAsync: updatePlaylist } =
    trpc.playlistRouter.updatePlaylist.useMutation()

  const form = useForm<Inputs>({
    resolver: zodResolver(editPlaylistDetailsSchema),
    values: {
      playlistId,
      name: playlist?.name ?? "",
      description: playlist?.description ?? "",
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: MAX_FILES,
    maxSize: MAX_SIZE,
    multiple: false,
    accept: {
      "image/*": [],
    },
    onDrop,
  })

  const [showUpdateImageDialog, setShowUpdateImageDialog] =
    React.useState(false)
  const [imgSrc, setImgSrc] = React.useState("")
  const imgRef = React.useRef<HTMLImageElement>(null)
  const [isPending, startTransition] = React.useTransition()

  function onDrop(
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[]
  ) {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0]!
      // setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener("load", () => {
        setImgSrc(reader.result?.toString() || "")
        setShowUpdateImageDialog(true)
      })
      reader.readAsDataURL(file)
    }

    if (rejectedFiles.length > 0) {
      rejectedFiles.forEach(({ errors }) => {
        if (errors[0]?.code === "file-too-large") {
          // toast.error(
          //   `Файл слишком большой. Максимальный размер ${formatBytes(
          //     MAX_SIZE
          //   )}.`
          // )
          return
        }
        // errors[0]?.message && toast.error(errors[0].message)
      })
    }
  }

  function onSubmit(input: Inputs) {
    startTransition(async () => {
      try {
        await updatePlaylist(input)
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-[496px] flex-col gap-4">
          <div className="flex gap-4">
            <div
              data-shadcnui-button
              {...getRootProps({
                className:
                  "relative size-[200px] cursor-pointer rounded outline-none bg-muted/50 shadow-image-sm",
              })}
            >
              <input {...getInputProps()} />
              {imgSrc ? (
                <img
                  ref={imgRef}
                  src={imgSrc}
                  // onLoad={onImageLoad}
                  className="absolute size-full rounded object-cover object-center"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center">
                  <LucideIcon name="Music" className="size-16 text-tertiary" />
                </div>
              )}
            </div>
            <div className="flex w-[280px] flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="bg-muted/50"
                        placeholder="Add a playlist name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="h-36 resize-none bg-muted/50"
                        placeholder="Add an optional description"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-fit items-center justify-between gap-4">
            <p className="text-[13px] font-medium text-primary">
              By proceeding, you agree to give SoundWave access to the image you
              choose to upload.
            </p>
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-24 shrink-0 gap-3 rounded-full text-base font-bold"
            >
              {isPending ? (
                <LucideIcon name="Loader" className="animate-spin" />
              ) : (
                "Save"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default EditPlaylistDetailsForm
