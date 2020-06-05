import axios from "axios"

const GOT_NGO_LIST = "GOT_NGO_LIST"
const UPDATE_NGO_LIST = "UPDATE_NGO_LIST"

const ngoPartnersState = {
  ngoList: []
}

const gotNgoList = ngoList => {
  return {
    type: GOT_NGO_LIST,
    ngoList
  }
}

const updateNgoList = ngo => {
  return {
    type: UPDATE_NGO_LIST,
    ngo
  }
}

export const fetchNgoList = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/ngo-partners")
    dispatch(gotNgoList(data))
  } catch (error) {
    return { error: true }
  }
}

export const createNgoPartner = (name, history) => async dispatch => {
  try {
    const { data } = await axios.post("/api/ngo-partners", { name })
    dispatch(updateNgoList(data))
    history.push("/parceiros")
    return { success: true }
  } catch (error) {
    return { error: true }
  }
}

const ngoPartnersReducer = (state = ngoPartnersState, { type, ...payload }) => {
  switch (type) {
    case GOT_NGO_LIST:
      return { ...state, ngoList: payload.ngoList }

    case UPDATE_NGO_LIST:
      return { ...state, ngoList: [...state.ngoList, payload.ngo] }
    default:
      return state
  }
}

export default ngoPartnersReducer
