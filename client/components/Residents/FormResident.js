import * as React from "react"
import { InputField, SelectPartnerField } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import { useSelector } from "react-redux"
import useFormControl from "../Hooks/useFormControl"

const CPF = "CPF"
const FIRSTNAME = "FIRSTNAME"
const LASTNAME = "LASTNAME"
const NGOPARTNER = "NGOPARTNER"

const residentFormState = {
  cpf: "",
  firstName: "",
  lastName: "",
  familyDetails: {
    newFamily: true,
    ngoPartnerId: ""
  }
}

const residentFormReducer = (state = residentFormState, { type, payload }) => {
  switch (type) {
    case CPF:
      return { ...state, cpf: payload }
    case FIRSTNAME:
      return { ...state, firstName: payload }
    case LASTNAME:
      return { ...state, lastName: payload }
    case NGOPARTNER: {
      return {
        ...state,
        familyDetails: {
          newFamily: payload.newFamily,
          ngoPartnerId: payload.ngoPartnerId
        }
      }
    }
    default:
      return state
  }
}

const FormResident = () => {
  const [
    {
      firstName,
      lastName,
      cpf,
      familyDetails: { newFamily, ngoPartnerId }
    },
    dispatchForm
  ] = React.useReducer(residentFormReducer, residentFormState)
  const [familyView, setFamilyView] = React.useState("")
  const {
    ngoPartners,
    residentsList
  } = useSelector(({ ngoPartnersState: { ngoList }, residentsList }) => ({
    ngoPartners: ngoList,
    residentsList
  }))
  const [status, handleStatus, types] = useFormControl()
  const [searchCpf, setSearchCpf] = React.useState("")
  const [familyMember, setFamilyMember] = React.useState({})

  const openFamilyAssociation = e => {
    setFamilyView(e.target.name)
    dispatchForm({
      type: NGOPARTNER,
      payload: {
        ngoPartnerId: "",
        newFamily: e.target.name === "new" ? true : false
      }
    })
  }

  const handleChange = e => {
    if (status === types.SUBMITTING) {
      return
    }

    handleStatus({ type: types.IDLE })
    dispatchForm({ type: e.target.name, payload: e.target.value })
  }

  const handleFamilyDetails = e => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    dispatchForm({
      type: e.target.name,
      payload: {
        ngoPartnerId: e.target.value,
        newFamily: familyView === "new" ? true : false
      }
    })
  }

  const handleSearch = e => {
    const searchValue = e.target.value
    const onlyDigits = /^[0-9]*$/g
    if (onlyDigits.test(searchValue)) {
      setSearchCpf(e.target.value)
    }
  }

  const handleSearchClick = () => {
    console.log(residentsList)
    console.log(searchCpf)
  }

  const checkCpf = /^(?![0]{11})([0-9]{11})$/

  const disabled =
    !firstName || !lastName || !checkCpf.test(cpf) || !ngoPartnerId

  return (
    <>
      <form onSubmit={() => {}}>
        <InputField
          label="CPF - Apenas números"
          type="text"
          value={cpf}
          name={CPF}
          onChange={handleChange}
          placeholder="CPF (Apenas números)"
          required
          autocomplete="off"
          pattern="^(?![0]{11})([0-9]{11})$"
        />
        <InputField
          label="Primeiro Nome"
          type="text"
          value={firstName}
          name={FIRSTNAME}
          onChange={handleChange}
          placeholder="Primeiro Nome Novo Morador"
          autocomplete="off"
          required
        />
        <InputField
          label="Sobrenome"
          type="text"
          value={lastName}
          name={LASTNAME}
          onChange={handleChange}
          placeholder="Sobrenome Novo Morador"
          autocomplete="off"
          required
        />
        <div className="flex text-center mb-8">
          <button
            name="find"
            onClick={openFamilyAssociation}
            type="button"
            className={`w-1/2 p-2 ${
              familyView === "find"
                ? " bg-blue-500 text-white"
                : "underline text-blue-500"
            }`}
          >
            Associar membro família
          </button>
          <button
            name="new"
            onClick={openFamilyAssociation}
            type="button"
            className={`w-1/2 p-2 ${
              familyView === "new"
                ? " bg-blue-500 text-white"
                : "underline text-blue-500"
            }`}
          >
            Criar Nova Família
          </button>
        </div>
        {familyView === "find" && (
          <>
            <div className="relative">
              <InputField
                type="text"
                value={searchCpf}
                name="search"
                placeholder="CPF do membro da família"
                onChange={handleSearch}
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full mr-3"
                onClick={handleSearchClick}
              >
                Buscar
              </button>
            </div>
            {familyMember.id && (
              <div>
                <p>Nome: </p>
                <p>ID família</p>
                <p>Ong Responsável</p>
              </div>
            )}
          </>
        )}
        {familyView === "new" && (
          <div>
            <p>Nova família</p>
            <SelectPartnerField
              name={NGOPARTNER}
              value={ngoPartnerId}
              onChange={handleFamilyDetails}
              ngoPartners={ngoPartners}
            />
          </div>
        )}
        <PrimaryButton
          disabled={disabled}
          text="Criar Novo Morador"
          type="submit"
        />
      </form>
    </>
  )
}

export default FormResident
