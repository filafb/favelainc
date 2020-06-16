import * as React from "react"
import { useSelector } from "react-redux"
import { useRouteMatch } from "react-router-dom"
import ResidentCard from "./ResidentCard"

const AllResidents = () => {
  const residents = useSelector(({ residentsList }) => residentsList)
  const { path } = useRouteMatch()
  return residents.length ? (
    <div>
      <h2 className="text-2xl">Moradores</h2>
      <ul>
        {residents.map(({ firstName, lastName, id, cpf }) => (
          <ResidentCard
            key={id}
            firstName={firstName}
            lastName={lastName}
            cpf={cpf}
            path={path}
            id={id}
          />
        ))}
      </ul>
    </div>
  ) : null
}

export default AllResidents
