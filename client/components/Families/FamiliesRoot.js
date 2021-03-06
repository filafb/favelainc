import * as React from "react"
import { SecondaryButton } from "../Partials/Buttons"
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom"
import AllFamilies from "./AllFamilies"
import { useDispatch } from "react-redux"
import { fetchFamilies } from "../../reducers/families"
import SingleFamily from "./SingleFamily"

const FamiliesRoot = () => {
  const { path } = useRouteMatch()
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSeeAll = () => {
    if (history.location.pathname !== "/familias") {
      history.push("/familias")
    }
    dispatch(fetchFamilies())
  }

  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 relative">
        <h2 className="text-2xl mb-4">Famílias</h2>
        <div onClick={handleSeeAll}>
          <SecondaryButton text="Ver todas" type="button" />
        </div>
        <div className="mt-4">
          <Switch>
            <Route exact path={`${path}`}>
              <AllFamilies />
            </Route>
            <Route exact path={`${path}/:id`}>
              <SingleFamily />
            </Route>
          </Switch>
        </div>
      </div>
    </main>
  )
}

export default FamiliesRoot
