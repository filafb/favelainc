import * as React from "react"
import { useSelector } from "react-redux"

const AllPartners = () => {
  const partners = useSelector(({ ngoPartnersState: { ngoList } }) => ngoList)

  return (
    <main className="max-w-sm mx-auto">
      <ul className="mx-8">
        {partners.map(({ id, name }) => (
          <li key={id}>
            <p>{name}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default AllPartners
