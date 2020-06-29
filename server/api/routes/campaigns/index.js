const express = require("express")
const router = express.Router()
const { verifyAdmin } = require("../helpers")
const Campaign = require("../../../db/models/campaign")

module.exports = router

router.post("/", verifyAdmin, async (req, res, next) => {
  const { name, familyIds } = req.body
  try {
    const campaign = await Campaign.createCampaign({
      name,
      familyIds
    })
    res.json(campaign)
  } catch (error) {
    next(error)
  }
})
