import axios from "axios"
import { batch } from "react-redux"
import { updateResidents } from "./residents"

const GOT_ALL_FAMILIES = "GOT_ALL_FAMILIES"
const GOT_SINGLE_FAMILY = "GOT_SINGLE_FAMILY"

const gotAllFamilies = families => {
  return {
    type: GOT_ALL_FAMILIES,
    families
  }
}

const updateFamily = family => {
  return {
    type: GOT_SINGLE_FAMILY,
    family
  }
}

export const fetchFamilies = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/families")
    dispatch(gotAllFamilies(data))
    return { success: "Todas famílias recebidas" }
  } catch {
    return { error: "Erro ao visualizar famílias" }
  }
}

export const fetchSingleFamily = id => async dispatch => {
  try {
    const { data } = await axios.get(`/api/families/${id}`)
    dispatch(updateFamily(data))
    return { success: true }
  } catch (error) {
    return { error: "Erro ao receber família" }
  }
}

const familiesReducer = (state = [], { type, ...payload }) => {
  switch (type) {
    case GOT_ALL_FAMILIES:
      return payload.families

    case GOT_SINGLE_FAMILY:
      return [...state, payload.family]
    default:
      return state
  }
}

export default familiesReducer
