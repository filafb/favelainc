import * as React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import Main from "../Main"
import Header from "../Partials/Header"
import UsersRoot from "../Users/UsersRoot"
import Navigation from "../Partials/Navigation"
import RootUpload from "../Upload/RootUpload"
import { useDispatch } from "react-redux"
import { fetchNgoList } from "../../reducers/ngoPartners"
import PartnersRoot from "../Partners/PartnersRoot"
import ResidentsRoot from "../Residents/ResidentsRoot"

const AuthenticatedApp = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchNgoList())
  }, [])

  return (
    <div className="font-sans h-full overflow-hidden flex flex-col justify-between">
      <Header />
      <div className="overflow-auto flex-grow my-6">
        <Switch>
          <Route path="/usuarios">
            <UsersRoot />
          </Route>
          <Route path="/moradores">
            <ResidentsRoot />
          </Route>
          <Route path="/familias">
            <div>Familias</div>
          </Route>
          <Route path="/campanhas">
            <div>Campanhas</div>
          </Route>
          <Route path="/uploads">
            <RootUpload />
          </Route>
          <Route path="/parceiros">
            <PartnersRoot />
          </Route>
          <Route path="/">
            <Main />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
      <Navigation />
    </div>
  )
}

export default AuthenticatedApp
