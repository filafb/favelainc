import axios from "axios"

const GOT_NGO_LIST = "GOT_NGO_LIST"

const ngoPartnersState = {
  ngoList: []
}

const gotNgoList = ngoList => {
  return {
    type: GOT_NGO_LIST,
    ngoList
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

const ngoPartnersReducer = (state = ngoPartnersState, { type, ...payload }) => {
  switch (type) {
    case GOT_NGO_LIST:
      return payload.ngoList
    default:
      return state
  }
}

export default ngoPartnersReducer
