import * as React from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleFamily } from "../../reducers/families"
import { findFamilyMembersByFamily } from "../../reducers/residents"
import ResidentCard from "../Residents/ResidentCard"
import { SecondaryButton } from "../Partials/Buttons"

const SingleFamily = () => {
  const {
    params: { id }
  } = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const [
    families,
    residents
  ] = useSelector(({ familiesList, residentsList }) => [
    familiesList,
    residentsList
  ])
  const [familyMembers, setFamilyMember] = React.useState([])

  const family = families.find(family => family.id === Number(id))

  React.useEffect(() => {
    async function getOneFamily(id) {
      const response = await dispatch(fetchSingleFamily(id))
      if (response.error) {
        history.push("/familias")
      }
    }
    if (!family) {
      getOneFamily(id)
    }
    const filterMembers = residents.filter(resident => {
      return resident && resident.familyId === Number(id)
    })

    if (filterMembers.length) {
      setFamilyMember(filterMembers)
    }
  }, [id, family, residents])

  const handleSeeFamilyMembers = () => {
    dispatch(findFamilyMembersByFamily(Number(id)))
  }

  return (
    <>
      {family && family.id && (
        <div>
          <h2 className="text-2xl">{`Família ${family.id}`}</h2>
          <p>{`Moradores cadastrados: ${family.familyMembers}`}</p>
        </div>
      )}
      <div className="mt-4">
        {familyMembers.length ? (
          <div>
            <h2 className="text-2xl">Familiares</h2>
            {familyMembers.map(({ firstName, lastName, id, cpf }) => (
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
        ) : (
          <div onClick={handleSeeFamilyMembers}>
            <SecondaryButton text="Moradores cadastrados" type="button" />
          </div>
        )}
      </div>
    </>
  )
}

export default SingleFamily
