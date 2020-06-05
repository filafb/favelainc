import * as React from "react"
import FormPartner from "./FormPartner"

const NewPartner = () => {
  return (
    <div className="max-w-xs flex justify-center mx-auto flex-col">
      <h2 className="my-2">Criar Novo Parceiro</h2>
      <FormPartner />
    </div>
  )
}

export default NewPartner
