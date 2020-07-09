import * as React from "react"
import NewCampaign from "./NewCampaign"

const CampaignsRoot = () => {
  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 relative">
        <div className="mt-4">
          <NewCampaign />
        </div>
      </div>
    </main>
  )
}

export default CampaignsRoot
