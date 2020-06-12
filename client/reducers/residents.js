import axios from "axios"

const UPDATE_RESIDENTS = "UPDATE_RESIDENTS"

const updateResidents = residentInfo => {
  return {
    type: UPDATE_RESIDENTS,
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

export const searchResidentByCPF = cpf => async dispatch => {
  try {
    const { data } = await axios.get(`/api/residents/?cpf=${cpf}`)
    if (!data.message) {
      dispatch(updateResidents(data))
    }
    return data
  } catch (error) {
    return { error: true }
  }
}

const residentsReducer = (state = [], { type, ...payload }) => {
  switch (type) {
    case UPDATE_RESIDENTS:
      return [...state, payload.residentInfo]
    default:
      return state
  }
}

export default residentsReducer
