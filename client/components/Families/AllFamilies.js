import * as React from "react"
import FamilyCard from "./FamilyCard"
import { useRouteMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const AllFamilies = () => {
  const { path } = useRouteMatch()
  const families = useSelector(({ familiesList }) => familiesList)

  return (
    <div>
      <ul>
        {families.map(({ id, familyMembers }) => (
          <FamilyCard
            key={id}
            id={id}
            familyMembers={familyMembers}
            path={path}
          />
        ))}
      </ul>
    </div>
  )
}

export default AllFamilies
