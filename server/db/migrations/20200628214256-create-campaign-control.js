"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("campaign_controls", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pickupDate: {
        type: Sequelize.DATE
      },
      familyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "families",
          key: "id"
        }
      },
      campaignId: {
        type: Sequelize.INTEGER,
        references: {
          model: "campaigns",
          key: "id"
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("campaign_controls")
  }
}
