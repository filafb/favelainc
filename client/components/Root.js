import * as React from "react"
import useAuth from "./useAuth"
import AuthenticatedApp from "./AuthApps/AuthenticatedApp"
import UnauthenticatedApp from "./AuthApps/UnauthenticatedApp"

const Root = () => {
  const [user] = useAuth()

  return user.id ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default Root
