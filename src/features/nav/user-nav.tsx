"use client"

import React from "react"
import { useUser } from "@clerk/nextjs"

import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"

function UserNav() {
  const { user } = useUser()

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="size-12 rounded-full">
            <Avatar className="size-12">
              <AvatarImage src={user?.imageUrl} alt="" />
            </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[280px] rounded-lg px-3 py-2">
          <div className="px-3 pb-3 pt-2">
            <div className="flex flex-col gap-1">
              <p className="font-medium leading-none">{user?.username}</p>
              <p className="leading-none text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>

          <ul className="flex flex-col">
            <li className="flex h-12 cursor-pointer items-center rounded-2xl px-3 text-secondary transition hover:bg-accent hover:text-primary">
              Settings
            </li>
            <li className="flex h-12 cursor-pointer items-center rounded-2xl px-3 text-secondary transition hover:bg-accent hover:text-primary">
              Playlists
            </li>
          </ul>

          <div className="mx-3 my-3 border-t" />

          <ul className="flex flex-col">
            <li className="flex h-12 cursor-pointer items-center rounded-2xl px-3 text-secondary transition hover:bg-accent hover:text-primary">
              Contact
            </li>
            <li className="flex h-12 cursor-pointer items-center rounded-2xl px-3 text-secondary transition hover:bg-accent hover:text-primary">
              Exit
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </>
  )
}

export default UserNav
