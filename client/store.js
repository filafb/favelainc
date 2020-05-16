import { createStore, applyMiddleware } from "redux"
import reducer from "./reducers"
import thunkMiddleware from "redux-thunk" //https://github.com/gaearon/redux-thunk

const middlewares = [thunkMiddleware]

if (process.env.NODE_ENV === "development") {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const store = createStore(reducer, applyMiddleware(...middlewares))

export default store
