import * as React from "react"
import { useRouteMatch, useHistory, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { fetchSingleResident } from "../../reducers/residents"

const SingleResident = () => {
  const {
    params: { id }
  } = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const resident = useSelector(({ residentsList }) => {
    return residentsList.find(resident => resident.id === Number(id))
  })

  React.useEffect(() => {
    async function getOneUser(id) {
      const response = await dispatch(fetchSingleResident(id))
      if (response.error) {
        history.push("/moradores")
      }
    }
    if (!resident) {
      getOneUser(id)
    }
  }, [resident])

  return resident ? (
    <div>
      <h2 className="text-2xl">{`${resident.firstName} ${resident.lastName}`}</h2>
      <p>{`CPF: ${resident.cpf}`}</p>
      <Link to={`/familias/${resident.familyId}`}>
        <p>{`ID Família: ${resident.familyId}`}</p>
      </Link>
    </div>
  ) : null
}

export default SingleResident
