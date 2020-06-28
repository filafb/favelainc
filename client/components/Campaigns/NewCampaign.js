import * as React from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchFamilies } from "../../reducers/families"
import FamilyCard from "../Families/FamilyCard"
import { SelectPartnerField } from "../Partials/FormField"
import useFormControl from "../Hooks/useFormControl"
import { PrimaryButton } from "../Partials/Buttons"

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
  const [campaignName, setCampaignName] = React.useState("")
  const [status, handleStatus, types] = useFormControl()

  React.useEffect(() => {
    dispatch(fetchFamilies())
    if (!loggedUser.ngoPartner.master) {
      dispatchForm({
        type: NGO_PARTNER,
        payload: { partnerId: loggedUser.ngoPartnerId }
      })
    }
  }, [])

  React.useEffect(() => {
    dispatchForm({ type: LOAD_FAMILIES, payload: { families: familiesState } })
  }, [familiesState])

  React.useEffect(() => {
    const partner = ngoPartners.find(
      partner => partner.id === Number(ngoPartnerId)
    )
    const date = JSON.stringify(new Date()).slice(1, 11)

    const campaignName =
      ngoPartners.length && ngoPartnerId ? `${partner.name}-${date}` : ""
    setCampaignName(campaignName)
  }, [ngoPartners, ngoPartnerId])

  const toggleSelected = familyId => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    dispatchForm({ type: UPDATE_FAMILIES, payload: { familyId } })
  }

  const handleChange = e => {
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.IDLE })
    dispatchForm({
      type: NGO_PARTNER,
      payload: { partnerId: e.target.value }
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === types.SUBMITTING) {
      return
    }
    handleStatus({ type: types.SUBMITTING })
    const selectedFamiliesId = families
      .filter(family => family.selected)
      .map(family => family.id)
    console.log({ selectedFamiliesId, ngoPartnerId, campaignName })
  }

  const totalSelected = families.filter(family => family.selected)

  const filteredFamilies = families.filter(
    family => family.ngoPartnerId === Number(ngoPartnerId)
  )

  const disabled = !totalSelected.length || !ngoPartnerId || !campaignName

  return (
    <form onSubmit={handleSubmit}>
      <div className="sticky top-0 bg-white">
        {loggedUser.ngoPartner.master && (
          <SelectPartnerField
            label="Selecione ONG"
            name={NGO_PARTNER}
            value={ngoPartnerId}
            onChange={handleChange}
            ngoPartners={ngoPartners}
          />
        )}
        <p>{`Campanha: ${campaignName}`}</p>
        <p>{`Famílias selecionadas ${totalSelected.length}/${filteredFamilies.length}`}</p>
        <PrimaryButton
          type="submit"
          text="Criar Camapanha"
          disabled={disabled}
        />
      </div>
      <ul className="mt-4">
        {filteredFamilies.map(family => {
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
    </form>
  )
}

export default NewCampaign
