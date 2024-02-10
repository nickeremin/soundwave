import React from "react"

import { MainNav } from "@/widgets/layout"
import MainFooter from "@/widgets/layout/footers/main-footer"
import { ScrollArea } from "@/shared/components/ui/scroll-area"

interface PublicLayoutProps {
  children: React.ReactNode
}

function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="relative grid h-screen grid-cols-[auto_1fr] gap-2 p-2">
      <aside className="flex w-[320px] flex-col gap-2">
        <MainNav />
      </aside>
      <ScrollArea className="h-[calc(100vh-16px)] rounded-lg bg-background-100">
        {children}
        {/* <MainHeader />
        <main className="relative flex flex-col px-6">
          <div className="relative flex flex-col">{children}</div>
        </main> */}
        <MainFooter />
      </ScrollArea>
    </div>
  )
}

export default PublicLayout
