"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("users", "ngoPartnerId", {
      type: Sequelize.INTEGER,
      references: {
        model: "ngoPartners",
        key: "id"
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("users", "ngoPartnerId")
  }
}
