import axios from "axios"

const GET_USER = "GET_USER"
const LOGIN = "LOGIN"

const defaultUser = {}

//action
const getUser = user => {
  return {
    type: GET_USER,
    user
  }
}

//thunk
export const fetchUser = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/auth/me")
    dispatch(getUser(data || defaultUser))
  } catch (e) {
    console.error(e)
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
    default:
      return state
  }
}

export default userReducer
