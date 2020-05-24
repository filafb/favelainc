"use strict"
const Sequelize = require("sequelize")
const db = require("../database")

const Resident = db.define(
  "resident",
  {
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
    }
  },
  {}
)

const validateDate = residents => {
  residents.forEach(resident => {
    const date = new Date(resident.birthDate).toString()
    if (date === "Invalid Date") {
      resident.birthDate = null
    }
  })
}

Resident.beforeBulkCreate(validateDate)

module.exports = Resident
