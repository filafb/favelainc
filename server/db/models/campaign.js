"use strict"

const Sequelize = require("sequelize")
const db = require("../database")
const Family = require("./family")
const CampaignControl = require("./campaign_control")
const { Op } = Sequelize

const Campaign = db.define(
  "campaign",
  {
    name: Sequelize.STRING
  },
  {}
)

Campaign.createCampaign = async function({ name, familyIds = [] }) {
  const campaign = await Campaign.create({ name })
  const families = await Family.findAll({
    where: {
      id: {
        [Op.in]: familyIds
      }
    }
  })
  await campaign.setFamilies(families)

  return Campaign.findByPk(campaign.id, {
    include: {
      model: CampaignControl
    }
  })
}

module.exports = Campaign
