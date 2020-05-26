const express = require("express")
const router = express.Router()
const { belongsToMaster, verifyAdmin } = require("../helpers")
const { NgoPartner } = require("../../../db")

module.exports = router

router.get("/", async (req, res, next) => {
  try {
    //req.user.getNgoPartner()
    //console.dir() null or {master: true || false}
    //const isMaster = !userOrg ?
    const ngoList = await NgoPartner.findAll()
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
