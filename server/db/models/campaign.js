"use strict"

const Sequelize = require("sequelize")
const db = require("../database")
const Family = require("./family")
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
      model: Family,
      attributes: ["id"]
    }
  })
}

module.exports = Campaign
