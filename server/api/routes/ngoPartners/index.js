const express = require("express")
const router = express.Router()
const { belongsToMaster, verifyAdmin } = require("../helpers")
const { NgoPartner } = require("../../../db")

module.exports = router

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
