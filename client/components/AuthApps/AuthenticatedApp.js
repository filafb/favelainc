import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "../Main"

const AuthenticatedApp = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/">
          <Main />
        </Route>
        <Redirect to="/" />
      </Switch>
    </React.Fragment>
  )
}

export default AuthenticatedApp
