"use client"

import React from "react"
import { type Metadata } from "next"
import { useBoundStore } from "@/providers/bound-store-provider"

import MainHeader from "@/widgets/layout/headers/main-header"
import RecommendedPlaylists from "@/widgets/playlist/recommended-playlists"

export const metadata: Metadata = {
  title: "Home | Soundwave",
}

function HomePage() {
  const columns = useBoundStore((state) => state.columnsCount)

  return (
    <div>
      <MainHeader />
      <div className="p-6">
        {/* TODO: Recently played artists and playlists and albums */}
        {/* <section className="flex flex-col gap-4">
          <Link
            href="/home/recently-played"
            className="decoration-2 hover:underline"
          >
            <h2 className="text-2xl font-bold">Recently played</h2>
          </Link>
          <div>
          </div>
        </section> */}
        <RecommendedPlaylists />
      </div>
    </div>
  )
}

export default HomePage
