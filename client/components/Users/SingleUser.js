import * as React from "react"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"

const SingleUser = () => {
  const { id } = useParams()
  const users = useSelector(({ usersState: { users } }) => users)
  const history = useHistory()

  const userToView = users.find(user => user.id === Number(id))

  React.useEffect(() => {
    if (!userToView) {
      history.push("/usuarios")
    }
  })

  return userToView ? (
    <>
      <div>firstName {userToView.firstName}</div>
      <div>lastName {userToView.lastName}</div>
      <div>email {userToView.email}</div>
      <div>admin {userToView.admin}</div>
    </>
  ) : null
}

export default SingleUser
