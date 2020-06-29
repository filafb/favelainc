import { combineReducers } from "redux"
import userReducer from "./user"
import ngoPartnersReducer from "./ngoPartners"
import residentsReducer from "./residents"
import familiesReducer from "./families"
import campaignReducer from "./campaigns"

const reducer = combineReducers({
  usersState: userReducer,
  ngoPartnersState: ngoPartnersReducer,
  residentsList: residentsReducer,
  familiesList: familiesReducer,
  campaignsList: campaignReducer
})

export default reducer
