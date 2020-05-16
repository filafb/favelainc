import { combineReducers } from "redux"
import userReducer from "./user"

const reducer = combineReducers({
  usersState: userReducer
})

export default reducer
