"use strict"
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("residents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      birthDate: {
        type: Sequelize.DATE
      },
      phoneMain: {
        type: Sequelize.STRING
      },
      phoneComment: {
        type: Sequelize.TEXT
      },
      occupation: {
        type: Sequelize.STRING
      },
      cpf: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: true,
        validate: {
          isCpf(value) {
            const checkCpf = /^(?![0]{11})([0-9]{11})$/
            if (!checkCpf.test(value)) {
              throw new Error("Not a valid CPF number")
            }
          }
        }
      },
      phoneSecond: {
        type: Sequelize.STRING
      },
      familyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "families",
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
    return queryInterface.dropTable("residents")
  }
}
