import * as React from "react"
import { useEffect, useState } from "react"
import useAuth from "./Hooks/useAuth"
import AuthenticatedApp from "./AuthApps/AuthenticatedApp"
import UnauthenticatedApp from "./AuthApps/UnauthenticatedApp"

const Root = () => {
  const [user] = useAuth()
  const [loaded, setLoad] = useState(false)

  useEffect(() => {
    if (user) {
      setLoad(true)
    }
  })
  return !loaded ? (
    <div>Loading...</div>
  ) : user.id ? (
    <AuthenticatedApp />
  ) : (
    <UnauthenticatedApp />
  )
}

export default Root
