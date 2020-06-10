import * as React from "react"
import { InputField, SelectPartnerField } from "../Partials/FormField"
import { PrimaryButton } from "../Partials/Buttons"
import { useSelector } from "react-redux"

const FormResident = () => {
  const [familyView, setFamilyView] = React.useState("")
  const ngoPartners = useSelector(
    ({ ngoPartnersState: { ngoList } }) => ngoList
  )

  const openFamilyAssociation = e => {
    setFamilyView(e.target.name)
  }

  return (
    <>
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
                value=""
                name="search"
                placeholder="CPF do membro da família"
                onChange={() => {}}
              />
              <button
                type="button"
                className="absolute right-0 top-0 h-full mr-3"
                onClick={() => {}}
              >
                Buscar
              </button>
            </div>
            <div>
              <p>Nome:</p>
              <p>ID família</p>
              <p>Ong Responsável</p>
            </div>
          </>
        )}
        {familyView === "new" && (
          <div>
            <p>Nova família</p>
            <SelectPartnerField
              name="partner"
              value=""
              onChange={() => {}}
              ngoPartners={ngoPartners}
            />
          </div>
        )}
        <PrimaryButton
          disabled={false}
          text="Criar Novo Morador"
          type="submit"
        />
      </form>
    </>
  )
}

export default FormResident
