import * as React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { logout } from "../../reducers/user"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

const Header = () => {
  const dispatch = useDispatch()
  const [closed, toggleMenu] = useState(true)
  const [{ firstName, lastName, admin, id }] = useAuth()

  let history = useHistory()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(logout(history))
  }

  const handleToggle = () => {
    toggleMenu(!closed)
  }

  return (
    <React.Fragment>
      <div className="w-full font-sans">
        <nav className="flex justify-end border-b border-blue-800">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold text-xl m-4 w-12 h-12 rounded-full text-center"
            onClick={handleToggle}
            type="button"
          >
            {`${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}`}
          </button>
        </nav>
        {closed ? null : (
          <ul className="flex flex-col items-end bg-white shadow-md rounded px-8 py-6 m-4 fixed right-0 -mt-3">
            <li className="py-2">
              <Link
                className="font-bold text-lg text-gray-600 hover:text-gray-800"
                to={`/usuarios/${id}/editar`}
              >
                Editar perfil
              </Link>
            </li>
            {admin && (
              <li className="py-2">
                <Link
                  className="font-bold text-lg text-gray-600 hover:text-gray-800"
                  to={`/usuarios`}
                >
                  Usuários
                </Link>
              </li>
            )}
            {admin && (
              <li className="py-2">
                <Link
                  className="font-bold text-lg text-gray-600 hover:text-gray-800"
                  to={`/usuarios/novo`}
                >
                  Criar Usuário
                </Link>
              </li>
            )}
            <li className="py-2">
              <button
                className="font-bold text-lg text-gray-600 hover:text-gray-800"
                type="submit"
                onClick={handleSubmit}
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </React.Fragment>
  )
}

export default Header
