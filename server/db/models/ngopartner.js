const Sequelize = require("sequelize")
const db = require("../database")

const NgoPartner = db.define(
  "ngoPartner",
  {
    name: Sequelize.STRING,
    master: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  },
  {}
)

module.exports = NgoPartner
