const db = require("./database")
const User = require("./models/user")
const Model2 = require("./models/model2")

//associtiations
// Model1.hasMany(Model2)
// Model2.belongsTo(Model1)

module.exports = {
  db,
  User,
  Model2
}

if (process.env.NODE_ENV === "test") {
  afterAll(async done => {
    db.close()
    done()
  })
}
