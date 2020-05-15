import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "../Main"
import NewUser from "../Users/NewUser"
import Header from "../Partials/Header"

const AuthenticatedApp = () => {
  return (
    <div className="font-sans">
      <Header />
      <Switch>
        <Route exact path="/usuarios/:id">
          <NewUser />
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
