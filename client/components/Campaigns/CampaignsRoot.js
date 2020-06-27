import * as React from "react"
import { SecondaryButton } from "../Partials/Buttons"
import { Link, useRouteMatch, Switch, Route, Redirect } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

const CampaignsRoot = () => {
  const { path } = useRouteMatch()
  const [{ id: userId, admin }] = useAuth()

  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 relative">
        <div>
          <div className="flex justify-around">
            {admin && (
              <Link to={`${path}/novo`}>
                <SecondaryButton text="Criar Novo" type="button" />
              </Link>
            )}
            <div onClick={() => {}}>
              <SecondaryButton text="Ver Todos" type="button" />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Switch>
            <Route exact path={`${path}/novo`}>
              <div>Novo</div>
            </Route>
            <Route exact path={`${path}`}>
              <div>Todos</div>
            </Route>
            <Route exact path={`${path}/:id`}>
              <div>Single Campaign</div>
            </Route>
            <Redirect to={path} />
          </Switch>
        </div>
      </div>
    </main>
  )
}

export default CampaignsRoot
