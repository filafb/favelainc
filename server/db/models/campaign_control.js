"use strict"

const Sequelize = require("sequelize")
const db = require("../database")

const CampaignControl = db.define(
  "campaign_control",
  {
    dateDelivered: Sequelize.DATE
  },
  {}
)

module.exports = CampaignControl
