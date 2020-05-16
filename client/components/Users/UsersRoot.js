import * as React from "react"
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom"
import NewUser from "./NewUser"
import SingleUser from "./SingleUser"

const UsersList = () => {
  const { path } = useRouteMatch()
  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <p>List of all users</p>
        </Route>
        <Route exact path={`${path}/novo`}>
          <NewUser />
        </Route>
        <Route exact path={`${path}/:id`}>
          <SingleUser />
        </Route>
        <Redirect to={path} />
      </Switch>
    </div>
  )
}

export default UsersList
