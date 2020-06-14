import * as React from "react"
import { useSelector } from "react-redux"
import { useRouteMatch, Link } from "react-router-dom"
import { PrimaryButton } from "../Partials/Buttons"

const AllResidents = () => {
  const residents = useSelector(({ residentsList }) => residentsList)
  const { path } = useRouteMatch()
  return residents.length ? (
    <div className="mt-4">
      <h2 className="text-2xl">Moradores</h2>
      <ul>
        {residents.map(({ firstName, lastName, id, cpf }) => (
          <li key={id} className="flex py-4 items-center justify-between">
            <div>
              <p>{`${firstName} ${lastName}`}</p>
              <p>{`CPF: ${cpf}`}</p>
            </div>
            <Link to={`${path}/${id}`}>
              <div>
                <PrimaryButton type="button" text="Ver" />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  ) : null
}

export default AllResidents
