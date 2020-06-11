import { combineReducers } from "redux"
import userReducer from "./user"
import ngoPartnersReducer from "./ngoPartners"
import residentsReducer from "./residents"

const reducer = combineReducers({
  usersState: userReducer,
  ngoPartnersState: ngoPartnersReducer,
  residentsList: residentsReducer
})

export default reducer
