const db = require("./database")
const Model1 = require("./models/model1")
const Model2 = require("./models/model2")

//associtiations
Model1.hasMany(Model2)
Model2.belongsTo(Model1)

module.exports = {
  db,
  Model1,
  Model2
}
