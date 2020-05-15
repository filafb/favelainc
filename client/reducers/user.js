import axios from "axios"

const GET_USER = "GET_USER"
const LOGOUT = "LOGOUT"

const defaultUser = {}

//action
const getUser = user => {
  return {
    type: GET_USER,
    user
  }
}

const cleanUser = () => ({ type: LOGOUT })

//thunk
export const fetchUser = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/auth/me")
    dispatch(getUser(data || defaultUser))
  } catch (e) {
    console.error(e)
  }
}

export const logout = history => async dispatch => {
  try {
    await axios.delete("/api/auth/logout")
    dispatch(cleanUser())
    history.push("/")
  } catch (e) {
    console.log(e)
  }
}

export const login = ({ email, password }) => async dispatch => {
  try {
    const { data } = await axios.put("/api/auth/login", { email, password })
    dispatch(getUser(data))
    return { success: true }
  } catch (e) {
    console.error(e)
    return { error: true }
  }
}

export const create = (userInfo, history) => async dispatch => {
  try {
    const { data } = await axios.post("/api/auth/create", userInfo)
    console.log(data)
    history.push(`/usuarios/${data.id}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

const userReducer = (state = defaultUser, { type, ...payload }) => {
  switch (type) {
    case GET_USER:
      return payload.user
    case LOGOUT:
      return defaultUser
    default:
      return state
  }
}

export default userReducer
