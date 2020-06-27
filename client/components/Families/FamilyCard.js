import * as React from "react"
import { Link } from "react-router-dom"
import { PrimaryButton } from "../Partials/Buttons"

const FamilyCard = ({ id, path, familyMembers }) => {
  return (
    <li className="flex py-4 items-center justify-between">
      <div>
        <p>{`ID família: ${id}`}</p>
        <p>{`Membros: ${Number(familyMembers)}`}</p>
        <p>Última cesta</p>
        <p>próxima cesta</p>
      </div>
      {path && (
        <Link to={`${path}/${id}`}>
          <PrimaryButton type="button" text="Ver" />
        </Link>
      )}
    </li>
  )
}

export default FamilyCard
