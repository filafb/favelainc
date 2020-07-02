import axios from "axios"

const CREATE_CAMPAIGN = "CREATE_CAMPAIGN"
const GOT_ALL_CAMPAIGNS = "GOT_ALL_CAMPAIGNS"
const UPDATE_CAMPAIGN = "UPDATE_CAMPAIGN"

const createdCampaign = campaign => {
  return {
    type: CREATE_CAMPAIGN,
    campaign
  }
}

const gotCampaigns = campaigns => {
  return {
    type: GOT_ALL_CAMPAIGNS,
    campaigns
  }
}

const updatedCampaign = campaign => {
  return {
    type: UPDATE_CAMPAIGN,
    campaign
  }
}

export const createCampaign = (campaignDetails, history) => async dispatch => {
  try {
    const { data } = await axios.post("/api/campaigns", campaignDetails)
    dispatch(createdCampaign(data))
    history.push(`/campanhas/${data.id}`)
    return { success: "Campanha criada" }
  } catch (error) {
    return { error: "Erro ao criar campanha" }
  }
}

export const fetchCampaigns = () => async dispatch => {
  try {
    const { data } = await axios.get("/api/campaigns")
    dispatch(gotCampaigns(data))
  } catch (error) {
    console.log("error fetching campaigns", error)
  }
}

export const updateCampaign = ({
  familyId,
  campaignId,
  date
}) => async dispatch => {
  try {
    const { data } = await axios.put("/api/campaigns", {
      familyId,
      campaignId,
      date
    })
    dispatch(updatedCampaign(data))
  } catch (error) {
    console.log("error updating campaign", error)
  }
}

const campaignReducer = (state = [], { type, ...payload }) => {
  switch (type) {
    case GOT_ALL_CAMPAIGNS:
      return payload.campaigns
    case CREATE_CAMPAIGN:
      return [...state, payload.campaign]
    case UPDATE_CAMPAIGN: {
      const updatedState = state.map(campaign => {
        if (campaign.id === payload.campaign.id) {
          return payload.campaign
        } else {
          return campaign
        }
      })
      return updatedState
    }
    default:
      return state
  }
}

export default campaignReducer
