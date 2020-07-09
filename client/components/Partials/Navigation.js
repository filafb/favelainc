import React from "react"
import { Link, useLocation } from "react-router-dom"
import ResidentsSvg from "../Svg/ResidentsSvg"
import FamiliesSvg from "../Svg/FamiliesSvg"
import CampaignSvg from "../Svg/CampaignSvg"
import useAuth from "../Hooks/useAuth"

const Navigation = () => {
  const [{ admin }] = useAuth()
  const { pathname } = useLocation()

  return (
    <div className="w-full z-30">
      <nav className="flex text-center text-xs">
        <div
          className={`${pathname.includes("/moradores") && "bg-blue-400"} ${
            admin ? "w-1/3" : "w-1/2"
          } py-3`}
        >
          <Link className="inline-block" to="/moradores">
            <ResidentsSvg />
            <p className="mt-2">Moradores</p>
          </Link>
        </div>
        <div
          className={`${pathname.includes("/familias") && "bg-blue-400"} ${
            admin ? "w-1/3" : "w-1/2"
          } py-3`}
        >
          <Link className="inline-block" to="/familias">
            <FamiliesSvg />
            <p className="mt-2">Famílias</p>
          </Link>
        </div>
        {admin && (
          <div
            className={`${pathname.includes("/campanhas") &&
              "bg-blue-400"} w-1/3 py-3`}
          >
            <Link className="inline-block" to="/campanhas">
              <CampaignSvg />
              <p className="mt-2">Campanhas</p>
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navigation
