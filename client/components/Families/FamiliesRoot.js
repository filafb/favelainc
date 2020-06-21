import * as React from "react"
import { SecondaryButton } from "../Partials/Buttons"
import { Switch, Route, useRouteMatch } from "react-router-dom"

const FamiliesRoot = () => {
  const { path } = useRouteMatch()

  const handleSeeAll = () => {}

  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 relative">
        <div onClick={handleSeeAll}>
          <SecondaryButton text="Ver todas" type="button" />
        </div>
      </div>
      <div className="mt-4">
        <Switch>
          <Route exact path={`${path}`}>
            <div>All families</div>
          </Route>
          <Route exact path={`${path}/:id`}>
            <div>Single Family</div>
          </Route>
        </Switch>
      </div>
    </main>
  )
}

export default FamiliesRoot
