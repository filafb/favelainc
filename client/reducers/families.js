import axios from "axios"

const GOT_ALL_FAMILIES = "GOT_ALL_FAMILIES"

const gotAllFamilies = families => {
  return {
    type: GOT_ALL_FAMILIES,
    families
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

const familiesReducer = (state = [], { type, ...payload }) => {
  switch (type) {
    case GOT_ALL_FAMILIES:
      return payload.families
    default:
      return state
  }
}

export default familiesReducer
