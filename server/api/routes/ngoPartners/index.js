const express = require("express")
const router = express.Router()
const { belongsToMaster, verifyAdmin } = require("../helpers")
const { NgoPartner } = require("../../../db")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    const userOrg = await req.user.getNgoPartner()
    const queryParams = userOrg.master ? {} : { id: userOrg.id }
    const ngoList = await NgoPartner.findAll({ where: queryParams })
    res.json(ngoList)
  } catch (error) {
    next(error)
  }
})

router.post("/", verifyAdmin, belongsToMaster, async (req, res, next) => {
  try {
    const { name, master = false } = req.body
    const newPartner = await NgoPartner.create({
      name,
      master
    })
    res.json(newPartner)
  } catch (error) {
    next(error)
  }
})
//NgoPartner
