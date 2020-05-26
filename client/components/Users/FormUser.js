import * as React from "react"
import { InputField, ToggleSwitch } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import useFormControl from "../Hooks/useFormControl"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

const FIRSTNAME = "FIRSTNAME"
const LASTNAME = "LASTNAME"
const EMAIL = "EMAIL"
const PASSWORD = "PASSWORD"
const CONFIRMPASSWORD = "CONFIRMPASSWORD"
const ISADMIN = "ISADMIN"
const RESET = "REST"
const POPULATE = "POPULATE"
const NGOPARTNER = "NGOPARTNER"
const userFormState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  admin: false,
  ngoPartnerId: ""
}

const userFormReducer = (state = userFormState, { type, payload }) => {
  switch (type) {
    case FIRSTNAME:
      return { ...state, firstName: payload }
    case LASTNAME:
      return { ...state, lastName: payload }
    case EMAIL:
      return { ...state, email: payload }
    case PASSWORD:
      return { ...state, password: payload }
    case CONFIRMPASSWORD:
      return { ...state, confirmPassword: payload }
    case ISADMIN:
      return { ...state, admin: payload }
    case NGOPARTNER:
      return { ...state, ngoPartnerId: payload }
    case RESET:
      return userFormState
    case POPULATE:
      return { ...state, ...payload }
    default:
      return state
  }
}

const FormUser = ({
  errorMessage,
  actionToDispatch,
  buttonText,
  populateFields
}) => {
  const [
    {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      admin,
      ngoPartnerId
    },
    dispatchForm
  ] = React.useReducer(userFormReducer, userFormState)
  const [status, handleStatus, types] = useFormControl()
  const dispatch = useDispatch()
  const history = useHistory()
  const ngoPartners = useSelector(
    ({ ngoPartnersState: { ngoList } }) => ngoList
  )

  React.useEffect(() => {
    if (populateFields) {
      dispatchForm({ type: POPULATE, payload: populateFields })
    }
  }, [populateFields])

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
    let userInfo = {
      firstName,
      lastName,
      email,
      admin,
      ngoPartnerId: Number(ngoPartnerId)
    }
    const passwordPresent = password ? password : false
    userInfo = passwordPresent
      ? { ...userInfo, password: passwordPresent }
      : userInfo
    const status = await dispatch(actionToDispatch(userInfo, history))
    if (status.error) {
      handleStatus({ type: types.ERROR })
      if (populateFields) {
        dispatchForm({ type: POPULATE, payload: populateFields })
      }
    }
  }
  const disabled =
    !firstName ||
    !lastName ||
    !email ||
    status === types.SUBMITTING ||
    (populateFields
      ? !!password && password !== confirmPassword
      : !password || password !== confirmPassword)
  const isError = status === types.ERROR

  return (
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
        editable={populateFields ? false : true}
      />
      <InputField
        label={populateFields ? "Nova Senha" : "Senha"}
        placeholder={populateFields ? "Nova Senha" : "Senha"}
        value={password}
        name={PASSWORD}
        onChange={handleChange}
        type="password"
        required={populateFields ? false : true}
        autocomplete="new-password"
      />
      <InputField
        label={populateFields ? "Confirmar Nova Senha" : "Confirmar Senha"}
        placeholder={
          populateFields ? "Confirmar Nova Senha" : "Confirmar Senha"
        }
        value={confirmPassword}
        name={CONFIRMPASSWORD}
        onChange={handleChange}
        type="password"
        required={populateFields ? false : true}
      />
      <div className="my-5">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Organização
        </label>
        <select
          required
          name={NGOPARTNER}
          value={ngoPartnerId}
          onChange={handleChange}
        >
          <option value="" disabled>
            Selecione uma organização
          </option>
          {ngoPartners.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            )
          })}
        </select>
      </div>
      <ToggleSwitch
        type="checkbox"
        value={admin}
        name={ISADMIN}
        onChange={handleChange}
      />
      <PrimaryButton disabled={disabled} text={buttonText} type="submit" />
      {isError && (
        <div className="w-full flex justify-center">
          <p className="text-sm italic text-red-700 absolute mt-2">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
  )
}

export default FormUser
