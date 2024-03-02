"use client"

import React from "react"

import EditPlaylistDetailsForm from "@/features/forms/playlist/edit-playlist-details-form"
import { Dialog, DialogContent } from "@/shared/components/ui/dialog"
import { Form } from "@/shared/components/ui/form"

type EditPlaylistDetailsContextData = {
  playlistId: string
  isOpen: boolean
  toggleOpen: () => void
}

const EditPlaylistDetailsContext = React.createContext<
  EditPlaylistDetailsContextData | undefined
>(undefined)

export function useEditPlaylistDetailsContext() {
  const context = React.useContext(EditPlaylistDetailsContext)

  if (!context) {
    throw new Error(
      "Use useEditPlaylistDetailsContext inside EditPlaylistDetailsContext boundary!"
    )
  }

  return context
}

interface EditPlaylistDetailsProviderProps {
  playlistId: string
  children?: React.ReactNode
}

function EditPlaylistDetailsProvider({
  playlistId,
  children,
}: EditPlaylistDetailsProviderProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <EditPlaylistDetailsContext.Provider
      value={{
        playlistId,
        isOpen,
        toggleOpen: () => setIsOpen((isOpen) => !isOpen),
      }}
    >
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <h1 className="text-2xl font-bold">Edit details</h1>
          {/* <EditPlaylistDetailsForm /> */}
        </DialogContent>
      </Dialog>
    </EditPlaylistDetailsContext.Provider>
  )
}

export default EditPlaylistDetailsProvider
