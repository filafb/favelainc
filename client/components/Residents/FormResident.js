import * as React from "react"
import { InputField, SelectPartnerField } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import { useSelector, useDispatch } from "react-redux"
import useFormControl from "../Hooks/useFormControl"
import { createResident, searchResidentByCPF } from "../../reducers/residents"
import { useHistory, useLocation } from "react-router-dom"

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
  const { ngoPartners, residentsList } = useSelector(
    ({ ngoPartnersState: { ngoList }, residentsList }) => ({
      ngoPartners: ngoList,
      residentsList
    })
  )
  const [status, handleStatus, types] = useFormControl()
  const [searchCpf, setSearchCpf] = React.useState("")
  const [familyMember, setFamilyMember] = React.useState({})
  const dispatch = useDispatch()
  const [error, setError] = React.useState("")
  const [errorSearching, setErrorSearching] = React.useState("")
  const [submitError, setSubmitError] = React.useState("")
  const history = useHistory()
  const { state = {} } = useLocation()
  const checkCpf = /^(?![0]{11})([0-9]{11})$/

  React.useEffect(() => {
    if (state.relative) {
      setFamilyView("find")
      setFamilyMember(state.relative)
    }
  }, [state])

  const openFamilyAssociation = e => {
    setFamilyView(e.target.name)
    setErrorSearching("")
    setFamilyMember({})
    setSearchCpf("")
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
    setErrorSearching("")
    const searchValue = e.target.value
    const onlyDigits = /^[0-9]*$/g
    if (onlyDigits.test(searchValue)) {
      setFamilyMember({})
      setSearchCpf(e.target.value)
    }
  }

  const handleSearchClick = async () => {
    if (!checkCpf.test(searchCpf)) {
      setErrorSearching("CPF inválido")
      return
    }

    let residentInfo

    const findOnState = residentsList.find(
      resident => resident.cpf === searchCpf
    )

    if (findOnState) {
      residentInfo = findOnState
    } else {
      const response = await dispatch(searchResidentByCPF(searchCpf))
      if (response.message) {
        // handle this error = CPF não encontrado
        setErrorSearching(response.message)
        return
      } else if (response.error) {
        // handle this error = any other error
        console.log(response.error)
        setErrorSearching("Erro ao buscar")
        return
      } else {
        residentInfo = response
      }
    }
    setFamilyMember(residentInfo)
    dispatchForm({
      type: NGOPARTNER,
      payload: {
        ngoPartnerId: residentInfo.family.ngoPartnerId,
        newFamily: familyView === "new" ? true : false
      }
    })
  }

  const handelSubmit = async e => {
    e.preventDefault()
    const hasError = validateSubmission()
    if (hasError) {
      setSubmitError(hasError)
      return
    }
    if (status === types.SUBMITTING) {
      return
    }
    const residentInfo = {
      cpf,
      firstName,
      lastName,
      familyDetails: {
        newFamily,
        ngoPartnerId,
        familyId: familyMember.familyId
      }
    }
    const response = await dispatch(createResident(residentInfo, history))
    if (response.error) {
      setError(
        response.message === "Validation error"
          ? "CPF já cadastrado"
          : response.message
      )
      handleStatus({ type: types.ERROR })
    }
  }

  const validateSubmission = () => {
    let errorMessage
    if (!cpf) {
      errorMessage = "Entre CPF do morador"
    } else if (!checkCpf.test(cpf)) {
      errorMessage = "CPF precisa ter 11 dígitos"
    } else if (!firstName) {
      errorMessage = "Entre Nome do morador"
    } else if (!lastName) {
      errorMessage = "Entre sobrenome do morador"
    } else if (!ngoPartnerId) {
      errorMessage =
        "Busque morador existente para associar ou crie nova família"
    }
    return errorMessage
  }
  const [readyToSubmit, setReadyToSubmit] = React.useState(false)
  React.useEffect(() => {
    let validateForm = validateSubmission()
    if (!validateForm) {
      setReadyToSubmit(true)
    }
  }, [firstName, lastName, cpf, ngoPartnerId])

  React.useEffect(() => {
    if (familyMember.family) {
      const findPartner = ngoPartners.find(
        partner => partner.id === familyMember.family.ngoPartnerId
      )
      if (findPartner) {
        dispatchForm({
          type: NGOPARTNER,
          payload: {
            ngoPartnerId: findPartner.id,
            newFamily: familyView === "new" ? true : false
          }
        })
      }
    }
  }, [familyMember, ngoPartners])

  const [showErrorBanner, setBanner] = React.useState(false)

  React.useEffect(() => {
    if (submitError || status === types.ERROR) {
      setBanner(true)
    }
    setTimeout(() => {
      setBanner(false)
      setSubmitError("")
      handleStatus({ type: types.IDLE })
    }, 3000)
  }, [submitError, status])

  let ngoName
  if (familyMember.family) {
    const findPartner = ngoPartners.find(
      partner => partner.id === familyMember.family.ngoPartnerId
    )
    ngoName = findPartner ? findPartner.name : ""
  }

  return (
    <>
      <form onSubmit={handelSubmit}>
        <InputField
          label="CPF - Apenas números"
          type="text"
          value={cpf}
          name={CPF}
          onChange={handleChange}
          placeholder="CPF (Apenas números)"
          required
          autocomplete="off"
          validation={checkCpf}
          validationText="CPF precisa conter 11 dígitos"
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
                autocomplete="off"
              />
              <button
                type="button"
                className={`${errorSearching &&
                  "text-red-600"} absolute right-0 top-0 h-full mr-3`}
                onClick={handleSearchClick}
              >
                {errorSearching || "Buscar"}
              </button>
            </div>
            {familyMember.id && (
              <div>
                <p>{`Nome: ${familyMember.firstName} ${familyMember.lastName}`}</p>
                <p>{`ID família: ${familyMember.familyId}`}</p>
                <p>{`Ong Responsável: ${ngoName}`}</p>
              </div>
            )}
          </>
        )}
        {familyView === "new" && (
          <div>
            <SelectPartnerField
              label="Criando nova família - Selecione ONG responsável"
              name={NGOPARTNER}
              value={ngoPartnerId}
              onChange={handleFamilyDetails}
              ngoPartners={ngoPartners}
            />
          </div>
        )}
        <div className="relative">
          <PrimaryButton
            readyToSubmit={readyToSubmit}
            text="Criar Novo Morador"
            type="submit"
          />
          {showErrorBanner && (
            <div className="absolute flex justify-center items-center bg-red-600 top-0 h-full w-full">
              {submitError && <p>{submitError}</p>}
              {status === types.ERROR && <p>{error}</p>}
            </div>
          )}
        </div>
      </form>
    </>
  )
}

export default FormResident
