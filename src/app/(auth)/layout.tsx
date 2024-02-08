import React from "react"
import Image from "next/image"
import Link from "next/link"

import { AuthHeader, SiteFooter } from "@/widgets/layout"
import { AspectRatio } from "@/shared/components/ui/aspect-ratio"
import { GradientText } from "@/shared/components/ui/gradient-text"
import { PageHeading } from "@/shared/components/ui/page-heading"
import { cn } from "@/shared/lib/utils"

interface AuthLayoutProps {
  children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <div className="relative grid h-screen grid-cols-1 md:grid-cols-3 lg:grid-cols-2">
        {/* <AuthHeader /> */}
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/images/auth-layout.jpg"
            alt=""
            // alt="A skateboarder doing a high drop"
            fill
            className="absolute inset-0 object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/75 to-background/25" />
          <div className="absolute inset-0 flex flex-col justify-center px-6 pb-28 text-[5rem] font-extrabold ">
            <div className="grid grid-rows-3">
              <div className="justify-self-start">
                <GradientText type="start" text="You are," />
              </div>
              <div className="justify-self-center">
                <GradientText type="center" text="What you" />
              </div>
              <div className="justify-self-end">
                <GradientText type="end" text="Listen to." />
              </div>
            </div>
          </div>
        </AspectRatio>
        <main className="relative col-span-1 h-full overflow-hidden md:col-span-2 lg:col-span-1">
          <AuthHeader />
          {children}
        </main>
      </div>
      <SiteFooter />
    </>
  )
}

export default AuthLayout
