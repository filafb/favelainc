import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "../Main"
import Header from "../Partials/Header"
import UsersRoot from "../Users/UsersRoot"

const AuthenticatedApp = () => {
  return (
    <div className="font-sans">
      <Header />
      <Switch>
        <Route path="/usuarios">
          <UsersRoot />
        </Route>
        <Route path="/">
          <Main />
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  )
}

export default AuthenticatedApp
