import * as React from "react"
import { Route, Switch, useRouteMatch, Redirect } from "react-router-dom"
import AllPartners from "./AllPartners"
import useAuth from "../Hooks/useAuth"
import NewPartner from "./NewPartner"

const PartnersRoot = () => {
  const { path } = useRouteMatch()
  const [
    {
      ngoPartner: { master }
    }
  ] = useAuth()

  return (
    <Switch>
      {master && (
        <>
          <Route exact path={path}>
            <AllPartners />
          </Route>
          <Route exact path={`${path}/novo`}>
            <NewPartner />
          </Route>
        </>
      )}
      <Redirect to="/" />
    </Switch>
  )
}

export default PartnersRoot
