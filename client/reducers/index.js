import { combineReducers } from "redux" // to combine different reducers

//const reducer = combineReducers({
//   name: reducer1, --> import it
//   name2: reducer2 --> import it
// })

function dummyReducer(state = {}, action) {
  return state
}

export default dummyReducer
