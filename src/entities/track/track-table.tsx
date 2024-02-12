"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import * as z from "zod"

import { cn } from "@/shared/lib/utils"
import { trackSchema } from "@/shared/lib/validations/track"

type Track = z.infer<typeof trackSchema>

interface TrackTableProps {
  tracks: Track[]
}

function TrackTable({}: TrackTableProps) {
  const [currentTrack, setCurrentTrack] = React.useState<number | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ["tracks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:8080/api/search/tracks")
      const data = await response.json()
      const tracks = trackSchema.array().parse(data)
      return tracks
    },
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <table className="flex flex-col py-2">
      <tbody className="px-6">
        {data?.map((track, i) => (
          <Link key={track.id} href={`/track/${track.id}`}>
            <tr
              onClick={() => {
                setCurrentTrack(i)
              }}
              className={cn(
                "grid h-14 grid-cols-[16px_4fr_2fr_1fr] items-center gap-4 rounded-md px-4 text-sm text-tertiary hover:bg-accent",
                currentTrack === i && "bg-focus hover:bg-focus"
              )}
            >
              <td className="justify-self-end text-base">{i + 1}</td>
              <td className="flex items-center gap-3">
                <Image
                  src={"/"}
                  alt=""
                  height={40}
                  width={40}
                  className="rounded-md"
                />
                <div className="flex flex-col">
                  <p className="text-base text-primary">{""}</p>
                  <p className="">{""}</p>
                </div>
              </td>
              {/* <td className="line-clamp-1">{track.album}</td> */}
              <td className="mr-8 justify-self-end">
                {/* {format(new Date(track.duration * 1000), "m:ss")} */}
              </td>
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  )
}

export default TrackTable
