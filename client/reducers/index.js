import { combineReducers } from "redux"
import userReducer from "./user"
import ngoPartnersReducer from "./ngoPartners"

const reducer = combineReducers({
  usersState: userReducer,
  ngoPartnersState: ngoPartnersReducer
})

export default reducer
