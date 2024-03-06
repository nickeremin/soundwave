"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useUser } from "@clerk/nextjs"
import { motion, Variants } from "framer-motion"
import {
  CheckIcon,
  HeadphonesIcon,
  PlusIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { cn, getImageUrl } from "@/shared/lib/utils"
import { useLayoutStore } from "@/shared/stores/layout-store"
import {
  useUserLibraryStore,
  type FilterType,
} from "@/shared/stores/user-library-store"
import { trpc } from "@/shared/trpc/client"

function UserLibrary() {
  const isCollapsed = useLayoutStore((state) => state.isCollapsed)
  const toggleIsCollapsed = useLayoutStore((state) => state.toggleIsCollapsed)
  const search = useUserLibraryStore((state) => state.search)
  const filter = useUserLibraryStore((state) => state.filter)

  const REMAIN_HEIGHT = isCollapsed ? 240 : 288

  const [isPending, startTransition] = React.useTransition()

  const { user } = useUser()
  const { mutateAsync: createPlaylist } =
    trpc.playlistRouter.createPlaylist.useMutation()
  const { data: playlists } = trpc.playlistRouter.getPlaylists.useQuery()
  const { data: followedArtists } =
    trpc.playlistRouter.getFollowedArtists.useQuery()

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

  const scrollAreaRef = React.useRef<HTMLDivElement | null>(null)
  const todoRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => {
    function handleScroll() {
      if (!scrollAreaRef.current) return

      const scrollTop = scrollAreaRef.current.scrollTop

      if (scrollTop !== 0) {
        todoRef.current?.classList.add("shadow-[0_6px_10px_rgba(0,0,0,.6)]")
      } else {
        todoRef.current?.classList.remove("shadow-[0_6px_10px_rgba(0,0,0,.6)]")
      }
    }

    if (scrollAreaRef.current) {
      scrollAreaRef.current.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className="flex flex-1 flex-col rounded-lg bg-background-100">
      <div ref={todoRef} className="transition-shadow">
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
        {!isCollapsed && <LibraryFilters />}
      </div>

      <div className="relative h-full">
        <ScrollArea
          ref={scrollAreaRef}
          style={{ height: `calc(100vh - ${REMAIN_HEIGHT}px)` }}
        >
          <div className="flex flex-col gap-2 px-2">
            {!isCollapsed && <LibrarySearchBar />}
            <ul
              ref={listRef}
              role="list"
              tabIndex={0}
              className="flex flex-col"
            >
              {filter !== "artists" &&
                playlists
                  ?.filter((playlist) =>
                    playlist.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((playlist, i) =>
                    isCollapsed ? (
                      <Tooltip
                        key={playlist.id}
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
                          ref={(el) => (listItemRefs.current[i] = el)}
                          className={cn(
                            "relative flex h-16 items-center",
                            isCollapsed ? "px-1" : "px-2"
                          )}
                          tabIndex={i + 1}
                        >
                          <div
                            role="button"
                            tabIndex={-1}
                            onClick={() =>
                              router.push(`/playlist/${playlist.id}`)
                            }
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
                          onClick={() =>
                            router.push(`/playlist/${playlist.id}`)
                          }
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
              {filter !== "playlists" &&
                followedArtists
                  ?.filter((artist) =>
                    artist.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((artist) => {
                    const imageUrl = getImageUrl(artist.images)

                    return isCollapsed ? (
                      <Tooltip
                        key={artist.id}
                        side="right"
                        content={
                          <div className="flex flex-col items-start font-medium">
                            <p className="line-clamp-1">{artist.name}</p>
                            <p className="line-clamp-1 text-sm text-tertiary">
                              <span>Artist</span>
                            </p>
                          </div>
                        }
                      >
                        <li
                          // ref={(el) => (listItemRefs.current[i] = el)}
                          className={cn(
                            "relative flex h-16 items-center",
                            isCollapsed ? "px-1" : "px-2"
                          )}
                          // tabIndex={i + 1}
                        >
                          <div
                            role="button"
                            tabIndex={-1}
                            onClick={() =>
                              router.push(`/playlist/${artist.id}`)
                            }
                            className="absolute inset-0 cursor-pointer"
                          />
                          <div className="size-12 rounded bg-accent shadow-image-sm">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
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
                        key={artist.id}
                        // ref={(el) => (listItemRefs.current[i] = el)}
                        className="relative flex h-16 items-center px-2"
                        // tabIndex={i + 1}
                      >
                        <div
                          role="button"
                          tabIndex={-1}
                          onClick={() => router.push(`/artist/${artist.id}`)}
                          className="absolute inset-0 cursor-pointer"
                        />
                        <div className="flex items-center gap-3">
                          <div className="size-12 rounded-full bg-accent shadow-image-sm">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt=""
                                width={80}
                                height={80}
                                className="size-full rounded-full object-cover object-center"
                              />
                            ) : null}
                          </div>
                          <div className="flex flex-col items-start font-medium">
                            <p className="line-clamp-1">{artist.name}</p>
                            <p className="line-clamp-1 text-sm text-tertiary ">
                              <span>Artist</span>
                            </p>
                          </div>
                        </div>
                      </li>
                    )
                  })}
            </ul>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

type Filter = {
  name: string
  value: FilterType
}

const filterTypes: Filter[] = [
  {
    name: "Playlists",
    value: "playlists",
  },
  {
    name: "Artists",
    value: "artists",
  },
]

function LibraryFilters() {
  const activeFilter = useUserLibraryStore((state) => state.filter)
  const setFilter = useUserLibraryStore((state) => state.setFilter)

  return (
    <div className="flex h-12 items-center gap-2 px-4">
      {activeFilter ? (
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted"
          onClick={() => {
            setFilter(undefined)
          }}
        >
          <XIcon strokeWidth={2} className="size-4" />
        </Button>
      ) : null}
      {filterTypes
        .filter((filter) => {
          if (!activeFilter) return true
          else return activeFilter === filter.value
        })
        .map((filter) => (
          <Button
            key={filter.value}
            role="checkbox"
            aria-checked={activeFilter === filter.value}
            variant="none"
            size="none"
            className={cn(
              "h-8 rounded-full bg-muted px-3 text-[13px] font-medium hover:bg-accent",
              activeFilter === filter.value &&
                "bg-primary font-semibold text-gray-dark hover:bg-primary"
            )}
            onClick={() => {
              setFilter(filter.value)
            }}
          >
            {filter.name}
          </Button>
        ))}
    </div>
  )
}

const sortTypes = [
  { value: "recents", name: "Recents" },
  { value: "recently_added", name: "Recently added" },
  { value: "alphabetical", name: "Alphabetical" },
]

const variants: Variants = {
  closed: {
    width: "32px",
    opacity: 0,
  },
  open: {
    width: "180px",
    opacity: 1,
  },
}

function LibrarySearchBar() {
  const [sortBy, setSortBy] = React.useState("recents")
  const [isOpen, setIsOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const search = useUserLibraryStore((state) => state.search)
  const setSearch = useUserLibraryStore((state) => state.setSearch)

  // React.useEffect(() => {
  //   function handleClick(e: PointerEvent) {
  //     if (!inputRef.current) return

  //     if (inputRef.current !== e.target) {
  //       setIsOpen(false)
  //     }
  //   }

  //   window.addEventListener("pointerdown", handleClick)

  //   return () => {
  //     window.removeEventListener("pointerdown", handleClick)
  //   }
  // }, [])

  return (
    <div className="px-2 pt-0.5">
      <div className="flex items-center justify-between">
        <div className="relative flex h-9 items-center">
          <motion.input
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            ref={inputRef}
            variants={variants}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            placeholder="Search in Your Library"
            className={cn(
              "test-input h-8 rounded bg-accent pl-8 text-[13px] font-medium leading-none text-secondary outline-none placeholder:text-tertiary",
              !isOpen && "pointer-events-none",
              search.length > 0 && "pr-8"
            )}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            onBlur={() => {
              if (search.length === 0) {
                setIsOpen(false)
              } else {
              }
            }}
            tabIndex={!isOpen ? -1 : undefined}
          />
          <Tooltip
            align="start"
            alignOffset={-16}
            content="Search in Your Library"
          >
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute top-0.5 text-tertiary hover:text-primary",
                isOpen && "pointer-events-none"
              )}
              onClick={() => {
                setIsOpen(true)
                inputRef.current?.focus()
              }}
              tabIndex={isOpen ? -1 : undefined}
            >
              <SearchIcon className="size-5" />
            </Button>
          </Tooltip>
          <Button
            variant="none"
            size="icon"
            type="reset"
            onPointerDown={(e) => e.preventDefault()}
            onClick={() => {
              setSearch("")
              inputRef.current?.focus()
            }}
            className={cn(
              "absolute right-0 top-0.5 size-8 rounded text-tertiary transition hover:text-secondary",
              search.length > 0 ? "visible" : "invisible"
            )}
          >
            <XIcon className="size-4" />
          </Button>
        </div>

        {/* <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="shrink-1 min-w-0 truncate">
              <SelectValue placeholder="Recents" className="truncate" />
            </SelectTrigger>
            <SelectContent align="end" className="">
              <SelectGroup>
                <SelectLabel>Sort by</SelectLabel>
                {sortTypes.map((type) => (
                  <SelectItem
                    key={type.value}
                    value={type.value}
                    className={cn(sortBy === type.value && "text-pink")}
                  >
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
      </div>
    </div>
  )
}

export default UserLibrary
