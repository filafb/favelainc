import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "./Main"

export default class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </React.Fragment>
    )
  }
}
