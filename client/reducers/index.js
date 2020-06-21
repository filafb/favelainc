import { combineReducers } from "redux"
import userReducer from "./user"
import ngoPartnersReducer from "./ngoPartners"
import residentsReducer from "./residents"
import familiesReducer from "./families"

const reducer = combineReducers({
  usersState: userReducer,
  ngoPartnersState: ngoPartnersReducer,
  residentsList: residentsReducer,
  familiesList: familiesReducer
})

export default reducer
