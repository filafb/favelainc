import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../reducers/user"
import { Link } from "react-router-dom"
import { PrimaryButton, SecondaryButton } from "../Partials/Buttons"

const AllUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ usersState: { users } }) => users)

  React.useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  return (
    <main className="max-w-sm mx-auto">
      <ul className="mx-8">
        {users.map(({ id, firstName, lastName, admin }) => (
          <li key={id} className="flex py-4 items-center justify-between">
            <p>{`${firstName} ${lastName}`}</p>
            <div>
              {!admin && (
                <Link to={`/usuarios/${id}/editar`} className="mr-2">
                  <SecondaryButton type="button" text="Editar" />
                </Link>
              )}
              <Link to={`/usuarios/${id}`}>
                <PrimaryButton type="button" text="Ver" />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default AllUsers
