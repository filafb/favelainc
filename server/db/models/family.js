"use strict"
const Sequelize = require("sequelize")
const db = require("../database")

const Family = db.define(
  "family",
  {
    tempId: Sequelize.INTEGER,
    address: Sequelize.STRING,
    number: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    neighborhood: Sequelize.STRING,
    familySize: Sequelize.INTEGER,
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
    familyIncome: Sequelize.INTEGER,
    familyIncomeCovid: Sequelize.INTEGER,
    governmentBenefitComment: Sequelize.TEXT,
    consent: Sequelize.BOOLEAN,
    disability: Sequelize.TEXT
  },
  {}
)

module.exports = Family
