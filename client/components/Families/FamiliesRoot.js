import * as React from "react"
import { SecondaryButton } from "../Partials/Buttons"
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom"
import AllFamilies from "./AllFamilies"
import { useDispatch } from "react-redux"
import { fetchFamilies } from "../../reducers/families"

const FamiliesRoot = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSeeAll = () => {
    if (history.location.pathname !== "/familias") {
      history.push("/moradores")
    }
    dispatch(fetchFamilies())
  }

  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 relative">
        <div onClick={handleSeeAll}>
          <SecondaryButton text="Ver todas" type="button" />
        </div>
        <div className="mt-4">
          <Switch>
            <Route exact path={`${path}`}>
              <AllFamilies />
            </Route>
            <Route exact path={`${path}/:id`}>
              <div>Single Family</div>
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  )
}

export default FamiliesRoot
