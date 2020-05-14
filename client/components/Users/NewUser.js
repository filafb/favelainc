import * as React from "react"
import { InputField, ToggleSwitch } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import useFormControl from "../Hooks/useFormControl"

const FIRSTNAME = "FIRSTNAME"
const LASTNAME = "LASTNAME"
const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"
const CONFIRMPASSWORD = "CONFIRMPASSWORD"
const ISADMIN = "ISADMIN"
const RESET = "REST"
const newUserState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  admin: false
}

const newUserReducer = (state = newUserReducer, { type, payload }) => {
  switch (type) {
    case FIRSTNAME:
      return { ...state, ...{ firstName: payload } }
    case LASTNAME:
      return { ...state, ...{ lastName: payload } }
    case EMAIL:
      return { ...state, ...{ email: payload } }
    case PASSWORD:
      return { ...state, ...{ password: payload } }
    case CONFIRMPASSWORD:
      return { ...state, ...{ confirmPassword: payload } }
    case ISADMIN:
      return { ...state, ...{ admin: payload } }
    case RESET:
      return newUserState
    default:
      return state
  }
}

const NewUser = () => {
  const [
    { firstName, lastName, email, password, confirmPassword, admin },
    dispatchForm
  ] = React.useReducer(newUserReducer, newUserState)
  const [status, handleStatus, types] = useFormControl()

  const handleChange = e => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    let payload
    if (e.target.name === ISADMIN) {
      payload = e.target.checked
    } else {
      payload = e.target.value
    }
    dispatchForm({ type: e.target.name, payload })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.SUBMITTING })
    dispatchForm({ type: RESET })
    const newUser = { firstName, lastName, email, password, admin }
    console.log(newUser)
    handleStatus({ type: types.SUCCESS })
  }

  return (
    <div className="max-w-xs flex justify-center mx-auto mt-8 flex-col">
      <h2 className="my-2">Preencha as informações do novo usuário</h2>
      <form className="w-full" onSubmit={handleSubmit}>
        <InputField
          label="Nome"
          type="text"
          value={firstName}
          name={FIRSTNAME}
          onChange={handleChange}
          placeholder="Primeiro nome do usuário"
          required
        />
        <InputField
          label="Sobrenome"
          type="text"
          value={lastName}
          name={LASTNAME}
          onChange={handleChange}
          placeholder="Sobrenome do usuário"
          required
        />
        <InputField
          label="E-mail"
          type="email"
          value={email}
          name={EMAIL}
          onChange={handleChange}
          placeholder="Email do usuário"
          required
        />
        <InputField
          label="Senha"
          placeholder="Senha"
          value={password}
          name={PASSWORD}
          onChange={handleChange}
          type="password"
          required
          autocomplete="new-password"
        />
        <InputField
          label="Confirmar Senha"
          value={confirmPassword}
          name={CONFIRMPASSWORD}
          onChange={handleChange}
          type="password"
          placeholder="Confirmar Senha"
          required
        />
        <ToggleSwitch
          type="checkbox"
          value={admin}
          name={ISADMIN}
          onChange={handleChange}
        />
        <PrimaryButton text="Criar Novo" type="submit" />
      </form>
    </div>
  )
}

export default NewUser