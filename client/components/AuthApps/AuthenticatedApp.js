import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "../Main"
import Header from "../Partials/Header"
import UsersRoot from "../Users/UsersRoot"
import Navigation from "../Partials/Navigation"

const AuthenticatedApp = () => {
  return (
    <div className="font-sans h-screen overflow-hidden flex flex-col justify-between">
      <Header />
      <div className="overflow-auto flex-grow my-6">
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
      </div>
      <Navigation />
    </div>
  )
}

export default AuthenticatedApp
