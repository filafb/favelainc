"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "ngoPartnersId", {
      type: Sequelize.INTEGER,
      references: {
        model: "ngoPartners",
        key: "id"
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "ngoPartnersId")
  }
}
