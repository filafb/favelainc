import * as React from "react"
import { Route, Switch, useRouteMatch, Redirect, Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import ResidentsUpload from "./ResidentsUpload"

const RootUpload = () => {
  const { path } = useRouteMatch()
  const [{ admin }] = useAuth()
  return (
    <Switch>
      {admin && (
        <>
          <Route exact path={path}>
            <Link to={`${path}/moradores`}>Moradores</Link>
          </Route>
          <Route exact path={`${path}/moradores`}>
            <ResidentsUpload />
          </Route>
        </>
      )}
      <Redirect to="/" />
    </Switch>
  )
}

export default RootUpload
