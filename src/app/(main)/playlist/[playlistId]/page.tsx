import React from "react"

import MainFooter from "@/widgets/layout/footers/main-footer"
import PlaylistDetails from "@/widgets/pages/playlist/playlist-details"
import EditPlaylistDetailsProvider from "@/widgets/providers/edit-playlist-details-provider"
import EditPlaylistDetailsForm from "@/features/forms/playlist/edit-playlist-details-form"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/shared/components/ui/dialog"

interface PlaylistPageProps {
  params: {
    playlistId: string
  }
}

function PlaylistPage({ params: { playlistId } }: PlaylistPageProps) {
  return (
    <React.Fragment>
      <main className="relative space-y-10">
        {/* <EditPlaylistDetailsProvider playlistId={playlistId}> */}
        {/* <PlaylistDetails playlistId={playlistId} /> */}
        {/* </EditPlaylistDetailsProvider> */}
        {/* <div className="flex flex-col gap-6 p-4">
            <h1 className="text-2xl font-bold">Edit details</h1>
            <EditPlaylistDetailsForm />
          </div> */}
        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold">Edit details</h1>
            <EditPlaylistDetailsForm playlistId={playlistId} />
          </DialogContent>
        </Dialog>
      </main>
      <MainFooter />
    </React.Fragment>
  )
}

export default PlaylistPage
