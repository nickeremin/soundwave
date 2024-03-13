import React from "react"

import MainFooter from "@/widgets/layout/footers/main-footer"
import MainHeader from "@/widgets/layout/headers/main-header"
import RecentSearches from "@/widgets/search/recent-searches"

function RecentSearchesPage() {
  return (
    <div>
      <div className="min-h-screen">
        <MainHeader />
        <div className="p-6">
          <div className="flex flex-col">
            <RecentSearches />
          </div>
        </div>
      </div>
      <MainFooter />
    </div>
  )
}

export default RecentSearchesPage
