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

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const userOrg = await req.user.getNgoPartner()
    const orgFilter = userOrg.master ? {} : { ngoPartnerId: id }
    const family = await Family.findOne({
      where: { id: id, ...orgFilter },
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
    if (!family) {
      const error = new Error(
        "Família não encontrada ou não cadastrada pela Ong"
      )
      error.status = 404
      throw error
    }
    res.json(family)
  } catch (error) {
    next(error)
  }
})

router.get("/:id/residents", async (req, res, next) => {
  const { id } = req.params
  try {
    const userOrg = await req.user.getNgoPartner()
    const orgFilter = userOrg.master ? {} : { ngoPartnerId: userOrg.id }
    const residents = await Resident.findAll({
      where: {
        familyId: id
      },
      include: {
        model: Family,
        where: orgFilter
      }
    })
    res.json(residents)
  } catch (error) {
    next(error)
  }
})
