import * as React from "react"
import FormUser from "./FormUser"
import { useParams, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import useAuth from "../Hooks/useAuth"
import { updateUserInfo } from "../../reducers/user"

const EditUser = () => {
  const { id } = useParams()
  const [{ id: userLoggedId, admin }] = useAuth()
  const [userInfo, setUser] = React.useState({})
  const users = useSelector(({ usersState: { users } }) => users)
  const history = useHistory()

  const findUser = users.find(user => user.id === Number(id))

  React.useEffect(() => {
    if (!findUser) {
      history.push("/usuarios")
      // case: Logged user is not admin, and try to visit a url that doesn't match their user id
    } else if (!admin && Number(id) !== userLoggedId) {
      history.push(`/usuarios/${userLoggedId}/editar`)
      // case Logged user is admin, user to be edit is also admin but they are not the same
    } else if (admin && findUser.admin && userLoggedId !== findUser.id) {
      history.push(`/usuarios/${findUser.id}`)
    } else {
      setUser(findUser)
    }
  }, [])

  return (
    <div className="max-w-xs flex justify-center mx-auto flex-col">
      <h2 className="my-2">Editar perfil</h2>
      <FormUser
        errorMessage="Erro ao editar perfil."
        actionToDispatch={updateUserInfo}
        buttonText="Editar Perfil"
        populateFields={userInfo}
      />
    </div>
  )
}

export default EditUser
