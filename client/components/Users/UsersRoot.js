import * as React from "react"
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom"
import NewUser from "./NewUser"
import SingleUser from "./SingleUser"
import useAuth from "../Hooks/useAuth"
import EditUser from "./EditUser"
import AllUsers from "./AllUsers"

const UsersRoot = () => {
  const { path } = useRouteMatch()
  const [{ id, admin }] = useAuth()
  return (
    <Switch>
      {admin && (
        <Route exact path={path}>
          <AllUsers />
        </Route>
      )}
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
      <Redirect to={`${path}/${id}`} />
    </Switch>
  )
}

export default UsersRoot
