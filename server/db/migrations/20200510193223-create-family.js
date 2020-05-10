"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("families", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tempId: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      number: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      neighborhood: {
        type: Sequelize.STRING
      },
      familySize: {
        type: Sequelize.INTEGER
      },
      children: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      eldery: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      occupation: {
        type: Sequelize.STRING
      },
      familyIncome: {
        type: Sequelize.INTEGER
      },
      familyIncomeCovid: {
        type: Sequelize.INTEGER
      },
      governmentBenefitComment: {
        type: Sequelize.TEXT
      },
      consent: {
        type: Sequelize.BOOLEAN
      },
      disability: {
        type: Sequelize.TEXT
      },
      governmentBenefitId: {
        type: Sequelize.INTEGER,
        references: {
          model: "governmentBenefits",
          key: "id"
        }
      },
      ngoPartnerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ngoPartners",
          key: "id"
        }
      },
      closestNgoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "ngoPartners",
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
    return queryInterface.dropTable("families")
  }
}
