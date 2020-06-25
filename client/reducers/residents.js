import axios from "axios"

const UPDATE_RESIDENTS = "UPDATE_RESIDENTS"
const GOT_ALL_RESIDENTS = "GOT_ALL_RESIDENTS"
const UPDATE_SINGLE_RESIDENT = "UPDATE_SINGLE_RESIDENT"

export const updateResidents = residentInfo => {
  return {
    type: UPDATE_RESIDENTS,
    residentInfo
  }
}

const updateSingleResident = residentInfo => {
  return {
    type: UPDATE_SINGLE_RESIDENT,
    residentInfo
  }
}

const gotAll = residents => {
  return {
    type: GOT_ALL_RESIDENTS,
    residents
  }
}

export const fetchResidents = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/residents")
    dispatch(gotAll(data))
  } catch {
    return { error: "Erro ao visualizar moradores" }
  }
}

export const createResident = (residentInfo, history) => async dispatch => {
  try {
    const { data } = await axios.post("/api/residents", residentInfo)
    dispatch(updateSingleResident(data))
    history.push(`/moradores/${data.id}`)
    return { success: true }
  } catch (error) {
    return { error: true, message: error.response.data.error }
  }
}

export const fetchSingleResidentAndRelatives = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/residents/${id}/relatives`)
    dispatch(updateResidents(data))
    return { success: true }
  } catch (error) {
    return { error: "Erro ao buscar usuário" }
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
    case GOT_ALL_RESIDENTS:
      return payload.residents
    case UPDATE_SINGLE_RESIDENT:
      return [...state, payload.residentInfo]
    case UPDATE_RESIDENTS:
      return [...state, ...payload.residentInfo]
    default:
      return state
  }
}

export default residentsReducer
