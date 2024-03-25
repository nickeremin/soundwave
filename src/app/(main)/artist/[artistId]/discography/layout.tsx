"use client"

import React from "react"
import { type Metadata } from "next"

import DiscographyHeader from "@/widgets/layout/headers/discography-header"
import { trpc } from "@/shared/trpc/client"

export const metadata: Metadata = {
  title: "Artist Discography | Soundwave",
}

interface DiscographyLayoutProps {
  children: React.ReactNode
  params: {
    artistId: string
  }
}

function DiscographyLayout({
  params: { artistId },
  children,
}: DiscographyLayoutProps) {
  const { data: artist } = trpc.artistRouter.getArtist.useQuery({ artistId })

  if (!artist) return null

  return (
    <React.Fragment>
      <DiscographyHeader artist={artist} />
      {children}
    </React.Fragment>
  )
}

export default DiscographyLayout
