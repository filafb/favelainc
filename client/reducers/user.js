import axios from "axios"

const LOGIN_USER = "LOGIN_USER"
const LOGOUT = "LOGOUT"
const CREATE_USER = "CREATE_USER"
const UPDATE_USER = "UPDATE_USER"
const GOT_USERS = "GOT_USERS"

const userState = {
  loggedUser: {},
  users: []
}

//action
const getUser = user => {
  return {
    type: LOGIN_USER,
    user
  }
}

const createUser = user => ({
  type: CREATE_USER,
  user
})

const updateUser = user => ({
  type: UPDATE_USER,
  user
})

const cleanUser = () => ({ type: LOGOUT })

const gotAllUsers = users => ({
  type: GOT_USERS,
  users
})

//thunk
export const fetchUser = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/auth/me")
    dispatch(getUser(data || userState.loggedUser))
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
    const { data } = await axios.post("/api/users/create", userInfo)
    dispatch(createUser(data))
    history.push(`/usuarios/${data.id}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

export const updateUserInfo = (userInfo, history) => async dispatch => {
  try {
    const { data } = await axios.put("/api/users/update", userInfo)
    dispatch(updateUser(data))
    history.push(`/usuarios/${data.id}`)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

export const fetchAllUsers = () => async dispatch => {
  try {
    const { data } = await axios.get("api/users")
    dispatch(gotAllUsers(data))
  } catch (error) {
    console.error(error)
    return { error: true }
  }
}

const userReducer = (state = userState, { type, ...payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        loggedUser: payload.user,
        users: [...state.users, payload.user]
      }
    case CREATE_USER:
      return { ...state, users: [...state.users, payload.user] }
    case UPDATE_USER: {
      const userListUpdate = state.users.map(user => {
        if (user.id === payload.user.id) {
          return payload.user
        } else {
          return { ...user }
        }
      })
      const updateLoggedUser =
        state.loggedUser.id === payload.user.id
          ? payload.user
          : { ...state.loggedUser }
      return { ...state, users: userListUpdate, loggedUser: updateLoggedUser }
    }

    case LOGOUT:
      return userState

    case GOT_USERS:
      return { ...state, users: payload.users }
    default:
      return state
  }
}

export default userReducer
