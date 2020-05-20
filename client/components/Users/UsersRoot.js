import * as React from "react"
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom"
import NewUser from "./NewUser"
import SingleUser from "./SingleUser"
import useAuth from "../Hooks/useAuth"
import EditUser from "./EditUser"

const UsersRoot = () => {
  const { path } = useRouteMatch()
  const [{ admin }] = useAuth()
  return (
    <Switch>
      <Route exact path={path}>
        <p>List of all users</p>
      </Route>
      {admin && (
        <Route exact path={`${path}/novo`}>
          <NewUser />
        </Route>
      )}
      <Route exact path={`${path}/:id/editar`}>
        <EditUser />
      </Route>
      <Route exact path={`${path}/:id`}>
        <SingleUser />
      </Route>
      <Redirect to={path} />
    </Switch>
  )
}

export default UsersRoot
