const Sequelize = require("sequelize")
const db = require("../database")

const GovernmentBenefit = db.define(
  "governmentBenefit",
  {
    name: Sequelize.STRING,
    amount: Sequelize.INTEGER
  },
  {}
)

module.exports = GovernmentBenefit
