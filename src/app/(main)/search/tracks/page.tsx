import React from "react"

import SearchHeader from "@/widgets/layout/headers/search/search-header"
import SearchTrackSubheader from "@/widgets/layout/headers/search/search-track-subheader"
import TrackTable from "@/entities/track/track-table"
import { Wrapper } from "@/shared/components/ui/wrapper"

function SearchTracksPage() {
  return (
    <div>
      {/* <Wrapper as="header" variant="header" className="flex-col">
        <SearchHeader key="search-header" />
        <SearchTrackSubheader />
      </Wrapper>
      <main>
        <TrackTable tracks={[]} />
      </main> */}
    </div>
  )
}

export default SearchTracksPage
