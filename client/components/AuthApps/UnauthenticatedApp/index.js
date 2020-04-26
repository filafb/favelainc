import * as React from "react"
import LoginForm from "./LoginForm"

const UnauthenticatedApp = () => {
  return (
    <div
      id="unauthenticated-app"
      className="container font-sans flex h-screen flex-col items-center"
    >
      <img src="/images/logo-favelainc.png" alt="Favela Inc logo" />
      <LoginForm />
    </div>
  )
}

export default UnauthenticatedApp
