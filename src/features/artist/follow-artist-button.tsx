import React from "react"
import { motion } from "framer-motion"

import { type SimplifiedArtistObject } from "@/shared/types/artist"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

interface FollowArtistButtonProps {
  artist: SimplifiedArtistObject
}

function FollowArtistButton({ artist }: FollowArtistButtonProps) {
  return (
    <Button
      variant="none"
      size="none"
      className="h-9 rounded-full px-4 text-sm font-bold leading-none ring-2 ring-primary hover:text-pink hover:ring-pink"
    >
      Follow
    </Button>
  )
}

export default FollowArtistButton
