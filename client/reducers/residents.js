import axios from "axios"

const CREATE_RESIDENT = "CREATE_RESIDENT"

const updateResidents = residentInfo => {
  return {
    type: CREATE_RESIDENT,
    residentInfo
  }
}

export const createResident = (residentInfo, history) => async dispatch => {
  try {
    const { data } = await axios.post("/api/residents", residentInfo)
    dispatch(updateResidents(data))
    history.push(`/moradores/${data.id}`)
    return { success: true }
  } catch (error) {
    return { error: true, message: error.response.data.error }
  }
}

const residentsReducer = (state = [], { type, ...payload }) => {
  switch (type) {
    case CREATE_RESIDENT:
      return [...state, payload.residentInfo]
    default:
      return state
  }
}

export default residentsReducer
