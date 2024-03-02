"use client"

import React from "react"
import { useUser } from "@clerk/nextjs"

import { LucideIcon } from "@/shared/components/icons"
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover"

function UserNav() {
  const { user } = useUser()

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="size-12 rounded-full">
            <Avatar className="size-12">
              <AvatarImage src={user?.imageUrl} alt="" />
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {/* <div className="px-3 pb-3 pt-2">
            <div className="flex flex-col gap-1">
              <p className="font-medium leading-none">{user?.username}</p>
              <p className="leading-none text-muted-foreground">
                {user?.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div> */}

          <DropdownMenuItem className="gap-3">
            <span>
              <LucideIcon name="User" className="text-secondary" />
            </span>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <span>
              <LucideIcon name="Settings" className="text-secondary" />
            </span>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <span>
              <LucideIcon
                name="ArrowUpRightFromSquare"
                className="text-secondary"
              />
            </span>
            Support
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-3">
            <span>
              <LucideIcon name="LogOut" className="text-secondary" />
            </span>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserNav
