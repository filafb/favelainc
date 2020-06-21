import * as React from "react"
import FamilyCard from "./FamilyCard"
import { useRouteMatch } from "react-router-dom"
import { useSelector } from "react-redux"

const AllFamilies = () => {
  const { path } = useRouteMatch()
  const families = useSelector(({ familiesList }) => familiesList)

  console.log(families)

  return (
    <div>
      <h2 className="text-2xl">Famílias</h2>
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
