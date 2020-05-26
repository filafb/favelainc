import * as React from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { useSelector } from "react-redux"
import useAuth from "../Hooks/useAuth"
import AdminSvg from "../Svg/AdminSvg"
import { SecondaryButton } from "../Partials/Buttons"

const SingleUser = () => {
  const { id } = useParams()
  const users = useSelector(({ usersState: { users } }) => users)
  const history = useHistory()
  const [{ id: userLoggedId, admin }] = useAuth()
  const [
    { id: userId, firstName, lastName, email, admin: userAdmin, ngoPartner },
    setUserToRender
  ] = React.useState({})

  const userToView = users.find(user => user.id === Number(id))

  React.useEffect(() => {
    if (!userToView) {
      history.push("/usuarios")
    } else if (!admin && Number(id) !== userLoggedId) {
      history.push(`/usuarios/${userLoggedId}`)
    } else {
      setUserToRender(userToView)
    }
  }, [])

  return userId ? (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 flex items-start justify-between">
        <div>
          <div className="flex items-center">
            <p>{`${firstName} ${lastName}`}</p>
            {userAdmin && <AdminSvg />}
          </div>
          <p>{email}</p>
          <p>{ngoPartner.name}</p>
        </div>
        {(!userAdmin || userId === userLoggedId) && (
          <div>
            <Link to={`/usuarios/${userId}/editar`}>
              <SecondaryButton type="button" text="Editar" />
            </Link>
          </div>
        )}
      </div>
    </main>
  ) : null
}

export default SingleUser
