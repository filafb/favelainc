import * as React from "react"
import { Route, Switch, useRouteMatch, Redirect, Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import FormUpload from "./FormUpload"

const RootUpload = () => {
  const { path } = useRouteMatch()
  const [{ admin }] = useAuth()
  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8">
        <Switch>
          {admin && (
            <>
              <Route exact path={path}>
                <div className="flex flex-col text-blue-500 font-bold text-xl">
                  <Link className="my-3" to={`${path}/moradores`}>
                    Moradores / Residents
                  </Link>
                  <Link className="my-3" to={`${path}/familias`}>
                    Famílias / Families
                  </Link>
                  <Link className="my-3" to={`${path}/campanhas`}>
                    Campanhas / Campaigns
                  </Link>
                  <Link className="my-3" to={`${path}/familias/moradores`}>
                    Membros Famílias / Family Members
                  </Link>
                </div>
              </Route>
              <Route exact path={`${path}/moradores`}>
                <FormUpload
                  api="/api/residents/upload/batch"
                  text="Batch Upload for Residents (Moradores)"
                />
              </Route>
              <Route exact path={`${path}/familias`}>
                <div>Coming soon</div>
              </Route>
              <Route exact path={`${path}/campanhas`}>
                <div>Coming soon</div>
              </Route>
              <Route exact path={`${path}/familias/moradores`}>
                <div>Coming soon</div>
              </Route>
            </>
          )}
          <Redirect to="/" />
        </Switch>
      </div>
    </main>
  )
}

export default RootUpload
