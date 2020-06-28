const express = require("express")
const router = express.Router()
const { verifyAdmin } = require("../helpers")
const Campaign = require("../../../db/models/campaign")

module.exports = router

router.post("/", verifyAdmin, async (req, res, next) => {
  try {
    const campaign = await Campaign.createCampaign({
      name: "test",
      familyIds: [6, 7, 10]
    })
    res.json(campaign)
  } catch (error) {
    next(error)
  }
})
