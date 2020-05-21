import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../reducers/user"

const AllUsers = () => {
  const dispatch = useDispatch()
  const users = useSelector(({ usersState: { users } }) => users)

  React.useEffect(() => {
    dispatch(fetchAllUsers())
  }, [])

  console.log(users)
  return <div>all users</div>
}

export default AllUsers
