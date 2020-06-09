import * as React from "react"
import { InputField } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"

const FormResident = () => {
  return (
    <form onSubmit={() => {}}>
      <InputField
        label="CPF"
        type="text"
        value="1234"
        name="CPF"
        onChange={() => {}}
        placeholder="CPF Novo Morador"
        required
      />
      <InputField
        label="Primeiro Nome"
        type="text"
        value="João"
        name="NOME"
        onChange={() => {}}
        placeholder="Primeiro Nome Novo Morador"
        required
      />
      <InputField
        label="Sobrenome"
        type="text"
        value="Silva"
        name="SOBRENOME"
        onChange={() => {}}
        placeholder="Sobrenome Novo Morador"
        required
      />
      <div className="flex text-center mb-8">
        <button type="button" className="w-1/2 p-2 underline text-blue-500">
          Associar membro família
        </button>
        <button type="button" className="w-1/2 p-2 underline text-blue-500">
          Criar Nova Família
        </button>
      </div>
      <PrimaryButton disabled={false} text="Criar Novo Morador" type="submit" />
    </form>
  )
}

export default FormResident
