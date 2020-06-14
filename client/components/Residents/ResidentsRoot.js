import * as React from "react"
import {
  Route,
  Switch,
  useRouteMatch,
  Redirect,
  Link,
  useHistory
} from "react-router-dom"
import { SecondaryButton } from "../Partials/Buttons"
import { InputField } from "../Partials/FormField"
import NewResident from "./NewResident"
import AllResidents from "./AllResidents"
import { useDispatch } from "react-redux"
import { fetchResidents } from "../../reducers/residents"
import SingleResident from "./SingleResident"

const ResidentsRoot = () => {
  const { path } = useRouteMatch()
  const [search, setSearch] = React.useState("")
  const history = useHistory()
  const dispatch = useDispatch()

  const handleSeeAll = () => {
    if (history.location.pathname !== "/moradores") {
      history.push("/moradores")
    }
    setSearch("")
    dispatch(fetchResidents())
  }

  const searchResident = () => {}

  const handleChange = e => {}

  React.useEffect(() => {
    setSearch("")
  }, [history.location.pathname])

  return (
    <main className="max-w-sm mx-auto">
      <div className="mx-8 relative">
        <div>
          <div className="flex justify-around">
            <Link to={`${path}/novo`}>
              <SecondaryButton text="Criar Novo" type="button" />
            </Link>
            <div onClick={handleSeeAll}>
              <SecondaryButton text="Ver Todos" type="button" />
            </div>
          </div>
          {/* <div className="relative">
            <InputField
              type="text"
              value={search}
              name="search"
              placeholder="CPF ou Nome"
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-0 top-0 h-full mr-3"
              onClick={searchResident}
            >
              Buscar
            </button>
          </div> */}
        </div>
        <div className="mt-4">
          <Switch>
            <Route exact path={`${path}/novo`}>
              <NewResident />
            </Route>
            <Route exact path={`${path}`}>
              <AllResidents />
            </Route>
            <Route exact path={`${path}/:id`}>
              <SingleResident />
            </Route>
            <Redirect to={path} />
          </Switch>
        </div>
      </div>
    </main>
  )
}

export default ResidentsRoot
