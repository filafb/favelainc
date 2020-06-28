"use strict"

const Sequelize = require("sequelize")
const db = require("../database")

const Campaign = db.define(
  "campaign",
  {
    name: Sequelize.STRING
  },
  {}
)

module.exports = Campaign
