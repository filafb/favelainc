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

export const logout = () => async dispatch => {
  try {
    await axios.delete("/api/auth/logout")
    dispatch(cleanUser())
  } catch (e) {
    console.log(e)
  }
}

export const login = ({ email, password }) => async dispatch => {
  try {
    const { data } = await axios.put("/api/auth/login", { email, password })
    dispatch(getUser(data))
  } catch (e) {
    console.error(e)
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
