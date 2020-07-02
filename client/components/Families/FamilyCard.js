import * as React from "react"
import { Link } from "react-router-dom"
import { PrimaryButton } from "../Partials/Buttons"
import { useSelector } from "react-redux"

const FamilyCard = ({ id, path, familyMembers, createCampaign }) => {
  const campaigns = useSelector(({ campaignsList }) => campaignsList)

  const campaignsThisFamily = campaigns.filter(campaign =>
    campaign.families.some(family => family.id === Number(id))
  )

  let campaignsByNameAndDate = []
  if (campaignsThisFamily.length) {
    campaignsThisFamily.forEach(campaign => {
      const summaryCampaign = {
        campaignName: campaign.name,
        deliveredDate: campaign.families.find(
          ({ id: familyId }) => familyId === Number(id)
        ).campaign_control.dateDelivered
      }
      campaignsByNameAndDate.push(summaryCampaign)
    })
  }

  const sortedCampaigns = campaignsByNameAndDate.sort((a, b) => {
    if (!a.deliveredDate) return -1
    if (!b.deliveredDate) return 1
    return new Date(b.deliveredDate) - new Date(a.deliveredDate)
  })

  const nextCampaign = sortedCampaigns.find(campaign => !campaign.deliveredDate)
  const lastReceived = sortedCampaigns.find(campaign => campaign.deliveredDate)

  const shouldReceive =
    !lastReceived ||
    (lastReceived &&
      new Date() - new Date(lastReceived.deliveredDate) >
        30 * 24 * 60 * 60 * 1000)

  const renderFamilyCard = !createCampaign || (!nextCampaign && shouldReceive)

  return renderFamilyCard ? (
    <li className="flex py-4 items-center justify-between">
      <div>
        <p>{`ID família: ${id}`}</p>
        <p>{`Familiares Cadastrados: ${Number(familyMembers)}`}</p>
        <p>{`Última cesta: ${
          lastReceived ? new Date(lastReceived.deliveredDate) : "-"
        }`}</p>
        <p>{`Próxima cesta: ${
          nextCampaign ? nextCampaign.campaignName : "Não agendado"
        }`}</p>
      </div>
      {path && (
        <Link to={`${path}/${id}`}>
          <PrimaryButton type="button" text="Ver" />
        </Link>
      )}
    </li>
  ) : null
}

export default FamilyCard
