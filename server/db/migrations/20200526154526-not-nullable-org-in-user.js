"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("users", "ngoPartnersId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: null
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("users", "ngoPartnersId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 1
    })
  }
}
