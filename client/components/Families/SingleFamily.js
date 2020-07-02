import * as React from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleFamily } from "../../reducers/families"
import { findFamilyMembersByFamily } from "../../reducers/residents"
import ResidentCard from "../Residents/ResidentCard"
import { SecondaryButton, PrimaryButton } from "../Partials/Buttons"
import { updateCampaign } from "../../reducers/campaigns"

const SingleFamily = () => {
  const {
    params: { id }
  } = useRouteMatch()
  const dispatch = useDispatch()
  const history = useHistory()
  const [
    families,
    residents,
    campaigns
  ] = useSelector(({ familiesList, residentsList, campaignsList }) => [
    familiesList,
    residentsList,
    campaignsList
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

  const [campaignsFamily, setCampaignsFamily] = React.useState([])

  React.useEffect(() => {
    const filteredCampaigns = campaigns.filter(campaign => {
      return campaign.families.some(family => family.id === Number(id))
    })
    setCampaignsFamily(filteredCampaigns)
  }, [campaigns, id])

  const handleSeeFamilyMembers = () => {
    dispatch(findFamilyMembersByFamily(Number(id)))
  }

  const handleReceiveBasket = campaignId => {
    dispatch(updateCampaign({ familyId: id, campaignId, date: new Date() }))
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
        <div className="mt-4">
          {!!campaignsFamily.length && (
            <>
              <h2 className="text-2xl">Cestas</h2>
              {campaignsFamily.map(campaign => {
                const {
                  campaign_control: { dateDelivered }
                } = campaign.families.find(family => family.id === Number(id))
                return (
                  <div key={campaign.id} className="mt-4">
                    <p>{`Campanha: ${campaign.name}`}</p>
                    {dateDelivered ? (
                      <p>{`Data Recebimento: ${new Date(dateDelivered)}`}</p>
                    ) : (
                      <div onClick={() => handleReceiveBasket(campaign.id)}>
                        <PrimaryButton text="Receber cesta" type="button" />
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default SingleFamily
