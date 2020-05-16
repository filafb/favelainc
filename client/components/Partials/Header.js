import * as React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../reducers/user"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import useAuth from "../Hooks/useAuth"

const Header = () => {
  const dispatch = useDispatch()
  const [closed, toggleMenu] = useState(true)
  const [{ firstName, lastName, admin }] = useAuth()

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
      <div className="sticky w-full font-sans">
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
            {admin && (
              <li>
                <Link
                  className="font-bold text-lg text-gray-600 hover:text-gray-800"
                  to={`/usuarios/novo`}
                >
                  Criar Usuário
                </Link>
              </li>
            )}
            <li>
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
