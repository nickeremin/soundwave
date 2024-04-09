"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import {
  ArrowUpRightFromSquareIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

function UserNav() {
  const router = useRouter()
  const { signOut } = useClerk()
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
          <DropdownMenuItem className="gap-3">
            <UserIcon className="size-5 text-secondary" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <SettingsIcon className="size-5 text-secondary" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="gap-3">
            <ArrowUpRightFromSquareIcon className="size-5 text-secondary" />
            Support
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="gap-3"
            onSelect={() => signOut(() => router.push("/"))}
          >
            <LogOutIcon className="size-5 text-secondary" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserNav
