"use client"

import React from "react"

import DiscographyHeader from "@/widgets/layout/headers/discography-header"
import MainFooter from "@/widgets/layout/main-footer"
import { trpc } from "@/shared/trpc/client"

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
      <div className="min-h-screen">
        <DiscographyHeader artist={artist} />
        <main className="relative">{children}</main>
      </div>
      <MainFooter />
    </React.Fragment>
  )
}

export default DiscographyLayout
