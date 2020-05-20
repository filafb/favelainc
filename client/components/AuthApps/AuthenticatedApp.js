import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "../Main"
import Header from "../Partials/Header"
import UsersRoot from "../Users/UsersRoot"
import Navigation from "../Partials/Navigation"

const AuthenticatedApp = () => {
  return (
    <div className="font-sans">
      <Header />
      <Switch>
        <Route path="/usuarios">
          <UsersRoot />
        </Route>
        <Route path="/moradores">
          <div>Moradores</div>
        </Route>
        <Route path="/familias">
          <div>Familias</div>
        </Route>
        <Route path="/campanhas">
          <div>Campanhas</div>
        </Route>
        <Route path="/">
          <Main />
        </Route>
        <Redirect to="/" />
      </Switch>
      <Navigation />
    </div>
  )
}

export default AuthenticatedApp
