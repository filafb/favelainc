const Sequelize = require("sequelize")
const db = require("../database")

const NgoPartner = db.define(
  "ngoPartner",
  {
    name: Sequelize.STRING
  },
  {}
)

module.exports = NgoPartner
