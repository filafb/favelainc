import * as React from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleFamily } from "../../reducers/families"

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

  const family = families.find(family => family.id === Number(id))

  React.useEffect(() => {
    async function getOneFamily(id) {
      console.log("Ran")
      const response = await dispatch(fetchSingleFamily(id))
      if (response.error) {
        history.push("/familias")
      }
    }
    if (!family) {
      getOneFamily(id)
    }
  }, [id, family])

  console.log(residents)
  const familyMembers = residents.filter(
    resident => resident && resident.familyId === Number(id)
  )

  console.log(family, familyMembers)

  return <div>Single</div>
}

export default SingleFamily
