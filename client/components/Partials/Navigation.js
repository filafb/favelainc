import React from "react"
import { Link } from "react-router-dom"
import ResidentsSvg from "../Svg/ResidentsSvg"
import FamiliesSvg from "../Svg/FamiliesSvg"
import CampaignSvg from "../Svg/CampaignSvg"

const Navigation = () => {
  return (
    <div className="w-full pb-2 z-30">
      <nav className="flex text-center text-xs">
        <div className="w-1/3">
          <Link className="inline-block" to="/moradores">
            <ResidentsSvg />
            <p className="mt-2">Moradores</p>
          </Link>
        </div>
        <div className="w-1/3">
          <Link className="inline-block" to="/familias">
            <FamiliesSvg />
            <p className="mt-2">Famílias</p>
          </Link>
        </div>
        <div className="w-1/3">
          <Link className="inline-block" to="/campanhas">
            <CampaignSvg />
            <p className="mt-2">Campanhas</p>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Navigation
