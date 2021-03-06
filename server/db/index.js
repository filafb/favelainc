const db = require("./database")
const User = require("./models/user")
const Family = require("./models/family")
const NgoPartner = require("./models/ngopartner")
const GovernmentBenefit = require("./models/governmentbenefit")
const Resident = require("./models/resident")
const Campaign = require("./models/campaign")
const CampaignControl = require("./models/campaign_control")

//associtiations
Family.belongsTo(NgoPartner, { as: "ngoPartner" })
Family.belongsTo(NgoPartner, { as: "closestNgo" })
NgoPartner.hasMany(Family, { as: "familyPartner" })
NgoPartner.hasMany(Family, { as: "closestNgo" })
Family.belongsTo(GovernmentBenefit, { as: "governmentBenefit" })
GovernmentBenefit.hasMany(Family)
Resident.belongsTo(Family)
Family.hasMany(Resident)
User.belongsTo(NgoPartner)
NgoPartner.hasMany(User, {
  foreignKey: {
    allowNull: false
  }
})

Family.belongsToMany(Campaign, { through: CampaignControl })
Campaign.belongsToMany(Family, { through: CampaignControl })

module.exports = {
  db,
  User,
  Family,
  NgoPartner,
  GovernmentBenefit,
  Resident,
  Campaign,
  CampaignControl
}

if (process.env.NODE_ENV === "test") {
  afterAll(async done => {
    db.close()
    done()
  })
}
