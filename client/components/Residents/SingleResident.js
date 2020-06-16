import * as React from "react"
import { useRouteMatch, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchSingleResidentAndRelatives } from "../../reducers/residents"
import ResidentCard from "./ResidentCard"

const SingleResident = () => {
  const {
    params: { id }
  } = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const residentsList = useSelector(({ residentsList }) => residentsList)

  React.useEffect(() => {
    async function getOneUser(id) {
      const response = await dispatch(fetchSingleResidentAndRelatives(id))
      if (response.error) {
        history.push("/moradores")
      }
    }
    if (!residentsList.length) {
      getOneUser(id)
    }
  }, [residentsList])

  const resident = residentsList.length
    ? residentsList.find(resident => resident.id === Number(id))
    : {}
  const relatives = residentsList.length
    ? residentsList.filter(
        relative =>
          relative.familyId === resident.familyId && relative.id !== resident.id
      )
    : []

  return resident.id ? (
    <>
      <div>
        <h2 className="text-2xl">{`${resident.firstName} ${resident.lastName}`}</h2>
        <p>{`CPF: ${resident.cpf}`}</p>
        <Link to={`/familias/${resident.familyId}`}>
          <p>{`ID Família: ${resident.familyId}`}</p>
        </Link>
      </div>
      {relatives.length ? (
        <div className="mt-4">
          <h2 className="text-2xl">Familiares</h2>
          {relatives.map(({ firstName, lastName, id, cpf }) => (
            <ResidentCard
              key={id}
              firstName={firstName}
              lastName={lastName}
              cpf={cpf}
              path="/moradores"
              id={id}
            />
          ))}
        </div>
      ) : null}
    </>
  ) : null
}

export default SingleResident
