import * as React from "react"
import { useReducer } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../../reducers/user"
import useFormControl from "../../Hooks/useFormControl"

const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"
const RESET = "REST"
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
    case RESET:
      return loginState
    default:
      return state
  }
}

const LoginForm = () => {
  const [{ email, password }, dispatchForm] = useReducer(
    loginReducer,
    loginState
  )
  const dispatch = useDispatch()
  const [status, handleStatus, types] = useFormControl()

  const handleChange = e => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    dispatchForm({ type: e.target.name, payload: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.SUBMITTING })
    dispatchForm({ type: RESET })
    const status = await dispatch(login({ email, password }))
    if (status.error) {
      handleStatus({ type: types.ERROR })
    }
  }

  return (
    <div className="w-full max-w-md">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-4"
        onSubmit={handleSubmit}
      >
        <div className="text-center">
          <p className="text-sm italic">
            Realize o login com seu e-mail e senha
          </p>
        </div>
        <div className="my-8">
          <div className="my-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              value={email}
              name={EMAIL}
              placeholder="Entre com o seu E-mail"
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="my-5">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              value={password}
              name={PASSWORD}
              placeholder="Entre com a sua senha"
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-gray-600"
            type="submit"
            disabled={!email || !password || status === types.SUBMITTING}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
