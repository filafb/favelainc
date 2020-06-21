import * as React from "react"
import FamilyCard from "./FamilyCard"
import { useRouteMatch } from "react-router-dom"

const AllFamilies = () => {
  const { path } = useRouteMatch()

  return (
    <div>
      <h2 className="text-2xl">Famílias</h2>
      <ul>
        <FamilyCard id="1" path={path} />
      </ul>
    </div>
  )
}

export default AllFamilies
