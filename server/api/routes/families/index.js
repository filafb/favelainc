const express = require("express")
const router = express.Router()
const { Family, Resident, CampaignControl } = require("../../../db")
const { Sequelize } = require("sequelize")
const Campaign = require("../../../db/models/campaign")
const { belongsToMaster, verifyAdmin } = require("../helpers")

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
      include: [
        {
          model: Resident,
          attributes: []
        },
        {
          model: Campaign,
          attributes: ["id"],
          through: {
            attributes: []
          }
        }
      ],
      group: [
        "family.id",
        "campaigns.id",
        "campaigns.campaign_control.dateDelivered",
        "campaigns.campaign_control.createdAt",
        "campaigns.campaign_control.updatedAt",
        "campaigns.campaign_control.familyId",
        "campaigns.campaign_control.campaignId"
      ]
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
      include: [
        {
          model: Resident,
          attributes: []
        },
        {
          model: Campaign,
          attributes: ["id"],
          through: {
            attributes: []
          }
        }
      ],
      group: [
        "family.id",
        "campaigns.id",
        "campaigns.campaign_control.dateDelivered",
        "campaigns.campaign_control.createdAt",
        "campaigns.campaign_control.updatedAt",
        "campaigns.campaign_control.familyId",
        "campaigns.campaign_control.campaignId"
      ]
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

router.delete("/:id", belongsToMaster, verifyAdmin, async (req, res, next) => {
  const { id } = req.params
  try {
    await CampaignControl.destroy({
      where: {
        familyId: id
      }
    })

    await Resident.destroy({
      where: {
        familyId: id
      }
    })

    await Family.destroy({
      where: {
        id
      }
    })
    res.json({ success: "Family and all residents deleted" })
  } catch (error) {
    next(error)
  }
})
