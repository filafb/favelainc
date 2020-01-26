import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./store"
import Root from "./components/Root"
import { BrowserRouter as Router } from "react-router-dom"
import "./style/main"

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById("app")
)
