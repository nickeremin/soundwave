import React from "react"

import DesktopFooterNav from "../navs/desktop-footer-nav"
import MobileFooterNav from "../navs/mobile-footer-nav"

function SiteFooter() {
  return (
    <footer className="bg-background-100 p-6 shadow-border-t lg:p-10">
      <nav className="mx-auto flex max-w-[--page-width] flex-col">
        <DesktopFooterNav />
        <MobileFooterNav />
      </nav>
    </footer>
  )
}

export default SiteFooter
