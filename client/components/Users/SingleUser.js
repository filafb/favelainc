import * as React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import useAuth from "../Hooks/useAuth"

const SingleUser = () => {
  const { id } = useParams()
  const users = useSelector(({ usersState: { users } }) => users)
  const history = useHistory()
  const [{ id: userLoggedId, admin }] = useAuth()
  const [userToRender, setUserToRender] = React.useState({})

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

  return userToRender.id ? (
    <>
      <div>firstName {userToRender.firstName}</div>
      <div>lastName {userToRender.lastName}</div>
      <div>email {userToRender.email}</div>
      <div>admin {userToRender.admin}</div>
    </>
  ) : null
}

export default SingleUser
