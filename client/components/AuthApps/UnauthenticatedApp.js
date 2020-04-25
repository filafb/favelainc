import * as React from "react"
import { useReducer } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../reducers/user"

const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"

const loginState = {
  email: "",
  password: ""
}

const loginReducer = (state = loginState, { type, payload }) => {
  switch (type) {
    case EMAIL:
      return { ...state, ...{ email: payload } }
    case PASSWORD:
      return { ...state, ...{ password: payload } }
  }
}

const UnauthenticatedApp = () => {
  const [{ email, password }, dispatchForm] = useReducer(
    loginReducer,
    loginState
  )
  const dispatch = useDispatch()

  const handleChange = e => {
    dispatchForm({ type: e.target.name, payload: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(login({ email, password }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>E-mail</label>
      <input
        type="email"
        value={email}
        name={EMAIL}
        placeholder="Entre com o seu E-mail"
        onChange={handleChange}
      ></input>
      <label>Senha</label>
      <input
        type="password"
        value={password}
        name={PASSWORD}
        placeholder="Entre com a sua senha"
        onChange={handleChange}
      ></input>
      <button type="submit">Login</button>
    </form>
  )
}

export default UnauthenticatedApp
