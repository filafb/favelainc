"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("users", "ngoPartnersId", "ngoPartnerId")
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn("users", "ngoPartnerId", "ngoPartnersId")
  }
}
