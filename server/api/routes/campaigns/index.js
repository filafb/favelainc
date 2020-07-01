const express = require("express")
const router = express.Router()
const { verifyAdmin } = require("../helpers")
const Campaign = require("../../../db/models/campaign")
const Family = require("../../../db/models/family")
const { CampaignControl } = require("../../../db")

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

router.get("/", async (req, res, next) => {
  try {
    const userOrg = await req.user.getNgoPartner()
    const orgFilter = userOrg.master
      ? {}
      : {
          ngoPartnerId: userOrg.id
        }
    const campaigns = await Campaign.findAll({
      include: {
        model: Family,
        where: orgFilter,
        attributes: ["id"]
      }
    })
    res.json(campaigns)
  } catch (error) {
    next(error)
  }
})

router.put("/", async (req, res, next) => {
  const { familyId, campaignId } = req.body
  try {
    await CampaignControl.update(
      {
        dateDelivered: new Date()
      },
      {
        where: {
          familyId,
          campaignId
        }
      }
    )
    const updatedCampaign = await Campaign.findByPk(campaignId, {
      include: {
        model: Family,
        attributes: ["id"]
      }
    })
    res.json(updatedCampaign)
  } catch (error) {
    next(error)
  }
})
