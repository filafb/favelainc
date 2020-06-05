import * as React from "react"
import { InputField } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import useFormControl from "../Hooks/useFormControl"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { createNgoPartner } from "../../reducers/ngoPartners"

const FormPartner = () => {
  const [ngoName, setNgoName] = React.useState("")
  const [status, handleStatus, types] = useFormControl()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.SUBMITTING })

    // dispatch
    const status = await dispatch(createNgoPartner(ngoName, history))
    if (status.error) {
      setNgoName("")
      handleStatus({ type: types.ERROR })
    }
  }

  const handleChange = e => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    setNgoName(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Nome ONG Parceira"
        type="text"
        value={ngoName}
        placeholder="Nome ONG Parceira"
        required
        onChange={handleChange}
      />
      <PrimaryButton disabled={!ngoName} text="Criar" type="submit" />
      {status === types.ERROR && (
        <div>
          <p>Erro ao criar</p>
        </div>
      )}
    </form>
  )
}

export default FormPartner
