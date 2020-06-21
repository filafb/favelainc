import * as React from "react"
import { Link } from "react-router-dom"
import { PrimaryButton } from "../Partials/Buttons"

const FamilyCard = ({ id, path }) => {
  return (
    <li className="flex py-4 items-center justify-between">
      <div>
        <p>{`ID família ${id}`}</p>
        <p># of members</p>
        <p>Última cesta</p>
        <p>próxima cesta</p>
      </div>
      <Link to={`${path}/${id}`}>
        <PrimaryButton type="button" text="Ver" />
      </Link>
    </li>
  )
}

export default FamilyCard
