import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../../reducers/user"

const useAuth = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ usersState: { loggedUser } }) => loggedUser)

  useEffect(() => {
    if (!user.id) {
      dispatch(fetchUser())
    }
  }, [])

  return [user]
}

export default useAuth
