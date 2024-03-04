"use client"

import React, { KeyboardEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { HeadphonesIcon, PlusIcon } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { useLayoutStore } from "@/shared/stores/layout-store"
import { trpc } from "@/shared/trpc/client"

function UserLibrary() {
  const isCollapsed = useLayoutStore((state) => state.isCollapsed)
  const toggleIsCollapsed = useLayoutStore((state) => state.toggleIsCollapsed)
  const [isPending, startTransition] = React.useTransition()

  const { user } = useUser()
  const { mutateAsync: createPlaylist } =
    trpc.playlistRouter.createPlaylist.useMutation()
  const { data: playlists } = trpc.playlistRouter.getPlaylists.useQuery()

  /*
    1. Добавить search чтобы можно было искаить среди плэйлистов и артистов
    2. Список плэйлистов пользователя
    3. Список артистов на которых подписан
    4. Сделать так чтобы их можно было свернуть до фотографии когда меню isCollapsed
  */

  const router = useRouter()
  const listRef = React.useRef<HTMLUListElement | null>(null)
  const listItemRefs = React.useRef<(HTMLLIElement | null)[]>([])

  React.useEffect(() => {
    let currentItemIndex = -1

    function handleKeyDown(e: globalThis.KeyboardEvent) {
      if (
        e.key === "ArrowDown" &&
        currentItemIndex < listItemRefs.current.length - 1
      ) {
        currentItemIndex++
        console.log({ currentItemIndex })
        listItemRefs.current[currentItemIndex]?.focus()
      } else if (e.key === "ArrowUp" && currentItemIndex > 0) {
        currentItemIndex--
        console.log({ currentItemIndex })
        listItemRefs.current[currentItemIndex]?.focus()
      }
    }

    if (listRef.current) {
      console.log({ listItemRefs: listItemRefs.current })
      listRef.current.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("keydown", handleKeyDown)
      }
    }
  }, [])

  return (
    <div className="h-full rounded-lg bg-background-100">
      <div className="flex items-center px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center">
            <Tooltip
              content={
                isCollapsed ? "Expand Your Library" : "Collapse Your Library"
              }
              side={isCollapsed ? "right" : "top"}
            >
              <Button
                onClick={toggleIsCollapsed}
                variant="none"
                size="none"
                className="h-10 gap-3 rounded-full px-2 font-bold text-tertiary hover:text-primary"
              >
                <HeadphonesIcon className="size-6" />
                {!isCollapsed && "Your library"}
              </Button>
            </Tooltip>
          </div>

          {!isCollapsed && (
            <div className="flex items-center">
              <Tooltip content="Create playlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-tertiary hover:text-primary disabled:bg-transparent disabled:ring-0"
                  onClick={() => {
                    startTransition(async () => {
                      try {
                        await createPlaylist()
                      } catch (error) {
                        console.log(error)
                      }
                    })
                  }}
                >
                  <PlusIcon className="size-5" />
                </Button>
              </Tooltip>
            </div>
          )}
        </div>
      </div>

      <div className="px-1">
        <ul ref={listRef} role="list" tabIndex={0} className="flex flex-col">
          {playlists?.map((playlist, i) =>
            isCollapsed ? (
              <Tooltip
                side="right"
                content={
                  <div className="flex flex-col items-start font-medium">
                    <p className="line-clamp-1">{playlist.name}</p>
                    <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
                      <span>Playlist</span>
                      <span>{user?.username}</span>
                    </p>
                  </div>
                }
              >
                <li
                  key={playlist.id}
                  ref={(el) => (listItemRefs.current[i] = el)}
                  className="relative flex h-16 items-center px-2"
                  tabIndex={i + 1}
                >
                  <div
                    role="button"
                    tabIndex={-1}
                    onClick={() => router.push(`/playlist/${playlist.id}`)}
                    className="absolute inset-0 cursor-pointer"
                  />
                  <div className="size-12 rounded bg-accent shadow-image-sm">
                    {playlist.imageUrl ? (
                      <Image
                        src={playlist.imageUrl}
                        alt=""
                        width={80}
                        height={80}
                        className="size-full rounded object-cover object-center"
                      />
                    ) : null}
                  </div>
                </li>
              </Tooltip>
            ) : (
              <li
                key={playlist.id}
                ref={(el) => (listItemRefs.current[i] = el)}
                className="relative flex h-16 items-center px-2"
                tabIndex={i + 1}
              >
                <div
                  role="button"
                  tabIndex={-1}
                  onClick={() => router.push(`/playlist/${playlist.id}`)}
                  className="absolute inset-0 cursor-pointer"
                />
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded bg-accent shadow-image-sm">
                    {playlist.imageUrl ? (
                      <Image
                        src={playlist.imageUrl}
                        alt=""
                        width={80}
                        height={80}
                        className="size-full rounded object-cover object-center"
                      />
                    ) : null}
                  </div>
                  <div className="flex flex-col items-start font-medium">
                    <p className="line-clamp-1">{playlist.name}</p>
                    <p className="line-clamp-1 text-sm text-tertiary [&>*:not(:first-child)]:before:mx-1 [&>*:not(:first-child)]:before:content-['•']">
                      <span>Playlist</span>
                      <span>{user?.username}</span>
                    </p>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  )
}

export default UserLibrary
