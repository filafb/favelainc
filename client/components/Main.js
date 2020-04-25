import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/user"

const Test = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <React.Fragment>
      <div>
        <p>{`Hello ${user.firstName}`}</p>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Logout
      </button>
    </React.Fragment>
  )
}

export default Test
