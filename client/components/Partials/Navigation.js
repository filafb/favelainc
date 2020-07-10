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
        <div className={`${admin ? "w-1/3" : "w-1/2"} py-3`}>
          <Link className="inline-block" to="/moradores">
            <ResidentsSvg active={pathname.includes("/moradores")} />
            <p
              className={` ${!pathname.includes("/moradores") &&
                "text-gray-500"} mt-2`}
            >
              Moradores
            </p>
          </Link>
        </div>
        <div className={`${admin ? "w-1/3" : "w-1/2"} py-3`}>
          <Link className="inline-block" to="/familias">
            <FamiliesSvg active={pathname.includes("/familias")} />
            <p
              className={` ${!pathname.includes("/familias") &&
                "text-gray-500"} mt-2`}
            >
              Famílias
            </p>
          </Link>
        </div>
        {admin && (
          <div className={`w-1/3 py-3`}>
            <Link className="inline-block" to="/campanhas">
              <CampaignSvg active={pathname.includes("/campanhas")} />
              <p
                className={` ${!pathname.includes("/campanhas") &&
                  "text-gray-500"} mt-2`}
              >
                Campanhas
              </p>
            </Link>
          </div>
        )}
      </nav>
    </div>
  )
}

export default Navigation
