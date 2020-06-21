const express = require("express")
const router = express.Router()
const { Family, Resident } = require("../../../db")
const { Sequelize } = require("sequelize")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const userOrg = await req.user.getNgoPartner()
    const orgFilter = userOrg.master
      ? {}
      : {
          ngoPartnerId: userOrg.id
        }
    const families = await Family.findAll({
      where: orgFilter,
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("residents.id")),
            "familyMembers"
          ]
        ]
      },
      include: {
        model: Resident,
        attributes: []
      },
      group: ['"family.id"']
    })
    res.json(families)
  } catch (error) {
    next(error)
  }
})
