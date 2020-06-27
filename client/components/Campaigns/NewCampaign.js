import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFamilies } from "../../reducers/families"
import FamilyCard from "../Families/FamilyCard"
import { SelectPartnerField } from "../Partials/FormField"

const NGO_PARTNER = "NGO_PARTNER"
const UPDATE_FAMILIES = "UPDATE_FAMILIES"
const LOAD_FAMILIES = "LOAD_FAMILIES"

const newCampaignState = {
  ngoPartnerId: "",
  families: []
}

const newCampaignReducer = (state = newCampaignState, { type, payload }) => {
  switch (type) {
    case NGO_PARTNER:
      return { ...state, ngoPartnerId: payload.partnerId }
    case LOAD_FAMILIES:
      return { ...state, families: payload.families }
    case UPDATE_FAMILIES: {
      const updatedFamilies = state.families.map(family => {
        if (family.id === Number(payload.familyId)) {
          const updateFamily = { ...family, selected: !family.selected }
          console.log(updateFamily)
          return updateFamily
        } else {
          return family
        }
      })
      return { ...state, families: updatedFamilies }
    }
    default:
      return state
  }
}

const NewCampaign = () => {
  const dispatch = useDispatch()
  const [
    familiesState,
    loggedUser,
    ngoPartners
  ] = useSelector(
    ({
      familiesList,
      usersState: { loggedUser },
      ngoPartnersState: { ngoList }
    }) => [familiesList, loggedUser, ngoList]
  )
  const [{ ngoPartnerId, families }, dispatchForm] = React.useReducer(
    newCampaignReducer,
    newCampaignState
  )

  React.useEffect(() => {
    dispatch(fetchFamilies())
  }, [])

  React.useEffect(() => {
    dispatchForm({ type: LOAD_FAMILIES, payload: { families: familiesState } })
  }, [familiesState])

  const toggleSelected = familyId => {
    console.log(familyId)
    dispatchForm({ type: UPDATE_FAMILIES, payload: { familyId } })
  }

  const totalSelected = families.filter(family => family.selected)

  return (
    <>
      <div className="sticky top-0 bg-white">
        <SelectPartnerField
          label="Selecione ONG"
          name={NGO_PARTNER}
          value={ngoPartnerId}
          onChange={() => {}}
          ngoPartners={ngoPartners}
        />
        <p>{`Famílias selecionadas ${totalSelected.length}/${families.length}`}</p>
      </div>
      <ul>
        {families.map(family => {
          return (
            <div
              onClick={() => toggleSelected(family.id)}
              key={family.id}
              className={family.selected ? "bg-blue-400" : ""}
            >
              <FamilyCard id={family.id} familyMembers={family.familyMembers} />
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default NewCampaign
