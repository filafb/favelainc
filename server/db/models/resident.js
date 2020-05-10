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
    cpf: {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue("cpf", Number(value))
      },
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

module.exports = Resident
