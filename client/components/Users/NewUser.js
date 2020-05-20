import * as React from "react"
import { create } from "../../reducers/user"
import FormUser from "./FormUser"

const NewUser = () => {
  return (
    <div className="max-w-xs flex justify-center mx-auto flex-col">
      <h2 className="my-2">Preencha as informações do novo usuário</h2>
      <FormUser
        errorMessage="Erro ao criar usuário."
        actionToDispatch={create}
        buttonText="Criar Novo"
      />
    </div>
  )
}

export default NewUser
