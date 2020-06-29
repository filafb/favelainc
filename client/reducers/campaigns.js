import axios from "axios"

const CREATE_CAMPAIGN = "CREATE_CAMPAIGN"

const createdCampaign = campaign => {
  return {
    type: CREATE_CAMPAIGN,
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

const campaignReducer = (state = [], { type, ...payload }) => {
  switch (type) {
    case CREATE_CAMPAIGN:
      return [...state, payload.campaign]
    default:
      return state
  }
}

export default campaignReducer
