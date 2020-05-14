import * as React from "react"
import { useReducer } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../../reducers/user"
import useFormControl from "../../Hooks/useFormControl"
import { PrimaryButton } from "../../Partials/Buttons"
import { InputField } from "../../Partials/FormField"

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
    handleStatus({ type: types.SUCCESS })
    if (status.error) {
      handleStatus({ type: types.ERROR })
    }
  }

  const disabled = !email || !password || status === types.SUBMITTING
  const isError = status === types.ERROR

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
          <InputField
            label="E-mail"
            type="email"
            value={email}
            name={EMAIL}
            placeholder="Entre com o seu E-mail"
            onChange={handleChange}
            required
          />
          <InputField
            label="Senha"
            type="password"
            value={password}
            name={PASSWORD}
            placeholder="Entre com a sua senha"
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex justify-center w-full">
          <PrimaryButton disabled={disabled} text="Login" type="submit" />
        </div>
        {isError && (
          <div className="w-full flex justify-center">
            <p className="text-sm italic text-red-700 absolute mt-2">
              Usuário não autorizado
            </p>
          </div>
        )}
      </form>
    </div>
  )
}

export default LoginForm
