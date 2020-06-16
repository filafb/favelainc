import * as React from "react"
import { Link } from "react-router-dom"
import { PrimaryButton } from "../Partials/Buttons"

const ResidentCard = ({ firstName, lastName, cpf, id, path }) => {
  return (
    <li className="flex py-4 items-center justify-between">
      <div>
        <p>{`${firstName} ${lastName}`}</p>
        <p>{`CPF: ${cpf}`}</p>
      </div>
      <Link to={`${path}/${id}`}>
        <PrimaryButton type="button" text="Ver" />
      </Link>
    </li>
  )
}

export default ResidentCard
