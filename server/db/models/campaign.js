"use strict"

const Sequelize = require("sequelize")
const db = require("../database")

const Campaign = db.define(
  "campaign",
  {
    name: Sequelize.STRING,
    pickupDate: Sequelize.DATE
  },
  {}
)

module.exports = Campaign
